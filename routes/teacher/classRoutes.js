const router = require('express').Router();
const classController = require('../../controllers/teacher/classController');

// rg: http://localhost:4242/class/add with class body
router.post('/add', classController.addClass);

// eg: http://localhost:4242/class/{id}
router.get('/:id', classController.getClass);

// eg: http://localhost:4242/class/update with updated class body
router.put('/update', classController.editClass);

// eg: http://localhost:4242/class/delete/{id}
router.delete('/delete/:id', classController.deleteClass);

module.exports = router;
