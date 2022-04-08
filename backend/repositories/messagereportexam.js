
const MessageReportModel = require('../db/models/messagereportexam')
const MessageReport = {};
MessageReport.CreateMessageReport = async (createdExamUserID, examID) => {
    const messageReport = await MessageReportModel.create({createdExamUserID, examID});
    messageReport.userInMessageReport.push(createdExamUserID);
    await messageReport.save();
    return messageReport;
}
MessageReport.UserJoinMessageReport = async (userID, messageReportID) => {
    console.log("****************************UserJoinReport***************")
    const messageReport = await MessageReportModel.findOne({_id: messageReportID});
    for (var i = 0; i < messageReport.userInMessageReport.length;i++)
    {
        if (messageReport.userInMessageReport[i] === userID){
            return messageReport;
        }
    }
    messageReport.userInMessageReport.push(userID);
    await messageReport.save();
    return messageReport;
}
MessageReport.AddMessage = async (userID, messageReportID, problemName, message) => {
    const messageReport = await MessageReportModel.findOne({_id: messageReportID});
    if (message === "") return messageReport;
    messageReport.messageReport.push({userID, message, problemName});
    await messageReport.save();
    return messageReport;
}
MessageReport.GetMessageReport = async (examID) => {
    console.log(examID);
    const messageReport = await MessageReportModel.findOne({examID: examID});
    console.log(messageReport);
    return messageReport;
}
module.exports = MessageReport;
