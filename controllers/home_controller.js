const Post = require('../models/post');
const User = require('../models/users');
// render the home page of codial app
module.exports.home = function(req, res){



    // populating the user field with the user itself refered from the users collection
    Post.find({}).populate('user').exec(function(err, post){
        if(err){
            console.log('Failed');
            return res.redirect('back');
        }
        return res.render('home', {
            title: "Codial | Home",
            post: post
        });
    });
    
}
