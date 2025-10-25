import express from "express";
import Patient from "../models/Patient.js";
import mongoose from "mongoose";

const router = express.Router();

// 📍 GET all patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Error fetching patients" });
  }
});

// 📍 POST new patient (used by signup page)
router.post("/", async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(400).json({ message: "Error creating patient", error: error.message });
  }
});

// 📍 PUT update patient by ID (used by profile update page)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid patient ID" });
    }

    const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true, // ✅ validate schema fields
    });

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(updatedPatient);
  } catch (error) {
    console.error("Error updating patient:", error);
    res.status(400).json({ message: "Error updating patient", error: error.message });
  }
});

export default router;
