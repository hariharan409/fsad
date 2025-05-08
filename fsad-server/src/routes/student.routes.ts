import express from "express";
import {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  markVaccinated
} from "../controllers/student.controller";
import upload from "../utils/upload.middleware";
import { bulkUploadStudents } from "../controllers/student.controller";
// import { authMiddleware } from "../middleware/auth.middleware"; // Uncomment if needed

const router = express.Router();

// router.use(authMiddleware); // Uncomment to protect all student routes

router.post("/", addStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.put("/:id/vaccinate", markVaccinated);

router.post("/upload-csv", upload.single("file"), bulkUploadStudents);


export default router;
