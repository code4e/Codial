const express = require('express');
const router = express.Router();
const passport = require('passport');
const commentsController = require('../controllers/comments_controller');
router.post('/create-comment', passport.checkAuthenticated, commentsController.createComment);

module.exports = router;