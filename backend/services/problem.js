const Problem = require('../repositories/problem');

module.exports = {
    async CompilerCode(req, res) {
        try {
            var result = await Problem.CompilerCode(req.params.userID, req.params.problemID, req.body);
            res.status(200).json({ success: true, result: result });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async CreateProblem(req, res) {
        try {
            var problem = await Problem.CreateProblem(req.body);
            res.status(200).json({ success: true, result: problem });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async GetProblem(req, res) {
        try {
            var problem = await Problem.GetProblem(req.params.problemID);
            res.status(200).json({ success: true, result: problem });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async EditProblem(req, res) {
        try {
            var problem = await Problem.EditProblem(req.params.problemID, req.body);
            res.status(200).json({ success: true, result: problem });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    }
}