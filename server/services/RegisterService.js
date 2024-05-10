// const bcrypt = require("bcrypt");
const RegisterDAL = require('../dal/RegisterDAL');
const saltRounds = 10;

function RegisterAccountService(username, password){
    // bcrypt.hash(password, saltRounds, (err, hash) => {
    //     if (err){
    //         console.log (err);
    //     }
    //     RegisterDAL.PostUser(username, hash)
    // })
    return 0
}

function LoginAccountService(username, password, callback){
    RegisterDAL.getUser(username, password, function(err, rows){
        if (err){
            callback(err, null);
        }
        else{
            callback(null, rows);        
        }
    })
}
module.exports = {
    RegisterAccountService,
    LoginAccountService
}