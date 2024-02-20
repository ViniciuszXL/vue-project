const express = require("express")
const router = express.Router()
const controller = require("../controllers/user.controller")

// POST
router.post("/create", controller.create)
// GET
router.get("/list", controller.list)
// PUT
router.put("/update/:userId", controller.update)
// DELETE
router.delete("/delete/:userId", controller.delete)

module.exports = router