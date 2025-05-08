import { Request, Response } from "express";
import Student from "../models/student.model";

export const addStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: "Error adding student", error: err });
  }
};

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const query: any = {};
    const { name, class: studentClass, vaccinated } = req.query;

    if (name) query.name = new RegExp(name as string, "i");
    if (studentClass) query.class = studentClass;
    if (vaccinated === "true") query["vaccinations.0"] = { $exists: true };
    if (vaccinated === "false") query["vaccinations.0"] = { $exists: false };

    const students = await Student.find(query);
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Error fetching students", error: err });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Error fetching student", error: err });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: "Error updating student", error: err });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting student", error: err });
  }
};

export const markVaccinated = async (req: Request, res: Response) => {
  const { vaccine_name, drive_id, date } = req.body;

  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const alreadyVaccinated = student.vaccinations.some(
      (v) => v.vaccine_name === vaccine_name
    );

    if (alreadyVaccinated) {
      return res.status(400).json({ message: "Student already vaccinated for this vaccine" });
    }

    student.vaccinations.push({ vaccine_name, drive_id, date });
    await student.save();

    res.json(student);
  } catch (err) {
    res.status(400).json({ message: "Error marking vaccination", error: err });
  }
};

import fs from "fs";
import csv from "csv-parser";
import path from "path";

export const bulkUploadStudents = async (req: Request, res: Response) => {
  const filePath = req.file?.path;

  if (!filePath) return res.status(400).json({ message: "CSV file missing" });

  const students: any[] = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      students.push({
        student_id: row.student_id,
        name: row.name,
        class: row.class,
        dob: new Date(row.dob),
        gender: row.gender,
        vaccinations: [] // leave empty for now
      });
    })
    .on("end", async () => {
      try {
        await Student.insertMany(students);
        fs.unlinkSync(filePath); // clean up
        res.status(201).json({ message: "Students uploaded successfully", count: students.length });
      } catch (error) {
        res.status(500).json({ message: "Bulk insert failed", error });
      }
    })
    .on("error", (err) => {
      res.status(500).json({ message: "Failed to read CSV", error: err });
    });
};
