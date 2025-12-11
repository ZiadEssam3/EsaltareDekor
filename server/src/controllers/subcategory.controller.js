const path = require("path");
const mongoose = require("mongoose");

const { SubCategory } = require("../models/subcategory.model");
const { Category } = require("../models/category.model");
const AppError = require("../utils/errorHelpers/appError.formate");
const asyncWrapper = require("../middlewares/handlers/asyncWrapper");

let CreateSubCategoryHandler = asyncWrapper(async (req, res, next) => {
    const { name, description, order, isActive, categoryId } = req.body;
    // 1. Validate categoryId
    if (!categoryId) {
        return next(new AppError("Category ID is required", 400));
    }
    // 2. Ensure parent category exists
    const category = await Category.findById(categoryId);
    if (!category) {
        return next(new AppError("Category not found", 404));
    }
    // 3. Check if a subcategory with the same name already exists in this category
    const existingSubCategory = await SubCategory.findOne({
        name: name,
        categoryId: categoryId
    });
    if (existingSubCategory) {
        return next(new AppError("Subcategory already exists.", 409));
    }
    // 4. Handle uploaded image
    let imageUrl = null;
    if (req.file) {
        imageUrl = `${req.protocol}://${req.get("host")}/uploads/images/subcategories/${req.file.filename}`;
    }
    // 5. Create subcategory
    const subCategory = await SubCategory.create({
        name,
        description,
        image: imageUrl,
        order,
        isActive,
        categoryId,
    });
    res.status(201).json({
        success: true,
        message: "Subcategory created successfully",
        data: subCategory,
    });
});

let UpdateSubCategoryHandler = asyncWrapper(async (req, res, next) => {
    const { subcategoryid } = req.params;
    const { name, description, order, isActive, categoryId } = req.body;
    // Ensure parent category exists (if categoryId is provided)
    if (categoryId) {
        const category = await Category.findById(categoryId);
        if (!category) return next(new AppError("Category not found", 404));
    }
    // Build update object
    let updateData = { name, description, order, isActive, categoryId };
    // If an image was uploaded, add its URL
    if (req.file) {
        updateData.image = `${req.protocol}://${req.get("host")}/uploads/images/subcategories/${req.file.filename}`;
    }
    // Update subcategory
    const subCategory = await SubCategory.findByIdAndUpdate(subcategoryid, updateData, {
        new: true,
        runValidators: true,
    });
    if (!subCategory) return next(new AppError("SubCategory not found", 404));
    res.status(200).json({
        success: true,
        message: "SubCategory updated successfully",
        data: subCategory,
    });
});

let DeleteSubCategoryHandler = asyncWrapper(async (req, res, next) => {
    const { subcategoryid } = req.params;
    const subCategory = await SubCategory.findByIdAndDelete(subcategoryid);
    if (!subCategory) return next(new AppError("SubCategory not found", 404));
    res.status(200).json({ success: true, message: "SubCategory deleted successfully" });
});

let ToggleSubCategoryStatusHandler = asyncWrapper(async (req, res, next) => {
    const { subcategoryid } = req.params;
    const subCategory = await SubCategory.findById(subcategoryid);
    if (!subCategory) return next(new AppError("SubCategory not found", 404));
    subCategory.isActive = !subCategory.isActive;
    await subCategory.save();
    res.status(200).json({ success: true, data: subCategory });
});

let GetAllSubCategoriesHandler = asyncWrapper(async (req, res, next) => {
    const subCategories = await SubCategory.find()
        .populate("categoryId", "name");
    res.status(200).json({
        success: true,
        count: subCategories.length,
        data: subCategories
    });
});

let GetSubCategoryByIdHandler = asyncWrapper(async (req, res, next) => {
    const { subcategoryid } = req.params;
    const subCategory = await SubCategory.findById(subcategoryid)
        .populate("categoryId", "name");
    if (!subCategory) return next(new AppError("SubCategory not found", 404));
    res.status(200).json({ success: true, data: subCategory });
});


let GetActiveSubCategoriesHandler = asyncWrapper(async (req, res, next) => {
    const subCategories = await SubCategory.find({ isActive: true }).populate("categoryId", "name");
    res.status(200).json({
        success: true,
        results: subCategories.length,
        data: subCategories
    });
});


// const GetSubCategoriesByCategoryHandler = asyncWrapper(async (req, res, next) => {
//     const { categoryId } = req.params;
//     const subCategories = await SubCategory.find({ category: categoryId, isActive: true });
//     res.status(200).json({ success: true, results: subCategories.length, data: subCategories });
// });

let SearchSubCategoriesHandler = asyncWrapper(async (req, res, next) => {
    const { id, q } = req.query;

    let query = {};

    // Only add _id to the query if it is a valid ObjectId
    if (id && mongoose.Types.ObjectId.isValid(id)) {
        query._id = id;
    }


    // If `q` exists, search name or description
    if (q) {
        const regex = new RegExp(q, "i"); // case-insensitive
        query.$or = [
            { name: regex },
            { description: regex }
        ];
    }

    // Filter only active subcategories
    query.isActive = true;

    const subCategories = await SubCategory.find(query);

    if (!subCategories.length) {
        return res.status(404).json({
            success: false,
            message: "No subcategories found"
        });
    }

    res.status(200).json({
        success: true,
        results: subCategories.length,
        data: subCategories
    });
});




module.exports = {
    CreateSubCategoryHandler,
    UpdateSubCategoryHandler,
    DeleteSubCategoryHandler,
    ToggleSubCategoryStatusHandler,
    GetAllSubCategoriesHandler,
    GetSubCategoryByIdHandler,
    GetActiveSubCategoriesHandler,
    // GetSubCategoriesByCategoryHandler,
    SearchSubCategoriesHandler,
};
