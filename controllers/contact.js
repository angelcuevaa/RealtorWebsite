const email = require("../services/email")
const recaptcha = require("../services/recaptcha")

module.exports = {
    get: (req, res) =>{
        res.send ("In contact controller..")
    },
    sendEmail: (req, res) =>{
        email.sendEmail(req.params.recipientEmail,req.params.name,req.params.message)
        res.send("Email sent?")
    },
    sendRecaptcha: (req, res) => {
        recaptchaResponse = recaptcha.sendRecptcha(req.params.token);
        res.send(res.json(recaptchaResponse));
    }
}