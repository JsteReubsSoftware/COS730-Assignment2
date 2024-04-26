const jwt = require("jsonwebtoken")
const axios = require("axios")
const User = require("../models/userModel")

const loginController = async(req, res) => {
    if(req.body.access_token){
        const access_token = req.body.access_token;

        axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        })
        .then(async response => {
            const firstName = response.data.given_name;
            const lastName = response.data.family_name;
            const email = response.data.email;
            const picture = response.data.picture;

            // check if collection contains any documents
            const count = await User.countDocuments();

            if (count === 0) {
                const newUser = await User.create({
                    name: `${firstName} ${lastName}`,
                    email: email,
                    profileImg: picture
                })

                const token = jwt.sign({
                    email: newUser.email,
                    id: newUser._id
                }, process.env.REACT_APP_JWT_SECRET_KEY, {expiresIn: process.env.REACT_APP_JWT_EXPIRE_TIME});

                res.status(200).json({result: newUser, token});
            }
            else {
                const existingUser = await User.findOne({email})

                if (!existingUser) {
                    const newUser = await User.create({
                        name: `${firstName} ${lastName}`,
                        email: email,
                        profileImg: picture
                    })

                    existingUser = newUser
                }

                const token = jwt.sign({
                    email: existingUser.email,
                    id: existingUser._id
                }, process.env.REACT_APP_JWT_SECRET_KEY, {expiresIn: process.env.REACT_APP_JWT_EXPIRE_TIME})
        
                res.status(200).json({result: existingUser, token})
            }                
        })
        .catch(err => {
            res.status(400).json({message: "Invalid access token!", error: err})
        })
    }else{
        res.status(401).json({message: "Unauthorized access! No access token provided."})
    }
  
}

const verifyToken = async (req, res) => {
    const token = req.body.token;

    if (!token) {
        return res.json({valid: false, message: "Unauthorized access! No token provided."});
    }

    jwt.verify(token, process.env.REACT_APP_JWT_SECRET_KEY, (err) => {
        if (err && err.name === "TokenExpiredError") {
            return res.json({valid: false, message: "Token expired.", error: err});
        }
        else if (err) {
            return res.json({valid: false, message: "Invalid token.", error: err});
        }

        return res.json({valid: true, message: "Token is valid."});
    });
}

module.exports = {
    loginController,
    verifyToken
}