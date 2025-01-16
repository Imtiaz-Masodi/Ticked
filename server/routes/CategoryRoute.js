const express = require("express");
const {
  fetchAllCategoriesByUserId,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/CategoryController");
const { authentication } = require("../middlewares/authentication");
const { validateCategorySchema } = require("../middlewares/validateCategorySchema");
const router = express.Router();

router.use(authentication);
router.get("/", fetchAllCategoriesByUserId);
router.post("/", validateCategorySchema, createCategory);
router.put("/:categoryId", validateCategorySchema, updateCategory);
router.delete("/:categoryId", deleteCategory);

module.exports = router;
