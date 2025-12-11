const multer = require("multer");
const path = require("path");
const fs = require("fs");
const AppError = require("../../utils/errorHelpers/appError.formate");

// Allowed image types
const allowedImageTypes = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

// Determine dynamic folder path based on file.fieldname
const getUploadFolder = (req, file) => {
  const userId = req.user?._id?.toString() || "anonymous";
  const productId = req.params?.productId || "general";

  switch (file.fieldname) {
    case "profilePicture":
      // Added 'images' to the path
      return path.join("uploads", "images", "users", `user_${userId}`);
    case "mainImage":
      return path.join("uploads", "images", "products", `product_${productId}`, "main");
    case "gallery":
      return path.join("uploads", "images", "products", `product_${productId}`, "gallery");
    case "categoryImage":
      return path.join("uploads", "images", "categories");
    case "subcategoryImage":
      return path.join("uploads", "images", "subcategories");
    case "brandImage":
      return path.join("uploads", "images", "brands");
    default:
      return path.join("uploads", "others");
  }
};

// Storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = getUploadFolder(req, file);
    fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "-");
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${baseName}${ext}`;
    cb(null, uniqueName);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedImageTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new AppError("Only image files are allowed."), false);
  }
};

// Limits
const limits = {
  fileSize: 10 * 1024 * 1024, // 10MB max
};

module.exports = {
  storage,
  fileFilter,
  limits,
};
