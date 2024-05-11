const jwt = require("jsonwebtoken")
const axios = require("axios")
const Messages = require("../models/messageModel")

const sendMessage = async (req, res) => {
    try {
        const { text, receiverId, senderId } = req.body
        const newMessage = await Messages.create({
            text: text,
            senderId: senderId,
            receiverId: receiverId
        });

        if (!newMessage) {
            return res.status(400).json({
                success: false,
                message: "Unable to send message"
            });
        }

        res.status(200).json({
            success: true,
            data: newMessage
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getMessages = async (req, res) => {
    try {
        const { senderId, receiverId } = req.query;

        // find messages between the sender and receiver and sort them by date
        const messages = await Messages.find({
            $or: [
                { senderId: senderId, receiverId: receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).sort({ createdAt: 1 });

        if (!messages) {
            return res.status(400).json({
                success: false,
                message: "Unable to get messages"
            });
        }

        res.status(200).json({
            success: true,
            data: messages
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    sendMessage,
    getMessages
}