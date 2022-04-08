const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const SubmissionSchema = new Schema({
    problemID: {
        type: String,
        trim: true
    },
    userID: {
        type: String,
        trim: true
    },
    score: {
        type: String,
        trim: true,
        default: '0/'
    },
    status: {
        type: String,
        trim: true,
        default: '-'
    },
    sourceCode: {
        type: String,
        trim: true
    },
    detail: {
        type: Array,
        default: []  
    }
}, { timestamps: true }, { collection: 'submissions' }
);

const SubmisstionModel = mongoose.model('submissions', SubmissionSchema);

module.exports = SubmisstionModel;