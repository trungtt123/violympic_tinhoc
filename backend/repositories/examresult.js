
const ExamResultModel = require('../db/models/examresult');
const SubmisstionModel = require('../db/models/submission');
const ProblemModel = require('../db/models/problem');
const UserModel = require('../db/models/user');
const ExamModel = require('../db/models/exam');
const ExamResult = {};
ExamResult.GetListResult = async (userID) => {
    //console.log(userID);

    const user = await UserModel.findOne({ _id: userID });
    //console.log("*******************************************************************************************");
    const resultTHCS = [];
    const resultTHPT = [];
    const totalResultTHCS = {
        score: null,
        time: null,
    }
    const totalResultTHPT = {
        score: null,
        time: null,
    }
    try {
        var resScore = 0;
        var resScoreTotal = 0;
        var resTime = 0;
        for (var i = 1; i < user.currentExam.thcs; i++) {
            const exam = await ExamModel.findOne({ indexExamRound: i, examLevel: 1, isPublished: true, isExamRound: true });
            const examresult = await ExamResultModel.findOne({ userID: userID, examID: exam._id });
            resultTHCS.push({ exam, examresult });
            resScore += Number(examresult.score.split('/')[0]);
            resScoreTotal += Number(examresult.score.split('/')[1]);
            resTime += Number(examresult.time);
        }
        totalResultTHCS.score = resScore + '/' + resScoreTotal;
        totalResultTHCS.time = resTime;
        resScore = 0;
        resScoreTotal = 0;
        resTime = 0;
        for (var i = 1; i < user.currentExam.thpt; i++) {
            const exam = await ExamModel.findOne({ indexExamRound: i, examLevel: 2, isPublished: true, isExamRound: true });
            const examresult = await ExamResultModel.findOne({ userID: userID, examID: exam._id });
            resultTHPT.push({ exam, examresult });
            resScore += Number(examresult.score.split('/')[0]);
            resScoreTotal += Number(examresult.score.split('/')[1]);
            resTime += Number(examresult.time);
        }
        totalResultTHPT.score = resScore + '/' + resScoreTotal;
        totalResultTHPT.time = resTime;
        return {
            resultTHCS,
            resultTHPT,
            totalResultTHPT,
            totalResultTHCS
        };
    }
    catch (e) {
        return {
            resultTHCS,
            resultTHPT,
            totalResultTHPT: null,
            totalResultTHCS: null
        };
    }
}
ExamResult.SaveExamResult = async (data) => {
    var examResult = await ExamResultModel.findOne({ userID: data.userID, examID: data.examID });
    if (examResult === null) {
        examResult = await ExamResultModel.create(data);
    }
    else {
        examResult.score = data.score;
        examResult.time = data.time;
        examResult.numberOfSubmission = examResult.numberOfSubmission + 1;
        await examResult.save();
    }
    var user = await UserModel.findOne({ _id: data.userID });
    var exam = await ExamModel.findOne({ _id: data.examID });
    console.log(exam.examLevel);
    if (exam.examLevel === 1 && exam.isExamRound === true) {
        user.currentExam.thcs = Number(user.currentExam.thcs) + 1;
    }
    if (exam.examLevel === 2 && exam.isExamRound === true) {
        user.currentExam.thpt = Number(user.currentExam.thpt) + 1;
    }
    await user.save();
    const listProblem = await ProblemModel.find({ examID: data.examID, isSelected: true });
    for (var i = 0; i < listProblem.length; i++) {
        await SubmisstionModel.deleteMany({ userID: data.userID, problemID: listProblem[i]._id });
    }
    return examResult;
}
ExamResult.RetestExam = async (data) => {

    const listProblem = await ProblemModel.find({ examID: data.examID, isSelected: true });
    for (var i = 0; i < listProblem.length; i++) {
        await SubmisstionModel.deleteMany({ userID: data.userID, problemID: listProblem[i]._id });
    }
    return;
}
ExamResult.GetListUserInProvince = async (data) => {
    const dataExport = [];
    const users = await UserModel.find();
    for (var j = 0; j < data.length; j++) {
        var provinceID = data[j].ProvinceID;
        var thcsCnt = 0;
        var thptCnt = 0;
        for (var i = 0; i < users.length; i++) {

            if (String(users[i].infomation.provinceID) === String(provinceID)) {
                if (Number(users[i].infomation.examLevel) === 0) {
                    thcsCnt++;
                    thptCnt++;
                }
                else {
                    if (Number(users[i].infomation.examLevel) === 1) {
                        thcsCnt++;
                    } else thptCnt++;
                }
            }


        }
        dataExport.push({
            provinceID,
            thcsCnt,
            thptCnt
        });

    }
    return dataExport;
}
ExamResult.GetListUserInDistrict = async (data) => {
    const dataExport = [];
    const users = await UserModel.find();
    for (var j = 0; j < data.length; j++) {
        var districtID = data[j].DistrictID;

        var thcsCnt = 0;
        var thptCnt = 0;

        for (var i = 0; i < users.length; i++) {
            if (String(users[i].infomation.districtID) === String(districtID)) {
                if (Number(users[i].infomation.examLevel) === 0) {
                    thcsCnt++;
                    thptCnt++;
                }
                else {
                    if (Number(users[i].infomation.examLevel) === 1) {
                        thcsCnt++;
                    } else thptCnt++;
                }
            }


        }
        dataExport.push({
            districtID,
            thcsCnt,
            thptCnt
        });

    }
    return dataExport;
}
ExamResult.GetListUserInSchool = async (data) => {
    console.log(data);
    const dataExport = [];
    const users = await UserModel.find();
    for (var j = 0; j < data.length; j++) {
        var schoolID = data[j]._id;

        var thcsCnt = 0;
        var thptCnt = 0;

        for (var i = 0; i < users.length; i++) {
            if (String(users[i].infomation.schoolID) === String(schoolID)) {
                if (Number(users[i].infomation.examLevel) === 0) {
                    thcsCnt++;
                    thptCnt++;
                }
                else {
                    if (Number(users[i].infomation.examLevel) === 1) {
                        thcsCnt++;
                    } else thptCnt++;
                }
            }


        }
        dataExport.push({
            schoolID,
            thcsCnt,
            thptCnt
        });

    }
    return dataExport;
}
module.exports = ExamResult;
