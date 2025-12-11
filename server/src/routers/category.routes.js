const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth/authenticate.middleware");
const { authorizeRole } = require("../middlewares/auth/authorizeRoles.middleware");
const { uploadSingle } = require("../middlewares/uploads/upload.middleware");
const { CreateCategoryHandler, UpdateCategoryHandler, DeleteCategoryHandler, GetCategoryByIdHandler, SearchCategoryHandler, GetAllCategoriesHandler } = require("../controllers/category.controller");

// ============================================= ADMIN ROUTES =======================================================
router.post("/", authenticate, authorizeRole("admin"), uploadSingle('categoryImage'), CreateCategoryHandler);
router.put("/:categoryid", authenticate, authorizeRole("admin"), uploadSingle("categoryImage"), UpdateCategoryHandler);
router.delete("/:categoryid", authenticate, authorizeRole("admin"), DeleteCategoryHandler);
router.get("/search", authenticate, authorizeRole("admin"), SearchCategoryHandler);
router.get("/:categoryid", authenticate, authorizeRole("admin"), GetCategoryByIdHandler);
// ============================================= USER ROUTES ========================================================
router.get("/", GetAllCategoriesHandler);

module.exports = router;
