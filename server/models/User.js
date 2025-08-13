const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const constants = require("../utils/constants");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: constants.USER_PASSWORD_MIN_LENGTH },
  bio: { type: String, maxLength: 500, default: "" },
  location: { type: String, maxLength: 100, default: "" },
  dateOfBirth: { type: Date },
  createdOn: { type: Date, default: Date.now },
  accountVerified: { type: Boolean, default: false },
  accountDeactivated: { type: Boolean, default: false },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, constants.BCRYPT_SALT_ROUNDS);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.omitSensitiveInfo = function () {
  const user = this.toObject();
  delete user.password;
  if (!user.accountDeactivated) delete user.accountDeactivated;
  // if (user.accountVerified) delete user.accountVerified;
  return user;
};

userSchema.statics.userExistsWithEmail = async function (email) {
  const user = await this.findOne({ email });
  return user !== null;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
