const express = require("express");
const { createCoupon, applyCoupon, getCoupons, deleteCoupon } = require("../controllers/coupon.controller");
const { authorizeRole } = require("../middlewares/auth/authorizeRoles.middleware");
const { authenticate } = require("../middlewares/auth/authenticate.middleware");

const router = express.Router();

// Admin creates coupon
router.post("/", authenticate, authorizeRole("admin"), createCoupon);
// User applies coupon
router.post("/apply", authenticate, authorizeRole("user"), applyCoupon);
// Admin gets all coupons
router.get("/", authenticate, authorizeRole("admin"), getCoupons);
// Admin deletes coupon
router.delete("/:id", authenticate, authorizeRole("admin"), deleteCoupon);

module.exports = router;
