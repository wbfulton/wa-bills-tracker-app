import { getLegislationPassedLegislature } from "app/api/soap/getLegislationPassedLegislature";
import { LegislationInfo } from "app/api/types/legislationPassedLegislature";
import { BehaviorSubject } from "rxjs";
import { LegislationFilters } from "./filters-store";
import { BillNumber, Legislation } from "app/api/types/legislation";
import { getLegislationDetails } from "app/api/soap/getLegislationDetails";
import { getLegislationFiscalNoteUrl } from "app/api/soap/getLegislationFiscalNoteUrl";

export const legislationPassedLegislature$ = new BehaviorSubject<Array<LegislationInfo>>([])

export const legislationDetails$ = new BehaviorSubject<Map<BillNumber, Legislation>>(new Map())

export interface BillDocuments {
    fullTextUrl?: string;
    fiscalNoteUrl?: string;
}

// WILL HAVE CONFLICT WITH JUST BILL NUMBER
export const legislationDocuments$ = new BehaviorSubject<Map<BillNumber, BillDocuments>>(new Map())



export const updateLegislationPassedLegislature = async (filters: LegislationFilters) => {
    try {
        const data = await getLegislationPassedLegislature(filters.biennum)
        const legis = data.arrayOfLegislationInfo.legislationInfo

        legislationPassedLegislature$.next(legis)
    } catch (error) {
        console.log(error)
    }
}

export const updateLegislationDetails = async (filters: LegislationFilters, billNumbers: Array<BillNumber>) => {
    try {
        const newDetails = legislationDetails$.getValue();
        const newDocumentUrls = legislationDocuments$.getValue();


        await Promise.all(billNumbers.map(async (num) => {
            const details = await getLegislationDetails(filters.biennum, num)
            const detailedBill = details?.arrayOfLegislation?.legislation[0]
            newDetails.set(num, detailedBill)

            const fiscalNoteUrl = await getLegislationFiscalNoteUrl(detailedBill);
            newDocumentUrls.set(Number(detailedBill.billNumber[0]), { fiscalNoteUrl })

        }))


        legislationDetails$.next(newDetails)
        legislationDocuments$.next(newDocumentUrls)

    } catch (error) {
        console.log(error)
    }
}


