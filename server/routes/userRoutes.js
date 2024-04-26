const express = require("express")

const { getUser } = require("../controllers/userController")

const router = express.Router()

router.post("/getUser", getUser)

module.exports = router;