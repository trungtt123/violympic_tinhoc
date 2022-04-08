const UserServices = require('../services/user');
module.exports = (app) => {
    app.post('/user/createuser', (req, res) => {
        UserServices.CreateUser(req, res)
    });
    app.post('/user/login', (req, res) => {
        UserServices.Login(req, res)
    });
    app.post('/user/changeinfomation', (req, res) => {
        UserServices.ChangeInfomation(req, res)
    });
    app.post('/user/checkpassword', (req, res) => {
        UserServices.CheckPassWord(req, res)
    });
    app.post('/user/changepassword', (req, res) => {
        UserServices.ChangePassWord(req, res)
    });
    app.get('/user/getinfomation/:userID', (req, res) => {
        UserServices.GetInfomation(req, res)
    });
    app.get('/user/finduserbyid/:userID', (req, res) => {
        UserServices.FindUserByID(req, res)
    });
};