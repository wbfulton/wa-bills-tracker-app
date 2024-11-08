export interface LegislationInfo {
    /* 
     * Format 2023-43
    */
    Biennium: [number],
    /*
     * e.g. "HB 1001"
     */
    BillId: [
        string
    ],
    BillNumber: [
        string
    ],
    SubstituteVersion: [
        string
    ],
    EngrossedVersion: [
        string
    ],
    ShortLegislationType: [
        {
            ShortLegislationType: [
                string
            ],
            LongLegislationType: [
                string
            ]
        }
    ],
    OriginalAgency: [
        string
    ],
    Active: [
        string
    ],
    DisplayNumber: [
        string
    ]
}

export interface LegislationPassedLegislature {
    ArrayOfLegislationInfo: {
        $: {
            xmlns: string,
            "xmlns:xsd": string,
            "xmlns:xsi": string

        }
        LegislationInfo: Array<LegislationInfo>
    }
}

