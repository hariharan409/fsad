import React, { useState } from "react";
import StudentTable from "@/components/students/StudentTable";
import StudentForm from "@/components/students/StudentForm";
import FilterBar from "@/components/students/FilterBar";
import UploadCSV from "@/components/students/UploadCSV";
import { students as initialStudents } from "@/components/students/mockStudentData";
import { mockDrives } from "@/components/drives/mockDrives";


import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle
  } from "@/components/ui/dialog";

const Students = () => {
    const [selectedVaccines, setSelectedVaccines] = useState<string[]>([]);

  const [students, setStudents] = useState(initialStudents);
  const [filterText, setFilterText] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const handleAddStudent = (newStudent) => {
    setStudents((prev) => {
      const exists = prev.some((s) => s.id === newStudent.id);
      if (exists) {
        return prev.map((s) => (s.id === newStudent.id ? newStudent : s));
      }
      return [...prev, newStudent];
    });
    setShowForm(false);
    setEditingStudent(null);
  };
  

  const filteredStudents = students.filter((s) => {
    const matchesText =
      s.name.toLowerCase().includes(filterText.toLowerCase()) ||
      s.id.toLowerCase().includes(filterText.toLowerCase());
  
    const matchesClass = selectedClass ? s.class === selectedClass : true;
  
    const matchesVaccines = selectedVaccines.length === 0
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
        <UploadCSV />
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
    />


      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-lg">
            <DialogHeader>
            <DialogTitle>{editingStudent ? "Edit Student" : "Add Student"}</DialogTitle>
            </DialogHeader>
            <StudentForm
                initialData={editingStudent}
                onSubmit={handleAddStudent}
                availableDrives={mockDrives}
                />

        </DialogContent>
        </Dialog>


    </div>
  );
};

export default Students;
