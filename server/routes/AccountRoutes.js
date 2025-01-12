const express = require("express");
const userController = require("../controllers/UserController");
const { authentication } = require("../middlewares/authentication");

const router = express.Router();

router.post("/signup", userController.createUser);
router.post("/signin", userController.validateUserCredentials);

// Below are secured routes
router.use(authentication);
router.get("/me", userController.getUserDetails);

module.exports = router;
