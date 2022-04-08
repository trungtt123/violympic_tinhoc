const User = require('../repositories/user');
const Exam = require('../repositories/exam');
const Problem = require('../repositories/problem');
const MessageReport = require('../repositories/messagereportexam');

module.exports = {
    async CreateExam(req, res) {
        try {
            var exam = await Exam.CreateExam(req.body);
            var messageReport = await MessageReport.CreateMessageReport(req.body.isCreatedBy, exam._id);
            res.status(200).json({ success: true, result: exam });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async GetExam(req, res) {
        try {
            var exam = await Exam.GetExam(req.params.examID);
            res.status(200).json({ success: true, result: exam });

        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async HandlePublishExam(req, res) {
        try {
            var exam = await Exam.HandlePublishExam(req.params.examID);
            res.status(200).json({ success: true, result: exam });

        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async GetExamForExaminer(req, res) {
        try {
            var exam = await Exam.GetExam(req.params.examID);
            var listProblem = await Exam.GetAllProblemOfExam(req.params.examID);
            var messageReportExam = await MessageReport.GetMessageReport(req.params.examID);
            var data = {
                examInfomation: exam,
                listProblem,
                messageReportExam
            }
            res.status(200).json({ success: true, result: data });

        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async AddProblem(req, res) {
        try {
            var exam = await Exam.AddProblem(req.params.examID, req.params.problemID);
            res.status(200).json({ success: true, result: exam });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async GetAllExam(req, res) {
        try {
            var exams = await Exam.GetAllExam(req.params.userID);
            res.status(200).json({ success: true, result: exams });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async EditExam(req, res) {
        try {
            var exam = await Exam.EditExam(req.params.examID, req.body);
            res.status(200).json({ success: true, result: exam });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async GetAllProblemOfExam(req, res) {
        try {
            var listProblem = await Exam.GetAllProblemOfExam(req.params.examID);
            res.status(200).json({ success: true, result: listProblem });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async SelectProblem(req, res) {
        try {
            var problem = await Exam.SelectProblem(req.params.problemID);
            res.status(200).json({ success: true, result: problem });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async UnSelectProblem(req, res) {
        try {
            var problem = await Exam.UnSelectProblem(req.params.problemID);
            res.status(200).json({ success: true, result: problem });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async DeleteExam(req, res) {
        try {
            var result = await Exam.DeleteExam(req.params.examID);
            res.status(200).json({ success: true, result: result });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async GetFullExam(req, res) {
        try {
            var listExam = await Exam.GetFullExam(req.params.userID);
            
            res.status(200).json({ success: true, result: listExam });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async GetCurrentExam(req, res) {
        try {
            var currentExam = await Exam.getCurrentExam(req.params.userID);
            res.status(200).json({ success: true, result: currentExam });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async GetNewestExamRound(req, res) {
        try {
            var newestexamround = await Exam.GetNewestExamRound();
            res.status(200).json({ success: true, result: newestexamround });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    }
}