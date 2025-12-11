const AppError = require('../../utils/errorHelpers/appError.formate');
const { ERRORS, STATUS_CODES } = require('../../utils/errorHelpers/Error.constants');

const errorHandler = (err, req, res, next) => {
  // Set default values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Log unexpected errors
  if (!err.isOperational) {
    console.error('Unexpected Error:', err);
  }

  // Send clean response
  res.status(err.statusCode).json({
    status: err.status,
    message: err.isOperational ? err.message : ERRORS.SOMETHING_WENT_WRONG
  });
};

module.exports = errorHandler;
