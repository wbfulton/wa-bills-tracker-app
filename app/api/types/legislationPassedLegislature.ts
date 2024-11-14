import { Biennium } from "app/types/legislation"

export interface LegislationInfo {
    /* 
     * Format 2023-24
    */
    biennium: [Biennium],
    /*
     * e.g. "HB 1001"
     */
    billId: [
        string
    ],
    billNumber: [
        string
    ],
    substituteVersion: [
        string
    ],
    engrossedVersion: [
        string
    ],
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
    originalAgency: [
        string
    ],
    active: [
        string
    ],
    displayNumber: [
        string
    ]
}

export interface LegislationPassedLegislature {
    arrayOfLegislationInfo: {
        $: {
            xmlns: string,
            "xmlns:xsd": string,
            "xmlns:xsi": string

        }
        legislationInfo: Array<LegislationInfo>
    }
}

