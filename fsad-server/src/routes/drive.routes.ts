import express from "express";
import {
  createDrive,
  getAllDrives,
  getUpcomingDrives,
  updateDrive,
  getDriveById,
  vaccinateStudentInDrive,
  getVaccinatedStudentsInDrive,
  exportDriveVaccinationCSV
} from "../controllers/drive.controller";

const router = express.Router();

router.post("/", createDrive);
router.get("/", getAllDrives);
router.get("/upcoming", getUpcomingDrives);
router.get("/:id", getDriveById);
router.put("/:id", updateDrive);

router.put("/:driveId/vaccinate/:studentId", vaccinateStudentInDrive);
router.get("/:driveId/students", getVaccinatedStudentsInDrive);
router.get("/:driveId/report", exportDriveVaccinationCSV);


export default router;
