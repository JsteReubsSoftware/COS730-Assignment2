const jwt = require("jsonwebtoken")
const axios = require("axios")
const Messages = require("../models/messageModel")

const API = axios.create({baseURL:"http://localhost:3000"})
// const API = axios.create({baseURL:"https://rj-automated-api.onrender.com"})

const sendMessage = async (req, res) => {
    try {
        const { text, receiverId, senderId } = req.body
        // detect language of text and translate it to English
        const detect_response = await axios.get('https://rj-text-translation.onrender.com/detect?' + new URLSearchParams({text: text}).toString());

        if (!detect_response.data) {
            return res.status(400).json({
                success: false,
                message: "Unable to detect language of message"
            });
        }

        const source_lang = detect_response.data.language;
        const translate_params = {'text': text, 'source_language': source_lang, 'target_language': 'en'};

        const translate_response = await axios.get('https://rj-text-translation.onrender.com/translate?' + new URLSearchParams(translate_params).toString());
        if (!translate_response) {
            return res.status(400).json({
                success: false,
                message: "Unable to translate message"
            });
        }

        const newMessage = await Messages.create({
            text: translate_response.data.text,
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

        // translate the messages to the sender's preferred language
        const search_params = new URLSearchParams({ id: senderId });
        const response = await API.get('/api/getUserById?' + search_params.toString());

        if (!response.data && !response.data.success) {
            return res.status(400).json({
                success: false,
                message: "Unable to identify sender when retrieving messages"
            });
        }

        const senderLang = response.data.data.user.language;

        let base_url = 'https://rj-text-translation.onrender.com/translate'

        for (let message of messages) {
            const translate_params = {'text': message.text, 'source_language': 'en', 'target_language': senderLang};

            const translate_response = await axios.get(base_url + '?' + new URLSearchParams(translate_params).toString());
            if (translate_response) {
                message.text = translate_response.data.text
            }
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

const translateMessage = async (req, res) => {
    try {
        const { text, receiverId } = req.query;

        if (!text || !receiverId) {
            return res.status(400).json({
                success: false,
                message: "Missing required parameters"
            });
        }

        const search_params = new URLSearchParams({ id: receiverId });
        const response = await API.get('/api/getUserById?' + search_params.toString());

        if (response.data && !response.data.success) {
            return res.status(400).json({
                success: false,
                message: "Unable to identify receiver when translating message"
            });
        } else if (!response.data) {
            return res.status(400).json({
                success: false,
                message: "Receiver not found when translating message"
            });
        }

        // detect language of text and translate it to target language

        const detect_response = await axios.get('https://rj-text-translation.onrender.com/detect?' + new URLSearchParams({text: text}).toString());

        if (!detect_response) {
            return res.status(400).json({
                success: false,
                message: "Unable to detect language when translating message"
            });
        }

        const source_lang = detect_response.data.language;

        const receiverLang = response.data.data.user.language;
        const translate_params = {'text': text, 'source_language': source_lang, 'target_language': receiverLang};

        const translate_response = await axios.get('https://rj-text-translation.onrender.com/translate?' + new URLSearchParams(translate_params).toString());
        if (translate_response) {
            res.status(200).json({
                success: true,
                data: translate_response.data
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    sendMessage,
    getMessages,
    translateMessage
}