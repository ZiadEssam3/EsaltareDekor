// routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const {
    createReviewHandler,
    getReviewsByProductHandler,
    deleteReviewHandler,
} = require("../controllers/review.controller");

const { authenticate } = require("../middlewares/auth/authenticate.middleware");
const { authorizeRole } = require("../middlewares/auth/authorizeRoles.middleware");

router.post("/:productId", authenticate, authorizeRole('user'), createReviewHandler);
router.get("/:productId", getReviewsByProductHandler);
router.delete("/:reviewId", authenticate, authorizeRole('admin'), deleteReviewHandler);

module.exports = router;
