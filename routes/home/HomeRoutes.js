const router = require('express').Router();
const { getClasses } = require('../../controllers/home/homeController');

router.get('/', getClasses);

module.exports = router;
