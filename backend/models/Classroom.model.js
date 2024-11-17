const mongoose = require('mongoose');

const ClassroomSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    teacher : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    code : {
        type : String,
    },
    students : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],
    assignments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Assignment'
        }
    ]
}, {timestamps : true});

module.exports = mongoose.model('Classroom', ClassroomSchema);