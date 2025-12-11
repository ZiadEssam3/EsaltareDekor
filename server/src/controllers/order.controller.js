const Stripe = require("stripe");
const { Order } = require('../models/order.model');
const { OrderItem } = require('../models/orderitem.model');
const { Product } = require('../models/product.model');
const asyncWrapper = require("../middlewares/handlers/asyncWrapper");
const AppError = require("../utils/errorHelpers/appError.formate");



const createOrder = asyncWrapper(async (req, res, next) => {
    const orderItemsIds = [];
    let totalPrice = 0;

    for (const item of req.body.orderItems) {
        const newOrderItem = new OrderItem({
            quantity: item.quantity,
            product: item.product
        });
        const savedOrderItem = await newOrderItem.save();
        orderItemsIds.push(savedOrderItem._id);

        const product = await Product.findById(item.product);
        if (product && product.price) {
            totalPrice += product.price * item.quantity;
        }
    }

    const {
        shippingAddress1,
        shippingAddress2,
        city,
        zip,
        country,
        phone,
        user
    } = req.body;

    let order = new Order({
        orderItems: orderItemsIds,
        shippingAddress1,
        shippingAddress2,
        city,
        zip,
        country,
        phone,
        status: "Pending",
        totalPrice,
        user: req.user.id,
    });

    order = await order.save();
    if (!order) return next(new AppError("The order cannot be created", 400));

    res.status(201).json({ success: true, data: order });
});

const createPaymentIntent = asyncWrapper(async (req, res, next) => {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return next(new AppError("Order not found", 404));

    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(order.totalPrice * 100), // Stripe needs cents
        currency: "usd",
        metadata: { orderId: order._id.toString(), userId: req.user.id }
    });

    res.json({ success: true, clientSecret: paymentIntent.client_secret });
});

const getUserOrders = asyncWrapper(async (req, res, next) => {
    const { userId } = req.params;
    const userOrders = await Order.find({ user: userId })
        .populate({
            path: 'orderItems',
            populate: {
                path: 'product',
                populate: 'category'
            }
        })
        .sort({ dateOrdered: -1 });

    if (!userOrders || userOrders.length === 0) {
        return next(new AppError("No orders found", 404));
    }
    res.status(200).json({
        success: true,
        count: userOrders.length,
        data: userOrders
    });
});

const getAllOrders = asyncWrapper(async (req, res, next) => {
    const orderList = await Order.find()
        .populate('user', 'name')
        .sort({ 'dateOrdered': -1 });
    if (!orderList) return next(new AppError("No orders found", 404));
    res.status(200).json({
        success: true,
        count: orderList.length,
        data: orderList
    });
});

const updateOrderStatus = asyncWrapper(async (req, res, next) => {
    const order = await Order.findByIdAndUpdate(
        req.params.orderId,
        { status: req.body.status },
        { new: true }
    );
    if (!order) return next(new AppError("Order not found", 404));
    res.status(200).json({ success: true, data: order });
});

const getOrderById = asyncWrapper(async (req, res, next) => {
    const order = await Order.findById(req.params.orderId)
        .populate('user', 'name')
        .populate({
            path: 'orderItems',
            populate: {
                path: 'product',
                populate: 'category'
            }
        });

    if (!order) return next(new AppError("Order not found", 404));

    // user can only see his own orders
    if (req.user.role === 'user' && order.user.toString() !== req.user._id.toString()) {
        return next(new AppError("Not authorized to view this order", 403));
    }

    res.status(200).json({ success: true, data: order });
});

const deleteOrder = asyncWrapper(async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    if (!order) return next(new AppError("Order not found", 404));

    await Promise.all(order.orderItems.map(async orderItem => {
        await OrderItem.findByIdAndDelete(orderItem);
    }));

    res.status(200).json({ success: true, message: "The order is deleted" });
});

const getTotalSales = asyncWrapper(async (req, res, next) => {
    const totalSales = await Order.aggregate([
        { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } }
    ]);

    if (!totalSales || totalSales.length === 0) {
        return next(new AppError("The order sales cannot be generated", 400));
    }

    res.status(200).json({ success: true, totalsales: totalSales[0].totalsales });
});

const getTotalOrders = asyncWrapper(async (req, res, next) => {
    const ordersCount = await Order.countDocuments();
    res.status(200).json({ success: true, totalOrders: ordersCount });
});


module.exports = {
    getAllOrders,
    createOrder,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
    getTotalSales,
    getTotalOrders,
    getUserOrders
};
