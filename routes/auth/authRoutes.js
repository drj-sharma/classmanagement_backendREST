const router = require('express').Router();
const authController = require('../../controllers/auth/authController');

// http://localhost:4242/auth/login-as-teacher
router.post('/login-as-teacher', authController.loginTeacherPost);

// eg: http://localhost:4242/auth/signup-as-teacher
router.post('/signup-as-teacher', authController.signupTeacherPost);

// eg: http://localhost:4242/auth/signup-as-student
router.post('/login-as-student', authController.loginStudentPost);

// http://localhost:4242/auth/signup-as-student
router.post('/signup-as-student', authController.signupStudentPost);

router.get('/logout', authController.logout);
module.exports = router;
