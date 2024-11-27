import express, { Request, Response } from "express";
import queryString from "querystring";
import xml2js from "xml2js";

import * as cheerio from "cheerio";
import { LegislationInfoResponseData } from "../response-types";

import { LegislationInfo, LegislationInfoRaw } from "../../../lib/types";
import { asyncWrapper, legislationClient, scrapperClient } from "../utils";

/**
 * Handles all requests for multiple legislation
 * @route /legislation
 * @GET /:biennium/passed-legislature
 * @GET /:biennium/topic-search/:topicId
 */
const legislationRouter = express.Router({ mergeParams: true });

legislationRouter.get(
  "/:biennium/passed-legislature",
  asyncWrapper(async (req: Request, res: Response) => {
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

    const parsedResponse: LegislationInfoResponseData =
      await xml2js.parseStringPromise(response.data);

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
  })
);

legislationRouter.get(
  "/:biennium/topic-search/:topicId",
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
    const regex = new RegExp(strToRemove, "g");
    const parsedHtml = cheerio.load(response.data);
    const items = parsedHtml("li")
      .nextAll()
      .map((index, element) => parsedHtml(element).text().replace(regex, ""))
      .get()
      .map((str: string) => {
        const splits = str.split(":");
        return {
          legislationSummary: splits[0],
          billIds: splits[1].split(",").map((str) => str.replace("*", "")),
        };
      });

    const rawTopicTitle = parsedHtml("h3").after("li.mb-3").first().text();

    const topicTitle = rawTopicTitle.replace(regex, "");

    res.send(JSON.stringify({ topicTitle, legislation: items }));
  })
);

export { legislationRouter };
