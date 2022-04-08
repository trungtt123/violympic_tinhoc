const MessageModel = require('../db/models/message');
const UserModel = require('../db/models/user');
const Message = {};
Message.CreateMessage = async (listUsers) => {
    var arrTmp = [];
    for (var i = 0; i < listUsers.length;i++){
        console.log(arrTmp.indexOf(String (listUsers[i])));
        if (arrTmp.indexOf(String (listUsers[i])) === -1) {
            arrTmp.push(listUsers[i]);
        }
    }
    
    listUsers = arrTmp;
    await listUsers.sort();
    
    var message = await MessageModel.findOne({ listUsers: listUsers });
    if (message !== null) return message;
    
    message = await MessageModel.create({ listUsers });
    var listUsersData = [];
    for (var i = 0; i < listUsers.length; i++) {
        var userID = listUsers[i];
        var user = await UserModel.findOne({ _id: userID });
        listUsersData.push(user);
    }
    for (var i = 0; i < listUsersData.length; i++) {
        var user = listUsersData[i];
        if (user === null) continue;
        var messageName = '';
        if (listUsersData.length === 2) {
            for (var j = 0; j < listUsersData.length; j++) {
                if (i !== j) {
                    messageName += listUsersData[j].infomation.fullName;
                }
            }
        }
        else {
            for (var j = 0; j < listUsersData.length; j++) {
                if (i !== j) {
                    if (Number (j) !== Number (listUsersData.length - 1))
                    messageName += listUsersData[j].infomation.fullName + ', ';
                    else messageName += listUsersData[j].infomation.fullName;
                }
            }
        }
        if (listUsersData.length > 2) messageName = 'Bạn, ' + messageName;
        user.messages.unshift({ messageName: messageName, messageID: String (message._id) });
        await user.save();
    }    
    return message;
}
Message.AddMessage = async (userID, messageID, message) => {
    const user = await UserModel.findOne({ _id: userID });
    var mess = await MessageModel.findOne({ _id: messageID });
    var d = new Date();
    var n = d.getHours();
    var m = d.getMinutes();
    if (Number(n) < 10) n = '0' + n;
    if (Number(m) < 10) m = '0' + m;
    var time = n + ':' + m;
    mess.messages.push({ userID, fullName: user.infomation.fullName, message, time });
    await mess.save();
    return mess;
}
Message.GetAllMessage = async (userID) => {
    const user = await UserModel.findOne({ _id: userID });

    return user.messages;
}
Message.GetMessageByID = async (messageID) => {
    const message = await MessageModel.findOne({ _id: messageID });
    return message;
}
module.exports = Message;
