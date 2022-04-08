const User = require('../repositories/user');

module.exports = {
    async CreateUser(req, res) {
        try {
            var userData = await User.CreateUser(req.body);
            res.status(200).json({ success: true, userData: userData });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async FindUserByID(req, res) {
        try {
            var userData = await User.FindUserByID(req.params.userID);
            res.status(200).json({ success: true, result: userData });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async Login(req, res) {
        try {
            var userData = await User.Login(req.body);
            res.status(200).json({ success: true, userData: userData });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async ChangeInfomation(req, res) {
        try {
            var userData = await User.ChangeInfomation(req.body);
            console.log(userData);
            res.status(200).json({ success: true, userData: userData });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async CheckPassWord(req, res) {
        try {
            var checkPass = await User.CheckPassWord(req.body);
            res.status(200).json({ success: true, checkPass: checkPass });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async ChangePassWord(req, res) {
        try {
            var userData = await User.ChangePassWord(req.body);
            res.status(200).json({ success: true, userData: userData });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    }
    ,
    async GetInfomation(req, res) {
        try {
            var userInfomation = await User.GetInfomation(req.params.userID);
            res.status(200).json({ success: true, result: userInfomation });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    }
    
}