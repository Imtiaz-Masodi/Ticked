const { isValidCategoryId } = require("../controllers/CategoryController");
const ApiResponse = require("../pojo/ApiResponse");
const { categorySchema } = require("../schemas/categorySchema");
const constants = require("../utils/constants");

async function validateCategorySchema(req, res, next) {
  const { user } = req.stash;
  const { categoryId } = req.params;
  const { categoryName, categoryColorCode } = req.body;

  if (categoryId !== undefined && !(await isValidCategoryId(categoryId, user.id))) {
    res.status(400).send(new ApiResponse(false, constants.INVALID_CATEGORY_ID));
    return;
  }

  const validationResult = categorySchema.validate({ categoryName, categoryColorCode });
  if (validationResult.error) {
    res.status(400).send(new ApiResponse(false, validationResult.error.details[0].message));
    return;
  }

  next();
}

module.exports = {
  validateCategorySchema,
};
