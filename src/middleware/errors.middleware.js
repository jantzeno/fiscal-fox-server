const createError = require("http-errors");

// 404 Error
exports.error404 = (req, res, next) => {
  next(createError(404, "Not found"));
};

// 500 Error
exports.error500 = (error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
};
