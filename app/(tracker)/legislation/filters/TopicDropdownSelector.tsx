"use client";

import { Button } from "@/components/ui/button";
import { memo, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import { InfoPopoverButton } from "@/components/ui/InfoPopoverButton";
import { Label } from "@/components/ui/Label";
import { Popover, PopoverContent } from "@/components/ui/Popover";
import { cn } from "@/lib/utils";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { LegTopic, topics } from "../utils";

export const TopicDropdownSelector = memo(
  ({
    value,
    onValueChange,
  }: {
    value: LegTopic["value"];
    onValueChange: (val: string) => void;
  }) => {
    const [open, setOpen] = useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <div className="flex flex-col">
          <Label
            htmlFor="topicSelect"
            className="cursor-pointer flex items-center pl-1 mb-1 text-muted-foreground"
          >
            Topic
            <InfoPopoverButton
              title={"Topic"}
              description={
                "Filter legislation by topics. These topic are manually created by Washington State"
              }
              align="center"
              side="top"
            />
          </Label>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="mr-2 min-w-max justify-between"
            >
              {value
                ? topics.find((topic) => topic.value === value)?.label
                : "Select a topic..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
        </div>
        <PopoverContent className="w-[200px] p-0">
          <Command
            filter={(value: LegTopic["value"], search) => {
              const label = topics.find(
                (topic) => topic.value === value
              )?.label;

              if (label && label.toLowerCase().includes(search.toLowerCase()))
                return 1;
              return 0;
            }}
          >
            <CommandInput
              // id="topicSelect"
              placeholder="Select Topic"
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {topics.map((topic) => (
                  <CommandItem
                    key={topic.value}
                    value={topic.value}
                    onSelect={(currentValue) => {
                      onValueChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {topic.label}
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === topic.label ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
