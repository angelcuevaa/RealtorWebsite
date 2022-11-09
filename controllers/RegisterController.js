const RegisterService = require('../services/RegisterService')

module.exports ={
    RegisterAccount : (req, res) =>{
        RegisterService.RegisterAccountService (req.body.username, req.body.password)
        res.send ("Account Registered!");
    }
}