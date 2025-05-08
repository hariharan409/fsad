import mongoose, { Schema, Document, Types } from "mongoose";

export interface IDrive extends Document {
  vaccine_name: string;
  date: Date;
  number_of_doses: number;
  applicable_classes: string[];
  students_vaccinated: Types.ObjectId[];
}

const DriveSchema = new Schema<IDrive>(
  {
    vaccine_name: { type: String, required: true },
    date: { type: Date, required: true },
    number_of_doses: { type: Number, required: true },
    applicable_classes: [{ type: String, required: true }],
    students_vaccinated: [{ type: Schema.Types.ObjectId, ref: "Student" }]
  },
  { timestamps: true }
);

export default mongoose.model<IDrive>("Drive", DriveSchema);
