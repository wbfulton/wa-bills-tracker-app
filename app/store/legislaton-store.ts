import { LegislationDetailed } from "app/api/types/legislationDetailed";
import { Legislation } from "app/types/legislation";
import { BehaviorSubject } from "rxjs";

export const legislationPassedLegislature$ = new BehaviorSubject<
  Array<Legislation>
>([]);

export const legislationDetails$ = new BehaviorSubject<
  Map<number, LegislationDetailed>
>(new Map());

export interface BillDocuments {
  fullTextUrl?: string;
  fiscalNoteUrl?: string;
}

// WILL HAVE CONFLICT WITH JUST BILL NUMBER
export const legislationDocuments$ = new BehaviorSubject<
  Map<number, BillDocuments>
>(new Map());

// export const updateLegislationPassedLegislature = async (filters: LegislationFilters) => {
//     try {
//         const data = await getLegislationPassedLegislature(filters.biennium)
//         const legis = data.arrayOfLegislationInfo.legislationInfo

//         legislationPassedLegislature$.next(legis)
//     } catch (error) {
//         console.log(error)
//     }
// }

// export const updateLegislationDetails = async (filters: LegislationFilters, billNumbers: Array<BillNumber>) => {
//     try {
//         const newDetails = legislationDetails$.getValue();
//         const newDocumentUrls = legislationDocuments$.getValue();

//         await Promise.all(billNumbers.map(async (num) => {
//             const details = await getLegislationDetails(filters.biennium, num)
//             const detailedBill = details?.arrayOfLegislation?.legislation[0]
//             newDetails.set(num, detailedBill)

//             const fiscalNoteUrl = await getLegislationFiscalNoteUrl(detailedBill);
//             newDocumentUrls.set(Number(detailedBill.billNumber[0]), { fiscalNoteUrl })

//         }))

//         legislationDetails$.next(newDetails)
//         legislationDocuments$.next(newDocumentUrls)

//     } catch (error) {
//         console.log(error)
//     }
// }
