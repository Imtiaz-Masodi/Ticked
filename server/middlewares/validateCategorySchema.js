const ApiResponse = require("../pojo/ApiResponse");
const { categorySchema } = require("../schemas/categorySchema");

function validateCategorySchema(req, res, next) {
  const { categoryName, categoryColorCode } = req.body;
  const validationResult = categorySchema.validate({ categoryName, categoryColorCode });
  if (validationResult.error) {
    res.send(new ApiResponse(false, validationResult.error.details[0].message));
    return;
  }

  next();
}

module.exports = {
  validateCategorySchema,
};
