import React, { useState } from "react";
import { VaccinatedStudent } from "@/hooks/useReportData";

type Props = {
  data: VaccinatedStudent[];
};

const ITEMS_PER_PAGE = 10;

const ReportsTable: React.FC<Props> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const flattened = data.flatMap((student) =>
    student.vaccinations.map((record, i) => ({
      key: `${student.student_id}-${i}`,
      student_id: student.student_id,
      name: student.name,
      class: student.class,
      vaccine: record.vaccine_name,
      date: new Date(record.date).toLocaleDateString(),
    }))
  );

  const totalPages = Math.ceil(flattened.length / ITEMS_PER_PAGE);
  const paginated = flattened.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="overflow-x-auto border rounded-md">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 font-medium">ID</th>
            <th className="px-4 py-2 font-medium">Name</th>
            <th className="px-4 py-2 font-medium">Class</th>
            <th className="px-4 py-2 font-medium">Vaccine</th>
            <th className="px-4 py-2 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {paginated.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No records found
              </td>
            </tr>
          ) : (
            paginated.map((row) => (
              <tr key={row.key} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{row.student_id}</td>
                <td className="px-4 py-2 font-medium">{row.name}</td>
                <td className="px-4 py-2">{row.class}</td>
                <td className="px-4 py-2">{row.vaccine}</td>
                <td className="px-4 py-2">{row.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-between items-center p-4">
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsTable;
