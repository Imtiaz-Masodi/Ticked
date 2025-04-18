const Category = require("../models/Category");
const ApiResponse = require("../pojo/ApiResponse");
const { handleCommonError, generateRandomColorHexCode, isValidObjectId } = require("../utils");
const constants = require("../utils/constants");

const COMMON_CATEGORIES = Object.freeze([
  { _id: "1", name: "Personal", preDefined: true, categoryColorCode: "#4E9B8F" },
  { _id: "2", name: "Work", preDefined: true, categoryColorCode: "#3B5998" },
  { _id: "3", name: "Others", preDefined: true, categoryColorCode: "#A78C00" },
]);

async function isValidCategoryId(categoryId, userId) {
  const isCommonCategoryId = COMMON_CATEGORIES.reduce((a, c) => {
    a.push(c._id);
    return a;
  }, []).includes(categoryId);
  if (isCommonCategoryId) return true;

  if (!isValidObjectId(categoryId)) return false;
  const category = await Category.findOne({ _id: categoryId, createdBy: userId });
  return category?.id === categoryId;
}

async function getAllCategoriesByUserId(userId) {
  const categories = (await Category.find({ createdBy: userId })) || [];
  return [...COMMON_CATEGORIES, ...categories];
}

async function fetchAllCategoriesByUserId(req, res) {
  try {
    const { user } = req.stash;
    const categories = await getAllCategoriesByUserId(user.id);
    res.send(new ApiResponse(true, "", { categories }));
  } catch (ex) {
    handleCommonError(ex);
  }
}

async function createCategory(req, res) {
  try {
    const { categoryName, categoryColorCode } = req.body;
    const { user } = req.stash;
    const categories = await getAllCategoriesByUserId(user.id);
    const categoryExists = categories.some(
      (category) => category.name.toLowerCase() == categoryName.toLowerCase().trim()
    );

    if (categoryExists) {
      res
        .status(400)
        .send(new ApiResponse(false, `"${categoryName}" category already exists. Try with a different name.`));
      return;
    }

    const category = new Category({
      name: categoryName.trim(),
      categoryColorCode: categoryColorCode || generateRandomColorHexCode(),
      createdBy: user.id,
    });
    await category.save();
    res.status(201).send(new ApiResponse(true, constants.CATEGORY_CREATED, { category }));
  } catch (ex) {
    handleCommonError(res, ex);
  }
}

async function updateCategory(req, res) {
  try {
    const { user } = req.stash;
    const { categoryId } = req.params;
    const { categoryName, categoryColorCode } = req.body;

    const category = await Category.findOneAndUpdate(
      { _id: categoryId, createdBy: user.id },
      { name: categoryName, categoryColorCode },
      { new: true, runValidators: true }
    );

    if (!category) {
      res.status(400).send(new ApiResponse(false, constants.INVALID_CATEGORY_ID));
      return;
    }

    res.send(new ApiResponse(true, constants.CATEGORY_UPDATED, { category }));
  } catch (ex) {
    handleCommonError(res, ex);
  }
}

async function deleteCategory(req, res) {
  try {
    const { user } = req.stash;
    const { categoryId } = req.params;

    if (!(await isValidCategoryId(categoryId, user.id))) {
      res.status(400).send(new ApiResponse(false, constants.INVALID_CATEGORY_ID));
      return;
    }

    const category = await Category.findOneAndDelete({ _id: categoryId });
    if (!category) {
      res.status(400).send(new ApiResponse(false, constants.INVALID_CATEGORY_ID));
      return;
    }

    res.send(new ApiResponse(true, constants.CATEGORY_DELETED, { category }));
  } catch (ex) {
    handleCommonError(res, ex);
  }
}

module.exports = {
  COMMON_CATEGORIES,
  isValidCategoryId,
  fetchAllCategoriesByUserId,
  createCategory,
  updateCategory,
  deleteCategory,
};
