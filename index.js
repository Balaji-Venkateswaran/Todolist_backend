// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();

// app.use(bodyParser.json());
// app.use(cors());

// mongoose
//   .connect("mongodb://localhost:27017/todoapp", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

// const Todo = mongoose.model(
//   "Todo",
//   new mongoose.Schema({
//     title: String,
//     description: String,
//     dueDate: Date,
//     completed: { type: Boolean, default: false },
//     completedAt: Date,
//   })
// );

// app.get("/todos", async (req, res) => {
//   try {
//     const todos = await Todo.find();
//     res.json(todos);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.post("/todos", async (req, res) => {
//   const { title, description, dueDate } = req.body;
//   try {
//     const newTodo = new Todo({
//       title,
//       description,
//       dueDate: dueDate ? new Date(dueDate) : null,
//     });
//     await newTodo.save();
//     res.json(newTodo);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.put("/todos/:id", async (req, res) => {
//   const { id } = req.params;
//   const { title, description, dueDate, completed } = req.body;

//   try {
//     const updatedTodo = await Todo.findByIdAndUpdate(
//       id,
//       {
//         title,
//         description,
//         dueDate: dueDate ? new Date(dueDate) : null,
//         completed,
//         completedAt: completed ? new Date() : null,
//       },
//       { new: true }
//     );

//     res.json(updatedTodo);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.delete("/todos/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     await Todo.findByIdAndDelete(id);
//     res.status(204).send();
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const passwordRoutes = require("./routes/passwordRoutes");


const app = express();

app.use(bodyParser.json());
// app.use(cors());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


mongoose
  .connect("mongodb://localhost:27017/todoapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/todos", todoRoutes);
app.use("/api/auth", authRoutes);
app.use("/auth", passwordRoutes); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
