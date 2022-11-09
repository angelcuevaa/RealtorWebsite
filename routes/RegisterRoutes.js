const express = require ("express")
const router = express.Router()
const RegisterController = require("../controllers/RegisterController")

router.post("/register", RegisterController.RegisterAccount)

module.exports = router;