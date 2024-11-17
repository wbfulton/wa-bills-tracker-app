import axios, { AxiosRequestConfig } from "axios";
import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import xmlparser from "express-xml-bodyparser";
import queryString from "querystring";
import xml2js from "xml2js";

import * as cheerio from "cheerio";
import {
  CompanionLegislation,
  CurrentStatus,
  LegislationDetail,
  LegislationDetailRaw,
  LegislationDetailResponseData,
  LegislationInfo,
  LegislationInfoRaw,
  LegislationInfoResponseData,
  LegislativeDocument,
  LegislativeDocumentResponseData,
  LegislativeFiscalData,
  LegislativeFiscalDataResponse,
  RcwCiteAffected,
  RcwCiteAffectedRaw,
  RcwCiteAffectedResponse,
} from "./types";
import { asyncWrapper } from "./utils";

// i love u alot <3

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(function (req: Request, res: Response, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(xmlparser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

const filesClient = axios.create({
  baseURL: "https://lawfilesext.leg.wa.gov",
});

const fiscalClient = axios.create({
  baseURL: "https://fnspublic.ofm.wa.gov",
});

const legislationClient = axios.create({
  baseURL: "https://wslwebservices.leg.wa.gov",
});

const scrapperClient = axios.create({
  baseURL: "https://app.leg.wa.gov",
});

/**
 * Can return html or pdf if desired
 * XML and Docx option, but less data
 */
app.get(
  "/bill-text",
  asyncWrapper(async (req: Request, res: Response) => {
    const config: AxiosRequestConfig<string> = {
      headers: {
        "Content-Type": "text/html",
      },
      params: {
        biennium: req.params.biennium,
      },
    };

    const response = await filesClient.get<string>(
      `Biennium/2023-24/Htm/Bills/House%20Bills/1001.htm`,
      config
    );

    res.send(response.data);
  })
);

/**
 * RCW (revised code of washington)
 * XML and Docx option, but less data
 */
app.get(
  "/rcw",
  asyncWrapper(async (req: Request, res: Response) => {
    const response = await filesClient.get(
      "/Law/RCW/RCW%20%20%201%20%20TITLE/RCW%20%20%201%20%20%20TITLE/RCW%20%20%201%20%20%20TITLE.htm",
      {
        headers: {
          "Content-Type": "text/html",
        },
        params: {
          biennium: req.params.biennium,
        },
      }
    );

    res.send(response.data);
  })
);

/**
 * Returns pdf fiscal note for given package id
 */
app.get(
  "/legislation/fiscal-note/:packageID",
  asyncWrapper(async (req: Request, res: Response) => {
    const response = await fiscalClient.get("/FNSPublicSearch/GetPDF", {
      headers: {
        "Content-Type": "application/pdf",
      },
      params: {
        packageID: req.params.packageID,
      },
    });

    res.setHeader("Content-Type", "application/pdf");
    res.status(200).send(response.data);
  })
);

/**
 * Returns array of fiscal note objects for given query
 */
app.post(
  "/legislation/fiscal-notes",
  asyncWrapper(async (req: Request, res: Response) => {
    const response = await fiscalClient.postForm<LegislativeFiscalDataResponse>(
      "/fnspublicsearch/dosearch",
      {
        SessionYear: req.body.sessionYear,
        BillNumber: req.body.billNumber,
        BillTitle: req.body.billTitle,
        RequestType: req.body.requestType,
      }
    );
    const raw = response.data.data.map((data) => {
      const cleaned: LegislativeFiscalData = {
        packageId: data.packageId,
        sessionYear: data.SessionYear,
        proposedFlag: data.ProposedFlag,
        billId: data.BillId == null ? undefined : Number(data.BillId),
        billNumber: data.BillNumber,
        billTitle: data.BillTitle,
        publishedDate: new Date(
          Number(data.PublishedDate.slice(6, data.PublishedDate.length - 2))
        ),
        billType: data.BillType,
        requestType: data.RequestType,
        amendmentName: data.AmendmentName,
        engrossedNotation: data.EngrossedNotation,
        sustituteNotation: data.SustituteNotation,
        qualifier: data.Qualifier,
        origin: data.Origin,
        fiscalNotePDFUrl: `https://fnspublic.ofm.wa.gov/FNSPublicSearch/GetPDF/${data.packageId}`,
      };

      return cleaned;
    });

    res.send(JSON.stringify(raw));
  })
);

app.post(
  "/legislation/documents",
  asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const response =
      await legislationClient.post<LegislativeDocumentResponseData>(
        "/LegislativeDocumentService.asmx/GetDocuments",
        {
          biennium: req.body.biennium,
          namedLike: req.body.namedLike,
        },
        { headers: { "content-type": "application/x-www-form-urlencoded" } }
      );

    xml2js.parseString(
      response.data,
      (err, results: LegislativeDocumentResponseData) => {
        if (err) next(err);

        const documents: Array<LegislativeDocument> =
          results.ArrayOfLegislativeDocument.LegislativeDocument.map((raw) => {
            const document: LegislativeDocument = {
              name: raw.Name[0],
              shortFriendlyName: raw.ShortFriendlyName[0],
              biennium: raw.Biennium[0],
              longFriendlyName: raw.LongFriendlyName[0],
              description: raw.Description[0],
              type: raw.Type[0],
              class: raw.Class[0],
              htmUrl: raw.HtmUrl[0],
              htmCreateDate: raw.HtmCreateDate[0],
              htmLastModifiedDate: raw.HtmLastModifiedDate[0],
              pdfUrl: raw.PdfUrl[0],
              pdfCreateDate: raw.PdfCreateDate[0],
              pdfLastModifiedDate: raw.PdfLastModifiedDate[0],
              billId: Number(raw.BillId[0]),
            };

            return document;
          });

        res.send(JSON.stringify(documents));
      }
    );
  })
);

app.get(
  "/legislation-details/:biennium/:billNumber",
  asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const response = await legislationClient.get(
      "/LegislationService.asmx/GetLegislation",
      {
        headers: {
          Host: "wslwebservices.leg.wa.gov",
        },
        params: {
          biennium: req.params.biennium,
          billNumber: req.params.billNumber,
        },
      }
    );

    xml2js.parseString(
      response.data,
      (err, parsedResponse: LegislationDetailResponseData) => {
        if (err) next(err);

        const info: LegislationDetailRaw =
          parsedResponse.ArrayOfLegislation.Legislation[0];

        const currentStatus: CurrentStatus = {
          billId: info.CurrentStatus[0].BillId[0],
          historyLine: info.CurrentStatus[0].HistoryLine[0],
          actionDate: new Date(info.CurrentStatus[0].ActionDate[0]),
          amendedByOppositeBody: Boolean(
            info.CurrentStatus[0].AmendedByOppositeBody[0]
          ),
          partialVeto: Boolean(info.CurrentStatus[0].PartialVeto[0]),
          veto: Boolean(info.CurrentStatus[0].Veto[0]),
          amendmentsExist: Boolean(info.CurrentStatus[0].AmendmentsExist[0]),
          status: info.CurrentStatus[0].Status[0],
        };
        const compRaw = info?.Companions?.[0].Companion?.[0];
        const compValid =
          !!compRaw?.Biennium[0] &&
          !!compRaw?.BillId[0] &&
          !!compRaw?.Status[0];
        const companion: CompanionLegislation | undefined = !compValid
          ? undefined
          : {
              biennium: compRaw.Biennium[0],
              billId: compRaw.BillId[0],
              status: compRaw.Status[0],
            };

        const clean: LegislationDetail = {
          biennium: info.Biennium[0],
          billId: info.BillId[0],
          billNumber: Number(info.BillNumber[0]),
          substituteVersion: Number(info.SubstituteVersion[0]),
          engrossedVersion: Number(info.EngrossedVersion[0]),
          shortLegislationType:
            info.ShortLegislationType[0].ShortLegislationType[0],
          longLegislationType:
            info.ShortLegislationType[0].LongLegislationType[0],
          originalAgency: info.OriginalAgency[0],
          active: Boolean(info.Active[0]),
          stateFiscalNote: Boolean(info.StateFiscalNote[0]),
          localFiscalNote: Boolean(info.LocalFiscalNote[0]),
          appropriations: Boolean(info.Appropriations[0]),
          requestedByGovernor: Boolean(info.RequestedByGovernor[0]),
          requestedByBudgetCommittee: Boolean(
            info.RequestedByBudgetCommittee[0]
          ),
          requestedByDepartment: Boolean(info.RequestedByDepartment[0]),
          requestedByOther: Boolean(info.RequestedByOther[0]),
          shortDescription: info.ShortDescription[0],
          request: info.Request[0],
          introducedDate: new Date(info.IntroducedDate[0]),
          currentStatus,
          sponsor: info.Sponsor[0],
          primeSponsorID: Number(info.PrimeSponsorID[0]),
          longDescription: info.LongDescription[0],
          legalTitle: info.LegalTitle[0],
          companionLeglislation: companion,
        };

        res.send(JSON.stringify(clean));
      }
    );
  })
);

