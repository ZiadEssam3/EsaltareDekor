/**
 * @packages 
**/
const express = require('express');
const originalConsoleLog = console.log;
console.log = function (...args) {
    if (!args[0]?.includes('[dotenv@')) {
        originalConsoleLog.apply(console, args);
    }
};
require('dotenv').config();
const helmet = require("helmet");
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
/**
 * @utils
**/
const { ERRORS } = require('./utils/errorHelpers/Error.constants');
const AppError = require('./utils/errorHelpers/appError.formate');
const errorHandler = require('./middlewares/error/errorHandler');
const userRouter = require('./routers/user.routes');
const categoryRouter = require('./routers/category.routes');
const subcategoryRouter = require('./routers/subcategory.routes');
const brandRouter = require('./routers/brand.routes');
const productRouter = require('./routers/product.routes');
const reviewsRouter = require('./routers/review.routes');
const ordersRouter = require('./routers/order.routes');
const cartRouter = require('./routers/cart.routes');
const favouriteRouter = require('./routers/favourite.routes');
const compareRouter = require('./routers/compare.routes');
const couponRouter = require('./routers/coupon.routes');
const analyticsRouter = require('./routers/analytics.routes');


const api = process.env.API;
const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// @buildInMiddlewares
// app.use(helmet({
//     crossOriginEmbedderPolicy: false
// }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));


app.use(`${api}/users`, userRouter);
app.use(`${api}/category`, categoryRouter);
app.use(`${api}/subcategory`, subcategoryRouter);
app.use(`${api}/brand`, brandRouter);
app.use(`${api}/product`, productRouter);
app.use(`${api}/reviews`, reviewsRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/cart`, cartRouter);
app.use(`${api}/favourite`, favouriteRouter);
app.use(`${api}/compare`, compareRouter);
app.use(`${api}/coupon`, couponRouter);
app.use(`${api}/analytics`, analyticsRouter);


app.get('/', (req, res) => {
    res.send('Welcom From Ziad Server');
});

// Catch all unmatched routes
app.all('*', (req, res, next) => {
    next(new AppError(`${ERRORS.ROUTE_NOT_FOUND}: ${req.originalUrl}`, 404));
});

// Global error handler
app.use(errorHandler);

module.exports = app;



