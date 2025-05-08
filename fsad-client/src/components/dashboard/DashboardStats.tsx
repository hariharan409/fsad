import React from "react";
import { useDashboard } from "@/hooks/useDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardStats = () => {
  const { stats } = useDashboard();

  if (!stats) return null;

  const { totalStudents, vaccinatedStudents, vaccinatedPercentage } = stats;

  const statData = [
    { label: "Total Students", value: totalStudents },
    { label: "Vaccinated Students", value: vaccinatedStudents },
    { label: "Coverage %", value: `${vaccinatedPercentage}%` },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {statData.map((stat, index) => (
        <Card key={index} className="shadow-md">
          <CardHeader>
            <CardTitle className="text-sm">{stat.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
