import React from "react";
import { upcomingDrives } from "./mockDashboardData";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const UpcomingDrives = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Vaccination Drives</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="border-b">
              <th className="px-2 py-2">Vaccine</th>
              <th className="px-2 py-2">Date</th>
              <th className="px-2 py-2">Applicable Classes</th>
            </tr>
          </thead>
          <tbody>
            {upcomingDrives.map((drive) => (
              <tr key={drive.id} className="border-b hover:bg-gray-50">
                <td className="px-2 py-2 font-medium">{drive.vaccine}</td>
                <td className="px-2 py-2">{drive.date}</td>
                <td className="px-2 py-2">{drive.classes.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default UpcomingDrives;
