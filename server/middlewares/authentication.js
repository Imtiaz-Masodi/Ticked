const ApiResponse = require("../pojo/ApiResponse");
const { handleCommonError } = require("../utils");
const constants = require("../utils/constants");
const jwt = require("../helpers/jwt");
const User = require("../models/User");

async function authentication(req, res, next) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      res.status(401).send(new ApiResponse(false, constants.AUTH_TOKEN_REQUIRED));
      return;
    }

    const parsedToken = await jwt.parseToken(token);
    if (!Boolean(parsedToken?.id)) {
      res.status(401).send(new ApiResponse(false, constants.INVALID_AUTH_TOKEN));
      return;
    }

    const user = await User.findById(parsedToken.id);
    req.stash.user = user;
    next();
  } catch (ex) {
    if (ex.name === "TokenExpiredError") {
      res.status(401).send(new ApiResponse(false, constants.AUTH_TOKEN_EXPIRED));
      return;
    }
    handleCommonError(res, ex);
  }
}

module.exports = {
  authentication,
};
