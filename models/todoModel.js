const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  completed: { type: Boolean, default: false },
  completedAt: Date,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
