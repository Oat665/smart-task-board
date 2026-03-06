const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  category: String,
  priority: String,
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Task", TaskSchema);