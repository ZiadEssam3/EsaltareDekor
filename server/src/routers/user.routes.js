/**
 * @packages 
 **/
const express = require('express');
const router = express.Router();
/**
 * @utils
**/
const { signupHandler, VerifyEmail, loginHandler, logoutHandler, forgotPasswordHandler, ResetPasswordHandler, GetAllUsersHandler, DeleteUserHandler, UpdateUserHandler, GetCurrentUserProfileHandler, UpdateUserProfileHandler } = require('../controllers/user.controller');
const { signupValidator } = require('../middlewares/validation/signup.validator.middleware');
const validateRequest = require('../middlewares/error/validateRequest');
const { uploadSingle } = require('../middlewares/uploads/upload.middleware');
const { loginValidator } = require('../middlewares/validation/login.validator.middleware');
const { authenticate } = require('../middlewares/auth/authenticate.middleware');
const {  authorizeRole } = require('../middlewares/auth/authorizeRoles.middleware');
const { forgetpasswordValidator } = require('../middlewares/validation/forgetpassword.validator.middleware');

/**
 * @route   POST /user/signup
 * @desc    Validates and registers a new user with hashed password
 * @access  Public
 * @middleware registerValidator - Ensures required fields (email, password, username , profilePicture) are valid
 * @returns {201} User registered successfully
 * @returns {400} Validation errors
 * @returns {500} Server error
*/
router.post('/signup', uploadSingle("profilePicture"), signupValidator, validateRequest, signupHandler);
router.get('/verify-email', VerifyEmail);
router.post('/login', loginValidator, validateRequest, loginHandler);
router.post("/logout", authenticate, logoutHandler);
router.post("/forgot-password", forgetpasswordValidator, forgotPasswordHandler);
router.post("/reset-password/:token", ResetPasswordHandler);
// =============================== ADMIN ROUTES ==============================================
router.get("/", authenticate, authorizeRole("admin"), GetAllUsersHandler);
router.delete("/deleteuser/:userid", authenticate, authorizeRole("admin"), DeleteUserHandler);
router.put("/updateuser/:userid", authenticate, authorizeRole("admin"), UpdateUserHandler);
// =============================== USER ROUTES ===============================================
router.get("/user-profile", authenticate, GetCurrentUserProfileHandler);
router.put("/update-profile", authenticate, UpdateUserProfileHandler);

module.exports = router;