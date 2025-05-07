import React from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"; // Optional: for class merging

type Props = {
  filterText: string;
  setFilterText: (text: string) => void;
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  selectedVaccines: string[];
  setSelectedVaccines: (value: string[]) => void;
};

const vaccineOptions = ["HPV", "Tetanus", "MMR"];

const FilterBar: React.FC<Props> = ({
  filterText,
  setFilterText,
  selectedClass,
  setSelectedClass,
  selectedVaccines,
  setSelectedVaccines
}) => {
  const toggleVaccine = (vaccine: string) => {
    if (selectedVaccines.includes(vaccine)) {
      setSelectedVaccines(selectedVaccines.filter((v) => v !== vaccine));
    } else {
      setSelectedVaccines([...selectedVaccines, vaccine]);
    }
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-4">
      <Input
        placeholder="Search by name or ID..."
        className="w-full md:w-1/3"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <select
        className="border px-3 py-2 rounded w-full md:w-1/4"
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
      >
        <option value="">All Classes</option>
        <option value="5A">5A</option>
        <option value="5B">5B</option>
        <option value="6A">6A</option>
        <option value="6B">6B</option>
      </select>

      {/* Multiselect dropdown using Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-full md:w-1/4 justify-start", selectedVaccines.length === 0 && "text-muted-foreground")}
          >
            {selectedVaccines.length > 0
              ? selectedVaccines.join(", ")
              : "Filter by Vaccine"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56">
          <div className="grid gap-2">
            {vaccineOptions.map((vaccine) => (
              <Label
                key={vaccine}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <Checkbox
                  checked={selectedVaccines.includes(vaccine)}
                  onCheckedChange={() => toggleVaccine(vaccine)}
                />
                <span>{vaccine}</span>
              </Label>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterBar;
