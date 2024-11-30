import { Biennium, LegislationInfo } from "@/lib/types";

export const getLegislationPassedLegislature = async (
  biennium: Biennium
): Promise<Array<LegislationInfo>> => {
  try {
    const data = await fetch(
      `http://localhost:8080/legislation/${biennium}/passed-legislature`
    );

    return data.json();
  } catch (error) {
    console.log(error);

    return new Promise(() => []);
  }
};
