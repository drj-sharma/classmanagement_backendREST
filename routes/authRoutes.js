const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/login-as-teacher', authController.loginTeacherPost);
router.post('/signup-as-teacher', authController.signupTeacherPost);

router.post('/login-as-student', authController.loginStudentPost);
router.post('/signup-as-student', authController.signupStudentPost);

module.exports = router;
