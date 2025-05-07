import React from "react";
import { VaccinatedStudent } from "@/components/reports/mockReports";

type Props = {
  data: VaccinatedStudent[];
};

const ReportsTable: React.FC<Props> = ({ data }) => {
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
          {data.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No records found
              </td>
            </tr>
          ) : (
            data.flatMap((student) =>
              student.vaccinations.map((record, i) => (
                <tr key={`${student.id}-${i}`} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{student.id}</td>
                  <td className="px-4 py-2 font-medium">{student.name}</td>
                  <td className="px-4 py-2">{student.class}</td>
                  <td className="px-4 py-2">{record.vaccine}</td>
                  <td className="px-4 py-2">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable;
