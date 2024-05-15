const express = require("express")

const { getUserByEmail, getUserContacts, getUnknownContacts, getUserById, updateUserLanguage, updateUserBlurText, updateUsername, addContact, removeContact, deleteAccount } = require("../controllers/userController")

const router = express.Router()

// GET requests
router.get("/getUserByEmail", getUserByEmail)

router.get("/getUserContacts", getUserContacts)

router.get("/getUnknownContacts", getUnknownContacts)

router.get("/getUserById", getUserById)

// PUT requests
router.put("/updateUserLanguage", updateUserLanguage)

router.put("/updateUserBlurText", updateUserBlurText)

router.put("/updateUsername", updateUsername)

router.put("/addContact", addContact)

// POST requests
router.post("/removeContact", removeContact)

router.post("/deleteAccount", deleteAccount)

module.exports = router;