import { LegislativeFiscalData } from "express/src/types";
import { Biennium, BienniumToLegislativeYear } from "app/types/legislation";

export const getLegislationFiscalNotes = async ({
  biennium,
  billNumber,
  billTitle,
}: {
  biennium: Biennium;
  billNumber: number;
  billTitle: string;
}): Promise<Array<LegislativeFiscalData>> => {
  const res = await fetch(`http://localhost:8080/legislation/fiscal-notes`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionYear: BienniumToLegislativeYear[biennium] ?? "68",
      billNumber,
      billTitle,
    }),
  });

  const data: Array<LegislativeFiscalData> = await res.json();

  return data;
};
