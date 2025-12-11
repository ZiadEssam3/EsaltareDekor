// routes/subcategory.routes.js
const express = require("express");
const router = express.Router();
const {
    CreateSubCategoryHandler,
    UpdateSubCategoryHandler,
    DeleteSubCategoryHandler,
    ToggleSubCategoryStatusHandler,
    GetAllSubCategoriesHandler,
    GetSubCategoryByIdHandler,
    // GetSubCategoriesByCategoryHandler,
    SearchSubCategoriesHandler,
    GetActiveSubCategoriesHandler,
} = require("../controllers/subcategory.controller");
const { uploadSingle } = require("../middlewares/uploads/upload.middleware");
const { authenticate } = require("../middlewares/auth/authenticate.middleware");
const { authorizeRole } = require("../middlewares/auth/authorizeRoles.middleware");

// =================== ADMIN ROUTES ===================
router.post("/", authenticate, authorizeRole("admin"), uploadSingle("subcategoryImage"), CreateSubCategoryHandler);
router.put("/:subcategoryid", authenticate, authorizeRole("admin"), uploadSingle("subcategoryImage"), UpdateSubCategoryHandler);
router.delete("/:subcategoryid", authenticate, authorizeRole("admin"), DeleteSubCategoryHandler);
router.patch("/:subcategoryid/status", authenticate, authorizeRole("admin"), ToggleSubCategoryStatusHandler);
router.get("/", authenticate, authorizeRole("admin"), GetAllSubCategoriesHandler); // all, including inactive
router.get("/search", authenticate, authorizeRole("admin"), SearchSubCategoriesHandler);
router.get("/:subcategoryid", authenticate, authorizeRole("admin"), GetSubCategoryByIdHandler);

// =================== USER ROUTES ===================
router.get("/public/all", authenticate, GetActiveSubCategoriesHandler); // active only
router.get("/public/:id", GetSubCategoryByIdHandler); // active only
// router.get("/public/category/:categoryId", GetSubCategoriesByCategoryHandler);

module.exports = router;
