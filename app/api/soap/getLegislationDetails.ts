import { Biennium } from "app/types/legislation";
import { LegislationDetail } from "express/src/types";

export const getLegislationDetails = async (
  biennium: Biennium,
  billNumber: number
): Promise<LegislationDetail> => {
  try {
    const data = await fetch(
      `http://localhost:8080/legislation-details/${biennium}/${billNumber}`
    );

    return data.json();
  } catch (error) {
    console.log(error);

    return new Promise(() => []);
  }
};
