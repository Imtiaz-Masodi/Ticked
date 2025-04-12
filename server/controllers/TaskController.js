const Task = require("../models/Task");
const { handleCommonError, isValidObjectId } = require("../utils");
const { isValidCategoryId } = require("./CategoryController");
const ApiResponse = require("../pojo/ApiResponse");
const constants = require("../utils/constants");

async function fetchTasksForUser(req, res) {
  try {
    const { user, queryParams } = req.stash;
    const searchQuery = { ...queryParams, user: user.id };
    const tasks = await Task.find(searchQuery).select("title completed createdOn priority dueDate categoryId");
    res.send(new ApiResponse(true, "", { tasks }));
  } catch (ex) {
    handleCommonError(res, ex);
  }
}

async function createTask(req, res) {
  try {
    let { title, description, dueDate, priority, categoryId } = req.body;
    const { user } = req.stash;

    const isValidCategory = categoryId ? await isValidCategoryId(categoryId, user.id) : true;
    if (!isValidCategory) {
      res.status(400).send(new ApiResponse(false, constants.INVALID_CATEGORY_ID));
      return;
    }

    const task = new Task({ title, description, completed: false, dueDate, priority, categoryId, user });
    await task.save();
    res.status(201).send(new ApiResponse(true, constants.TASK_CREATED, { task }));
  } catch (ex) {
    handleCommonError(res, ex);
  }
}

async function markTaskAsComplete(req, res) {
  const { taskId } = req.body;
  const { user } = req.stash;

  if (!isValidObjectId(taskId)) {
    res.status(400).send(new ApiResponse(false, constants.INVALID_TASK_ID));
    return;
  }

  const task = await Task.findOne({ _id: taskId, user: user.id });
  if (!task) {
    res.status(400).send(new ApiResponse(false, constants.INVALID_TASK_ID));
    return;
  }

  if (task.completed !== true) {
    task.completed = true;
    task.updatedOn = Date.now();
    await task.save();
  }

  res.send(new ApiResponse(true, constants.TASK_COMPLETED));
}

async function updateTask(req, res) {
  try {
    const { taskId, title, description, dueDate, completed, priority, categoryId } = req.body;
    const { user } = req.stash;

    if (!isValidObjectId(taskId)) {
      res.status(400).send(new ApiResponse(false, constants.INVALID_TASK_ID));
      return;
    }
    const isValidCategory = await isValidCategoryId(categoryId, user.id);
    if (!isValidCategory) {
      res.status(400).send(new ApiResponse(false, constants.INVALID_CATEGORY_ID));
      return;
    }

    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: user.id },
      {
        title,
        description,
        dueDate,
        priority,
        completed,
        categoryId,
        updatedOn: Date.now(),
      },
      { new: true, runValidators: true }
    );

    if (!task) {
      res.status(400).send(new ApiResponse(false, constants.INVALID_TASK_ID));
      return;
    }

    res.send(new ApiResponse(true, constants.TASK_UPDATED, { task }));
  } catch (ex) {
    handleCommonError(res, ex);
  }
}

async function deleteTask(req, res) {
  try {
    const { user } = req.stash;
    const { taskId } = req.params;

    const task = await Task.findOneAndDelete({ _id: taskId, user: user.id });
    if (!task) {
      res.status(400).send(new ApiResponse(false, constants.INVALID_TASK_ID));
      return;
    }

    res.send(new ApiResponse(true, constants.TASK_DELETED, { task }));
  } catch (ex) {
    handleCommonError(res, ex);
  }
}

module.exports = {
  fetchTasksForUser,
  createTask,
  markTaskAsComplete,
  updateTask,
  deleteTask,
};
