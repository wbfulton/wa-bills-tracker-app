import { AxiosRequestConfig } from "axios";
import express, { Request, Response } from "express";
import xml2js from "xml2js";

import {
  LegislativeDocument,
  LegislativeFiscalDocument,
} from "../../../lib/types";
import {
  LegislativeDocumentResponseData,
  LegislativeFiscalDataResponse,
} from "../response-types";
import {
  asyncWrapper,
  filesClient,
  fiscalClient,
  legislationClient,
} from "../utils";

/**
 * Handles all requests for single legislation documents
 * @route /legislation-documents
 * @GET /text/:biennium/:originalAgency/:legType/:billNumber
 * @GET /rcw
 * @GET /fiscal-note/:packageID
 * @POST /fiscal-notes { sessionYear, billNumber, billTitle, requestType }
 * @POST /documents
 */
const documentsRouter = express.Router({ mergeParams: true });

/**
 * Can return html or pdf if desired
 * XML and Docx option, but less data
 */
documentsRouter.get(
  "/text/:biennium/:originalAgency/:legType/:billNumber",
  asyncWrapper(async (req: Request, res: Response) => {
    const config: AxiosRequestConfig<string> = {
      headers: {
        "Content-Type": "text/html",
      },
      params: {
        biennium: req.params.biennium,
        originalAgency: req.params.originalAgency, // e.g. House
        billNumber: req.params.billNumber,
        legType: req.params.legType, // e.g Bills
      },
    };

    const response = await filesClient.get<string>(
      `Biennium/${req.params.biennium}/Htm/${req.params.legType}/${req.params.originalAgency}%20${req.params.legType}/${req.params.billNumber}.htm`,
      config
    );

    res.send(response.data);
  })
);

/**
 * RCW (revised code of washington)
 * XML and Docx option, but less data
 *
 * TODO
 */
documentsRouter.get(
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
documentsRouter.get(
  "/fiscal-note/:packageID",
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
documentsRouter.post(
  "/fiscal-notes",
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
      const cleaned: LegislativeFiscalDocument = {
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

/**
 * Returns all documents
 */
documentsRouter.post(
  "/documents",
  asyncWrapper(async (req: Request, res: Response) => {
    const response =
      await legislationClient.post<LegislativeDocumentResponseData>(
        "/LegislativeDocumentService.asmx/GetDocuments",
        {
          biennium: req.body.biennium,
          namedLike: req.body.namedLike,
        },
        { headers: { "content-type": "application/x-www-form-urlencoded" } }
      );

    const parsedResponse: LegislativeDocumentResponseData =
      await xml2js.parseStringPromise(response.data);

    const documents: Array<LegislativeDocument> =
      parsedResponse.ArrayOfLegislativeDocument.LegislativeDocument.map(
        (raw) => {
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
        }
      );

    res.send(JSON.stringify(documents));
  })
);

export { documentsRouter };
