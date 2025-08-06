const Otp = require("../../models/OTP");

const generateOtp = async (email, purpose) => {
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

  // Remove old unverified OTPs for the same email and purpose
  await Otp.deleteMany({ identifier: email, purpose, verified: false });

  const otpDoc = await Otp.create({
    identifier: email,
    otpCode,
    purpose,
    expiresAt,
  });

  // Send otpCode to user via email or SMS here

  return otpCode; // return it for testing or logging
};

module.exports = generateOtp;
