const ApiResponse = require("../pojo/ApiResponse");
const { taskSchema } = require("../schemas/taskSchema");

function validateTaskSchema(req, res, next) {
  const { title, description, dueDate, priority } = req.body;
  const validationResult = taskSchema.validate({ title, description, dueDate, priority });
  if (validationResult.error) {
    res.send(new ApiResponse(false, validationResult.error.details[0].message));
    return;
  }

  next();
}

module.exports = {
  validateTaskSchema,
};
