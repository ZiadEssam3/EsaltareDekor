const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            unique: true,
            trim: true,
            minlength: [2, "Category name must be at least 2 characters"],
            maxlength: [50, "Category name must not exceed 50 characters"],
        },
        description: {
            type: String,
            trim: true,
            maxlength: [200, "Description must not exceed 200 characters"],
        },
        image: {
            type: String,
            default: null,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        order: {
            type: Number,
            default: 0, 
        }
    },
    { timestamps: true }
);
categorySchema.index({ name: 'text', description: 'text' });
const Category = mongoose.model("Category", categorySchema);
module.exports = { Category };
