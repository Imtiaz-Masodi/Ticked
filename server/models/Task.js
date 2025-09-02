const mongoose = require("mongoose");

// Sub-schema for checklist items
const checklistItemSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
  },
  { _id: true }
); // Enable _id for each checklist item

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
  checklistItems: [checklistItemSchema], // Array of checklist items
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
});

taskSchema.index({ userId: 1, categoryId: 1, deleted: -1 });
taskSchema.index({ userId: 1, categoryId: 1, status: 1, deleted: -1 });
taskSchema.index({ userId: 1, status: 1, deleted: -1 });
taskSchema.index({ userId: 1, deleted: 1 });

taskSchema.pre("save", async function (next) {
  this.updatedOn = Date.now();

  // Update updatedOn for modified checklist items
  if (this.isModified("checklistItems")) {
    this.checklistItems.forEach((item) => {
      if (item.isModified && item.isModified()) {
        item.updatedOn = Date.now();
      }
    });
  }

  next();
});

taskSchema.statics.isValidTaskId = async function (taskId, userId, callbackTaskItem) {
  const task = await this.findOne({ _id: taskId, userId });
  callbackTaskItem?.(task);
  return Boolean(task);
};

// Helper methods for checklist items
taskSchema.methods.addChecklistItem = function (text) {
  this.checklistItems.push({ text, completed: false });
  return this.save();
};

taskSchema.methods.updateChecklistItem = function (itemId, updates) {
  const item = this.checklistItems.id(itemId);
  if (item) {
    Object.assign(item, updates);
    item.updatedOn = new Date();
    return this.save();
  }
  throw new Error("Checklist item not found");
};

taskSchema.methods.deleteChecklistItem = function (itemId) {
  this.checklistItems.pull(itemId);
  return this.save();
};

taskSchema.methods.getChecklistProgress = function () {
  const total = this.checklistItems.length;
  const completed = this.checklistItems.filter((item) => item.completed).length;
  return { total, completed, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
};

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
