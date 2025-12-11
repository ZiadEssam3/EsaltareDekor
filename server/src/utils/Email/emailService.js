const fs = require("fs");
const path = require("path");
const { sendEmail } = require("./SendEmail");


async function sendVerificationEmail(userEmail, username, verificationLink) {
    try {
        const templatePath = path.join(__dirname, "Templates", "emailVerification.html");
        let html = fs.readFileSync(templatePath, "utf-8");

        // Replace placeholders in template
        html = html.replace("{{username}}", username);
        html = html.replace("{{verificationLink}}", verificationLink);

        await sendEmail(userEmail, "Verify Your Email", html);
    } catch (err) {
        console.error("Failed to send verification email:", err.message);
    }
}

async function sendResetPasswordEmail(userEmail, username, resetLink) {
    try {
        const templatePath = path.join(__dirname, "Templates", "resetPassword.html");
        let html = fs.readFileSync(templatePath, "utf-8");

        // Replace placeholders
        html = html.replace("{{username}}", username);
        html = html.replace("{{resetLink}}", resetLink);

        await sendEmail(userEmail, "Reset Your Password", html);
    } catch (err) {
        console.error("Failed to send reset password email:", err.message);
    }
}

module.exports = {
    sendResetPasswordEmail,
    sendVerificationEmail
};
