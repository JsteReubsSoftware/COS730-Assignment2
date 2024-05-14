const express = require("express")

const { sendMessage, getMessages, translateMessage, censorText } = require("../controllers/messageController")

const router = express.Router()

router.post("/sendMessage", sendMessage)

router.get("/getMessages", getMessages)

router.get("/translateMessage", translateMessage)

router.get("/censorText", censorText)

module.exports = router;