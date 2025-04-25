const express = require("express");
const { authentication } = require("../middlewares/authentication");
const { validateTaskSchema } = require("../middlewares/validateTaskSchema");
const {
  validateTaskQueryParams,
  validateTaskId,
} = require("../middlewares/validateTaskRequest");
const {
  fetchTasksForUser,
  createTask,
  updateTask,
  updateTaskStatus,
  updateDeleteStatusTo,
} = require("../controllers/TaskController");
const router = express.Router();

router.use(authentication);
router.get("/list", validateTaskQueryParams, fetchTasksForUser);
router.post("/create", validateTaskSchema, createTask);
router.put("/update/:taskId", validateTaskId(), validateTaskSchema, updateTask);
router.put("/update-status/:taskId", validateTaskId(), updateTaskStatus);
router.put("/restore/:taskId", validateTaskId(true), updateDeleteStatusTo(false));
router.delete("/delete/:taskId", validateTaskId(true), updateDeleteStatusTo(true));

module.exports = router;
