const Submission = require('../repositories/submission');

module.exports = {
    async GetSubmissionOfUser(req, res) {
        try {
            var result = await Submission.GetSubmissionOfUser(req.params.userID, req.params.problemID);
            res.status(200).json({ success: true, result: result });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async GetBestSubmission(req, res) {
        try {
            var score = await Submission.GetBestSubmission(req.params.userID, req.params.problemID);
            res.status(200).json({ success: true, result: score });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    }

}   