"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const muscles = [
  {
    value: "back",
    label: "Back",
  },
  {
    value: "chest",
    label: "Chest",
  },
  {
    value: "quadriceps",
    label: "Quadriceps",
  },
  {
    value: "hamstring",
    label: "Hamstring",
  },
  {
    value: "shoulders",
    label: "Shoulders",
  },
  {
    value: "arms",
    label: "Arms",
  },
  {
    value: "core",
    label: "CORE",
  },
  {
    value: "cardio",
    label: "Cardio",
  },
];

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? muscles.find((muscle) => muscle.value === value)?.label
            : "Select Muscle..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {muscles.map((muscle) => (
                <CommandItem
                  key={muscle.value}
                  value={muscle.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === muscle.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {muscle.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
