import { LegislationPassedLegislature } from "../types/legislationPassedLegislature"

export const getLegislationPassedLegislature = async (biennium: string): Promise<LegislationPassedLegislature> => {
    const data = await fetch(`http://localhost:8080/passed-legislature/${biennium}`)

    return data.json();


}

