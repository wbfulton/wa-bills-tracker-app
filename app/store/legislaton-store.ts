import { getLegislationPassedLegislature } from "app/api/soap/getLegislationPassedLegislature";
import { LegislationInfo } from "app/api/types/legislationPassedLegislature";
import { BehaviorSubject } from "rxjs";
import { LegislationFilters } from "./filters-store";

export const legislationPassedLegislature$ = new BehaviorSubject<Array<LegislationInfo>>([])

export const updateLegislationPassedLegislature = async (filters: LegislationFilters) => {
    try {
        const data = await getLegislationPassedLegislature(filters.biennum)
        const legis = data.ArrayOfLegislationInfo.LegislationInfo

        legislationPassedLegislature$.next(legis)
    } catch (error) {
        console.log(error)
    }
}
