"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_typescript_1 = __importDefault(require("axios-typescript"));
const express_xml_bodyparser_1 = __importDefault(
  require("express-xml-bodyparser")
);
const xml2js_1 = __importDefault(require("xml2js"));
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("./utils");
// i love u alot <3
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express_1.default.json());
app.use((0, express_xml_bodyparser_1.default)());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
const filesClient = axios_typescript_1.default.create({
  baseURL: "https://lawfilesext.leg.wa.gov",
});
const fiscalClient = axios_typescript_1.default.create({
  baseURL: "https://fnspublic.ofm.wa.gov",
});
const legislationClient = axios_typescript_1.default.create({
  baseURL: "https://wslwebservices.leg.wa.gov",
});
/**
 * Can return html or pdf if desired
 * XML and Docx option, but less data
 */
app.get(
  "/bill-text",
  (0, utils_1.asyncWrapper)((req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const response = yield filesClient.get(
        `Biennium/2023-24/Htm/Bills/House%20Bills/1001.htm`,
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
  )
);
/**
 * RCW (revised code of washington)
 * XML and Docx option, but less data
 */
app.get(
  "/rcw",
  (0, utils_1.asyncWrapper)((req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const response = yield filesClient.get(
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
  )
);
// https://fnspublic.ofm.wa.gov/FNSPublicSearch/GetPDF?packageID=65580
/**
 * RCW (revised code of washington)
 * XML and Docx option, but less data
 */
app.get(
  "/legislation/fiscal-note/:packageID",
  (0, utils_1.asyncWrapper)((req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const response = yield fiscalClient.get(
        "/FNSPublicSearch/GetPDF?packageID=65580",
        {
          headers: {
            "Content-Type": "application/pdf",
          },
          params: {
            packageID: req.params.packageID,
          },
        }
      );
      res.send(response.data);
    })
  )
);
app.post(
  "/legislation/fiscal-notes",
  (0, utils_1.asyncWrapper)((req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const response = yield fiscalClient.post("/fnspublicsearch/dosearch", {
        SessionYear: 68, // req.data.sessionYear,
        BillNumber: "", // req.data.billNumber,
        BillTitle: "", //req.data.billTitle,
        RequestType: "bill", //req.data.requestType
      });
      const data = JSON.stringify(
        (0, utils_1.convertKeysToLowerCase)(response.data)
      );
      res.send(data);
    })
  )
);
app.get(
  "/legislation-details/:biennium/:billNumber",
  (0, utils_1.asyncWrapper)((req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const response = yield legislationClient.get(
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
      xml2js_1.default.parseString(response.data, (err, results) => {
        if (err) next(err);
        // parsing to json
        const data = JSON.stringify(
          (0, utils_1.convertKeysToLowerCase)(results)
        );
        res.send(data);
      });
    })
  )
);
app.get(
  "/passed-legislature/:biennium",
  (0, utils_1.asyncWrapper)((req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const response = yield legislationClient.get(
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
      xml2js_1.default.parseString(response.data, (err, results) => {
        if (err) next(err);
        const data = JSON.stringify(
          (0, utils_1.convertKeysToLowerCase)(results)
        );
        res.send(data);
      });
    })
  )
);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
