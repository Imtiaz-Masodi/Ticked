const { isValidCategoryId } = require("../controllers/CategoryController");
const Task = require("../models/Task");
const ApiResponse = require("../pojo/ApiResponse");
const { isValidObjectId } = require("../utils");
const constants = require("../utils/constants");

async function validateTaskQueryParams(req, res, next) {
  const { user } = req.stash;
  const { completed, categoryId, priority } = req.query;

  if (categoryId !== undefined && !(await isValidCategoryId(categoryId, user.id))) {
    res.status(400).send(new ApiResponse(false, constants.INVALID_CATEGORY_ID));
    return;
  }
  if (priority !== undefined && !["Low", "Medium", "High"].includes(priority)) {
    res.status(400).send(new ApiResponse(false, constants.INVALID_PRIORITY));
    return;
  }

  const searchQuery = {
    completed: completed ? completed === "true" : undefined,
    categoryId,
    priority,
  };
  Object.keys(searchQuery).forEach((key) => {
    if (searchQuery[key] === undefined) delete searchQuery[key];
  });

  req.stash.queryParams = searchQuery;

  next();
}

async function validateTaskIdToDelete(req, res, next) {
  const { user } = req.stash;
  const { taskId } = req.params;
  if (!isValidObjectId(taskId)) {
    res.status(400).send(new ApiResponse(false, constants.INVALID_TASK_ID));
    return;
  }

  if (!(await Task.isValidTaskId(taskId, user.id))) {
    res.status(400).send(new ApiResponse(false, constants.INVALID_TASK_ID));
    return;
  }
  next();
}

module.exports = {
  validateTaskQueryParams,
  validateTaskIdToDelete,
};
