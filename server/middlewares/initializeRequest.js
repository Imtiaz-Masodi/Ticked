function initializeRequest(req, res, next) {
  // Initializing the stash object in request.
  // It'll be used to store intermediate data
  // like storing user obj after authenticating
  req.stash = {};
  next();
}

module.exports = {
  initializeRequest,
};
