const mongoose = require("mongoose");

const messageModel = mongoose.Schema({

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,

    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }
})

module.exports = mongoose.model("Message", messageModel)