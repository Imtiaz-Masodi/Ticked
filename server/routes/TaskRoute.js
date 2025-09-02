const express = require("express");
const { authentication } = require("../middlewares/authentication");
const { validateTaskSchema } = require("../middlewares/validateTaskSchema");
const { validateTaskQueryParams, validateTaskId } = require("../middlewares/validateTaskRequest");
const {
  fetchTasksForUser,
  fetchTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  updateDeleteStatusTo,
  addChecklistItem,
  updateChecklistItem,
  deleteChecklistItem,
} = require("../controllers/TaskController");
const router = express.Router();

router.use(authentication);
router.get("/list", validateTaskQueryParams, fetchTasksForUser);
router.get("/:taskId", validateTaskId(), fetchTaskById);
router.post("/create", validateTaskSchema, createTask);
router.put("/update/:taskId", validateTaskId(), validateTaskSchema, updateTask);
router.put("/update-status/:taskId", validateTaskId(), updateTaskStatus);
router.put("/restore/:taskId", validateTaskId(true), updateDeleteStatusTo(false));
router.delete("/delete/:taskId", validateTaskId(true), updateDeleteStatusTo(true));

// Checklist routes
router.post("/:taskId/checklist", validateTaskId(), addChecklistItem);
router.put("/:taskId/checklist/:itemId", validateTaskId(), updateChecklistItem);
router.delete("/:taskId/checklist/:itemId", validateTaskId(), deleteChecklistItem);

module.exports = router;
