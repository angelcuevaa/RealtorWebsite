const bodyParser = require('body-parser');
const fetch = require('isomorphic-fetch');

let sendRecaptcha = (token) =>{
    const secret_key = process.env.RECAPTCHA_SECRET_KEY;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;


    fetch(url, {
        method: 'post'
    })
    // need to preturn the results of fetch to the controller
        .then(response => {
            return response.json()
        })
       // .then(google_response => res.json({ google_response }))
       // .catch(error => res.json({ error }));
};
 module.exports = {
    sendRecaptcha
 };