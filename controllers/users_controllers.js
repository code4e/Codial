const User = require('../models/users');


// render the user profile page
module.exports.profile = function(req, res){
    return res.render('users', {
        title: 'users'
    });
}


// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: 'Sign In User',
        heading: 'User Sign In'
    });
}


// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: 'Sign Up New User Here',
        heading: 'Sign Up a New User Here!'
    });
}

// create a new user in the database
module.exports.createUser = function(req, res){
    console.log(req.body);
    if(req.body.password != req.body.confirmPassword){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log("error in signing up the user");
            return res.redirect('back');
        }
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error');
                    return res.redirect('back');
                }
                return res.redirect('/users/sign-in-page');
            });
        }
        else{
            return res.redirect('back');
        }
    });
}

// sign in the user and create a session
module.exports.createSession = function(req, res){

}