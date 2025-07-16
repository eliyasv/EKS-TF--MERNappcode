import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "./db.js";
import taskRoutes from "./routes/tasks.js";

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// --- Health Check Endpoints ---

let lastReadyState = null;

// Basic liveness probe
app.get("/healthz", (req, res) => {
  res.status(200).send("Healthy");
});

// Readiness probe — checks DB connectivity
app.get("/ready", (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;

  if (isDbConnected !== lastReadyState) {
    console.log(`📡 DB Ready State Changed: ${mongoose.connection.readyState}`);
    lastReadyState = isDbConnected;
  }

  if (isDbConnected) {
    res.status(200).json({ status: "ready", db: "connected" });
  } else {
    res.status(503).json({ status: "not ready", db: "disconnected" });
  }
});

// Startup probe — fires once at container start
app.get("/started", (req, res) => {
  res.status(200).send("Started");
});

// --- Main API Route ---
app.use("/api/tasks", taskRoutes);

// --- Start Server ---
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
