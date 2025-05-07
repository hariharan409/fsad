import React from "react";
import { VaccinatedStudent } from "@/components/reports/mockReports";

type Props = {
  data: VaccinatedStudent[];
};

const ExportCSV: React.FC<Props> = ({ data }) => {
  const handleExport = () => {
    const headers = ["ID", "Name", "Class", "Vaccine", "Date"];
    const rows = data.flatMap((student) =>
      student.vaccinations.map((record) => [
        student.id,
        student.name,
        student.class,
        record.vaccine,
        new Date(record.date).toLocaleDateString(),
      ])
    );

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((r) => r.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "vaccination_report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleExport}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mb-4"
    >
      Export to CSV
    </button>
  );
};

export default ExportCSV;
