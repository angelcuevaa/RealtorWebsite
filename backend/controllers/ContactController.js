const email = require("../services/EmailService")
const recaptcha = require("../services/RecaptchaService")
const ContactService = require("../services/ContactService")


module.exports = {
    get: (req, res) =>{
        res.send ("In contact controller..")
    },
    sendEmail: (req, res) =>{
        email.sendEmail(req.params.recipientEmail,req.params.name,req.params.message)
        res.send("Email sent?")
    },
    sendRecaptcha: (req, res) => {
        var recaptchaResponse = recaptcha.sendRecaptcha(req.body.captcha);
        //this works, just returning the string as undefined
        res.send(recaptchaResponse);
    },
    ContactAdmin: (req, res) => {
        var contactAdminResponse = ContactService.ContactAdmin(req.body.email, req.body.name, req.body.message, req.body.token);
        res.send(contactAdminResponse);
    }
}