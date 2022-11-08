const bodyParser = require('body-parser');
const fetch = require('isomorphic-fetch');
const request = require('sync-request');

function sendRecaptcha (token) {
    const secret_key = process.env.RECAPTCHA_SECRET_KEY;
    const url = "https://www.google.com/recaptcha/api/siteverify?secret=" + secret_key + "&response=" + token;
    var message;


    if (!token){
        message = {
            "success": false, 
            "msg": "invalid token"
        }
    }
    var response = request(
        'POST',
        url
        )
    body = JSON.parse(response.body)

    if (!body.success && body.success == undefined){
        message = {
            "success": false, 
            "msg": "captcha verification failed"
        }
    }
    else if (body.score < 0.5){
        message = {
            "success": false, 
            "msg": "you might be a bot!",
            "score": body.score
        }
    }
    else{
        message = {
            "success": true, 
            "msg": "you have been verified",
            "score": body.score
        }
    }
    return JSON.stringify(message);

    
};
 module.exports = {
    sendRecaptcha
 };