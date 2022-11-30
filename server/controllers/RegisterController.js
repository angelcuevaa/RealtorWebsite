const RegisterService = require('../services/RegisterService')

module.exports ={
    RegisterAccount : (req, res) =>{
        RegisterService.RegisterAccountService (req.body.username, req.body.password)
        res.send ("Account Registered!");
    },

    LoginAccount : (req, res) =>{
        RegisterService.LoginAccountService(req.body.username, req.body.password, function(err, rows){
            if (err){
                console.log(err);

                res.send(err);           
            }
            else{
                res.send(rows);
            }
        })
    }
}