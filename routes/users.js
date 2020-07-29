// require essential modules
const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controllers');
const usersPostController = require('../controllers/posts_controller');
const {
    route
} = require('.');

const passport = require('passport');

// route the requests related to user to user controller and execute appropriate action for the request

// for users/profile request, we first pass it on the middleware which checks if user is authenticated. If user is 
// authenticated, pass req forward to controller's action to render profile page
router.get('/profile', passport.checkAuthenticated, userController.profile);


router.get('/posts', usersPostController.posts);
router.get('/sign-in-page', userController.signIn);
router.get('/sign-up-page', userController.signUp);

// route the create user post request to create user action in user controller
router.post('/create', userController.createUser);


/* 
  route to create the session i.e. signing in the user
  this takes three arguments- the request url, the middleware to use to authenticate the user with passport
  and the controller action to be executed in case the user is successfully authenticated courtesy to passport
*/
// the authenticate method in passport is predefined and is used to set the strategy on which to authenticate the user
router.post('/create-session', passport.authenticate(
    'local',

    //     // where to redirect in case the 'done' method returns false(i.e. user not authenticated)
    {
        failureRedirect: '/users/sign-in-page'
    }

    /* 
    if 'done' method returns the user, it means user is authenticated.
        In that case, execute the createSession action inside ./controllers/user_controller.js
     */
), userController.createSession);
module.exports = router;