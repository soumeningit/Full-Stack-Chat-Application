const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        trim: true
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    },
    media: [{
        url: {
            type: String,
            trim: true,
            default: "",

        },
        format: {
            type: String,
            trim: true

        }
    }]
}, { timestamps: true })

module.exports = mongoose.model("Message", messageSchema)