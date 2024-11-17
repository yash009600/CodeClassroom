const Classroom = require('../models/Classroom.model');
const User = require('../models/User.model');
const jwt = require('jsonwebtoken')

exports.createClassroom = async(req, res)=>{
    const name = req.body.name;
    // const token = req.headers.authorization;
    // let decoded = jwt.decode(token);
    // let id = decoded.id;
    // if(decoded.role != "teacher"){
    //     res.status(400).json({
    //         msg : "Failed to create as user is not the teacher"
    //     })
    // }

    try {
        let id = req.user.id;
        // console.log(name, id)
        const classroom = new Classroom({name, teacher : id})
        await classroom.save();
        // console.log(classroom)
        const teacher = await User.findById(id);
        teacher.classrooms.push(classroom._id);
        await teacher.save();
        classroom.code = classroom._id;
        classroom.save();
        res.status(201).json(classroom);

    } catch (error) {
        res.status(500).json({ message: 'Server error, classroom controller 1' });
    }
};

exports.enrollStudent = async (req, res) => {
    const studentId = req.user.id;
    const classId = req.body.classCode;
    
    try {
        const classroom = await Classroom.findById(classId);
        
        // Check if the student is already enrolled
        if (classroom.students.includes(studentId)) {
            return res.status(400).json({ message: 'Student has already joined the classroom' });
        }

        // Add the student to the classroom
        classroom.students.push(studentId);
        await classroom.save();

        const user = await User.findById(studentId);

        // Check if the classroom is already in the student's list
        if (!user.classrooms.includes(classId)) {
            user.classrooms.push(classId);
            await user.save();
        }

        res.json(classroom);
        
    } catch (error) {
        res.status(500).json({ message: 'Server error, classroom controller' });
    }
};


exports.getClassrooms = async (req, res) => {
    const token = req.headers.authorization;

    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user and populate classrooms with name, students, teacher, and createdAt fields
        const user = await User.findById(decoded.id).populate({
            path: 'classrooms',  // Path to populate
            select: 'name students code teacher createdAt',  // Select the fields 'name', 'students', 'code', 'teacher', and 'createdAt'
            populate: { path: 'teacher', select: 'name' }  // Populate the 'teacher' field with the teacher's name
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Map classrooms and calculate total number of students for each
        const classroomsDetails = user.classrooms.map(classroom => ({
            _id: classroom._id,
            name: classroom.name,
            studentCount: classroom.students.length,  // Count the number of students
            code: classroom.code,
            teacherName: classroom.teacher.name,  // Get the teacher's name
            createdAt: classroom.createdAt  // Include the creation date
        }));

        // Send the populated classrooms array with the total number of students, teacher's name, and creation date
        res.status(200).json({ classrooms: classroomsDetails });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error, classroom controller" });
    }
};
