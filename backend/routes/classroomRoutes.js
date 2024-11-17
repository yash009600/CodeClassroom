const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware.js');
const { createClassroom, enrollStudent, getClassrooms } = require('../controllers/classroomController.js');
const router = express.Router();

router.post('/create', authMiddleware, createClassroom);
router.post('/join', authMiddleware, enrollStudent);
router.get('/', authMiddleware, getClassrooms);

module.exports = router;