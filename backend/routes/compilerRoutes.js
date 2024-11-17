const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware.js');
const router = express.Router();
const { compiler } = require('../controllers/compilerController.js')

router.post('/', compiler)

module.exports = router;