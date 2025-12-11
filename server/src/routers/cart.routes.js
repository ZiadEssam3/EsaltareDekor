const express = require("express");
const {
    addToCartHandler,
    getCartHandler,
    updateCartItemQuantity,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    removeCartItemHandler,
    clearCartHandler
} = require("../controllers/cart.controller");

const { authenticate } = require("../middlewares/auth/authenticate.middleware");
const { authorizeRole } = require("../middlewares/auth/authorizeRoles.middleware");

const router = express.Router();
router.post("/:productId", authenticate, authorizeRole("user"), addToCartHandler);
router.get("/", authenticate, authorizeRole("user"), getCartHandler);
router.put("/:productId", authenticate, authorizeRole("user"), updateCartItemQuantity);
router.patch("/increase/:productId", authenticate, authorizeRole("user"), increaseCartItemQuantity);
router.patch("/decrease/:productId", authenticate, authorizeRole("user"), decreaseCartItemQuantity);
router.delete("/:productId", authenticate, authorizeRole("user"), removeCartItemHandler);
router.delete("/", authenticate, authorizeRole("user"), clearCartHandler);

module.exports = router;
