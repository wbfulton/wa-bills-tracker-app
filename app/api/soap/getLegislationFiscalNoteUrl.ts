import { BillNumber, Legislation } from "../types/legislationDetailed";


const SessionYearMap: { [key: string]: string } = {
    '2023-24': '68',
    '2021-22': '67',
    '2019-20': '66',
    '2017-18': '65',
    '2015-16': '64',
    '2013-14': '63',
}

export const getLegislationFiscalNoteUrl = async (legislation: Legislation): Promise<string> => {
    const res = await fetch(`http://localhost:8080/legislation/fiscal-notes`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sessionYear: SessionYearMap[legislation.biennium] ?? '68',
            billNumber: legislation.billNumber[0],
            billTitle: legislation.shortDescription[0],
            requestType: legislation.shortLegislationType[0].longLegislationType[0]
        })
    })

    const data = await res.json()


    return data?.data?.[0]?.packageId;
}

