const User = require('../models/users');


// render the user profile page
module.exports.profile = function (req, res) {

    console.log(req.params.id);

    User.findById(req.params.id, function(err, u){
        if(err){
            console.log('Error occured');
            return;
        }

        if(u){
            return res.render('users', {
                title: 'users',
                profile_user: u
            });
        }
        else{
            return res.redirect('back');
        }


    });
    
}



// update the user profile 
module.exports.update = function(req, res){
    // check if the user making the update is actually the logged in user or not

    if(req.user.id == req.params.id){

        User.findByIdAndUpdate(req.params.id, {
            // set new name and email in the db
            $set: {
                name: req.body.newName,
                email: req.body.newEmail
            }
        }, function(err, updatedUser){
            if(err){
                console.log('Error');
                return;
            }
            return res.redirect('/');
        });
    }

    // throw a status code error
    else{
        return res.status(401).send('Unauthorized');
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
    console.log('successfully authenticated');
    // assuming that all failure cases are handled by passport and express-session, the next step is to redirect to profile page in case of success
    return res.redirect(`/users/profile/${req.user.id}`);
}

module.exports.terminateSession = function (req, res) {
    req.logout();
    res.redirect('/');
}