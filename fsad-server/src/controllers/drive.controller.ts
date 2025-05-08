import { Request, Response } from "express";
import Drive from "../models/drive.model";
import Student from "../models/student.model";
import { Parser } from "json2csv";


export const createDrive = async (req: Request, res: Response) => {
  try {
    const { vaccine_name, date, number_of_doses, applicable_classes } = req.body;

    const scheduledDate = new Date(date);
    const nowPlus15 = new Date();
    nowPlus15.setDate(nowPlus15.getDate() + 15);

    if (scheduledDate < nowPlus15) {
      return res.status(400).json({ message: "Drive must be scheduled at least 15 days in advance" });
    }

    const newDrive = await Drive.create({
      vaccine_name,
      date: scheduledDate,
      number_of_doses,
      applicable_classes
    });

    res.status(201).json(newDrive);
  } catch (err) {
    res.status(400).json({ message: "Error creating drive", error: err });
  }
};

export const getAllDrives = async (_req: Request, res: Response) => {
  try {
    const drives = await Drive.find().sort({ date: 1 });
    res.json(drives);
  } catch (err) {
    res.status(500).json({ message: "Error fetching drives", error: err });
  }
};

export const getUpcomingDrives = async (_req: Request, res: Response) => {
  try {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 30);

    const upcoming = await Drive.find({ date: { $gte: today, $lte: futureDate } }).sort({ date: 1 });
    res.json(upcoming);
  } catch (err) {
    res.status(500).json({ message: "Error fetching upcoming drives", error: err });
  }
};

export const updateDrive = async (req: Request, res: Response) => {
  try {
    const drive = await Drive.findById(req.params.id);
    if (!drive) return res.status(404).json({ message: "Drive not found" });

    if (new Date(drive.date) < new Date()) {
      return res.status(400).json({ message: "Cannot edit past drives" });
    }

    const updated = await Drive.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Error updating drive", error: err });
  }
};

export const getDriveById = async (req: Request, res: Response) => {
  try {
    const drive = await Drive.findById(req.params.id);
    if (!drive) return res.status(404).json({ message: "Drive not found" });
    res.json(drive);
  } catch (err) {
    res.status(500).json({ message: "Error fetching drive", error: err });
  }
};


export const vaccinateStudentInDrive = async (req: Request, res: Response) => {
  try {
    const { driveId, studentId } = req.params;

    const drive = await Drive.findById(driveId);
    if (!drive) return res.status(404).json({ message: "Drive not found" });

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const alreadyVaccinated = student.vaccinations.some(
      (v) => v.vaccine_name === drive.vaccine_name
    );
    if (alreadyVaccinated) {
      return res.status(400).json({ message: "Student already vaccinated with this vaccine" });
    }

    const remaining = drive.number_of_doses - drive.students_vaccinated.length;
    if (remaining <= 0) {
      return res.status(400).json({ message: "No remaining slots in this drive" });
    }

    // ✅ 1. Add to student
    student.vaccinations.push({
      vaccine_name: drive.vaccine_name,
      drive_id: drive._id,
      date: drive.date,
    });
    await student.save();

    // ✅ 2. Add to drive
    if (!drive.students_vaccinated.includes(student._id)) {
      drive.students_vaccinated.push(student._id);
      await drive.save();
    }

    return res.status(200).json({ message: "Student vaccinated", student });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
};


  export const getVaccinatedStudentsInDrive = async (req: Request, res: Response) => {
    try {
      const { driveId } = req.params;
  
      const drive = await Drive.findById(driveId).populate("students_vaccinated");
      if (!drive) return res.status(404).json({ message: "Drive not found" });
  
      res.status(200).json({
        drive_id: drive._id,
        vaccine_name: drive.vaccine_name,
        students: drive.students_vaccinated
      });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch vaccinated students", error: err });
    }
  };


export const exportDriveVaccinationCSV = async (req: Request, res: Response) => {
  try {
    const { driveId } = req.params;

    const drive = await Drive.findById(driveId).populate("students_vaccinated");
    if (!drive) return res.status(404).json({ message: "Drive not found" });

    const fields = ["student_id", "name", "class", "gender"];
    const parser = new Parser({ fields });

    const csv = parser.parse(drive.students_vaccinated);

    res.header("Content-Type", "text/csv");
    res.attachment(`${drive.vaccine_name}-drive-report.csv`);
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ message: "Failed to export report", error: err });
  }
};
