const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['teacher', 'student'],
        required : true
    },
    classrooms : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Classroom'
        }
    ]
})

module.exports = mongoose.model('User', UserSchema);