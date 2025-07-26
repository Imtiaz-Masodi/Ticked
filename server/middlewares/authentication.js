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
    } else if (!jwt.isValidJWTToken(token)) {
      res.status(401).send(new ApiResponse(false, constants.INVALID_AUTH_TOKEN));
      return;
    }

    const parsedToken = await jwt.parseToken(token);
    if (!Boolean(parsedToken?.id)) {
      res.status(401).send(new ApiResponse(false, constants.INVALID_AUTH_TOKEN));
      return;
    }

    const user = await User.findById(parsedToken.id);
    if (!user) {
      res.status(401).send(new ApiResponse(false, constants.INVALID_AUTH_TOKEN));
      return;
    }
    req.stash.user = user;
    next();
  } catch (ex) {
    console.error("ERROR: ", ex.name, ex.message);
    if (ex.name === "TokenExpiredError") {
      res.status(401).send(new ApiResponse(false, constants.AUTH_TOKEN_EXPIRED));
      return;
    } else if (ex.name === "JsonWebTokenError") {
      res.status(401).send(new ApiResponse(false, constants.INVALID_AUTH_TOKEN));
      return;
    }
    handleCommonError(res, ex);
  }
}

module.exports = {
  authentication,
};
