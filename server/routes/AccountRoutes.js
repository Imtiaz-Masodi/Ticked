const express = require("express");
const userController = require("../controllers/UserController");
const { authentication } = require("../middlewares/authentication");
const { validateUserSchema, validateUserSchemaForSignIn } = require("../middlewares/validateUserSchema");

const router = express.Router();

router.post("/signup", validateUserSchema, userController.createUser);
router.post("/signin", validateUserSchemaForSignIn, userController.validateUserCredentials);

// Below are secured routes
router.use(authentication);
router.get("/me", userController.getUserDetails);

module.exports = router;
