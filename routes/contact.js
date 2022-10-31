const express = require ("express")
const router = express.Router()
const controller = require('../controllers/contact')

router.get('/contact', controller.get)
router.get('/contact/:recipientEmail-:name-:message', controller.sendEmail)
router.post('/contact/sendRecaptcha', controller.sendRecaptcha)

module.exports = router