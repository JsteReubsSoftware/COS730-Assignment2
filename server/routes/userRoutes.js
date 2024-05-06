const express = require("express")

const { getUserByEmail, getUserContacts, updateUserLanguage, updateUserBlurText, updateUsername, addContact } = require("../controllers/userController")

const router = express.Router()

// GET requests
router.get("/getUserByEmail", getUserByEmail)

router.get("/getUserContacts", getUserContacts)

// PUT requests
router.put("/updateUserLanguage", updateUserLanguage)

router.put("/updateUserBlurText", updateUserBlurText)

router.put("/updateUsername", updateUsername)

router.put("/addContact", addContact)

module.exports = router;