const ExamServices = require('../services/exam');
module.exports = (app) => {
    app.post('/exam/createexam/', (req, res) => {
        ExamServices.CreateExam(req, res);
    });
    app.get('/exam/getexam/:examID/', (req, res) => {
        ExamServices.GetExam(req, res);
    });
    app.get('/exam/getnewestexamround', (req, res) => {
        ExamServices.GetNewestExamRound(req, res);
    });
    app.get('/exam/getcurrentexam/:userID/', (req, res) => {
        ExamServices.GetCurrentExam(req, res);
    });
    app.get('/exam/handlepublishexam/:examID/', (req, res) => {
        ExamServices.HandlePublishExam(req, res);
    });
    app.get('/exam/deleteexam/:examID/', (req, res) => {
        ExamServices.DeleteExam(req, res);
    });
    app.get('/exam/getexamforexamier/:examID/', (req, res) => {
        ExamServices.GetExamForExaminer(req, res);
    });
    app.get('/exam/addproblem/:examID/:problemID', (req, res) => {
        ExamServices.AddProblem(req, res);
    });
    app.get('/exam/getallexam/:userID', (req, res) => {
        ExamServices.GetAllExam(req, res);
    });
    app.post('/exam/editexam/:examID', (req, res) => {
        ExamServices.EditExam(req, res);
    });
    app.get('/exam/getallproblemofexam/:examID', (req, res) => {
        ExamServices.GetAllProblemOfExam(req, res);
    });
    app.get('/exam/selectproblem/:examID/:problemID', (req, res) => {
        ExamServices.SelectProblem(req, res);
    });
    app.get('/exam/unselectproblem/:examID/:problemID', (req, res) => {
        ExamServices.UnSelectProblem(req, res);
    });
    app.get('/exam/getfullexam/:userID', (req, res) => {
        ExamServices.GetFullExam(req, res);
    });
};