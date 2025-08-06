const mongoose = require("mongoose");
const { OtpPurpose } = require("../utils/enums");

const OtpSchema = new mongoose.Schema(
  {
    identifier: {
      type: String,
      required: true, // email or phone
    },
    otpCode: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
      enum: [OtpPurpose.REGISTRATION, OtpPurpose.PASSWORD_RESET],
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// Index for faster lookups by identifier + purpose + verified
OtpSchema.index({ identifier: 1, purpose: 1, verified: 1 });

const Otp = mongoose.model("Otp", OtpSchema);

module.exports = Otp;
