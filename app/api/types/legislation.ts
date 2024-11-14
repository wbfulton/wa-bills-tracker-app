export type BillNumber = number;

export interface Legislation {
    /* 
    * Format 2023-24
    */
    biennium: string
    /* 
    * Format hB 1001
    */
    billId: string
    billNumber: [BillNumber]
    substituteVersion: number
    engrossedVersion: number
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
    originalAgency: string
    active: boolean
    stateFiscalNote: boolean,
    localFiscalNote: boolean,
    appropriations: boolean,
    requestedByGovernor: boolean,
    requestedByBudgetcommittee: boolean,
    requestedByDepartment: boolean,
    requestedByOther: boolean,
    shortDescription: [string],
    request: string,
    introducedDate: Date,
    currentStatus: {
        billId: string,
        historyLine: string,
        actionDate: Date,
        amendedByOppositeBody: boolean,
        partialVeto: boolean,
        veto: boolean,
        amendmentsExist: boolean,
        status: string
    },
    sponsor: string,
    primeSponsorID: number,
    longDescription: string,
    legalTitle: string,
    companions: {
        companion: {
            biennium: string,
            billId: BillId,
            status: string
        }
    }
}

export interface LegislationDetails {
    arrayOfLegislation: {
        $: {
            xmlns: string,
            "xmlns:xsd": string,
            "xmlns:xsi": string

        }
        legislation: Array<Legislation>
    }
}