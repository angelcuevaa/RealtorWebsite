const bodyParser = require('body-parser');
const fetch = require('isomorphic-fetch');
const request = require('request');

let sendRecaptcha = (token) =>{
    const secret_key = process.env.RECAPTCHA_SECRET_KEY;
    const url = "https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}";



    if (!token){
        message = 'captcha token not defined';
    }
    request(url, (err, response, body) => {
        if (err){
            return 'there was an error';
        }
        body = JSON.parse(body);


        if (!body || body.score < 0.4){

            return 'you are a robot... score: ' + body.score;
        }
       console.log(body);
        return "you are valid.. score: " + body.score;
       
        
    })
    
};
 module.exports = {
    sendRecaptcha
 };