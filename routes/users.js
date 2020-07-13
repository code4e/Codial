const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controllers');
const usersPostController = require('../controllers/posts_controller');
const { route } = require('.');
router.get('/profile', userController.profile);
router.get('/posts', usersPostController.posts);
// router.get('/username', userController.username);
module.exports = router;
