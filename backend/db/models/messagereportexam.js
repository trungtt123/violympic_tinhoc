const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const MessageReportSchema = new Schema({
    examID: {
        type: String, 
        trim: true
    },
    createdExamUserID: {
        type: String,
        trim: true
    },
    userInMessageReport: {
        type: Array,
        default: []
    },
    messageReport: {
        type: Array,
        default: []
    }
}, { timestamps: true }, { collection: 'messagereports' }
);

const MessageReportModel = mongoose.model('messagereports', MessageReportSchema);

module.exports = MessageReportModel;