const { check, validationResult } = require("express-validator");

const signupValidator = [
    check("username")
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 3, max: 50 }).withMessage("Username must be between 3 and 50 characters"),

    check("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format"),

    check("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

    check("phone")
        .optional()
        .isMobilePhone().withMessage("Invalid phone number"),

    check("address.street")
        .optional().isString().withMessage("Street must be a string"),
    check("address.city")
        .optional().isString().withMessage("City must be a string"),
    check("address.state")
        .optional().isString().withMessage("State must be a string"),
    check("address.postalCode")
        .optional().isPostalCode("any").withMessage("Invalid postal code"),
    check("address.country")
        .optional().isString().withMessage("Country must be a string"),
];

// For login
const loginValidation = [
    check("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format"),

    check("password")
        .notEmpty().withMessage("Password is required"),
];



module.exports = {
    signupValidator
}