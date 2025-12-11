const mongoose = require("mongoose");

const compareSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
}, { timestamps: true });

const Compare = mongoose.model("Compare", compareSchema);
module.exports = { Compare };
