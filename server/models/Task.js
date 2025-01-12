const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  category: {
    type: String,
    enum: ["Work", "Personal", "Study"],
    default: "Personal",
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
