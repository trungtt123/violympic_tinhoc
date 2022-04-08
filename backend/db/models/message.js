const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const MessageSchema = new Schema({
    listUsers: {
        type: Array,
        default: []
    },
    messages: {
        type: Array,
        default: []
    }
},{ timestamps: true }, { collection: 'messagevios' }
);

const MessageModel = mongoose.model('messagevios', MessageSchema);

module.exports = MessageModel;

