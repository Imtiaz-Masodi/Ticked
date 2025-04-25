const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["backlog", "todo", "inprogress", "completed"],
    default: "todo",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  categoryId: { type: String, default: "3" },
  dueDate: { type: Date },
  deleted: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
});

taskSchema.index({ userId: 1, categoryId: 1, deleted: -1 });
taskSchema.index({ userId: 1, categoryId: 1, status: 1, deleted: -1 });
taskSchema.index({ userId: 1, status: 1, deleted: -1 });
taskSchema.index({ userId: 1, deleted: 1 });

taskSchema.pre("save", async function (next) {
  this.updatedOn = Date.now();
  next();
});

taskSchema.statics.isValidTaskId = async function (taskId, userId, callbackTaskItem) {
  const task = await this.findOne({ _id: taskId, userId });
  callbackTaskItem?.(task);
  return Boolean(task);
};

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
