import { LegislationPassedLegislature } from "../types/legislationPassedLegislature"

export const getLegislationPassedLegislature = async (biennum: string): Promise<LegislationPassedLegislature> => {
    const data = await fetch(`http://localhost:8080/passed-legislature/${biennum}`)

    return data.json();


}

