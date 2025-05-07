import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardStats } from "./mockDashboardData";

const DashboardStats = () => {
  const { totalStudents, vaccinatedStudents } = dashboardStats;
  const coverage = ((vaccinatedStudents / totalStudents) * 100).toFixed(1);

  const stats = [
    { label: "Total Students", value: totalStudents },
    { label: "Vaccinated Students", value: vaccinatedStudents },
    { label: "Coverage %", value: `${coverage}%` },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
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
