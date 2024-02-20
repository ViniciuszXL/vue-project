const express = require("express")
const router = express.Router()
const middleware = require("../middleware")

const admin = require("./admin")
router.use("/admin", admin)

// Auth token
router.use(middleware.authToken)

const user = require("./user")
router.use("/user", user)

module.exports = router