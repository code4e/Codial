const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controllers');
const usersPostController = require('../controllers/posts_controller');
const { route } = require('.');

// route the requests related to user to user controller and execute appropriate action for the request
router.get('/profile', userController.profile);
router.get('/posts', usersPostController.posts);
router.get('/sign-in-page', userController.signIn);
router.get('/sign-up-page', userController.signUp);


module.exports = router;
