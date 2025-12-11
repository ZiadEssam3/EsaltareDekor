require("dotenv").config();
const nodemailer = require("nodemailer");

const emailUser = process.env.EMAIL_USER
const passUser = process.env.EMAIL_PASS

async function sendEmail(to, subject, html) {
    try {
        // Create transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: emailUser,
                pass: passUser,
            },
        });

        // Email options
        const mailOptions = {
            from: `MyApp Support" <${emailUser}>`,
            to,
            subject,
            html,
        };
        // Send email
        await transporter.sendMail(mailOptions);
        console.log("Email sent to:", to);
    } catch (err) {
        console.error("Email sending failed:", err.message);
        throw new Error("Failed to send email");
    }
}

module.exports = {
    sendEmail
};