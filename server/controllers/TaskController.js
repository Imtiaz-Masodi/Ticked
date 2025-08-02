const Task = require("../models/Task");
const { handleCommonError, isValidObjectId } = require("../utils");
const { isValidCategoryId } = require("./CategoryController");
const ApiResponse = require("../pojo/ApiResponse");
const constants = require("../utils/constants");
const { TaskStatus } = require("../utils/enums");

async function fetchTasksForUser(req, res) {
  try {
    const { user, queryParams } = req.stash;
    const searchQuery = { ...queryParams, userId: user.id };
    const tasks = await Task.find(searchQuery).select(
      "title description status createdOn priority dueDate categoryId userId deleted"
    );
    res.send(new ApiResponse(true, "", { tasks }));
  } catch (ex) {
    handleCommonError(res, ex);
  }
}

async function createTask(req, res) {
  try {
    let { title, description, dueDate, priority, categoryId } = req.body;
    const { user } = req.stash;

    const isValidCategory = categoryId
      ? await isValidCategoryId(categoryId, user.id)
      : true;
    if (!isValidCategory) {
      res
        .status(400)
        .send(new ApiResponse(false, constants.INVALID_CATEGORY_ID));
      return;
    }

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      categoryId,
      userId: user,
      deleted: false,
    });
    await task.save();
    res
      .status(201)
      .send(new ApiResponse(true, constants.TASK_CREATED, { task }));
  } catch (ex) {
    handleCommonError(res, ex);
  }
}

async function updateTaskStatus(req, res) {
  const { user } = req.stash;
  const { taskId } = req.params;
  const { status } = req.body;

  if (!Object.values(TaskStatus).includes(status)) {
    res
      .status(400)
      .send(new ApiResponse(false, constants.INVALID_STATUS_VALUE));
    return;
  }

  const task = await Task.findOne({ _id: taskId, userId: user.id });
  if (!task) {
    res.status(400).send(new ApiResponse(false, constants.INVALID_TASK_ID));
    return;
  }

  if (task.status !== status) {
    task.status = status;
    task.updatedOn = Date.now();
    await task.save();
  }

  res.send(new ApiResponse(true, constants.TASK_STATUS_UPDATED));
}

async function updateTask(req, res) {
  try {
    const { user } = req.stash;
    const { taskId } = req.params;
    const { title, description, dueDate, status, priority, categoryId } =
      req.body;

    const isValidCategory = await isValidCategoryId(categoryId, user.id);
    if (!isValidCategory) {
      res
        .status(400)
        .send(new ApiResponse(false, constants.INVALID_CATEGORY_ID));
      return;
    }

    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId: user.id },
      {
        title,
        description,
        dueDate,
        status,
        priority,
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

const updateDeleteStatusTo = (deleteStatus) => async (req, res) => {
  try {
    const { user } = req.stash;
    const { taskId } = req.params;

    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId: user.id },
      {
        status: TaskStatus.TODO,
        deleted: Boolean(deleteStatus),
        updatedOn: Date.now(),
      },
      { new: true, runValidators: true }
    );
    if (!task) {
      res.status(400).send(new ApiResponse(false, constants.INVALID_TASK_ID));
      return;
    }

    const apiResponseMessage = deleteStatus
      ? constants.TASK_DELETED
      : constants.TASK_RESTORED;
    res.send(new ApiResponse(true, apiResponseMessage, { task }));
  } catch (ex) {
    handleCommonError(res, ex);
  }
};

module.exports = {
  fetchTasksForUser,
  createTask,
  updateTaskStatus,
  updateTask,
  updateDeleteStatusTo,
};
