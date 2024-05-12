const mongoose = require('mongoose');

// This Schema is used to store messages between two users
const messageSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },
        senderId: {
            type: String,
            required: true
        },
        receiverId: {
            type: String,
            required: true
        },
        messageTime: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
)

const Messages = mongoose.model('Messages', messageSchema);
module.exports = Messages