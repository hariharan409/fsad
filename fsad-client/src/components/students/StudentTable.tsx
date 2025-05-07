import React from "react";
import { Button } from "@/components/ui/button";

type VaccinationRecord = {
  vaccine_name: string;
  drive_id: string;
  date: Date;
};

type Student = {
  id: string;
  name: string;
  class: string;
  vaccinations: VaccinationRecord[];
};

type Props = {
  students: Student[];
  onEdit?: (student: Student) => void;
};

const StudentTable: React.FC<Props> = ({ students, onEdit }) => {
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
          {students.map((student) => (
            <tr key={student.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{student.id}</td>
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

              <td className="px-4 py-2">
                {onEdit && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(student)}
                  >
                    Edit
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
