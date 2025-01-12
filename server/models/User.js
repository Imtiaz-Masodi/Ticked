const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { USER_PASSWORD_MIN_LENGTH } = require("../utils/constants");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: USER_PASSWORD_MIN_LENGTH },
  createdOn: { type: Date, default: Date.now },
  accountVerified: { type: Boolean, default: false },
  accountDeactivated: { type: Boolean, default: false },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, BCRYPT_SALT_ROUNDS);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.userExistsWithEmail = async function (email) {
  const user = await this.findOne({ email });
  return user !== null;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
