const ApiResponse = require("../pojo/ApiResponse");
const constants = require("./constants");

function handleCors(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");

  if ("OPTIONS" === req.method) {
    res.status(200).send(200);
  } else {
    next();
  }
}

function handleCommonError(res, ex) {
  sendErrorResponse(res, 500, `${constants.INTERNAL_SERVER_ERROR}\n${ex.message}`);
}

function handleInvalidMongoSchemaError(res, errors) {
  sendErrorResponse(res, 400, `${constants.INVALID_PAYLOAD} ${errors}`);
}

function sendErrorResponse(res, errorStatus = 500, errorMessage) {
  try {
    if (!res || res.headersSent) return;
    res.status(errorStatus).send(new ApiResponse(false, errorMessage));
  } catch (ex) {
    console.log(ex);
  }
}

function generateRandomColorHexCode() {
  // Generate a random integer between 0 and 16777215 (0xFFFFFF)
  const randomColor = Math.floor(Math.random() * 0xffffff);
  // Convert the integer to a hex string and pad with leading zeros if necessary
  return `#${randomColor.toString(16).padStart(6, "0")}`;
}

module.exports = {
  handleCors,
  handleCommonError,
  handleInvalidMongoSchemaError,
  generateRandomColorHexCode,
};
