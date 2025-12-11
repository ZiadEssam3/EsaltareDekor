const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Brand name is required"],
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
    },
    { timestamps: true }
);

brandSchema.index({ name: "text", description: "text" });

const Brand = mongoose.model("Brand", brandSchema);
module.exports = { Brand };
