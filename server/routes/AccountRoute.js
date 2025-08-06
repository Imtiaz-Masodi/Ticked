const express = require("express");
const userController = require("../controllers/UserController");
const { authentication } = require("../middlewares/authentication");
const {
  validateUserSchema,
  validateUserSchemaForSignIn,
  validateSchemaForPassword,
} = require("../middlewares/validateUserSchema");

const router = express.Router();

router.post("/signup", validateUserSchema, userController.createUser);
router.post("/signin", validateUserSchemaForSignIn, userController.validateUserCredentials);
router.post("/verify", userController.verifyEmail);

// Below are secured routes
router.use(authentication);
router.get("/me", userController.getUserDetails);
router.post("/update-password", validateSchemaForPassword, userController.updatePassword);

module.exports = router;
