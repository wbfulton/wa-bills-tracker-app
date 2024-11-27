import {
  Biennium,
  BienniumToLegislativeYear,
  LegislativeFiscalDocument,
} from "@/lib/types";

export const getLegislationFiscalNotes = async ({
  biennium,
  billNumber,
  billTitle,
}: {
  biennium: Biennium;
  billNumber: number;
  billTitle: string;
}): Promise<Array<LegislativeFiscalDocument>> => {
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

  const data: Array<LegislativeFiscalDocument> = await res.json();

  return data;
};
