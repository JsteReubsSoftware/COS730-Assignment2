const express = require("express")

const { getUserByEmail, updateUserLanguage } = require("../controllers/userController")

const router = express.Router()

router.get("/getUserByEmail", getUserByEmail)

router.put("/updateUserLanguage", updateUserLanguage)

module.exports = router;