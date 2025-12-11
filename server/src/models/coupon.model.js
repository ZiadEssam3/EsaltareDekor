const mongoose = require("mongoose");
const generateCouponCode = require("../utils/data/generateCouponCode");

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        default: () => generateCouponCode(10),
    },
    discountType: {
        type: String,
        enum: ["percentage", "fixed"],
        required: true
    },
    discountValue: {
        type: Number,
        required: true
    },
    expiresAt: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    },
    appliesTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        default: null
    },
    oneTimeUse: {
        type: Boolean,
        default: false
    },
    usageCount: {
        type: Number,
        default: 0
    },
    maxUsage: {
        type: Number,
        default: 1   
    }
}, { timestamps: true });

const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = { Coupon };
