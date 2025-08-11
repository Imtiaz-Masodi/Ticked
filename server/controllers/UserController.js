const { handleCommonError, handleInvalidMongoSchemaError } = require("../utils");
const User = require("../models/User");
const ApiResponse = require("../pojo/ApiResponse");
const constants = require("../utils/constants");
const { generateLoginToken } = require("../helpers/jwt");
const { sendEmailVerificationEmail, sendWelcomeEmail } = require("../helpers/emailHelper");
const { sendPasswordResetOTPEmail } = require("../helpers/emailHelper");
const generateOtp = require("../service/otp/generateOtp");
const verifyOtp = require("../service/otp/verifyOtp");
const { OtpPurpose } = require("../utils/enums");
const mongoose = require("mongoose");

async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password, accountVerified: false, accountDeactivated: false });

    const userWithEmailExists = await User.userExistsWithEmail(email);
    if (userWithEmailExists && !userWithEmailExists.accountVerified) {
      res.status(400).send(new ApiResponse(false, constants.ACCOUNT_NOT_VERIFIED));
      return;
    }
    if (userWithEmailExists) {
      res.status(400).send(new ApiResponse(false, constants.USER_EMAIL_DUPLICATE));
      return;
    }

    const { errors } = (await user.validateSync()) || {};
    if (errors) {
      handleInvalidMongoSchemaError(res, errors[Object.keys(errors)[0]].message);
      return;
    }

    await user.save();

    const otp = await generateOtp(user.email, OtpPurpose.REGISTRATION);

    // Send welcome email
    sendEmailVerificationEmail(user.email, user.name, otp).catch((error) => {
      console.error("Failed to send email verification OTP:", error);
    });

    res.status(200).send(new ApiResponse(true, constants.OTP_SENT_FOR_VERIFICATION));
  } catch (ex) {
    handleCommonError(res, ex);
  }
}

async function validateUserCredentials(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send(new ApiResponse(false, constants.INVALID_USER_CREDENTIALS));
      return;
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      res.status(400).send(new ApiResponse(false, constants.INVALID_USER_CREDENTIALS));
      return;
    }

    if (!user.accountVerified) {
      res.status(400).send(new ApiResponse(false, constants.ACCOUNT_NOT_VERIFIED));
      return;
    }

    const authToken = generateLoginToken({ id: user.id });
    res.send(new ApiResponse(true, constants.VALID_USER_CREDENTIALS, { authToken }));
  } catch (ex) {
    handleCommonError(res, ex);
  }
}

async function getUserDetails(req, res) {
  try {
    res.send(new ApiResponse(true, "", { user: req.stash.user.omitSensitiveInfo() }));
  } catch (ex) {
    handleCommonError(res, ex);
  }
}

async function updatePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;
    const { user } = req.stash;

    const isValidPassword = await user.comparePassword(currentPassword);
    if (!isValidPassword) {
      res.status(400).send(new ApiResponse(false, constants.WRONG_PASSWORD));
      return;
    }

    user.password = newPassword;
    const updatedUser = await user.save();

    res.send(new ApiResponse(true, constants.PASSWORD_UPDATED));
  } catch (ex) {
    handleCommonError(res, ex);
  }
}

async function verifyEmail(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).send(new ApiResponse(false, constants.EMAIL_AND_OTP_REQUIRED));
    }

    // Verify the OTP
    await verifyOtp(email, OtpPurpose.REGISTRATION, otp);

    // Update user account verification status
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send(new ApiResponse(false, constants.ACCOUNT_NOT_FOUND));
    }

    user.accountVerified = true;
    await user.save();

    sendWelcomeEmail(user.email, user.name).catch((error) => {
      console.error("Failed to send welcome email:", error);
    });

    const authToken = generateLoginToken({ id: user.id });
    res
      .status(201)
      .send(new ApiResponse(true, constants.ACCOUNT_VERIFIED, { user: user.omitSensitiveInfo(), authToken }));
  } catch (ex) {
    if (ex.message === constants.INVALID_OR_EXPIRED_OTP) {
      return res.status(400).send(new ApiResponse(false, ex.message));
    }
    handleCommonError(res, ex);
  }
}

/**
 * Request password reset: generate and send OTP to email
 * Body: { email }
 */
async function requestPasswordReset(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send(new ApiResponse(false, constants.EMAIL_REQUIRED));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send(new ApiResponse(false, constants.ACCOUNT_NOT_FOUND));
    }
    const otp = await generateOtp(email, OtpPurpose.PASSWORD_RESET);
    // Send password reset OTP email (ignore email errors silently to avoid leaking info)
    sendPasswordResetOTPEmail(user.email, user.name, otp).catch((error) => {
      console.error("Failed to send password reset OTP:", error);
    });
    return res.status(200).send(new ApiResponse(true, constants.PASSWORD_RESET_OTP_SENT));
  } catch (ex) {
    handleCommonError(res, ex);
  }
}

/**
 * Verify password reset OTP
 * Body: { email, otp }
 * Response data: { tokenId: user._id }
 */
async function verifyPasswordResetOtp(req, res) {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).send(new ApiResponse(false, constants.EMAIL_AND_OTP_REQUIRED));
    }
    try {
      await verifyOtp(email, OtpPurpose.PASSWORD_RESET, otp);
    } catch (e) {
      return res.status(400).send(new ApiResponse(false, e.message || constants.INVALID_OR_EXPIRED_OTP));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send(new ApiResponse(false, constants.ACCOUNT_NOT_FOUND));
    }
    return res.status(200).send(new ApiResponse(true, constants.OTP_VERIFIED, { tokenId: user._id.toString() }));
  } catch (ex) {
    handleCommonError(res, ex);
  }
}

/**
 * Reset password using tokenId (user._id) returned after OTP verification
 * Body: { tokenId, newPassword }
 */
async function resetPasswordWithToken(req, res) {
  try {
    const { tokenId, newPassword } = req.body;
    if (!tokenId || !newPassword) {
      return res.status(400).send(new ApiResponse(false, constants.TOKEN_AND_PASSWORD_REQUIRED));
    }
    // Write code to verify the tokenId is a valid object id
    if (!mongoose.Types.ObjectId.isValid(tokenId)) {
      return res.status(400).send(new ApiResponse(false, constants.INVALID_TOKEN));
    }

    if (newPassword.length < constants.USER_PASSWORD_MIN_LENGTH || newPassword.length > 18) {
      return res
        .status(400)
        .send(
          new ApiResponse(
            false,
            `New Password must be between ${constants.USER_PASSWORD_MIN_LENGTH} and 18 characters long.`
          )
        );
    }
    const user = await User.findById(tokenId);
    if (!user) {
      return res.status(404).send(new ApiResponse(false, constants.USER_NOT_FOUND));
    }
    user.password = newPassword;
    await user.save();
    return res.status(200).send(new ApiResponse(true, constants.PASSWORD_UPDATED));
  } catch (ex) {
    handleCommonError(res, ex);
  }
}

module.exports = {
  createUser,
  validateUserCredentials,
  getUserDetails,
  updatePassword,
  verifyEmail,
  requestPasswordReset,
  verifyPasswordResetOtp,
  resetPasswordWithToken,
};
