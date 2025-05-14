
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const passwordRoutes = require("./routes/passwordRoutes");


const app = express();

app.use(bodyParser.json());
app.use(cors());


app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));

mongoose
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



