import { Biennium } from "app/types/legislation";
import { LegislationInfo } from "express/src/types";

export const getLegislationPassedLegislature = async (
  biennium: Biennium
): Promise<Array<LegislationInfo>> => {
  try {
    const data = await fetch(
      `http://localhost:8080/passed-legislature/${biennium}`
    );

    return data.json();
  } catch (error) {
    console.log(error);

    return new Promise(() => []);
  }
};
