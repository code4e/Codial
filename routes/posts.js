const express = require('express');
const router = express.Router();
const usersPostController = require('../controllers/posts_controller');
router.post('/', usersPostController.createPost);


module.exports = router;