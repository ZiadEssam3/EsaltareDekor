const { body, validationResult } = require("express-validator");

const forgetpasswordValidator = [
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format"),
];

module.exports = {
    forgetpasswordValidator
}