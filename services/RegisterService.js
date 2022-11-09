const bcrypt = require("bcrypt");
const RegisterDAL = require('../dal/RegisterDAL');
const saltRounds = 10;

function RegisterAccountService(username, password){
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err){
            console.log (err);
        }
        RegisterDAL.PostUser(username, hash)
    })
}
module.exports = {
    RegisterAccountService
}