const email = require("../services/EmailService")
const recaptcha = require("../services/RecaptchaService")
var validator = require("email-validator");

function ContactAdmin(emailAddress, name, message, token){
    const recaptchaResponse = recaptcha.sendRecaptcha(token);
    var message;

    if (recaptchaResponse.success == false){
        return JSON.stringify( message = {
            "msg": recaptchaResponse.msg
        });
    }
    else if (!validator.validate(emailAddress)){
        return JSON.stringify( message ={
            "msg": "Invalid Email Address"
        });
    }
    else if (name.length >= 256){
        return JSON.stringify( message ={
            "msg": "Name is too long"
        });
    }
    else if (message.length >= 10000){
        return JSON.stringify( message ={
            "msg": "Message is too long"
        });
    }
    email.sendEmail(emailAddress, name, message);
    return JSON.stringify(message ={
        "msg": "Message sent successfully"
    });
}
module.exports = {
    ContactAdmin
};