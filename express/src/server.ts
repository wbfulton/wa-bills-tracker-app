import express, { Express, NextFunction, Request, Response } from "express";
import axios, { AxiosRequestConfig } from 'axios';
import xmlparser from 'express-xml-bodyparser';
import xml2js from 'xml2js';
import dotenv from 'dotenv'

import { asyncWrapper, convertKeysToLowerCase } from "./utils";
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

interface FiscalNotesRes {
    data: Array<{
        AmendmentName: string
        BillId: null,
        BillNumber: string,
        BillTitle: string,
        BillType: string,
        EngrossedNotation: string,
        Origin: string,
        ProposedFlag: string,
        PublishedDate: Date,
        Qualifier: string,
        RequestType: string,
        SessionYear: string,
        SustituteNotation: string,
        packageId: number
    }>
}


/**
 * Returns array of fiscal note objects for given query
 */
app.post('/legislation/fiscal-notes', asyncWrapper(async (req: Request, res: Response) => {
    const response = await fiscalClient.postForm<FiscalNotesRes>('/fnspublicsearch/dosearch', {
        SessionYear: req.body.sessionYear,
        BillNumber: req.body.billNumber,
        BillTitle: req.body.billTitle,
        RequestType: req.body.requestType
    })
    const data = JSON.stringify(convertKeysToLowerCase(response.data))

    res.send(data);
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

    xml2js.parseString(response.data, (err, results) => {
        if (err) next(err);

        const data = JSON.stringify(convertKeysToLowerCase(results))

        res.send(data);
    });
}))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})