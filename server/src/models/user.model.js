const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    profilePicture: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        trim: true
    },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String }
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        date: { type: Date, default: null },
        isLoggedIn: { type: Boolean, default: false }
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = { User };
