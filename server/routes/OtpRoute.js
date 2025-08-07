const express = require("express");
const otpController = require("../controllers/OtpController");
const { validateOtpResendSchema } = require("../middlewares/validateOtpSchema");

const router = express.Router();

router.post("/resend", validateOtpResendSchema, otpController.resendOTP);

module.exports = router;
