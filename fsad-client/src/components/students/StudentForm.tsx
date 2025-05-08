import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Student } from "@/hooks/useStudents";

type Props = {
  onSubmit: (student: Student) => void;
  initialData?: Student;
};

const classOptions = ["5A", "5B", "6A", "6B"];
const genderOptions = ["Male", "Female", "Other"];

const StudentForm: React.FC<Props> = ({ onSubmit, initialData }) => {
  const { toast } = useToast();

  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("5A");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Male");

  useEffect(() => {
    if (initialData) {
      setStudentId(initialData.student_id);
      setName(initialData.name);
      setStudentClass(initialData.class);
      setDob(initialData.dob?.slice(0, 10) || "");
      setGender(initialData.gender || "Male");
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentId || !name || !dob || !gender) {
      toast({ title: "Missing Fields", variant: "destructive", description: "All fields are required." });
      return;
    }

    const student: Student = {
      ...(initialData?._id ? { _id: initialData._id } : {}),
      student_id: studentId,
      name,
      class: studentClass,
      dob,
      gender,
      vaccinations: initialData?.vaccinations || [],
    };

    onSubmit(student);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Student ID</Label>
        <Input value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
      </div>
      <div>
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label>Date of Birth</Label>
        <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
      </div>
      <div>
        <Label>Gender</Label>
        <select
          className="w-full border rounded px-3 py-2"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          {genderOptions.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label>Class</Label>
        <select
          className="w-full border rounded px-3 py-2"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
        >
          {classOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end pt-2">
        <Button type="submit">{initialData ? "Update" : "Add"}</Button>
      </div>
    </form>
  );
};

export default StudentForm;
