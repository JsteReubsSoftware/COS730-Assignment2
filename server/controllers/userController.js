const jwt = require("jsonwebtoken")
const axios = require("axios")
const User = require("../models/userModel")

const getUserByEmail = async (req, res) => {
    try {
        const email = req.query.email;

        if (!email) {
            return res.status(200).json({success: true, data: { user: null, message: "No email provided." }});
        }

        // check if collection contains any documents
        const count = await User.countDocuments();

        if (count === 0) {
            return res.status(200).json({success: true, data: { user: null, message: "No users found." }});
        }

        const user = await User.findOne({email: email});

        if (!user) {
            return res.status(200).json({success: true, data: { user: null, message: "User not found." }});
        }

        return res.status(200).json({success: true, data: { user: user, message: "User found." }});
    } catch(error) {
        return res.status(500).json({success: false, data: {message: error.message}});
    }
}

const updateUserLanguage = async (req, res) => {
    try {
        const { language, email } = req.body;

        const count = await User.countDocuments();

        if (count === 0) {
            return res.status(404).json({success: false, data: {message: "Unable to update language. No users found."}});
        }

        const user = await User.findOneAndUpdate({email: email}, {language: language}, {new: true});
        return res.status(200).json({success: true, data: {user}});
    } catch(error) {
        return res.status(500).json({success: false, data: {message: error.message}});
    }
}

const updateUserBlurText = async (req, res) => {
    try {
        const { blurTextBoolean, email } = req.body;

        const count = await User.countDocuments();

        if (count === 0) {
            return res.status(404).json({success: false, data: {message: "Unable to update censoreText field. No users found."}});
        }

        const user = await User.findOneAndUpdate({email: email}, {censoreText: blurTextBoolean}, {new: true});
        return res.status(200).json({success: true, data: {user}});
    } catch(error) {
        return res.status(500).json({success: false, data: {message: error.message}});
    }
}

module.exports = {
    getUserByEmail,
    updateUserLanguage,
    updateUserBlurText
}