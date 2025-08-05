const jwt = require("jsonwebtoken");
const constants = require("../utils/constants");

function generateToken(payload = {}, expiry = constants.JWT_DEFAULT_EXPIRY) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiry });
}

function generateLoginToken(payload) {
  if (!Boolean(payload?.id)) throw new Error(constants.USER_ID_REQUIRED);
  return generateToken(payload, constants.JWT_LOGIN_TOKEN_EXPIRY);
}

function parseToken(token = "") {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(decodedToken);
    });
  });
}

function isValidJWTToken(token) {
  return token.split(".").length === 3;
}

module.exports = {
  generateToken,
  generateLoginToken,
  parseToken,
  isValidJWTToken,
};
