const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersPostController = require('../controllers/posts_controller');
router.post('/', passport.checkAuthenticated, usersPostController.createPost);


module.exports = router;