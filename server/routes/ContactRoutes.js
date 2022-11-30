const express = require ("express")
const router = express.Router()
const controller = require('../controllers/ContactController')

router.get('/contact', controller.get)
router.get('/contact/:recipientEmail-:name-:message', controller.sendEmail)
router.post('/contact/sendRecaptcha', controller.sendRecaptcha)
router.post('/contact/ContactAdmin', controller.ContactAdmin)
module.exports = router