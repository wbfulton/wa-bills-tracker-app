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
import { useLegislationFilters } from "app/hooks/useFilters";
import { updateLegislationFilters } from "app/store/filters-store";
import { Biennium } from "app/types/legislation";
import { memo } from "react";

export const BienniumSelector = memo(
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
