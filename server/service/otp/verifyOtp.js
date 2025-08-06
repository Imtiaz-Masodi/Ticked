const Otp = require("../../models/OTP");

const verifyOtp = async (email, purpose, code) => {
  const otpDoc = await Otp.findOne({
    identifier: email,
    purpose,
    otpCode: code,
    verified: false,
    expiresAt: { $gt: new Date() },
  });

  if (!otpDoc) {
    throw new Error("Invalid or expired OTP");
  }

  otpDoc.verified = true;
  await otpDoc.save();

  return true;
};

module.exports = verifyOtp;
