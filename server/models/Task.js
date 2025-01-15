const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date },
  dueDate: { type: Date },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  categoryId: { type: String, default: "3" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

taskSchema.index({ completed: -1, categoryId: 1, priority: 1 });

taskSchema.statics.isValidTaskId = async function (taskId, userId) {
  const task = await this.findOne({ _id: taskId, user: userId });
  return Boolean(task);
};

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