app.get(
  "/passed-legislature/:biennium",
  asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const response = await legislationClient.get(
      "/LegislationService.asmx/GetLegislationPassedLegislature",
      {
        headers: {
          Host: "wslwebservices.leg.wa.gov",
        },
        params: {
          biennium: req.params.biennium,
        },
      }
    );

    xml2js.parseString(
      response.data,
      (err, parsedResponse: LegislationInfoResponseData) => {
        if (err) next(err);

        const results: Array<LegislationInfoRaw> =
          parsedResponse.ArrayOfLegislationInfo.LegislationInfo;

        const data = results.map((info) => {
          const clean: LegislationInfo = {
            biennium: info.Biennium[0],
            billId: info.BillId[0],
            billNumber: Number(info.BillNumber[0]),
            substituteVersion: Number(info.SubstituteVersion[0]),
            engrossedVersion: Number(info.EngrossedVersion[0]),
            shortLegislationType:
              info.ShortLegislationType[0].ShortLegislationType[0],
            longLegislationType:
              info.ShortLegislationType[0].LongLegislationType[0],
            originalAgency: info.OriginalAgency[0],
            active: Boolean(info.Active[0]),
            displayNumber: Number(info.DisplayNumber[0]),
          };

          return clean;
        });

        res.send(JSON.stringify(data));
      }
    );
  })
);

