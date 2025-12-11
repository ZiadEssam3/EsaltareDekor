const bcrypt = require('bcrypt');
const path = require('path');
const jwt = require("jsonwebtoken");
const { User } = require('../models/user.model');
const AppError = require('../utils/errorHelpers/appError.formate');
const asyncWrapper = require("../middlewares/handlers/asyncWrapper");
const { GenerateVerificationToken, GenerateAccessToken, GenerateRefreshToken, GenerateResetPasswordToken } = require('../utils/token/jwt.helper');
const { sendVerificationEmail, sendResetPasswordEmail } = require("../utils/Email/emailService");

let signupHandler = asyncWrapper(async (req, res, next) => {
    const { username, email, password, role, phone, address } = req.body;
    let profilePicture = null;
    let fileName = null;
    if (req.file) {
        fileName = req.file.filename;
        // Construct the URL to match the new file path
        const userId = req.user?._id?.toString() || "anonymous";
        const folderPath = path.join("uploads", "images", "users", `user_${userId}`);
        profilePicture = `${req.protocol}://${req.get('host')}/${folderPath.replace(/\\/g, '/')}/${fileName}`;
    }

    // 1. Validate required fields
    if (!username || !email || !password) {
        throw new AppError("Username, email, and password are required", 400);
    }
    // 2. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(new AppError("User already exists", 400));

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4. Create user
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        role,
        profilePicture,
        phone: phone || "",
        address: {
            street: address?.street || "",
            city: address?.city || "",
            state: address?.state || "",
            postalCode: address?.postalCode || "",
            country: address?.country || ""
        },
        isVerified: false,
        lastLogin: {
            date: null,
            isLoggedIn: false
        }
    });
    // 5. Generate verification token & send email
    const verificationToken = GenerateVerificationToken(newUser._id);
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    await sendVerificationEmail(newUser.email, newUser.username, verificationLink);
    // 6. Respond
    res.status(201).json({
        status: "success",
        message: "User created successfully. Please verify your email.",
        data: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            phone: newUser.phone,
            address: newUser.address,
            profilePicture: profilePicture,
            role: newUser.role,
            isVerified: newUser.isVerified,
            createdAt: newUser.createdAt
        }
    });
});

let VerifyEmail = asyncWrapper(async (req, res, next) => {
    const { token } = req.query;
    if (!token) {
        throw new AppError("Invalid or missing token", 400);
    }
    const decoded = jwt.verify(token, process.env.JWT_VERIFICATION_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
        throw new AppError("User not found", 404);
    }
    if (user.isVerified) {
        return res.status(200).json({
            status: "success",
            message: "Email is already verified!"
        });
    }
    user.isVerified = true;
    await user.save();
    res.status(200).json({
        status: "success",
        message: "Email verified successfully!"
    });
});

let loginHandler = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    // 1. Find user by email
    const user = await User.findOne({ email });
    // 2. Check if user exists
    if (!user) {
        return next(new AppError('Invalid Email or Password', 401));
    }
    // 3. Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new AppError('Invalid Email or Password', 401));
    }
    // 4. Check if user is verified
    if (user.isVerified === false) {
        return next(new AppError('User Not Verified', 401));
    }
    // 5. Update lastLogin and isLoggedIn fields
    await User.findOneAndUpdate(
        { _id: user._id },
        {
            $set: {
                'lastLogin.date': new Date(),
                'lastLogin.isLoggedIn': true
            }
        },
        { new: true, runValidators: true }
    );
    // 6. Generate tokens
    const accessToken = GenerateAccessToken(user._id, user.email, user.role);
    const refreshToken = GenerateRefreshToken(user._id, user.email, user.role);
    // 7. Set refresh token cookie and send response
    res.cookie('_rftq', refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.status(201).json({
        message: 'User Logged In Successfully!',
        accessToken
    });
});

let logoutHandler = asyncWrapper(async (req, res, next) => {
    const userId = req.user._id;
    if (userId) {
        await User.findOneAndUpdate(
            { _id: userId },
            { $set: { 'lastLogin.isLoggedIn': false } },
            { new: true }
        );
    }
    res.clearCookie("_rftq");
    // Send a success response
    res.status(200).json({ success: true, message: "Logged out successfully" });
});

let forgotPasswordHandler = asyncWrapper(async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return next(new AppError("Please provide an email", 400));
    }
    // 1- Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        return next(new AppError("User not found with this email", 404));
    }

    // 2- Generate JWT reset token (short-lived)
    const resetToken = GenerateResetPasswordToken(user._id, user.email);
    // 3- Create reset link
    const resetLink = `${req.protocol}://${req.get("host")}/api/v1/users/reset-password/${resetToken}`;
    // 4- Send email (replace with your email sender)
    await sendResetPasswordEmail(user.email, user.username, resetLink);
    // Debug purpose only
    console.log("Password reset link:", resetLink);
    // 5- Respond
    res.status(200).json({
        success: true,
        message: "Password reset link has been sent to your email",
        resetLink, // ⚠️ remove this in production
    });
});

let ResetPasswordHandler = asyncWrapper(async (req, res, next) => {
    const { token } = req.params;
    const { password } = req.body;
    if (!token) {
        return next(new AppError("Reset token is required", 400));
    }
    if (!password) {
        return next(new AppError("Password is required", 400));
    }
    // 1- Verify token
    const decoded = jwt.verify(token, process.env.JWT_RESET_PASSWORD_SECRET);
    // 2- Find user by id
    const user = await User.findById(decoded.userId);
    if (!user) {
        return next(new AppError("User not found", 404));
    }
    // 3- Update password
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.status(200).json({
        success: true,
        message: "Password has been reset successfully",
    });
});

let GetAllUsersHandler = asyncWrapper(async (req, res, next) => {
    const users = await User.find().select("-password");
    res.status(200).json({
        success: true,
        count: users.length,
        data: users,
    });
});

let DeleteUserHandler = asyncWrapper(async (req, res, next) => {
    const { userid } = req.params;
    const user = await User.findByIdAndDelete(userid);
    if (!user) {
        return next(new AppError("User not found", 404));
    }
    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
});

let UpdateUserHandler = asyncWrapper(async (req, res, next) => {
    const { userid } = req.params; 
    const { username, email, role, phone, address } = req.body;
    const updatedUser = await User.findByIdAndUpdate(userid,
        { username, email, role, phone, address },
        { new: true, runValidators: true }).select("-password");
    if (!updatedUser) {
        return next(new AppError("User not found", 404));

    }
    res.status(200).json(
        {
            success: true,
            message: "User updated successfully",
            data: updatedUser,
        });
});


let GetCurrentUserProfileHandler = asyncWrapper(async (req, res, next) => {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
        return next(new AppError("User not found", 404));
    }
    res.status(200).json({
        success: true,
        data: user,
    });
});


let UpdateUserProfileHandler = asyncWrapper(async (req, res, next) => {
    const { username, phone, address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                username: username || req.user.username,
                phone: phone || req.user.phone,
                address: address || req.user.address,
            },
        },
        { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
        return next(new AppError("User not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updatedUser,
    });
});

module.exports = {
    signupHandler,
    VerifyEmail,
    loginHandler,
    logoutHandler,
    forgotPasswordHandler,
    ResetPasswordHandler,
    GetAllUsersHandler,
    DeleteUserHandler,
    UpdateUserHandler,
    GetCurrentUserProfileHandler,
    UpdateUserProfileHandler
}