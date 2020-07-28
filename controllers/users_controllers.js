const User = require('../models/users');
const {
    db
} = require('../models/users');


// render the user profile page
module.exports.profile = function (req, res) {
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id, function (err, user) {
            if (err) {
                console.log('Error occured while fetching user data');
                return res.redirect('/users/sign-in-page');
            }
            if (user) {
                return res.render('users', {
                    title: `${user.name}'s Profile Page`,
                    username: user.name,
                    email: user.email
                });
            }
            return res.redirect('/users/sign-in-page');
        });
    } else {
        return res.redirect('/users/sign-in-page');

    }
}


// render the sign in page
module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: 'Sign In User',
        heading: 'User Sign In'
    });
}


// render the sign up page
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: 'Sign Up New User Here',
        heading: 'Sign Up a New User Here!'
    });
}

// create a new user in the database
module.exports.createUser = function (req, res) {
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect('back');
    }
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) {
            console.log("error in signing up the user");
            return res.redirect('back');
        }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('error');
                    return res.redirect('back');
                }
                return res.redirect('/users/sign-in-page');
            });
        } else {
            return res.redirect('back');
        }
    });
}

// sign in the user and create a session
module.exports.createSession = function (req, res) {
    // find the user 
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) {
            console.log('Cannot Find user');
            return res.redirect('back');
        }
        // handle user if found
        if (user) {
            // check if passwords dont match
            if (user.password != req.body.password) {
                return res.redirect('back');
            }
            res.cookie('user_id', user.id);
            res.redirect('/users/profile');
        }

        // handle user if not found
        else {
            return res.redirect('back');
        }
    });

}

module.exports.terminateSession = function(req, res){
    res.cookie('user_id', null);
    return res.redirect('/users/sign-in-page');
}