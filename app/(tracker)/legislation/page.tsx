"use client";

import { getLegislationDetails } from "app/api/soap/getLegislationDetails";
import { getLegislationDocuments } from "app/api/soap/getLegislationDocuments";
import { getLegislationFiscalNotes } from "app/api/soap/getLegislationFiscalNotes";
import { getLegislationPassedLegislature } from "app/api/soap/getLegislationPassedLegislature";
import { useLegislationFilters } from "app/hooks/useFilters";
import {
  Agency,
  Biennium,
  CompanionLegislation,
  Legislation,
  LegislationCurrentStatus,
  LongLegislationType,
  ShortLegislationType,
} from "app/types/legislation";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

// call apis in this, or other pages
async function getData(biennium: Biennium): Promise<Legislation[]> {
  try {
    // Fetch data from your API here.
    const legInfo = await getLegislationPassedLegislature(biennium);

    const arr = await Promise.all(
      legInfo.map(async (info) => {
        const detail = await getLegislationDetails(biennium, info.billNumber);
        const documents = await getLegislationDocuments({
          biennium,
          text: String(info.billNumber),
        });
        const fiscalNotes = await getLegislationFiscalNotes({
          biennium,
          billNumber: info.billNumber,
          billTitle: detail.shortDescription,
        });

        if (!detail) throw new Error();

        const companion: CompanionLegislation | undefined =
          detail.companionLeglislation
            ? {
                biennium: detail.companionLeglislation.biennium as Biennium,
                billId: detail.companionLeglislation.billId,
                status: detail.companionLeglislation.status,
              }
            : undefined;

        const leg: Legislation = {
          ...info,
          ...detail,
          biennium: info.biennium as Biennium,
          shortLegislationType:
            info.shortLegislationType as ShortLegislationType,
          longLegislationType: info.shortLegislationType as LongLegislationType,
          originalAgency: info.originalAgency as Agency,
          introducedDate: new Date(detail.introducedDate),
          currentStatus: detail.currentStatus as
            | LegislationCurrentStatus
            | undefined,
          companion,
          documents,
          fiscalNotes,
        };

        return leg;
      })
    );

    return arr;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default function LegislationTrackerPage() {
  const [data, setData] = useState<Array<Legislation>>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const filters = useLegislationFilters();

  useEffect(() => {
    if (!filters.biennium) return;

    setLoading(true);

    getData(filters.biennium)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [filters]);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} isLoading={isLoading} />
    </div>
  );
}
