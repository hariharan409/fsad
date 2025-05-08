import React from "react";
import { useDashboard } from "@/hooks/useDashboard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const UpcomingDrives = () => {
  const { stats } = useDashboard();
  const drives = stats?.upcomingDrives || [];

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
            {drives.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No upcoming drives
                </td>
              </tr>
            ) : (
              drives.map((drive) => (
                <tr key={drive._id} className="border-b hover:bg-gray-50">
                  <td className="px-2 py-2 font-medium">{drive.vaccine_name}</td>
                  <td className="px-2 py-2">{new Date(drive.date).toLocaleDateString()}</td>
                  <td className="px-2 py-2">{drive.applicable_classes.join(", ")}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default UpcomingDrives;
