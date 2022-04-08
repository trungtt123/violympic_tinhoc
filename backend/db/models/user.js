const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    passWord: {
        type: String,
        required: true,
        trim: true
    },
    currentExam: {
        thcs: {
            
                type: Number,
                default: 1,
            
        },
        thpt:{
           
                type: Number,
                default: 1,
            
        }
    },
    token:{
        type: String,
        required: true,
        trim: true
    },
    infomation: {
        fullName: {
            type: String,
            trim: true
        },
        provinceID: {
            type: String,
            trim: true
        },
        districtID: {
            type: String,
            trim: true
        },
        schoolID: {
            type: String,
            trim: true
        },
        permissionID: {
            type: Number,
            required: true
        },
        examLevel: {
            type: Number, // 0 ca hai, 1 // thcs, 2 thpt
            required: true
        }
    },
    messages: {
        type: Array,
        default: []
    }

}, {collection: 'user'}
);

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;