// GET TOPICS FOR A BILL
// https://app.leg.wa.gov/bi/report/topicalindex/?biennium=2023-24&legId=130637

// GET BILLS FOR A TOPIC
// https://app.leg.wa.gov/bi/report/topicalindex/?biennium=2023-24&topicId=15726

//
app.get(
  "/legislation/topic-search/:biennium/:topicId",
  asyncWrapper(async (req: Request, res: Response) => {
    const data = {
      renderType: 0,
      biennium: req.params.biennium,
      reportType: 0,
      houseSponsorId: 0,
      senateSponsorId: 0,
      sponsorAgency: null,
      committeeSponsorId: 0,
      requesterSponsorId: 0,
      billsBySponsorReportType: null,
      hasCompanionBills: false,
      customReportViewId: 0,
      startBillNumber: null,
      endBillNumber: null,
      allBills: false,
      listIds: null,
      showAddBillsModal: false,
      selectedBillTrackingAction: null,
      listId: null,
      legId: 0,
      topicId: req.params.topicId,
      topic: null,
      topicStartsWith: null,
      topicStartsWithNumber: false,
      topicalIndexRSS: false,
      citation: null,
      committeeId: 0,
      billsInAndOutOfCommitteeReportType: null,
      dynamic: false,
      selectedStepAction: null,
      selectedStepBillAgency: null,
      chamber: null,
      sortOrder: null,
      paperHangingReportType: null,
      date: null,
      time: null,
    };

    const query = queryString.stringify(data);
    console.log(query);

    const response = await scrapperClient.post(
      "bi/report/_topicalIndex/",
      query
    );

    const strToRemove = "\n";
    const starStr = "*";
    const regex = new RegExp(strToRemove, "g");
    const regexStar = new RegExp(starStr, "g");

    const parsedHtml = cheerio.load(response.data);
    const items = parsedHtml("li")
      .nextAll()
      .map((index, element) => parsedHtml(element).text().replace(regex, ""))
      .get()
      .map((str: string) => {
        const splits = str.split(":");
        return {
          legislationSummary: splits[0],
          billIds: splits[1]
            .split(",")
            .map((str) => str.replace(regexStar, "")),
        };
      });

    const rawTopicTitle = parsedHtml("h3").after("li.mb-3").first().text();

    const topicTitle = rawTopicTitle.replace(regex, "");

    res.send(JSON.stringify({ topicTitle, legislation: items }));
  })
);

