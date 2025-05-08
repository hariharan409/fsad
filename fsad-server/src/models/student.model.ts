import mongoose, { Schema, Document, Types } from "mongoose";

export interface IVaccination {
  vaccine_name: string;
  drive_id: Types.ObjectId;
  date: Date;
}

export interface IStudent extends Document {
  student_id: string;
  name: string;
  class: string;
  dob: Date;
  gender: "Male" | "Female" | "Other";
  vaccinations: IVaccination[];
}

const VaccinationSchema = new Schema<IVaccination>({
  vaccine_name: { type: String, required: true },
  drive_id: { type: Schema.Types.ObjectId, ref: "Drive", required: true },
  date: { type: Date, required: true },
});

const StudentSchema = new Schema<IStudent>(
  {
    student_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    class: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    vaccinations: [VaccinationSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IStudent>("Student", StudentSchema);
