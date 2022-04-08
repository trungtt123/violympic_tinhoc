const ExamResultServices = require('../services/examresult');
module.exports = (app) => {
    app.post('/examresult/saveexamresult/', (req, res) => {
        ExamResultServices.SaveExamResult(req, res);
    });
    app.post('/examresult/retestexam/', (req, res) => {
        ExamResultServices.RetestExam(req, res);
    });
    app.get('/examresult/getlistresult/:userID', (req, res) => {
        ExamResultServices.GetListResult(req, res);
    });
    app.post('/examresult/getlistuserinprovince', (req, res) => {
        ExamResultServices.GetListUserInProvince(req, res);
    });
    app.post('/examresult/getlistuserindistrict', (req, res) => {
        ExamResultServices.GetListUserInDistrict(req, res);
    });
    app.post('/examresult/getlistuserinschool', (req, res) => {
        ExamResultServices.GetListUserInSchool(req, res);
    });
};