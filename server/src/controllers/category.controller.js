const path = require("path");
const mongoose = require("mongoose");
const { Category } = require("../models/category.model");
const asyncWrapper = require("../middlewares/handlers/asyncWrapper");
const AppError = require("../utils/errorHelpers/appError.formate");

let CreateCategoryHandler = asyncWrapper(async (req, res, next) => {
    const { name, description, isActive, order } = req.body;

    let imageUrl = null;
    if (req.file) {
        const fileName = req.file.filename;
        const folderPath = path.join("uploads", "images", "categories");
        imageUrl = `${req.protocol}://${req.get("host")}/${folderPath.replace(/\\/g, "/")}/${fileName}`;
    }

    // Check if category already exists
    const existing = await Category.findOne({ name });
    if (existing) return next(new AppError("Category already exists", 400));

    // Convert values properly
    const isActiveBool = isActive === "true" || isActive === true;
    const orderNum = Number(order) || 0;

    const category = await Category.create({
        name,
        description,
        image: imageUrl,
        isActive: isActiveBool,
        order: orderNum
    });

    res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: category
    });
});


let UpdateCategoryHandler = asyncWrapper(async (req, res, next) => {
    const { categoryid } = req.params;
    const { name, description, isActive, order } = req.body;
    let updateData = { name, description };
    // Handle image upload if present
    if (req.file) {
        const fileName = req.file.filename;
        const folderPath = path.join("uploads", "categories");
        updateData.image = `${req.protocol}://${req.get("host")}/${folderPath.replace(/\\/g, "/")}/${fileName}`;
    }
    // Handle optional fields properly
    if (typeof isActive !== "undefined") {
        updateData.isActive = isActive === "true" || isActive === true;
    }
    if (typeof order !== "undefined") {
        updateData.order = Number(order);
    }
    const category = await Category.findByIdAndUpdate(
        categoryid,
        { $set: updateData },
        { new: true, runValidators: true }
    );
    if (!category) return next(new AppError("Category not found", 404));
    res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: category,
    });
});

const DeleteCategoryHandler = asyncWrapper(async (req, res, next) => {
    const { categoryid } = req.params;
    const category = await Category.findByIdAndDelete(categoryid);
    if (!category) return next(new AppError("Category not found", 404));
    res.status(200).json({ success: true, message: "Category deleted successfully" });
});

let GetCategoryByIdHandler = asyncWrapper(async (req, res, next) => {
    const { categoryid } = req.params;
    const category = await Category.findById(categoryid);
    if (!category) return next(new AppError("Category not found", 404));
    res.status(200).json({ success: true, data: category });
});

let SearchCategoryHandler = asyncWrapper(async (req, res, next) => {
    const { id, q } = req.query;

    let query = {};

    if (id && mongoose.Types.ObjectId.isValid(id)) {
        query._id = id;
    }

    if (q) {
        query.$or = [
            { name: { $regex: q, $options: "i" } },
            { description: { $regex: q, $options: "i" } }
        ];
    }

    const categories = await Category.find(query);

    if (!categories.length) {
        return res.status(404).json({
            success: false,
            message: "No categories found"
        });
    }

    res.status(200).json({
        success: true,
        results: categories.length,
        data: categories
    });
});

let GetAllCategoriesHandler = asyncWrapper(async (req, res, next) => {
    const categories = await Category.find({ isActive: true });
    res.status(200).json({ success: true, results: categories.length, data: categories });
});

module.exports = {
    CreateCategoryHandler,
    UpdateCategoryHandler,
    DeleteCategoryHandler,
    GetCategoryByIdHandler,
    SearchCategoryHandler,
    GetAllCategoriesHandler,
};
