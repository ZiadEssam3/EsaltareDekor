const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
            unique: true,
        },
        slug: {
            type: String,
            unique: true,
            trim: true,
        },
        sku: {
            type: String,
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        richDescription: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: 0,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        subCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory",
            required: true,
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
            required: true,
        },
        image: {
            type: String,
        },
        images: [
            {
                type: String,
            },
        ],
        countInStock: {
            type: Number,
            default: 0,
            min: 0,
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        dimensions: {
            weight: Number,
            height: Number,
            width: Number,
            depth: Number
        },
        tags: {
            type: [String],
            enum: ["newArrival", "topDeal", "maxDeal"],
            default: []
        },
        variants: [{
            name: String,
            value: String,
            price: Number,
            countInStock: Number,
            image: String,
        }],
        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }]
    },
    { timestamps: true }
);

productSchema.index({ name: 'text', description: 'text', richDescription: 'text' });
const Product = mongoose.model("Product", productSchema);
module.exports = { Product };