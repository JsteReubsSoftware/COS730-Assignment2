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



module.exports = {
    sendMessage
}