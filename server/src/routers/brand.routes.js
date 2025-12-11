const express = require("express");
const router = express.Router();
const {
    CreateBrandHandler,
    UpdateBrandHandler,
    DeleteBrandHandler,
    ToggleBrandStatusHandler,
    GetAllBrandsHandler,
    GetActiveBrandsHandler,
    GetBrandByIdHandler,
    SearchBrandHandler,
} = require("../controllers/brand.controller");

const { authenticate } = require("../middlewares/auth/authenticate.middleware");
const { authorizeRole } = require("../middlewares/auth/authorizeRoles.middleware");
const { uploadSingle } = require("../middlewares/uploads/upload.middleware");

// =============================================== Admin Routes ====================================================
router.post("/", authenticate, authorizeRole("admin"), uploadSingle("brandImage"), CreateBrandHandler);
router.put("/:brandid", authenticate, authorizeRole("admin"), uploadSingle("brandImage"), UpdateBrandHandler);
router.delete("/:brandid", authenticate, authorizeRole("admin"), DeleteBrandHandler);
router.patch("/:brandid/status", authenticate, authorizeRole("admin"), ToggleBrandStatusHandler);
router.get("/search", authenticate, authorizeRole("admin"), SearchBrandHandler);
router.get("/", authenticate, authorizeRole("admin"), GetAllBrandsHandler);
router.get("/:brandid", authenticate, authorizeRole("admin"), GetBrandByIdHandler);
// =============================================== PUBLIC(USER) Routes ====================================================
router.get("/active/all", GetActiveBrandsHandler);
module.exports = router;
