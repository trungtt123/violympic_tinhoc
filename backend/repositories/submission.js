
const SubmissionModel = require('../db/models/submission');
const ProblemModel = require('../db/models/problem');
const Submission = {};

Submission.CreateSubmission = async (data) => {
    console.log(data);
    var submisstion = await SubmissionModel.create(data);
    return submisstion;
}
Submission.GetSubmissionOfUser = async (userID, problemID) => {
    console.log(userID, problemID);
    var listSubmission = await SubmissionModel.find({ userID, problemID });
    listSubmission.sort((a, b) => {
        return a.updateAt < b.updateAt
    });
    return listSubmission;
}
Submission.GetBestSubmission = async (userID, problemID) => {
    var listSubmission = await SubmissionModel.find({ userID, problemID });
    var problem = await ProblemModel.findOne({_id: problemID});
    var maxScore = 0;
    var resultMaxScore = '0/' + problem.problemScore;
    
    for (var i = 0; i < listSubmission.length; i++) {
        if (listSubmission[i].score !== '-') {
            var score = listSubmission[i].score.split('/');
            if (Number(score[0]) > maxScore) {
                resultMaxScore = listSubmission[i].score;
            }
        }
    }
    return resultMaxScore;
}

module.exports = Submission;
