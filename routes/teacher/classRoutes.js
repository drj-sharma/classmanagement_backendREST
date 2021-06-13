const router = require('express').Router();
const classController = require('../../controllers/teacher/classController');
const TeacherAuthorize = require('../../middlewares/TeacherAuthorize');
// rg: http://localhost:4242/class/add with class body
router.post('/add', TeacherAuthorize, classController.addClass);

// eg: http://localhost:4242/class/{id}
router.get('/:id', TeacherAuthorize, classController.getClass);

// eg: http://localhost:4242/class/update with updated class body
router.put('/update', TeacherAuthorize, classController.editClass);

// eg: http://localhost:4242/class/delete/{id}
router.delete('/delete/:id', TeacherAuthorize, classController.deleteClass);

module.exports = router;
