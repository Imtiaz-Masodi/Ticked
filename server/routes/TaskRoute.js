const express = require("express");
const { authentication } = require("../middlewares/authentication");
const { validateTaskSchema } = require("../middlewares/validateTaskSchema");
const { validateTaskQueryParams, validateTaskIdToDelete } = require("../middlewares/validateTaskRequest");
const {
  fetchTasksForUser,
  createTask,
  markTaskAsComplete,
  updateTask,
  deleteTask,
} = require("../controllers/TaskController");
const router = express.Router();

router.use(authentication);
router.get("/list", validateTaskQueryParams, fetchTasksForUser);
router.post("/create", validateTaskSchema, createTask);
router.put("/update", validateTaskSchema, updateTask);
router.put("/mark-complete", markTaskAsComplete);
router.delete("/delete/:taskId", validateTaskIdToDelete, deleteTask);

module.exports = router;
