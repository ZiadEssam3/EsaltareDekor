const { validationResult } = require('express-validator');
const fs = require('fs');
const AppError = require('../../utils/errorHelpers/appError.formate');
const { ERRORS, STATUS_CODES } = require('../../utils/errorHelpers/Error.constants');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If validation fails, manually delete the uploaded file
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error("Failed to delete file:", err);
            });
        }
        return next(
            new AppError(
                ERRORS.VALIDATION_ERROR,
                STATUS_CODES.BAD_REQUEST,
                errors.array().map(err => ({ field: err.param, message: err.msg }))
            )
        );
    }
    next();
};

module.exports = validateRequest;