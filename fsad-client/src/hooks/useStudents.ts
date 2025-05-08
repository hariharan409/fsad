import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";


export type Vaccination = {
  vaccine_name: string;
  drive_id: string;
  date: Date;
};

export type Student = {
  _id?: string;
  student_id: string;
  name: string;
  class: string;
  dob?: string;
  gender?: string;
  vaccinations: Vaccination[];
};

export const useStudents = () => {
    const { toast } = useToast();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/students`);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  const addOrUpdateStudent = async (student: Student) => {
    const method = student._id ? "PUT" : "POST";
    const url = student._id
      ? `${import.meta.env.VITE_API_URL}/api/students/${student._id}`
      : `${import.meta.env.VITE_API_URL}/api/students`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to save student");
      }

      toast({ title: "Student saved", description: student.name });
      await fetchStudents();
    } catch (err: any) {
      toast({ variant: "destructive", title: "Error", description: err.message });
      throw err;
    }
  };

  return {
    students,
    fetchStudents,
    addOrUpdateStudent,
    loading
  };
};
