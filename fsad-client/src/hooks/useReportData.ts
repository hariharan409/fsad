import { useEffect, useState } from "react";

export type VaccinationRecord = {
  vaccine_name: string;
  date: string;
};

export type VaccinatedStudent = {
  student_id: string;
  name: string;
  class: string;
  vaccinations: VaccinationRecord[];
};

export const useReportData = () => {
  const [data, setData] = useState<VaccinatedStudent[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/students`);
      const students = await res.json();

      const reportData: VaccinatedStudent[] = students.map((s: any) => ({
        student_id: s.student_id,
        name: s.name,
        class: s.class,
        vaccinations: s.vaccinations.map((v: any) => ({
          vaccine_name: v.vaccine_name,
          date: v.date,
        })),
      }));

      setData(reportData);
    } catch (err) {
      console.error("Error fetching report data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  return { data, loading };
};
