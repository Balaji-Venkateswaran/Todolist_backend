
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

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));


const allowedOrigins = [
  "http://localhost:5173",            // Local development frontend
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true); // Allow request
    } else {
      callback(new Error("Not allowed by CORS")); // Reject request
    }
  },
  credentials: true,  // Allow cookies or authentication headers
}));

mongoose
  // .connect("mongodb://localhost:27017/todoapp", {
    // .connect("mongodb+srv://gamerjouer:Logan@2014@cluster.7agom4o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster", {
.connect("mongodb+srv://gamerjouer:Logan%402014@cluster.7agom4o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster", {

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



// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const authRoutes = require("../routes/authRoutes");
// const todoRoutes = require("../routes/todoRoutes");
// const passwordRoutes = require("../routes/passwordRoutes");
// const serverless = require("serverless-http");

// const app = express();

// app.use(bodyParser.json());
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));

// mongoose.connect("mongodb+srv://gamerjouer:Logan%402014@cluster.7agom4o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

// app.use("/api/todos", todoRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/password", passwordRoutes);

// // 👇 Export as a serverless function handler
// module.exports = serverless(app);
