const express = require("express");
const router = express.Router();
const {
    getAllOrders,
    createOrder,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
    getTotalSales,
    getTotalOrders,
    getUserOrders
} = require("../controllers/order.controller");
const { authenticate } = require("../middlewares/auth/authenticate.middleware");
const { authorizeRole } = require("../middlewares/auth/authorizeRoles.middleware");
// ==================================== ADMIN ROUTES ===========================================
router.get("/", authenticate, authorizeRole("admin"), getAllOrders);
router.put("/:orderId", authenticate, authorizeRole("admin"), updateOrderStatus);
router.delete("/:orderId", authenticate, authorizeRole("admin"), deleteOrder);
// ==================================== USER ROUTES ===========================================
router.post("/", authenticate, authorizeRole("user"), createOrder);
router.get("/userorders/:userId", authenticate, authorizeRole("user"), getUserOrders);

// ==================================== USER AND ADMIN ROUTES ===========================================
router.get("/:orderId", authenticate, getOrderById);

// analysis
router.get("/get/totalsales", authenticate, authorizeRole("admin"), getTotalSales);
router.get("/get/totalorders", authenticate, authorizeRole("admin"), getTotalOrders);

module.exports = router;
