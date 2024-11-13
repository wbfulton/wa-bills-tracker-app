import { getLegislationPassedLegislature } from "app/api/soap/getLegislationPassedLegislature";
import { LegislationInfo } from "app/api/types/legislationPassedLegislature";
import { BehaviorSubject } from "rxjs";
import { LegislationFilters } from "./filters-store";
import { BillNumber, Legislation } from "app/api/types/legislation";
import { getLegislationDetails } from "app/api/soap/getLegislationDetails";

export const legislationPassedLegislature$ = new BehaviorSubject<Array<LegislationInfo>>([])

export const legislationDetails$ = new BehaviorSubject<Map<BillNumber, Legislation>>(new Map())


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

        await Promise.all(billNumbers.map(async (num) => {
            const details = await getLegislationDetails(filters.biennum, num)
            newDetails.set(num, details.arrayOfLegislation.legislation[0])
        }))


        legislationDetails$.next(newDetails)
    } catch (error) {
        console.log(error)
    }
}
