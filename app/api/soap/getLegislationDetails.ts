import { Biennium, LegislationDetail } from "@/lib/types";

export const getLegislationDetails = async (
  biennium: Biennium,
  billNumber: number
): Promise<LegislationDetail> => {
  try {
    const res = await fetch(
      `http://localhost:8080/legislation-details/${biennium}/${billNumber}`
    );

    return res.json();
  } catch (error) {
    console.log(error);

    return new Promise(() => []);
  }
};
