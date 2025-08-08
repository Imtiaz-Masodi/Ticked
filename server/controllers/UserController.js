const { handleCommonError, handleInvalidMongoSchemaError } = require("../utils");
const User = require("../models/User");
const ApiResponse = require("../pojo/ApiResponse");
const constants = require("../utils/constants");
const { generateLoginToken } = require("../helpers/jwt");
const { sendEmailVerificationEmail, sendWelcomeEmail } = require("../helpers/emailHelper");
const generateOtp = require("../service/otp/generateOtp");
const verifyOtp = require("../service/otp/verifyOtp");
const { OtpPurpose } = require("../utils/enums");

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

    res.status(200).send(new ApiResponse(true, "OTP Sent on email for verification"));
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
    if (!user.accountVerified) {
      res.status(400).send(new ApiResponse(false, constants.ACCOUNT_NOT_VERIFIED));
      return;
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      res.status(400).send(new ApiResponse(false, constants.INVALID_USER_CREDENTIALS));
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
      return res.status(400).send(new ApiResponse(false, "Email and OTP are required"));
    }

    // Verify the OTP
    await verifyOtp(email, OtpPurpose.REGISTRATION, otp);

    // Update user account verification status
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send(new ApiResponse(false, "User not found"));
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
    if (ex.message === "Invalid or expired OTP") {
      return res.status(400).send(new ApiResponse(false, ex.message));
    }
    handleCommonError(res, ex);
  }
}

module.exports = {
  createUser,
  validateUserCredentials,
  getUserDetails,
  updatePassword,
  verifyEmail,
};
