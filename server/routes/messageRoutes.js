const express = require("express")

const { sendMessage, getMessages, translateMessage } = require("../controllers/messageController")

const router = express.Router()

router.post("/sendMessage", sendMessage)

router.get("/getMessages", getMessages)

router.get("/translateMessage", translateMessage)

module.exports = router;