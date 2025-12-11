const { Review } = require("../models/review.model");
const { Product } = require("../models/product.model");
const AppError = require("../utils/errorHelpers/appError.formate");
const asyncWrapper = require("../middlewares/handlers/asyncWrapper");

const createReviewHandler = asyncWrapper(async (req, res, next) => {
    const { productId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id;
    const product = await Product.findById(productId);
    if (!product) return next(new AppError("Product not found", 404));
    const existingReview = await Review.findOne({ product: productId, user: userId });
    if (existingReview) return next(new AppError("You already reviewed this product", 400));
    const review = await Review.create({
        product: productId,
        user: userId,
        rating,
        comment,
    });
    product.reviews.push(review._id);
    const reviews = await Review.find({ product: productId });
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    product.rating = avgRating;
    await product.save();

    res.status(201).json({
        success: true,
        message: "Review added successfully",
        data: review,
    });
});

const getReviewsByProductHandler = asyncWrapper(async (req, res, next) => {
    const { productId } = req.params;

    const reviews = await Review.find({ product: productId })
        .populate("user", "username email");

    res.status(200).json({
        success: true,
        count: reviews.length,
        data: reviews,
    });
});

const deleteReviewHandler = asyncWrapper(async (req, res, next) => {
    const { reviewId } = req.params;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);
    if (!review) return next(new AppError("Review not found", 404));

    if (review.user.toString() !== userId.toString() && req.user.role !== "admin") {
        return next(new AppError("Not authorized to delete this review", 403));
    }

    await review.deleteOne();

    // Update product rating
    const reviews = await Review.find({ product: review.product });
    const avgRating = reviews.length
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        : 0;

    await Product.findByIdAndUpdate(review.product, {
        reviews: reviews.map(r => r._id),
        rating: avgRating,
    });

    res.status(200).json({ success: true, message: "Review deleted successfully" });
});

module.exports = {
    createReviewHandler,
    getReviewsByProductHandler,
    deleteReviewHandler,
};
