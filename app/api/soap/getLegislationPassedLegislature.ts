import { LegislationPassedLegislature } from "../types/legislationPassedLegislature"

export const getLegislationPassedLegislature = async (): Promise<LegislationPassedLegislature> => {
    const data = await fetch('http://localhost:8080/passed-legislature')

    return data.json();
}

