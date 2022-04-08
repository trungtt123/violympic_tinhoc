const SchoolServices = require('../services/school');
module.exports = (app) => {
    app.get('/school/getallschool/:districtID', (req, res) => {
        SchoolServices.GetAllSChool(req, res)
    })
    app.get('/school/getschoolfromid/:schoolID', (req, res) => {
        SchoolServices.GetSchoolFromID(req, res)
    });
    app.get('/school/getalluseroftheschool/:schoolID', (req, res) => {
        SchoolServices.GetAllUserOfTheSchool(req, res)
    });
};