import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Add a task
router.post("/", async (req, res) => {
    const { text } = req.body;
    const task = new Task({ text });
    await task.save();
    res.status(201).json(task);
});

// Delete a task
router.delete("/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

export default router;
