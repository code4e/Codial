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

module.exports = passport;