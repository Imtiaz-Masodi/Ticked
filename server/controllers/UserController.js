const { handleCommonError, handleInvalidMongoSchemaError } = require("../utils");
const User = require("../models/User");
const ApiResponse = require("../pojo/ApiResponse");
const constants = require("../utils/constants");
const { generateLoginToken } = require("../helpers/jwt");

async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

    // ToDo: Validate name, email and password
    const userWithEmailExists = await User.userExistsWithEmail(email);
    if (userWithEmailExists) {
      res.status(400).send(new ApiResponse(false, constants.USER_EMAIL_DUPLICATE));
    }

    const { errors } = (await user.validateSync()) || {};
    if (errors) {
      handleInvalidMongoSchemaError(res, errors[Object.keys(errors)[0]].message);
      return;
    }

    await user.save();
    res.status(201).send(new ApiResponse(true, constants.USER_CREATED_SUCCESSFULLY, user));
  } catch (ex) {
    handleCommonError(res, ex);
  }
}

async function validateUserCredentials(req, res) {
  try {
    const { email, password } = req.body;
    // ToDo: Validate email and password

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

    const authToken = generateLoginToken({ id: user.id });
    res.send(new ApiResponse(true, constants.VALID_USER_CREDENTIALS, { authToken }));
  } catch (ex) {
    handleCommonError(res, ex);
  }
}

async function getUserDetails(req, res) {
  try {
    res.send(new ApiResponse(true, "", req.stash.user));
  } catch (ex) {
    handleCommonError(res, ex);
  }
}

module.exports = {
  createUser,
  validateUserCredentials,
  getUserDetails,
};
