const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
    classroom : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Classroom',
        required : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    // dueDate : {
    //     type : Date,
    //     required : true
    // },
    status : {
        type : String,
        enum : ['submitted', 'pending'],
        default : 'pending'
    },
    // score : {
    //     type : Number,
    //     default : 0
    // },
    submissions : [
        {
            student : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User'
            },
            code : {
                type : String,
                required : true
            },
            grade : {
                type : Number,
                default : undefined
            },
            submittedAt : {
                type : String
            },
            status : {
                type : String,
                enum : ['submitted', 'pending'],
                default : 'pending'
            }
        }
    ]

});

module.exports = mongoose.model('Assignment', AssignmentSchema);