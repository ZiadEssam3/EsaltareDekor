const { Compare } = require("../models/compare.model");
const { Product } = require("../models/product.model");
const asyncWrapper = require("../middlewares/handlers/asyncWrapper");
const AppError = require("../utils/errorHelpers/appError.formate");

// Add product to compare
const addToCompareHandler = asyncWrapper(async (req, res, next) => {
    const userId = req.user._id;
    const { productId } = req.params;

    if (!productId) {
        return next(new AppError("Product ID is required", 400));
    }

    const product = await Product.findById(productId);
    if (!product) return next(new AppError("Product not found", 404));

    let compareList = await Compare.findOne({ user: userId });
    if (!compareList) {
        compareList = await Compare.create({ user: userId, products: [productId] });
        return res.status(201).json({
            success: true,
            message: "Product added to compare",
            data: compareList
        });
    }

    if (compareList.products.includes(productId)) {
        return res.status(200).json({
            success: false,
            message: "Product is already in compare list",
            data: compareList
        });
    }

    compareList.products.push(productId);
    await compareList.save();
    res.status(200).json({
        success: true,
        message: "Product added to compare",
        data: compareList
    });
});

// Get all products in compare
const getCompareHandler = asyncWrapper(async (req, res, next) => {
    const userId = req.user._id;
    const compareList = await Compare.findOne({ user: userId }).populate("products");

    if (!compareList) {
        return res.status(200).json({ success: true, results: 0, data: [] });
    }

    res.status(200).json({
        success: true,
        count: compareList.products.length,
        data: compareList.products
    });
});

// Remove a product from compare
const removeFromCompareHandler = asyncWrapper(async (req, res, next) => {
    const userId = req.user._id;
    const { productId } = req.params;

    const compareList = await Compare.findOne({ user: userId });
    if (!compareList || !compareList.products.includes(productId)) {
        return next(new AppError("Product not found in compare list", 404));
    }

    compareList.products = compareList.products.filter(p => p.toString() !== productId);
    await compareList.save();

    res.status(200).json({
        success: true,
        message: "Product removed from compare list",
        data: compareList
    });
});

// Clear compare list
const clearCompareHandler = asyncWrapper(async (req, res, next) => {
    const userId = req.user._id;
    const compareList = await Compare.findOne({ user: userId });

    if (compareList) {
        compareList.products = [];
        await compareList.save();
    }

    res.status(200).json({
        success: true,
        message: "Compare list cleared",
        data: []
    });
});

module.exports = {
    addToCompareHandler,
    getCompareHandler,
    removeFromCompareHandler,
    clearCompareHandler
};
