import { useEffect, useState } from "react";

export type DashboardStats = {
  totalStudents: number;
  vaccinatedStudents: number;
  vaccinatedPercentage: string;
  upcomingDrives: {
    _id: string;
    vaccine_name: string;
    date: string;
    applicable_classes: string[];
  }[];
};

export type VaccineBreakdown = {
  vaccine_name: string;
  count: number;
};

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [breakdown, setBreakdown] = useState<VaccineBreakdown[]>([]);

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/stats`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
    }
  };

  const fetchBreakdown = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/students`);
      const students = await res.json();

      const vaccineMap: Record<string, number> = {};
      students.forEach((s: any) => {
        s.vaccinations.forEach((v: any) => {
          vaccineMap[v.vaccine_name] = (vaccineMap[v.vaccine_name] || 0) + 1;
        });
      });

      const breakdownData = Object.entries(vaccineMap).map(([vaccine_name, count]) => ({
        vaccine_name,
        count,
      }));

      setBreakdown(breakdownData);
    } catch (err) {
      console.error("Failed to fetch vaccine breakdown", err);
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchBreakdown();
  }, []);

  return { stats, breakdown };
};
