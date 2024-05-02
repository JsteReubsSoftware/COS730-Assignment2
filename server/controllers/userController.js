const jwt = require("jsonwebtoken")
const axios = require("axios")
const User = require("../models/userModel")

const getUser = async (req, res) => {
    // check if collection contains any documents
    const count = await User.countDocuments();

    if (count === 0) {
        return res.status(200).json({message: "No users found."});
    }

    const user = await User.findOne({email: req.body.email});

    return res.status(200).json(user)
}

module.exports = {
    getUser
}