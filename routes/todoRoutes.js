const express = require("express");
const Todo = require("../models/todoModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ dueDate: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/paginated", async (req, res) => {
  const { page = 1, limit = 5, completed } = req.query;

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const filter =
    completed !== undefined ? { completed: completed === "true" } : {};

  try {
    const todos = await Todo.find(filter)
      .sort({ dueDate: -1 })
      .skip(skip)
      .limit(limitNumber);

    const totalTodos = await Todo.countDocuments(filter);

    res.json({
      todos,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalTodos / limitNumber),
      totalItems: totalTodos,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { title, description, dueDate } = req.body;
  try {
    const newTodo = new Todo({
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : null,
    });
    await newTodo.save();
    res.json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, completed } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        completed,
        completedAt: completed ? new Date() : null,
      },
      { new: true }
    );

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
