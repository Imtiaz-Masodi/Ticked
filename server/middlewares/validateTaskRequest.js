const { isValidCategoryId } = require("../controllers/CategoryController");
const Task = require("../models/Task");
const ApiResponse = require("../pojo/ApiResponse");
const { isValidObjectId } = require("../utils");
const constants = require("../utils/constants");
const { TaskPriority, TaskStatus } = require("../utils/enums");

async function validateTaskQueryParams(req, res, next) {
  const { user } = req.stash;
  const { categoryId, priority, status, deleted } = req.query;

  if (categoryId !== undefined && !(await isValidCategoryId(categoryId, user.id))) {
    res.status(400).send(new ApiResponse(false, constants.INVALID_CATEGORY_ID));
    return;
  }
  if (priority !== undefined && !Object.values(TaskPriority).includes(priority)) {
    res.status(400).send(new ApiResponse(false, constants.INVALID_PRIORITY));
    return;
  }
  if (status !== undefined) {
    // Handle both single status and array of statuses
    const statusArray = Array.isArray(status) ? status : [status];
    const validStatuses = Object.values(TaskStatus);

    if (!statusArray.every((s) => validStatuses.includes(s))) {
      res.status(400).send(new ApiResponse(false, constants.INVALID_STATUS));
      return;
    }
  }

  const searchQuery = {
    status: status !== undefined && Array.isArray(status) ? { $in: status } : status,
    categoryId,
    priority,
    deleted: deleted === "both" ? undefined : deleted === "true",
  };
  Object.keys(searchQuery).forEach((key) => {
    if (searchQuery[key] === undefined) delete searchQuery[key];
  });

  req.stash.queryParams = searchQuery;

  next();
}

const validateTaskId =
  (skipItemDeletedVerification = false) =>
  async (req, res, next) => {
    const { user } = req.stash;
    const { taskId } = req.params;
    let task = null;
    if (
      !isValidObjectId(taskId) ||
      !(await Task.isValidTaskId(
        taskId,
        user.id,
        (taskItem) => (task = taskItem)
      ))
    ) {
      res.status(400).send(new ApiResponse(false, constants.INVALID_TASK_ID));
      return;
    }

    if (!skipItemDeletedVerification && task.deleted) {
      res
        .status(400)
        .send(new ApiResponse(false, constants.INVALID_TASK_ON_DELETED_ITEM));
      return;
    }

    next();
  };

module.exports = {
  validateTaskQueryParams,
  validateTaskId,
};
