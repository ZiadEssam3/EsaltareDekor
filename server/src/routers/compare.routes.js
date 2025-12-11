const express = require("express");
const router = express.Router();
const {
    addToCompareHandler,
    getCompareHandler,
    removeFromCompareHandler,
    clearCompareHandler
} = require("../controllers/compare.controller");
const { authenticate } = require("../middlewares/auth/authenticate.middleware");
const { authorizeRole } = require("../middlewares/auth/authorizeRoles.middleware");

router.post("/:productId/add", authenticate, authorizeRole("user"), addToCompareHandler);
// Get all compare products
router.get("/", authenticate, authorizeRole("user"), getCompareHandler);
// Remove a product from compare
router.delete("/:productId", authenticate, authorizeRole("user"), removeFromCompareHandler);
// Clear all compare products
router.delete("/", authenticate, authorizeRole("user"), clearCompareHandler);

module.exports = router;
