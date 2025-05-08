import React, { useState } from "react";
import ExportCSV from "@/components/reports/ExportCSV";
import ReportsTable from "@/components/reports/ReportsTable";
import { useReportData } from "@/hooks/useReportData";

const classOptions = ["5A", "5B", "6A", "6B"];

const Reports = () => {
  const { data } = useReportData();

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedVaccine, setSelectedVaccine] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredData = data.filter((student) => {
    const matchClass = selectedClass ? student.class === selectedClass : true;

    const filteredVaccinations = student.vaccinations.filter((v) => {
      const matchVaccine = selectedVaccine
        ? v.vaccine_name === selectedVaccine
        : true;

      const vDate = new Date(v.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const matchDate =
        (!start || vDate >= start) && (!end || vDate <= end);

      return matchVaccine && matchDate;
    });

    return matchClass && filteredVaccinations.length > 0;
  }).map((student) => ({
    ...student,
    vaccinations: student.vaccinations.filter((v) => {
      const matchVaccine = selectedVaccine
        ? v.vaccine_name === selectedVaccine
        : true;

      const vDate = new Date(v.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const matchDate =
        (!start || vDate >= start) && (!end || vDate <= end);

      return matchVaccine && matchDate;
    }),
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
          {Array.from(
            new Set(
              data.flatMap((s) => s.vaccinations.map((v) => v.vaccine_name))
            )
          ).map((v) => (
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
