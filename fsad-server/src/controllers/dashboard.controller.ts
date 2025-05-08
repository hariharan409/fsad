import { Request, Response } from "express";
import Student from "../models/student.model";
import Drive from "../models/drive.model";

export const getDashboardStats = async (_req: Request, res: Response) => {
  try {
    const totalStudents = await Student.countDocuments();
    const vaccinatedStudents = await Student.countDocuments({ "vaccinations.0": { $exists: true } });
    const vaccinatedPercentage = totalStudents > 0 ? ((vaccinatedStudents / totalStudents) * 100).toFixed(2) : "0.00";

    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    const upcomingDrives = await Drive.find({ date: { $gte: today, $lte: thirtyDaysFromNow } }).sort({ date: 1 });

    res.json({
      totalStudents,
      vaccinatedStudents,
      vaccinatedPercentage,
      upcomingDrives
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch dashboard stats", error: err });
  }
};
