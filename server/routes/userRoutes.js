const express = require("express")

const { getUserByEmail, updateUserLanguage, updateUserBlurText, updateUsername } = require("../controllers/userController")

const router = express.Router()

router.get("/getUserByEmail", getUserByEmail)

router.put("/updateUserLanguage", updateUserLanguage)

router.put("/updateUserBlurText", updateUserBlurText)

router.put("/updateUsername", updateUsername)

module.exports = router;