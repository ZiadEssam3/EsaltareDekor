const express = require("express");
const { authenticate } = require("../middlewares/auth/authenticate.middleware");
const { authorizeRole } = require("../middlewares/auth/authorizeRoles.middleware");
const { getAdminAnalytics, getUserHomePage } = require("../controllers/analytics.controller");

const router = express.Router();

// Admin-only route
router.get("/admin", authenticate, authorizeRole("admin"), getAdminAnalytics);
router.get("/home", getUserHomePage);

module.exports = router;
