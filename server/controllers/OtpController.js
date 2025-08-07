const User = require("../models/User");
const ApiResponse = require("../pojo/ApiResponse");
const { OtpPurpose } = require("../utils/enums");
const { handleCommonError } = require("../utils");
const generateOtp = require("../service/otp/generateOtp");
const { sendEmailVerificationEmail, sendPasswordResetOTPEmail } = require("../helpers/emailHelper");

/**
 * Resend OTP for email verification or password reset
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function resendOTP(req, res) {
  try {
    const { email, purpose } = req.body;

    if (!email || !purpose) {
      return res.status(400).send(new ApiResponse(false, "Email and purpose are required"));
    }

    // Validate purpose
    const validPurposes = Object.values(OtpPurpose);
    if (!validPurposes.includes(purpose)) {
      return res.status(400).send(new ApiResponse(false, "Invalid purpose"));
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send(new ApiResponse(false, "Invalid email address"));
    }

    // Generate new OTP
    const otp = await generateOtp(email, purpose);

    // Send appropriate email based on purpose
    let success = false;
    let error = null;
    try {
      if (purpose === OtpPurpose.REGISTRATION) {
        ({ success, error } = await sendEmailVerificationEmail(user.email, user.name, otp));
      } else if (purpose === OtpPurpose.PASSWORD_RESET) {
        ({ success, error } = await sendPasswordResetOTPEmail(user.email, user.name, otp));
      }
    } catch (emailError) {
      success = false;
      error = emailError.message || "Failed to send OTP email";
    }

    if (!success) {
      console.error("Failed to send OTP email:", error);
      return res.status(500).send(new ApiResponse(false, "Failed to send OTP email"));
    }
    res.status(200).send(new ApiResponse(true, "OTP resent successfully"));
  } catch (ex) {
    handleCommonError(res, ex);
  }
}

module.exports = {
  resendOTP,
};
