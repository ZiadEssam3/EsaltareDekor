const { Favourite } = require("../models/favourite.model");
const { Product } = require("../models/product.model");
const asyncWrapper = require("../middlewares/handlers/asyncWrapper");
const AppError = require("../utils/errorHelpers/appError.formate");


const addToFavouriteHandler = asyncWrapper(async (req, res, next) => {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return next(new AppError("Product not found", 404));

    let favouriteList = await Favourite.findOne({ user: req.user._id });
    if (!favouriteList) favouriteList = new Favourite({ user: req.user._id, products: [] });

    if (favouriteList.products.includes(productId)) {
        return res.status(200).json({
            success: false,
            message: "Product is already in favourites.",
        });
    }

    favouriteList.products.push(productId);
    await favouriteList.save();

    res.status(201).json({
        success: true,
        message: "Product added to favourites.",
        data: favouriteList
    });
});

const getFavouritesHandler = asyncWrapper(async (req, res, next) => {
    const favouriteList = await Favourite.findOne({ user: req.user._id }).populate("products");

    if (!favouriteList || favouriteList.products.length === 0) {
        return res.status(200).json({
            success: true,
            results: 0,
            data: []
        });
    }

    res.status(200).json({
        success: true,
        results: favouriteList.products.length,
        data: favouriteList.products
    });
});

const removeFromFavouriteHandler = asyncWrapper(async (req, res, next) => {
    const { productId } = req.params;

    const favouriteList = await Favourite.findOne({ user: req.user._id });
    if (!favouriteList) return next(new AppError("No favourites found for this user", 404));

    const index = favouriteList.products.indexOf(productId);
    if (index === -1) {
        return res.status(404).json({ success: false, message: "Product not in favourites" });
    }

    favouriteList.products.splice(index, 1);
    await favouriteList.save();

    res.status(200).json({
        success: true,
        message: "Product removed from favourites.",
    });
});

const clearFavouritesHandler = asyncWrapper(async (req, res, next) => {
    const favouriteList = await Favourite.findOne({ user: req.user._id });
    if (!favouriteList) return next(new AppError("No favourites found for this user", 404));
    favouriteList.products = [];
    await favouriteList.save();
    res.status(200).json({
        success: true,
        message: "All favourites cleared.",
    });
});

module.exports = {
    addToFavouriteHandler,
    getFavouritesHandler,
    removeFromFavouriteHandler,
    clearFavouritesHandler
};