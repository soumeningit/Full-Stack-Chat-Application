const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: "String"
    },
    token: {
        type: String,
    },
    resetTokenTime: {
        type: Date,
    },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);