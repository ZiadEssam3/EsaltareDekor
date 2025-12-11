const express = require("express");
const {
    createProductHandler,
    updateProductHandler,
    deleteProductHandler,
    toggleProductHandler,
    deleteProductImageHandler,
    getAllProductsHandler,
    getActiveProductsHandler,
    searchProductsHandler,
    getProductByIdHandler,
    tagsupdateProductTagHandler
} = require("../controllers/product.controller");
const { authenticate } = require("../middlewares/auth/authenticate.middleware");
const { authorizeRole } = require("../middlewares/auth/authorizeRoles.middleware");
const { uploadFields } = require("../middlewares/uploads/upload.middleware");

const router = express.Router();
// =============================== ADMIN ROUTES ==============================================
router.post("/", authenticate, authorizeRole("admin"), uploadFields([
    { name: "mainImage", maxCount: 1 },
    { name: "gallery", maxCount: 5 },
]), createProductHandler
);
router.put("/:productId", authenticate, authorizeRole("admin"), uploadFields([
    { name: "mainImage", maxCount: 1 },
    { name: "gallery", maxCount: 5 },
]), updateProductHandler
);
router.delete("/:productId", authenticate, authorizeRole("admin"), deleteProductHandler);
router.patch("/:productId/state", authenticate, authorizeRole("admin"), toggleProductHandler);
router.delete("/:productId/images/:imageIndex", authenticate, authorizeRole("admin"), deleteProductImageHandler);
router.get("/search", authenticate, authorizeRole("admin"), searchProductsHandler);
router.get("/:productId", authenticate, authorizeRole("user"), getProductByIdHandler);
router.patch("/:id/tags",authenticate,authorizeRole("admin"),tagsupdateProductTagHandler);
// =================================== USER ROUTES ==========================================================
router.get("/", getAllProductsHandler);
router.get("/active", getActiveProductsHandler);

module.exports = router;
