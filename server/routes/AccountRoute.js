const express = require("express");
const userController = require("../controllers/UserController");
const { authentication } = require("../middlewares/authentication");
const {
  validateUserSchema,
  validateUserSchemaForSignIn,
  validateSchemaForPassword,
  validateSchemaForProfile,
} = require("../middlewares/validateUserSchema");

const router = express.Router();

router.post("/signup", validateUserSchema, userController.createUser);
router.post("/signin", validateUserSchemaForSignIn, userController.validateUserCredentials);
router.post("/verify", userController.verifyEmail);

// Forgot password
router.post("/forgot-password/request", userController.requestPasswordReset); // body: { email }
router.post("/forgot-password/verify", userController.verifyPasswordResetOtp); // body: { email, otp }
router.post("/forgot-password/reset", userController.resetPasswordWithToken); // body: { tokenId, newPassword }

// Below are secured routes
router.use(authentication);
router.get("/me", userController.getUserDetails);
router.post("/update-password", validateSchemaForPassword, userController.updatePassword);
router.post("/update-profile", validateSchemaForProfile, userController.updateProfile);

module.exports = router;
