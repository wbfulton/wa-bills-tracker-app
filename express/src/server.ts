import express, { Express, NextFunction, Request, Response } from "express";
import axios, { AxiosRequestConfig } from 'axios';
import xmlparser from 'express-xml-bodyparser';
import xml2js from 'xml2js';
import dotenv from 'dotenv'

import { asyncWrapper, convertKeysToLowerCase } from "./utils";
import { LegislationInfo, LegislationInfoRaw, LegislationInfoResponseData, LegislativeDocument, LegislativeDocumentResponseData, LegislativeFiscalData, LegislativeFiscalDataResponse } from "./types";
// i love u alot <3

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 8080


app.use(function (req: Request, res: Response, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(xmlparser())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

const filesClient = axios.create({
    baseURL: 'https://lawfilesext.leg.wa.gov',
});

const fiscalClient = axios.create({
    baseURL: 'https://fnspublic.ofm.wa.gov',
});

const legislationClient = axios.create({
    baseURL: 'https://wslwebservices.leg.wa.gov',
});

/**
 * Can return html or pdf if desired
 * XML and Docx option, but less data
 */
app.get('/bill-text', asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const config: AxiosRequestConfig<string> = {
        headers: {
            "Content-Type": "text/html"
        },
        params: {
            biennium: req.params.biennium
        },
    }

    const response = await filesClient.get<string>(`Biennium/2023-24/Htm/Bills/House%20Bills/1001.htm`, config)

    res.send(response.data);
}))

/**
 * RCW (revised code of washington)
 * XML and Docx option, but less data
 */
app.get('/rcw', asyncWrapper(async (req: Request, res: Response) => {
    const response = await filesClient.get('/Law/RCW/RCW%20%20%201%20%20TITLE/RCW%20%20%201%20%20%20TITLE/RCW%20%20%201%20%20%20TITLE.htm', {
        headers: {
            "Content-Type": "text/html"
        },
        params: {
            biennium: req.params.biennium
        }
    })

    res.send(response.data);
}))



/**
 * Returns pdf fiscal note for given package id
 */
app.get('/legislation/fiscal-note/:packageID', asyncWrapper(async (req: Request, res: Response) => {

    const response = await fiscalClient.get('/FNSPublicSearch/GetPDF', {
        headers: {
            "Content-Type": "application/pdf"
        },
        params: {
            packageID: req.params.packageID
        },
    })

    res.setHeader("Content-Type", "application/pdf");
    res.status(200).send(response.data);

}))


/**
 * Returns array of fiscal note objects for given query
 */
app.post('/legislation/fiscal-notes', asyncWrapper(async (req: Request, res: Response) => {
    const response = await fiscalClient.postForm<LegislativeFiscalDataResponse>('/fnspublicsearch/dosearch', {
        SessionYear: req.body.sessionYear,
        BillNumber: req.body.billNumber,
        BillTitle: req.body.billTitle,
        RequestType: req.body.requestType
    })
    const raw = response.data.data.map(data => {
        const cleaned: LegislativeFiscalData = {
            packageId: data.packageId,
            sessionYear: data.SessionYear,
            proposedFlag: data.ProposedFlag,
            billId: data.BillId == null ? undefined : Number(data.BillId),
            billNumber: data.BillNumber,
            billTitle: data.BillTitle,
            publishedDate: new Date(Number(data.PublishedDate.slice(6, data.PublishedDate.length - 2))),
            billType: data.BillType,
            requestType: data.RequestType,
            amendmentName: data.AmendmentName,
            engrossedNotation: data.EngrossedNotation,
            sustituteNotation: data.SustituteNotation,
            qualifier: data.Qualifier,
            origin: data.Origin,
            fiscalNotePDFUrl: `https://fnspublic.ofm.wa.gov/FNSPublicSearch/GetPDF/${data.packageId}`
        }

        return cleaned
    })


    res.send(JSON.stringify(raw));
}))

app.post('/legislation/documents', asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const response = await legislationClient.post<LegislativeDocumentResponseData>('/LegislativeDocumentService.asmx/GetDocuments', {
        biennium: req.body.biennium,
        namedLike: req.body.namedLike
    }, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })




    xml2js.parseString(response.data, (err, results: LegislativeDocumentResponseData) => {
        if (err) next(err)

        const documents: Array<LegislativeDocument> = results.ArrayOfLegislativeDocument.LegislativeDocument.map(raw => {
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
                billId: Number(raw.BillId[0])
            }

            return document
        })



        res.send(JSON.stringify(documents));
    });

}))

app.get('/legislation-details/:biennium/:billNumber', asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const response = await legislationClient.get('/LegislationService.asmx/GetLegislation', {
        headers: {
            'Host': 'wslwebservices.leg.wa.gov',
        },
        params: {
            biennium: req.params.biennium,
            billNumber: req.params.billNumber
        },
    })

    xml2js.parseString(response.data, (err, results) => {
        if (err) next(err)

        // parsing to json
        const data = JSON.stringify(convertKeysToLowerCase(results))

        res.send(data);
    });

}))

app.get('/passed-legislature/:biennium', asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const response = await legislationClient.get('/LegislationService.asmx/GetLegislationPassedLegislature', {
        headers: {
            'Host': 'wslwebservices.leg.wa.gov',
        },
        params: {
            biennium: req.params.biennium
        },
    })


    xml2js.parseString(response.data, (err, parsedResponse: LegislationInfoResponseData) => {
        if (err) next(err);


        const results: Array<LegislationInfoRaw> = parsedResponse.ArrayOfLegislationInfo.LegislationInfo

        const data = results.map(info => {
            const clean: LegislationInfo = {
                biennium: info.Biennium[0],
                billId: info.BillId[0],
                billNumber: Number(info.BillNumber[0]),
                substituteVersion: Number(info.SubstituteVersion[0]),
                engrossedVersion: Number(info.EngrossedVersion[0]),
                shortLegislationType: info.ShortLegislationType[0].ShortLegislationType[0],
                longLegislationType: info.ShortLegislationType[0].LongLegislationType[0],
                originalAgency: info.OriginalAgency[0],
                active: Boolean(info.Active[0]),
                displayNumber: Number(info.DisplayNumber[0]),
            }

            return clean;
        })

        res.send(JSON.stringify(data));
    });
}))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})