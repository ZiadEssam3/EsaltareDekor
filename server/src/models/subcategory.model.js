const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Subcategory name is required"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        image: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        order: {
            type: Number,
            default: 0,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Subcategory must belong to a category"],
        },
    },
    { timestamps: true }
);
subCategorySchema.index({ name: "text", description: "text" });

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
module.exports = { SubCategory };
