import React, { useState } from "react";
import { mockReports, VaccinatedStudent } from "@/components/reports/mockReports";
import ExportCSV from "@/components/reports/ExportCSV";
import ReportsTable from "@/components/reports/ReportsTable";

const classOptions = ["5A", "5B", "6A", "6B"];
const vaccineOptions = ["HPV", "Tetanus", "MMR"];

const Reports = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedVaccine, setSelectedVaccine] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredData: VaccinatedStudent[] = mockReports.filter((student) => {
    const matchesClass = selectedClass ? student.class === selectedClass : true;

    const vaccinations = student.vaccinations.filter((record) => {
      const vaccineMatch = selectedVaccine ? record.vaccine === selectedVaccine : true;

      const recordDate = new Date(record.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      const dateMatch =
        (!start || recordDate >= start) && (!end || recordDate <= end);

      return vaccineMatch && dateMatch;
    });

    return matchesClass && vaccinations.length > 0;
  }).map((student) => ({
    ...student,
    vaccinations: student.vaccinations.filter((record) => {
      const vaccineMatch = selectedVaccine ? record.vaccine === selectedVaccine : true;

      const recordDate = new Date(record.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      const dateMatch =
        (!start || recordDate >= start) && (!end || recordDate <= end);

      return vaccineMatch && dateMatch;
    })
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Vaccination Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <select
          className="border px-3 py-2 rounded"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">All Classes</option>
          {classOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className="border px-3 py-2 rounded"
          value={selectedVaccine}
          onChange={(e) => setSelectedVaccine(e.target.value)}
        >
          <option value="">All Vaccines</option>
          {vaccineOptions.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border px-3 py-2 rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          className="border px-3 py-2 rounded"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <ExportCSV data={filteredData} />
      <ReportsTable data={filteredData} />
    </div>
  );
};

export default Reports;
