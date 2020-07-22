const express = require('express');

// set up express router
const router = express.Router();

const homeController = require('../controllers/home_controller');

router.use('/users', require('./users'));

// route the home requests to home controller
router.get('/', homeController.home);

module.exports = router;

