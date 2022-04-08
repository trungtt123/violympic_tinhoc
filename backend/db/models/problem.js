const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ProblemSchema = new Schema({
    problemName: {
        type: String,
    },
    problemTags: {
        type: String,
    },
    problemNumberOfSolved: {
        type: Number,
        default: 0
    },
    problemTestCase: {
        type: Array
    },
    problemMemoryLimit: {
        type: String
    },
    problemIndexSubmitLimit: {
        type: Number
    },
    problemContent: {
        type: String,
        default: ""
    },
    problemScore: {
        type: Number
    },
    examID: {
        type: String
    },
    isSelected: {
        type: Boolean,
        default: false
    }
}, { collection: 'problem' }
);

const ProblemModel = mongoose.model('problem', ProblemSchema);

module.exports = ProblemModel;