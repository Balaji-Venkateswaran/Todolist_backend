const express = require("express");
const Todo = require("../models/todoModel");
const router = express.Router();

// GET /completed-todos?page=1&limit=10
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const todos = await Todo.find({ completed: true })
      .sort({ dueDate: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Todo.countDocuments({ completed: true });

    res.json({
      todos,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
