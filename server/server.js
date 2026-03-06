const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");   // เพิ่มบรรทัดนี้
require("dotenv").config();

const app = express();

app.use(cors());                // เพิ่มบรรทัดนี้
app.use(express.json());

const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Smart Task Board API Running");
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Server running on port " + (process.env.PORT || 8000));
});