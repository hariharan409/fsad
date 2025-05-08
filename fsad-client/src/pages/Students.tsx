import React, { useEffect, useState } from "react";
import StudentTable from "@/components/students/StudentTable";
import StudentForm from "@/components/students/StudentForm";
import FilterBar from "@/components/students/FilterBar";
import UploadCSV from "@/components/students/UploadCSV";
import AssignVaccinesModal from "@/components/students/AssignVaccinesModal";

import { useStudents } from "@/hooks/useStudents";
import { useDrives } from "@/hooks/useDrives";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

const Students = () => {
  const { students, fetchStudents, addOrUpdateStudent } = useStudents();
  const { drives, fetchDrives } = useDrives();

  const [selectedVaccines, setSelectedVaccines] = useState<string[]>([]);
  const [filterText, setFilterText] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [assigningStudent, setAssigningStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
    fetchDrives();
  }, []);

  const handleAddStudent = async (student) => {
    try {
      await addOrUpdateStudent(student);
      setShowForm(false);
      setEditingStudent(null);
    } catch (err) {
      console.error("Failed to add/update student:", err);
    }
  };

  const filteredStudents = students.filter((s) => {
    const matchesText =
      s.name.toLowerCase().includes(filterText.toLowerCase()) ||
      s.student_id.toLowerCase().includes(filterText.toLowerCase());

    const matchesClass = selectedClass ? s.class === selectedClass : true;

    const matchesVaccines =
      selectedVaccines.length === 0
        ? true
        : selectedVaccines.every((v) =>
            s.vaccinations?.some((vac) => vac.vaccine_name === v)
          );

    return matchesText && matchesClass && matchesVaccines;
  });

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Student Management</h1>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => {
              setEditingStudent(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Student
          </button>

          <Dialog>
            <DialogTrigger asChild>
              <button className="bg-gray-700 text-white px-4 py-2 rounded">
                Add Students From CSV
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Upload Students CSV</DialogTitle>
              </DialogHeader>
              <UploadCSV onUploadComplete={fetchStudents} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <FilterBar
        filterText={filterText}
        setFilterText={setFilterText}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        selectedVaccines={selectedVaccines}
        setSelectedVaccines={setSelectedVaccines}
      />

      <StudentTable
        students={filteredStudents}
        onEdit={(student) => {
          setEditingStudent(student);
          setShowForm(true);
        }}
        onAssign={(student) => setAssigningStudent(student)}
      />

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingStudent ? "Edit Student" : "Add Student"}</DialogTitle>
          </DialogHeader>
          <StudentForm
            initialData={editingStudent}
            onSubmit={handleAddStudent}
          />
        </DialogContent>
      </Dialog>

      {assigningStudent && (
        <AssignVaccinesModal
          student={assigningStudent}
          drives={drives}
          onClose={() => setAssigningStudent(null)}
          onComplete={() => {
            fetchStudents();
            fetchDrives();
          }}
        />
      )}
    </div>
  );
};

export default Students;
