const HttpException = require("./HttpException");

const notFound = (req, res, next) => {
  const error = new HttpException(404, "Page not found");

  next(error);
};

const handleError = (error, req, res, next) => {
  res.status(error.status || 500).json({ error: error.message });
};
module.exports = {
  notFound,
  handleError,
};
