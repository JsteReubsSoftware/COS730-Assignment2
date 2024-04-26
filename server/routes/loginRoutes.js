const express = require("express")

const { loginController, verifyToken } = require("../controllers/loginController")

const router = express.Router()

router.post("/login", loginController)
router.post("/validatetoken", verifyToken)

module.exports = router;