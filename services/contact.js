const email = require("../services/email")
const recaptcha = require("../services/recaptcha")

let ValidateEmailAddress = (emailAddress) => {
    var mailFormat = "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/";
    
}