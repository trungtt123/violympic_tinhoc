const School = require('../repositories/school');

module.exports = {
    async GetAllSChool(req, res) {
        try {
            var listSchool = await School.GetAllSchool(req.params.districtID);
            res.status(200).json({ success: true, listSchool: listSchool });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async GetSchoolFromID(req, res) {
        try {
            var school = await School.GetSchoolFromID(req.params.schoolID);
            res.status(200).json({ success: true, school: school });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    },
    async GetAllUserOfTheSchool(req, res) {
        try {
            var users = await School.GetAllUserOfTheSchool(req.params.schoolID);
            res.status(200).json({ success: true, users: users });
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    }
}