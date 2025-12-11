const { Coupon } = require("../models/coupon.model");
const { Product } = require("../models/product.model");
const asyncWrapper = require("../middlewares/handlers/asyncWrapper");
const AppError = require("../utils/errorHelpers/appError.formate");

const createCoupon = asyncWrapper(async (req, res, next) => {
    const { discountType, discountValue, expiresAt, appliesTo, oneTimeUse, maxUsage } = req.body;
    if (discountType === "percentage" && discountValue > 100) {
        return next(new AppError("Percentage cannot exceed 100", 400));
    }
    const coupon = await Coupon.create({
        discountType,
        discountValue,
        appliesTo,
        expiresAt,
        oneTimeUse,
        maxUsage
    });
    res.status(201).json({
        success: true,
        message: "Coupon created successfully",
        data: coupon
    });
});

const getCoupons = asyncWrapper(async (req, res) => {
    const coupons = await Coupon.find().populate("appliesTo");
    res.status(200).json({
        success: true,
        data: coupons
    });
});


const applyCoupon = asyncWrapper(async (req, res, next) => {
    const { code, productId } = req.body;
    if (!code || !productId) {
        return next(new AppError("Coupon code and productId are required", 400));
    }
    const coupon = await Coupon.findOne({ code, isActive: true });
    if (!coupon) return next(new AppError("Invalid or expired coupon", 404));

    if (coupon.expiresAt && coupon.expiresAt < Date.now()) {
        return next(new AppError("Coupon expired", 400));
    }
    // Check if max usage is reached
    if (coupon.usageCount >= coupon.maxUsage) {
        coupon.isActive = false;
        await coupon.save();
        return next(new AppError("Coupon has already been fully used", 400));
    }
    // Check product-specific or global coupon
    if (coupon.appliesTo && coupon.appliesTo.toString() !== productId) {
        return next(new AppError("Coupon does not apply to this product", 400));
    }
    const product = await Product.findById(productId);
    if (!product) return next(new AppError("Product not found", 404));
    let finalPrice = product.price;
    if (coupon.discountType === "percentage") {
        finalPrice = product.price - (product.price * coupon.discountValue) / 100;
    } else if (coupon.discountType === "fixed") {
        finalPrice = Math.max(0, product.price - coupon.discountValue);
    }
    // Update coupon usage
    coupon.usageCount += 1;

    if (coupon.oneTimeUse || coupon.usageCount >= coupon.maxUsage) {
        coupon.isActive = false;
    }
    await coupon.save();
    res.status(200).json({
        success: true,
        message: "Coupon applied successfully",
        originalPrice: product.price,
        finalPrice,
        discount: coupon.discountValue,
        type: coupon.discountType,
        remainingUses: Math.max(0, coupon.maxUsage - coupon.usageCount)
    });
});


const deleteCoupon = asyncWrapper(async (req, res) => {
    await Coupon.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Coupon deleted" });
});

module.exports = {
    createCoupon,
    applyCoupon,
    getCoupons,
    deleteCoupon
};
