const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
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

const Favourite = mongoose.model("Favourite", favouriteSchema);
module.exports = { Favourite };
