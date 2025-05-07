import React from "react";
import DashboardStats from "@/components/dashboard/DashboardStats";
import VaccinationChart from "@/components/dashboard/VaccinationChart";
import UpcomingDrives from "@/components/dashboard/UpcomingDrives";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <DashboardStats />
      <VaccinationChart />
      <UpcomingDrives />
    </div>
  );
};

export default Dashboard;
