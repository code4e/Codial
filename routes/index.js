const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
router.use('/users', require('./users'));
router.get('/', homeController.home);
// router.get('/otherhome', homeController.otherHome);
module.exports = router;

