import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose"; // ✅ must import this
import { connectDB } from "./config/db.js";
import patientRoutes from "./routes/patientRoutes.js";
import Patient from "./models/Patient.js";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB once
connectDB();

// ✅ REST API routes
app.use("/api/patients", patientRoutes);

// ✅ Create HTTP + WebSocket server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React frontend URL
    methods: ["GET", "POST", "PUT"],
  },
});

// ✅ Wait for Mongo connection before setting up change stream
mongoose.connection.once("open", () => {
  console.log("👀 Listening for real-time DB changes...");
  const changeStream = mongoose.connection.collection("patients").watch();
  changeStream.on("change", async () => {
    const allPatients = await Patient.find().sort({ createdAt: -1 });
    io.emit("patientsUpdated", allPatients);
  });
});

// ✅ WebSocket connection events
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);
  socket.on("disconnect", () => console.log("🔴 Client disconnected"));
});

// ✅ Start server
const PORT = 5001;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
