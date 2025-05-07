import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  selectedVaccine: string;
  setSelectedVaccine: (v: string) => void;
  selectedClass: string;
  setSelectedClass: (v: string) => void;
  startDate: string;
  setStartDate: (d: string) => void;
  endDate: string;
  setEndDate: (d: string) => void;
};

const ReportsFilter: React.FC<Props> = ({
  selectedVaccine,
  setSelectedVaccine,
  selectedClass,
  setSelectedClass,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex flex-col w-full md:w-1/5">
        <Label>Vaccine</Label>
        <select
          value={selectedVaccine}
          onChange={(e) => setSelectedVaccine(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All</option>
          <option value="HPV">HPV</option>
          <option value="Tetanus">Tetanus</option>
          <option value="MMR">MMR</option>
        </select>
      </div>

      <div className="flex flex-col w-full md:w-1/5">
        <Label>Class</Label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All</option>
          <option value="5A">5A</option>
          <option value="5B">5B</option>
          <option value="6A">6A</option>
          <option value="6B">6B</option>
        </select>
      </div>

      <div className="flex flex-col w-full md:w-1/5">
        <Label>Start Date</Label>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className="flex flex-col w-full md:w-1/5">
        <Label>End Date</Label>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ReportsFilter;
