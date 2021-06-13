const router = require('express').Router();
const studentController = require('../../controllers/student/studentController');
const StudentAuthorize = require('../../middlewares/StudentAuthorize');

// rg: http://localhost:4242/u/getMyClasses with class body
router.get('/getMyClasses', StudentAuthorize, studentController.getMyClasses);

router.post('/addToMySchedule', StudentAuthorize, studentController.addToMySchedule);
router.delete('/delete/:classid', StudentAuthorize, studentController.deleteFromMySchedule);

module.exports = router;
