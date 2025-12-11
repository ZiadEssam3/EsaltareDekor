const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * @function GenerateVerificationToken
 * @desc Generates a short-lived JWT token for email verification
 * @param {string} userId - Unique ID of the user
 * @returns {string} Signed JWT verification token valid for 15 minutes
 */
function GenerateVerificationToken(userId) {
    const payload = { userId };
    const secretKey = process.env.JWT_VERIFICATION_SECRET;
    if (!secretKey) throw new Error("JWT_VERIFICATION_SECRET is not defined in .env");
    const options = { expiresIn: "15m" };
    return jwt.sign(payload, secretKey, options);
}


/**
 * @function GenerateAccessToken
 * @desc Generates a short-lived JWT access token for authentication
 * @param {string} userId - Unique ID of the user
 * @param {string} email - Email of the user
 * @returns {string} Signed JWT access token valid for 1 hour
 */
function GenerateAccessToken(userId, email, role) {
    const payload = {
        _id: userId,
        email,
        role
    };
    const secretKey = process.env.JWT_ACCESS_TOKEN_SECRET;
    const options = { expiresIn: '30m' };
    return jwt.sign(payload, secretKey, options);
}

/**
 * @function GenerateRefreshToken
 * @desc Generates a long-lived JWT refresh token to renew access tokens
 * @param {string} userId - Unique ID of the user
 * @param {string} email - Email of the user
 * @returns {string} Signed JWT refresh token valid for 1 year
 */

function GenerateRefreshToken(userId, email, role) {
    const payload = { userId, email, role };
    const secretKey = process.env.JWT_REFRESH_TOKEN_SECRET;
    const options = { expiresIn: '1y' };
    return jwt.sign(payload, secretKey, options);
}

/**
 * @function GenerateResetPasswordToken
 * @desc Generates a short-lived JWT token for password reset
 * @param {string} userId - Unique ID of the user
 * @param {string} email - Email of the user (optional but recommended)
 * @returns {string} Signed JWT reset token valid for 15 minutes
 */
function GenerateResetPasswordToken(userId, email) {
    const payload = { userId, email };
    const secretKey = process.env.JWT_RESET_PASSWORD_SECRET;
    if (!secretKey) throw new Error("JWT_RESET_PASSWORD_SECRET is not defined in .env");
    const options = { expiresIn: "15m" }; // short lifetime for security
    return jwt.sign(payload, secretKey, options);
}




module.exports = {
    GenerateAccessToken,
    GenerateRefreshToken,
    GenerateVerificationToken,
    GenerateResetPasswordToken
};