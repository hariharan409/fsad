import express from "express";
import cors from "cors";

// Route imports
import authRoutes from "./routes/auth.routes";
import studentRoutes from "./routes/student.routes";
import driveRoutes from "./routes/drive.routes";
import dashboardRoutes from "./routes/dashboard.routes";


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.send("API is running..."));

// Subroute mounting
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/drives", driveRoutes);


app.use("/api/dashboard", dashboardRoutes);

export default app;
