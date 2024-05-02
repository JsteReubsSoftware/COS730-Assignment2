const jwt = require("jsonwebtoken")
const axios = require("axios")
const Messages = require("../models/messageModel")

const sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, text } = req.body
        const newMessage = await Messages.create({
            text: text,
            senderId: senderId,
            receiverId: receiverId
        });

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