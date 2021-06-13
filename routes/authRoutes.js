const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/login-as-teacher', authController.loginPost);
router.post('/signup-as-teacher', authController.signupPost);

module.exports = router;
