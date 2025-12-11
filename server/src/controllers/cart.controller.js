const { Cart } = require("../models/cart.model");
const { Product } = require("../models/product.model");
const asyncWrapper = require("../middlewares/handlers/asyncWrapper");
const AppError = require("../utils/errorHelpers/appError.formate");

// 1. Add to cart
const addToCartHandler = asyncWrapper(async (req, res, next) => {
    const { productId } = req.params;
    const { quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
        return next(new AppError("Product not found", 404));
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(i => i.product.toString() === productId);

    if (existingItem) {
        // If the product exists, respond with a specific message
        return res.status(200).json({
            success: false,
            message: "Product is already in the cart."
        });
    } else {
        // If it doesn't exist, add it to the cart
        cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(201).json({ success: true, data: cart });
});

// 2. Get cart
const getCartHandler = asyncWrapper(async (req, res, next) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart) return next(new AppError("Cart not found", 404));
    res.status(200).json({
        success: true,
        count: cart.items.length,
        data: cart
    });
});

// 3. Update item quantity
const updateCartItemQuantity = asyncWrapper(async (req, res, next) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    if (quantity < 1) return next(new AppError("Quantity must be >= 1", 400));
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return next(new AppError("Cart not found", 404));
    const item = cart.items.find(i => i.product.toString() === productId);
    if (!item) return next(new AppError("Product not in cart", 404));
    item.quantity = quantity;
    await cart.save();
    res.status(200).json({ success: true, data: cart });
});

// 4. Increase quantity
const increaseCartItemQuantity = asyncWrapper(async (req, res, next) => {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return next(new AppError("Cart not found", 404));

    const item = cart.items.find(i => i.product.toString() === productId);
    if (!item) return next(new AppError("Product not in cart", 404));

    item.quantity += 1;
    await cart.save();
    res.status(200).json({ success: true, data: cart });
});

// 5. Decrease quantity
const decreaseCartItemQuantity = asyncWrapper(async (req, res, next) => {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return next(new AppError("Cart not found", 404));

    const item = cart.items.find(i => i.product.toString() === productId);
    if (!item) return next(new AppError("Product not in cart", 404));

    item.quantity = Math.max(1, item.quantity - 1);
    await cart.save();
    res.status(200).json({ success: true, data: cart });
});

// 6. Remove product
const removeCartItemHandler = asyncWrapper(async (req, res, next) => {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return next(new AppError("Cart not found", 404));

    cart.items = cart.items.filter(i => i.product.toString() !== productId);
    await cart.save();

    res.status(200).json({ success: true, message: "Product removed", data: cart });
});

// 7. Clear cart
const clearCartHandler = asyncWrapper(async (req, res, next) => {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return next(new AppError("Cart not found", 404));

    cart.items = [];
    await cart.save();
    res.status(200).json({ success: true, message: "Cart cleared", data: cart });
});

module.exports = {
    addToCartHandler,
    getCartHandler,
    updateCartItemQuantity,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    removeCartItemHandler,
    clearCartHandler
};
