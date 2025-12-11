const multer = require("multer");
const { storage, fileFilter, limits } = require("../../config/uploads/upload.config");
const AppError = require("../../utils/errorHelpers/appError.formate");

// Create multer instance
const upload = multer({
    storage,
    fileFilter,
    limits,
});

// Wrapper to handle errors from multer
const handleMulter = (middleware) => {
    return (req, res, next) => {
        middleware(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                // Multer built-in errors
                if (err.code === "LIMIT_FILE_SIZE") {
                    return next(new AppError("File too large. Max 10MB allowed.", 400));
                }
                return next(new AppError(`Multer error: ${err.message}`, 400));
            } else if (err) {
                // Custom fileFilter or unexpected errors
                return next(new AppError(err.message || "File upload failed.", 400));
            }
            next();
        });
    };
};

// Export ready-to-use middleware options with error handling
module.exports = {
    uploadSingle: (fieldName) => handleMulter(upload.single(fieldName)),
    uploadArray: (fieldName, maxCount = 5) => handleMulter(upload.array(fieldName, maxCount)),
    uploadFields: (fieldsArray) => handleMulter(upload.fields(fieldsArray)),
    rawMulter: upload, // in case you need raw multer without error wrapping
};
