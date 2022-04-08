
const ExamModel = require('../db/models/exam');
const ProblemModel = require('../db/models/problem');
const UserModel = require('../db/models/user');
const ExamResultModel = require('../db/models/examresult');
const MessageReportModel = require('../db/models/messagereportexam');
const Exam = {};
Exam.GetAllExamForSearch = async (keyword) => {
    var exams = await ExamModel.find({isPublished: true, isExamForAll: true, isExamRound: false});
    var arrEx = [];
    for (var i=0;i<exams.length;i++){
        var exam = exams[i];
        var examID = String (exam._id);
        var examName = String (exam.examName);
        if (examID.toLowerCase().indexOf(keyword) >-1 || examName.toLowerCase().indexOf(keyword)>-1){
            arrEx.push(exam);
        }
    }
    return arrEx;
} 
Exam.CreateExam = async (data) => {
    if (data.isExamRound === false) data.indexExamRound = 0;
    else {
       
        var examrounds = await ExamModel.find({ isExamRound: true, examLevel: data.examLevel});
        var indexExamRound = examrounds.length + 1;

        data.indexExamRound = indexExamRound;
    }
    console.log(data);
    var exam = await ExamModel.create(data);
    return exam;
}
Exam.EditExam = async (examID, data) => {
    var exam = await ExamModel.findOne({ _id: examID });

    exam = await ExamModel.updateOne({ _id: examID },
        data
    );
    exam = await ExamModel.findOne({ _id: examID });
    return exam;
}
Exam.GetExam = async (examID) => {
    var exam = await ExamModel.findOne({ _id: examID });
    return exam;
}
Exam.HandlePublishExam = async (examID) => {
    var exam = await ExamModel.findOne({ _id: examID });
    exam.isPublished = (!exam.isPublished);
    exam.save();
    return exam;
}
Exam.GetAllExam = async (userID) => {
    var listExam = await ExamModel.find({ isCreatedBy: userID });
    return listExam;
}
Exam.DeleteExam = async (examID) => {
    await ExamModel.deleteOne({ _id: examID });
    return true;
}
Exam.GetFullExam = async (userID) => {
    var data = [];
    var listExam = await ExamModel.find({ isExamRound: false, isPublished: true });
    for (var i = 0; i < listExam.length;i++){
        var exam = {
            exam: null,
            isCreatedBy: null,
            forYou: false,
            didThisExam: false,
            examScore: null
        };
        for (var j = 0; j < listExam[i].memberList.length; j++){
            if (listExam[i].memberList[j].userID === userID){
                exam.forYou = true;
                break;
            }
        }
        const examresult = await ExamResultModel.findOne({userID: userID, examID: listExam[i]._id});
        
        if (examresult !== null) {
            console.log(examresult.score);
            exam.didThisExam = true;
            exam.examScore = examresult.score;
        }
        if (listExam[i].isExamForAll === true) exam.forYou = true;
        exam.exam = listExam[i];
        const userCreateID = listExam[i].isCreatedBy;
        const userCreate = await UserModel.findOne({_id: userCreateID});
        exam.isCreatedBy = {
            userID,
            fullName: userCreate.infomation.fullName
        }
        data.push(exam);
    }
    
    return data;
}
Exam.AddProblem = async (examID, problemID) => {
    var exam = await ExamModel.findOne({ _id: examID });
    exam.listProblemIsCreated.push(problemID);
    exam.save();
    return exam;
}
Exam.GetAllProblemOfExam = async (examID) => {
    var listProblem = await ProblemModel.find({ examID: examID });

    return listProblem;
}
Exam.SelectProblem = async (problemID) => {
    var problem = await ProblemModel.findOne({ _id: problemID });
    problem.isSelected = true;
    problem.save();
    return problem;
}
Exam.UnSelectProblem = async (problemID) => {
    var problem = await ProblemModel.findOne({ _id: problemID });
    problem.isSelected = false;
    problem.save();
    return problem;
}
Exam.getCurrentExam = async (userID) => {
    var user = await UserModel.findOne({ _id: userID });
    var examroundthcs = await ExamModel.findOne({ indexExamRound: user.currentExam.thcs, examLevel: 1 });
    var examroundthpt = await ExamModel.findOne({ indexExamRound: user.currentExam.thpt, examLevel: 2 });
    var thcsExamLevel = await ExamModel.find({ isExamRound: true, examLevel: 1});
    var thptExamLevel = await ExamModel.find({ isExamRound: true, examLevel: 2 });
    var examround = {
        thpt: null,
        thcs: null,
        thptExamLevel: (thptExamLevel.length === 0) ? null : thptExamLevel[thptExamLevel.length - 1],
        thcsExamLevel: (thcsExamLevel.length === 0) ? null : thcsExamLevel[thcsExamLevel.length - 1],
    };
    if (examroundthcs !== null && user.infomation.examLevel !== 2) {
        if (examroundthcs.isExamForAll) {
            examround.thcs = examroundthcs;
        }
        else {
            var memberList = examroundthcs.memberList;
            for (var i = 0; i < memberList.length; i++) {
                if (memberList[i].userID === userID) {
                    examround.thcs = examroundthcs;
                }
            }
        }
    }
    if (examroundthpt !== null && user.infomation.examLevel !== 1){
       
        if (examroundthpt.isExamForAll) {
            examround.thpt = examroundthpt;
        }
        else {
            var memberList = examroundthpt.memberList;
            for (var i = 0; i < memberList.length; i++) {
                if (memberList[i].userID === userID) {
                    examround.thpt = examroundthpt;
                }
            }
        }
    }
    return examround;
}
Exam.GetNewestExamRound = async (examLevel) => {
    var examrounds = await ExamModel.find({ isExamRound: true, examLevel, isPublished: true });
    return examrounds.length;
}


module.exports = Exam;
