const express = require("express")

const { sendMessage } = require("../controllers/messageController")

const router = express.Router()

router.post("/sendMessage", sendMessage)

module.exports = router;