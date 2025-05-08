import React, { useState } from "react";
import { Button } from "@/components/ui/button";

type VaccinationRecord = {
  vaccine_name: string;
  drive_id: string;
  date: Date;
};

type Student = {
  _id?: string;
  student_id: string;
  name: string;
  class: string;
  vaccinations: VaccinationRecord[];
};

type Props = {
  students: Student[];
  onEdit?: (student: Student) => void;
  onAssign?: (student: Student) => void;
};

const ITEMS_PER_PAGE = 10;

const StudentTable: React.FC<Props> = ({ students, onEdit, onAssign }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(students.length / ITEMS_PER_PAGE);
  const paginatedStudents = students.slice(
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
            <th className="px-4 py-2 font-medium">Vaccinated For</th>
            <th className="px-4 py-2 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedStudents.map((student) => (
            <tr key={student._id || student.student_id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{student.student_id}</td>
              <td className="px-4 py-2 font-medium">{student.name}</td>
              <td className="px-4 py-2">{student.class}</td>
              <td className="px-4 py-2">
                {student.vaccinations?.length > 0 ? (
                  student.vaccinations
                    .map((v) => `${v.vaccine_name} (${new Date(v.date).toLocaleDateString()})`)
                    .join(", ")
                ) : (
                  "—"
                )}
              </td>
              <td className="px-4 py-2 flex gap-2">
                {onEdit && (
                  <Button size="sm" variant="outline" onClick={() => onEdit(student)}>
                    Edit
                  </Button>
                )}
                {onAssign && (
                  <Button size="sm" variant="default" onClick={() => onAssign(student)}>
                    Assign Vaccine
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center p-4">
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
