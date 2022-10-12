const email = require("../models/email")

module.exports = {
    get: (req, res) =>{
        res.send ("In contact controller..")
    },
    sendEmail: (req, res) =>{
        email.sendEmail(req.params.recipientEmail,req.params.name,req.params.message)
        res.send("Email sent?")
    }
}