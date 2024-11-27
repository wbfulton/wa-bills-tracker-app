import express, { Request, Response } from "express";
import xml2js from "xml2js";

import {
  CompanionLegislation,
  CurrentStatus,
  LegislationDetail,
  LegislationDetailRaw,
  RcwCiteAffected,
  RcwCiteAffectedRaw,
} from "../../../lib/types";
import {
  LegislationDetailResponseData,
  RcwCiteAffectedResponse,
} from "../response-types";
import { asyncWrapper, legislationClient } from "../utils";

/**
 * Handles all requests for single legislation details
 * @route /legislation-details
 * @GET /:biennum/:billNumber
 * @GET /:biennum/:billNumber/cites-affected
 */
const legislationDetailsRouter = express.Router({ mergeParams: true });

/**
 * Returns legislation details
 */
legislationDetailsRouter.get(
  "/:biennium/:billNumber",
  asyncWrapper(async (req: Request, res: Response) => {
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

    const parsedResponse: LegislationDetailResponseData =
      await xml2js.parseStringPromise(response.data);

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
      !!compRaw?.Biennium[0] && !!compRaw?.BillId[0] && !!compRaw?.Status[0];
    const companion: CompanionLegislation | undefined = !compValid
      ? undefined
      : ({
          biennium: compRaw.Biennium[0],
          billId: compRaw.BillId[0],
          status: compRaw.Status[0],
        } as CompanionLegislation);

    const clean: LegislationDetail = {
      biennium: info.Biennium[0],
      billId: info.BillId[0],
      billNumber: Number(info.BillNumber[0]),
      substituteVersion: Number(info.SubstituteVersion[0]),
      engrossedVersion: Number(info.EngrossedVersion[0]),
      shortLegislationType:
        info.ShortLegislationType[0].ShortLegislationType[0],
      longLegislationType: info.ShortLegislationType[0].LongLegislationType[0],
      originalAgency: info.OriginalAgency[0],
      active: Boolean(info.Active[0]),
      stateFiscalNote: Boolean(info.StateFiscalNote[0]),
      localFiscalNote: Boolean(info.LocalFiscalNote[0]),
      appropriations: Boolean(info.Appropriations[0]),
      requestedByGovernor: Boolean(info.RequestedByGovernor[0]),
      requestedByBudgetCommittee: Boolean(info.RequestedByBudgetCommittee[0]),
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
  })
);

/**
 * RCW Cite
 * Reference to a title, chapter, or section of the Revised Code of Washington.
 * Examples:  RCW 18, RCW 23B.06.010
 *
 * https://app.leg.wa.gov/bi/report/topicalindex/?biennium=2023-24&topic=FIREARMS
 */
legislationDetailsRouter.get(
  "/:biennium/:billId/cites-affected",
  asyncWrapper(async (req: Request, res: Response) => {
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

    const parsedResponse: RcwCiteAffectedResponse =
      await xml2js.parseStringPromise(response.data);

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
  })
);

export { legislationDetailsRouter };
