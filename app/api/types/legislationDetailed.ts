import { Biennium } from "app/types/legislation";


export interface LegislationDetailed {
    /* 
    * Format 2023-24
    */
    biennium: [Biennium],
    /* 
    * Format hB 1001
    */
    billId: [string],
    billNumber: [string],
    substituteVersion: [string],
    engrossedVersion: [string],
    shortLegislationType: [
        {
            shortLegislationType: [
                string
            ],
            longLegislationType: [
                string
            ]
        }
    ],
    originalAgency: [string],
    active: [string],
    stateFiscalNote: [string],
    localFiscalNote: [string],
    appropriations: [string],
    requestedByGovernor: [string],
    requestedByBudgetCommittee: [string],
    requestedByDepartment: [string],
    requestedByOther: [string],
    shortDescription: [string],
    request: [string],
    introducedDate: Date,
    currentStatus: Array<{
        billId: [string],
        historyLine: [string],
        actionDate: [Date],
        amendedByOppositeBody: [string],
        partialVeto: [string],
        veto: [string],
        amendmentsExist: [string],
        status: [string]
    }>,
    sponsor: [string],
    primeSponsorID: [string],
    longDescription: [string],
    legalTitle: [string],
    companions: Array<{
        companion: {
            biennium: [string],
            billId: [string],
            status: [string]
        }
    } | Array<string>>
}


export interface LegislationDetails {
    arrayOfLegislation: {
        $: {
            xmlns: string,
            "xmlns:xsd": string,
            "xmlns:xsi": string

        }
        legislation: Array<LegislationDetailed>
    }
}