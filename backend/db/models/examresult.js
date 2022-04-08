const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ResultSchema = new Schema({
    userID: {
        type: String,
        trim: true
    },
    examID: {
        type: String,
        trim: true
    },
    score: {
        type: String,
        trim: true,
        default: '0/'
    },
    time: {
        type: Number,
        default: 0
    },
    numberOfSubmission: {
        type: Number,
        default: 1
    }
}, { timestamps: true }, { collection: 'examresults' }
);

const ExamResultModel = mongoose.model('examresults', ResultSchema);

module.exports = ExamResultModel;