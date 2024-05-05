const express = require("express")

const { getUserByEmail, updateUserLanguage, updateUserBlurText } = require("../controllers/userController")

const router = express.Router()

router.get("/getUserByEmail", getUserByEmail)

router.put("/updateUserLanguage", updateUserLanguage)

router.put("/updateUserBlurText", updateUserBlurText)

module.exports = router;