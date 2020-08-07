const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersPostController = require('../controllers/posts_controller');
router.post('/create-post', passport.checkAuthenticated, usersPostController.createPost);
router.get('/destroy', passport.checkAuthenticated, usersPostController.destroy);

module.exports = router;