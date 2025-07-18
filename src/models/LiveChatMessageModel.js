const mongoose = require('mongoose');

const LiveChatMessageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    isHandled: {
        type: Boolean,
        default: false,
    },
    context: {
        type: Object,
        default: {}
    },
    platform: {
        type: String,
        default: "website",
        enum: ["website", "messenger", "zalo", "telegram"]
    }
});

const LiveChatMessage = mongoose.model('LiveChatMessage', LiveChatMessageSchema);
module.exports = LiveChatMessage;