
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

}

// sign in the user and create a session
module.exports.createSession = function(req, res){

}