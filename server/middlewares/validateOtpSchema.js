const ApiResponse = require("../pojo/ApiResponse");
const { otpResendSchema, otpVerifySchema } = require("../schemas/otpSchema");

function validateOtpResendSchema(req, res, next) {
  const { email, purpose } = req.body;
  const validationResult = otpResendSchema.validate({ email, purpose });
  if (validationResult.error) {
    res.status(400).send(new ApiResponse(false, validationResult.error.details[0].message));
    return;
  }

  next();
}

function validateOtpVerifySchema(req, res, next) {
  const { email, otp, purpose } = req.body;
  const validationResult = otpVerifySchema.validate({ email, otp, purpose });
  if (validationResult.error) {
    res.status(400).send(new ApiResponse(false, validationResult.error.details[0].message));
    return;
  }

  next();
}

module.exports = {
  validateOtpResendSchema,
  validateOtpVerifySchema,
};
