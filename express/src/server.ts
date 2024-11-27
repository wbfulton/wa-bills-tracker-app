import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import xmlparser from "express-xml-bodyparser";

import { documentsRouter } from "./routes/documents";
import { legislationRouter } from "./routes/legislation";
import { legislationDetailsRouter } from "./routes/legislation-details";

// i love u alot <3

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

// CORS
app.use(function (req: Request, res: Response, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
// MAKE THIS WORK
app.use(xmlparser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/legislation", legislationRouter);
app.use("/legislation-details", legislationDetailsRouter);
app.use("/legislation-documents", documentsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// GET TOPICS FOR A BILL
// https://app.leg.wa.gov/bi/report/topicalindex/?biennium=2023-24&legId=130637

// GET BILLS FOR A TOPIC
// https://app.leg.wa.gov/bi/report/topicalindex/?biennium=2023-24&topicId=15726

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
