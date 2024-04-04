require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const app = express();
const Tasks = require("./models/Tasks");
const PORT = process.env.PORT || 8000;
connectDB();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// get all tasks

app.get("/api/tasks", async (req, res) => {
  try {
    const data = await Tasks.find({});

    if (!data) {
      throw new Error("An error occured while fetching tasks.");
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occured while fetching tasks." });
  }
});
// get all tasks by id

app.get("/api/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    const data = await Tasks.findById(taskId);

    if (!data) {
      throw new Error("An error occured while fetching tasks.");
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occured while fetching tasks." });
  }
});

// create task

app.post("/api/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;

    const data = await Tasks.create({ title, description });

    if (!data) {
      throw new Error("An error occured while creating task.");
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occured while creating task." });
  }
});
// updating task

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    const { title, description } = req.body;

    const data = await Tasks.findByIdAndUpdate(taskId, { title, description });

    if (!data) {
      throw new Error("An error occured while updating a task.");
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occured while updating a task." });
  }
});
// delete a task

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    const data = await Tasks.findByIdAndDelete(taskId);

    if (!data) {
      throw new Error("An error occured while deleting a task.");
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occured while deleting a task." });
  }
});

app.get("/", (req, res) => {
  res.json(" Hello mate!");
});

app.get("*", (req, res) => {
  res.sendStatus("404");
});

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
