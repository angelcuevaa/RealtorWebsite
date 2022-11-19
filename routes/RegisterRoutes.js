const express = require ("express")
const router = express.Router()
const RegisterController = require("../controllers/RegisterController")

router.post("/register", RegisterController.RegisterAccount)
router.post("/login", RegisterController.LoginAccount)

module.exports = router;

//comment