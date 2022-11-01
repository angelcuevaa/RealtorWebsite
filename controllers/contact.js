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
        var recaptchaResponse = recaptcha.sendRecaptcha(req.body.captcha);
        //this works, just returning the string as undefined
        console.log(recaptchaResponse);
        res.send(recaptchaResponse);
    }
}