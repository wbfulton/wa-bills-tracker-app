import { getLegislationPassedLegislature } from "app/api/soap/getLegislationPassedLegislature";
import { LegislationInfo } from "app/api/types/legislationPassedLegislature";
import { BehaviorSubject } from "rxjs";

export const legislationPassedLegislature$ = new BehaviorSubject<Array<LegislationInfo>>([])

export const updateLegislationPassedLegislature = async () => {
    const data = await getLegislationPassedLegislature()

    legislationPassedLegislature$.next(data.ArrayOfLegislationInfo.LegislationInfo)
}
