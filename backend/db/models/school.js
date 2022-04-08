const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const UserSchema = new Schema({
    SchoolName: {
        type: String,
        trim: true
    },
    DistrictID: {
        type: Number
    }

}, {collection: 'school'}
);

const SchoolModel = mongoose.model('school', UserSchema);

module.exports = SchoolModel;