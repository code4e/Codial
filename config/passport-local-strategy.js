// import passport library
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');


// use the local strategy middleware and tell passport that we are  using it
passport.use(new LocalStrategy({
    usernameField: 'email'
    // find the user and establish identity
}, function (email, password, done) {
    User.findOne({
        email: email
    }, function (err, user) {
        if (err) {
            console.log('Error in finding the user ---> passport');
            return done(err);
        }
        if (!user || user.password != password) {
            console.log('Invalid Username/Password');
            return done(null, false);
        }

        return done(null, user);
    });
}));


// serialize the user i.e. when user signs in, decide which property to be encryped and put into cookie and send to browser
passport.serializeUser(function (user, done) {
    done(null, user.id);
});


// deserialize the user i.e. browser makes a request, we use the cookie, decrypt it and find the user again
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('Error in finding the user ---> passport');
            return done(err);
        }
        if (user) {
            return done(null, user);

        }
    });
});



// set up a function in passport to check if user is authenticated or not. This'll be used as a middleware before createSession controller action
passport.checkAuthenticated = function(req, res, next){

    // if user is authenticated, pass on the request to appropriate controller's action
    if(req.isAuthenticated()){
        return next();
    }


    // user is not authenticated
    return res.redirect('/users/sign-in-page');
}


// this is defined as middleware in app.js and is called and makes the user's info which is currently in req.user and copy it into 
// response locals to make it accssible in views
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    return next();
}


passport.isSignedIn = function(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/profile');
}

module.exports = passport;
