"use client";

import { InfoPopoverButton } from "@/components/ui/InfoPopoverButton";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Selector";
import { getLegislationDetails } from "app/api/soap/getLegislationDetails";
import { getLegislationPassedLegislature } from "app/api/soap/getLegislationPassedLegislature";
import { useLegislationFilters } from "app/hooks/useFilters";
import { updateLegislationFilters } from "app/store/filters-store";
import {
  Agency,
  Biennium,
  CompanionLegislation,
  Legislation,
  LegislationCurrentStatus,
  LongLegislationType,
  ShortLegislationType,
} from "app/types/legislation";
import { memo, useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const BienniumSelector = memo(
  ({
    disabled,
    onChange,
  }: {
    disabled?: boolean;
    onChange?: (biennium: Biennium) => void;
  }) => {
    const filters = useLegislationFilters();

    return (
      <Select
        disabled={disabled}
        value={filters.biennium}
        onValueChange={(biennium: Biennium) => {
          updateLegislationFilters({ biennium }).catch((err) =>
            console.log(err)
          );
          onChange?.(biennium);
        }}
      >
        <div className="mr-2">
          <Label
            htmlFor="bienniumSelect"
            className="cursor-pointer flex items-center pl-1 mb-1 text-muted-foreground"
          >
            Biennium
            <InfoPopoverButton
              title={"Biennium"}
              description={
                "Two year time period beginning on odd years. Legislation introduced during this time period can be considered in any sessions scheduled within the time period. Information is only available from 1991-current. e.g. '2023-24'"
              }
              align="center"
              side="top"
            />
          </Label>
          <SelectTrigger className="max-w-52" id="bienniumSelect">
            <SelectValue placeholder="Select Biennium" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Biennium</SelectLabel>
              {Object.keys(Biennium).map((val) => (
                <SelectItem key={val} value={val}>
                  {val}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </div>
      </Select>
    );
  }
);

// call apis in this, or other pages
async function getData(biennium: Biennium): Promise<Legislation[]> {
  try {
    // Fetch data from your API here.
    const legInfo = await getLegislationPassedLegislature(biennium);

    const arr = await Promise.all(
      legInfo.map(async (info) => {
        const detail = await getLegislationDetails(biennium, info.billNumber);
        // const documents = await getLegislationDocuments({
        //   biennium,
        //   text: String(info.billNumber),
        // });
        // const fiscalNotes = await getLegislationFiscalNotes({
        //   biennium,
        //   billNumber: info.billNumber,
        //   billTitle: detail.shortDescription,
        // });

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
          // documents,
          // fiscalNotes,
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
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            All Passed Legislation
          </h2>
          <p className="text-muted-foreground">test</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        filters={[<BienniumSelector disabled={isLoading} />]}
      />
    </div>
  );
}
