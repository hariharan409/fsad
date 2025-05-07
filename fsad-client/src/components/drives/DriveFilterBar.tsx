import React from "react";
import { Input } from "@/components/ui/input";

type Props = {
  filterVaccine: string;
  setFilterVaccine: (val: string) => void;
  filterClass: string;
  setFilterClass: (val: string) => void;
};

const classOptions = ["", "5A", "5B", "6A", "6B"];

const DriveFilterBar: React.FC<Props> = ({
  filterVaccine,
  setFilterVaccine,
  filterClass,
  setFilterClass
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <Input
        placeholder="Search by vaccine..."
        value={filterVaccine}
        onChange={(e) => setFilterVaccine(e.target.value)}
        className="w-full md:w-1/3"
      />

      <select
        value={filterClass}
        onChange={(e) => setFilterClass(e.target.value)}
        className="w-full md:w-1/4 border px-3 py-2 rounded"
      >
        <option value="">All Classes</option>
        {classOptions.slice(1).map((cls) => (
          <option key={cls} value={cls}>
            {cls}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DriveFilterBar;
