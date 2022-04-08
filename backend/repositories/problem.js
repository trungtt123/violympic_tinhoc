
const ProblemModel = require('../db/models/problem');
const SubmissionModel = require('../db/models/submission');
const Problem = {};
const axios = require('axios');

Problem.CreateProblem = async (data) => {
    console.log(data);
    var totalScore = 0;
    for (var i = 0; i < data.problemTestCase.length; i++) {
        totalScore += Number (data.problemTestCase[i].score);
    }
    data.problemScore = totalScore;
    var problem = await ProblemModel.create(data);
    return problem;
}
Problem.EditProblem = async (problemID, data) => {
    await ProblemModel.updateOne({ _id: problemID }, data);
    var problem = ProblemModel.findOne({ _id: problemID });
    return problem;
}
Problem.GetProblem = async (problemID) => {
    var problem = await ProblemModel.findOne({ _id: problemID });
    return problem;
}
Problem.CompilerCode = async (userID, problemID, data) => { 
    var problem = await ProblemModel.findOne({ _id: problemID });
    var objResult = {};
    var dataObjResult = [];
    var score = 0;
    var totalScore = problem.problemScore;
    var compilerError = false;
    if (data.language === undefined) {
        compilerError = true;
        objResult.status = "NOT LANGUAGE";
    }
    if (compilerError === false)
    for (var i = 0; i < problem.problemTestCase.length; i++) {
        
        if (compilerError === true) {
            objResult.status = "COMPILATION ERROR";
            break;
        }
        const dataCompiler = {
            source_code: data.sourceCode,
            language_id: data.language,
            stdin: problem.problemTestCase[i].input
        }
        try {
            var result = await axios({
                method: 'post',
                url: 'https://ce.judge0.com/submissions/?base64_encoded=false&wait=true', 
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                data:dataCompiler
            });
            var objResultTest = {}; 
            var stdout = result.data.stdout;
            if (stdout === null) stdout = "";
            stdout = stdout.trim();
            var output = problem.problemTestCase[i].output.trim();
            if (stdout === output){
            objResultTest.status = "CORRECT";
                objResultTest.score = problem.problemTestCase[i].score;
                score += parseInt(problem.problemTestCase[i].score);
            }
            else{
                switch (result.data.status.description){
                    case ("Time limit exceeded"):
                        objResultTest.status = "TIME LIMIT EXCEEDED";
                        objResultTest.score = 0;
                        break;
                    case ("Compilation Error"):
                        compilerError = true;
                        break;
                    default: 
                        objResultTest.status = "INCORRECT";
                        objResultTest.score = 0;
                        break;
                }
            }
            if (compilerError === false) dataObjResult.push(objResultTest);
        }
        catch (e) {
            compilerError = true;
        }
    }
    if (compilerError === false){
        objResult.status = "COMPILATION SUCCESSFUlLY";
        objResult.detail = dataObjResult;
    }
    objResult.score = score + '/' + totalScore;
    var submisstion = await SubmissionModel.create({
        userID, 
        problemID,
        score: objResult.score, 
        status: objResult.status,
        sourceCode: data.sourceCode,
        detail: objResult.detail
    });
    return submisstion;
}   

module.exports = Problem;
