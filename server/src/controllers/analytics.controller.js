const { User } = require("../models/user.model");
const { Product } = require("../models/product.model");
const { Order } = require("../models/order.model");
const { Review } = require("../models/review.model");
const asyncWrapper = require("../middlewares/handlers/asyncWrapper");
const AppError = require("../utils/errorHelpers/appError.formate");
const { Category } = require("../models/category.model");
const { Brand } = require("../models/brand.model");

const getAdminAnalytics = asyncWrapper(async (req, res, next) => {
    // Total counts
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalReviews = await Review.countDocuments();
    // Total sales
    const salesAgg = await Order.aggregate([
        { $group: { _id: null, total: { $sum: { $toDouble: "$totalPrice" } } } }
    ]);
    const totalSales = salesAgg[0]?.total || 0;
    // Orders by status
    const ordersByStatus = await Order.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    // Best selling products (based on orderItems)
    const bestSellingProducts = await Order.aggregate([
        { $unwind: "$orderItems" },
        { $group: { _id: "$orderItems", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
    ]);
    // Monthly sales trend
    const monthlySales = await Order.aggregate([
        {
            $group: {
                _id: { month: { $month: "$dateOrdered" }, year: { $year: "$dateOrdered" } },
                total: { $sum: { $toDouble: "$totalPrice" } }
            }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // Top countries
    const topCountries = await Order.aggregate([
        { $group: { _id: "$country", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
    ]);

    res.status(200).json({
        success: true,
        data: {
            totalUsers,
            totalProducts,
            totalOrders,
            totalReviews,
            totalSales,
            ordersByStatus,
            bestSellingProducts,
            monthlySales,
            topCountries
        }
    });
});

const getUserHomePage = asyncWrapper(async (req, res) => {
    // Get all categories but only _id and name (no products)
    const categories = await Category.find({}, "_id name slug");

    // Get all brands
    const brands = await Brand.find({}, "_id name slug");

    // Get product sections
    const newArrivals = await Product.find({ tags: "newArrival" })
        .select("name price image slug")
        .limit(10);

    const topDeals = await Product.find({ tags: "topDeal" })
        .select("name price image slug")
        .limit(10);

    const maxDeals = await Product.find({ tags: "maxDeal" })
        .select("name price image slug")
        .limit(10);

    res.status(200).json({
        success: true,
        data: {
            categories,
            brands,
            newArrivals,
            topDeals,
            maxDeals,
        },
    });
});

module.exports = {
    getAdminAnalytics,
    getUserHomePage
};