// GET BILLS BY ANYTHING
// https://app.leg.wa.gov/bi/report/topicalindex/ POST FORM
// renderType: 0
// biennium: 2023-24
// reportType: 0
// houseSponsorId: 0
// senateSponsorId: 0
// sponsorAgency:
// committeeSponsorId: 0
// requesterSponsorId: 0
// billsBySponsorReportType:
// hasCompanionBills: false
// customReportViewId: 0
// startBillNumber:
// endBillNumber:
// allBills: false
// listIds:
// showAddBillsModal: false
// selectedBillTrackingAction:
// listId:
// legId: 0
// topicId: 15503
// topic:
// topicStartsWith:
// topicStartsWithNumber: false
// topicalIndexRSS: false
// citation:
// committeeId: 0
// billsInAndOutOfCommitteeReportType:
// dynamic: false
// selectedStepAction:
// selectedStepBillAgency:
// chamber:
// sortOrder:
// paperHangingReportType:
// date:
// time:

// COMMENT ON BILL
// https://app.leg.wa.gov/pbc/bill/2238

// GET EMAIL UPDATES
// https://public.govdelivery.com//accounts/WALEGBILLS/subscriber/new?topic_id=HB1180-2023-24

// TEXT SEARCH BILLS
// https://search.leg.wa.gov/search.aspx#document

/**
 * RCW Cite
 * Reference to a title, chapter, or section of the Revised Code of Washington.
 * Examples:  RCW 18, RCW 23B.06.010
 *
 * https://app.leg.wa.gov/bi/report/topicalindex/?biennium=2023-24&topic=FIREARMS
 */
app.get(
  "/rcw/cites-affected/:biennium/:billId",
  asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const response = await legislationClient.get(
      "/LegislationService.asmx/GetRcwCitesAffected",
      {
        headers: {
          Host: "wslwebservices.leg.wa.gov",
        },
        params: {
          biennium: req.params.biennium,
          billId: req.params.billId,
        },
      }
    );

    xml2js.parseString(
      response.data,
      (err, parsedResponse: RcwCiteAffectedResponse) => {
        if (err) next(err);

        const results: Array<RcwCiteAffectedRaw> =
          parsedResponse.ArrayOfRcwCiteAffected.RcwCiteAffected;

        const data = results.map((citeData) => {
          const cite: RcwCiteAffected = {
            rcwCite: citeData.RcwCite[0],
            action: citeData.Action[0],
          };

          return cite;
        });

        res.send(JSON.stringify(data));
      }
    );
  })
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
