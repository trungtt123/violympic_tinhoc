const User = require('../repositories/user');
const ExamResult = require('../repositories/examresult');
const Problem = require('../repositories/problem');

module.exports = {
    async SaveExamResult(req, res) {
        try {
            var examresult = await ExamResult.SaveExamResult(req.body);
            res.status(200).json({ success: true, result: examresult });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async RetestExam(req, res) {
        try {
            await ExamResult.RetestExam(req.body);
            res.status(200).json({ success: true });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async GetListResult(req, res){
        try {
            const result = await ExamResult.GetListResult(req.params.userID);
            res.status(200).json({ success: true, result: result });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }

    },
    async GetListUserInProvince(req, res){
        try {
            const result = await ExamResult.GetListUserInProvince(req.body);
            res.status(200).json({ success: true, result: result });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }

    },
    async GetListUserInDistrict(req, res){
        try {
            const result = await ExamResult.GetListUserInDistrict(req.body);
            res.status(200).json({ success: true, result: result });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }

    },
    async GetListUserInSchool(req, res){
        try {
            const result = await ExamResult.GetListUserInSchool(req.body);
            res.status(200).json({ success: true, result: result });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }

    },
}