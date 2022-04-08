
const ProblemServices = require('../services/problem');
module.exports = (app) => {
    app.post('/problem/compilercode/:userID/:problemID', (req, res) => {
        ProblemServices.CompilerCode(req, res);
    });
    app.post('/problem/createproblem', (req, res) => {
        ProblemServices.CreateProblem(req, res);
    });
    app.post('/problem/editproblem/:problemID', (req, res) => {
        ProblemServices.EditProblem(req, res);
    });
    app.get('/problem/getproblem/:problemID', (req, res) => {
        ProblemServices.GetProblem(req, res);
    });
};