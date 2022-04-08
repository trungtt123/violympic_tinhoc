const SubmissionServices = require('../services/submission');
module.exports = (app) => {
    app.get('/submission/getsubmission/:userID/:problemID', (req, res) => {
        SubmissionServices.GetSubmissionOfUser(req, res);
    });
    app.get('/submission/getbestsubmission/:userID/:problemID', (req, res) => {
        SubmissionServices.GetBestSubmission(req, res);
    });
};