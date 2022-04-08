const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ExamSchema = new Schema({
    examName: {
        type: String,
    },
    examCode:{
        type: String,
        default: ""
    },
    examOpenTime:  {
        type: Object,
        default: undefined
    },
    examTime: {
        type: Object,
        default: undefined
    },
    isCreatedBy: {
        type: String // save username
    },
    listProblemIsCreated: {
        type: Array,
        default: []
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    memberList: {
        type: Array,
        default: []
    },
    isExamForAll: {
        type: Boolean,
        default: true
    },
    isExamRound: {
        type: Boolean,
        default: false,
    },
    indexExamRound: {
        type: Number,
        default: 0
    },
    examLevel: {
        type: Number, // 1: THCS, 2: THPT
        default: 0
    }

}, { timestamps: true }, { collection: 'exams' }
);
const ExamModel = mongoose.model('exams', ExamSchema);

module.exports = ExamModel;