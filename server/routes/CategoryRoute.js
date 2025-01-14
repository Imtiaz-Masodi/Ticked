const express = require("express");
const { fetchAllCategoriesByUserId, createCategory } = require("../controllers/CategoryController");
const { authentication } = require("../middlewares/authentication");
const { validateCategorySchema } = require("../middlewares/validateCategorySchema");
const router = express.Router();

router.use(authentication);
router.get("/", fetchAllCategoriesByUserId);
router.post("/create", validateCategorySchema, createCategory);

module.exports = router;
