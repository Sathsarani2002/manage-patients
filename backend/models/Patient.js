import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    address: { type: String },
    contact: { type: String },
    blood: { type: String },
    username: { type: String },
    chronic: { type: String },
    allergies: { type: String },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
