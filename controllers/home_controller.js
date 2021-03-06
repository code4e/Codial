const Post = require('../models/post');
const User = require('../models/users');
const Comment = require('../models/comment');
// render the home page of codial app
module.exports.home = function (req, res) {



    // populating the user field with the user itself refered from the users collection
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function (err, post) {
        if (err) {
            console.log('Failed');
            return res.redirect('back');
        }

        User.find({}, function(err, users){
            if(err){
                console.log('Error in fetching users');
                return res.redirect('/');
            }

            return res.render('home', {
                title: "Codial | Home",
                post: post, 
                all_users: users
            });

        });



        



    });

}