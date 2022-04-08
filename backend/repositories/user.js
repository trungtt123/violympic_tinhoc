const UserModel = require('../db/models/user');
var hash = require('object-hash');

const User = {};
User.GetAllUser = async (keyword) => {
    var users = await UserModel.find({});
    var arrEx = [];
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        var userID = String(user._id);
        var fullName = String(user.infomation.fullName);
        if (userID.toLowerCase().indexOf(keyword) > -1 || fullName.toLowerCase().indexOf(keyword) > -1) {
            arrEx.push(user);
        }
    }
    return arrEx;
}
User.GetInfomation = async (userID) => {
    var user = await UserModel.findOne({ _id: userID });
    return user;
}
User.FindUserByID = async (userID) => {
    var user = await UserModel.findOne({ _id: userID });
    if (user === null) return null;
    return {
        userID: userID,
        infomation: user.infomation
    };
}

User.CheckExistUserFromUserName = async (userName) => {
    var user = await UserModel.findOne({ userName: userName });
    if (userName === null || userName === undefined) return true;
    return false;
}
User.Login = async (data) => {
    var passWord = hash(data.passWord, { algorithm: 'md5', encoding: 'base64' });
    var user = await UserModel.findOne({ userName: data.userName, passWord: passWord });
    if (user === null || user === undefined) return null;
    var userDataExport = {
        token: user.token,
        userName: user.userName,
        userID: user._id,
        infomation: user.infomation
    }
    return userDataExport;
}
User.CheckPassWord = async (data) => {
    var oldPassWord = hash(data.oldPassWord, { algorithm: 'md5', encoding: 'base64' });
    var user = await UserModel.findOne({ token: data.token });
    if (user === null || user === undefined) return false;
    if (user.passWord !== oldPassWord) return false;
    else return true;
}
User.ChangePassWord = async (data) => {
    console.log(data)
    var newPassWord = hash(data.newPassWord, { algorithm: 'md5', encoding: 'base64' });
    var user = await UserModel.findOne({ token: data.token });
    console.log(user);
    var newToken = hash(user.userName + data.newPassWord, { algorithm: 'md5', encoding: 'base64' });
    await UserModel.updateOne({ token: data.token },
        {
            passWord: newPassWord,
            token: newToken
        },
    );
    user = await UserModel.findOne({ token: newToken });
    var userDataExport = {
        token: user.token,
        userName: user.userName,
        userID: user._id,
        infomation: user.infomation
    }
    console.log(user)
    return userDataExport;
}
User.CreateUser = async (data) => {
    var token = hash(data.userName + data.passWord, { algorithm: 'md5', encoding: 'base64' });
    var passWord = hash(data.passWord, { algorithm: 'md5', encoding: 'base64' });
    var userData = {
        userName: data.userName,
        passWord: passWord,
        token: token,
        infomation: data.infomation,
        //examLevel: data.optionExamLevel
    }
    var userDataExport = {
        token: token,
        infomation: data.infomation
    }
    var user = await UserModel.create(userData);
    var userDataExport = {
        token: user.token,
        userName: user.userName,
        userID: user._id,
        infomation: user.infomation
    }
    console.log(user);
    return userDataExport;
}
User.ChangeInfomation = async (data) => {
    console.log(data.token);
    var user = UserModel.findOne({token: data.token});
    var infomationUser = {
        provinceID: data.infomation.provinceID,
        districtID: data.infomation.districtID,
        schoolID: data.infomation.schoolID,
        fullName: data.infomation.fullName,
        perpermissionID: user.infomation.permissionID,
        examLevel: user.infomation.examLevel
    }
    await UserModel.updateOne({ token: data.token },
        { infomation: infomationUser }
    );

    var user = await UserModel.findOne({ token: data.token });
    var userDataExport = {
        token: user.token,
        userName: user.userName,
        userID: user._id,
        infomation: user.infomation
    }
    return userDataExport;
}
User.getUserByID = async (userID) => {
    var user = await UserModel.findOne({ _id: userID });
    return user;
}
module.exports = User;
