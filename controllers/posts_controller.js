const Post = require('../models/post');
const User = require('../models/users');
const Comment = require('../models/comment');

//create a new post in the Post collection 
module.exports.createPost = function (req, res) {
    if (!req.body.content) {
        return res.send('Do not send empty content');
    }
    if (!req.user) {
        return res.send('Please Sign First');
    }
    // create post only if it does not exist
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function (err, post) {
        if (err) {
            console.log('Oops! Something went wrong');
            return res.redirect('back');
        }
        return res.redirect('back');
    });
}



// controller action to delete the post i.e. handle the delete post request
module.exports.destroy = function (req, res) {

    // first find the post to be deleted by id
    Post.findById(req.query.id)
    // then populate the comments array of that post if it is found
        .populate({
            path: 'comments'
        })
        .exec(function (err, post) {
            if (err) {
                console.log('Error in deleting');
                return res.redirect('back');
            }

            // .id means converting the objectid into string to compare it with post.user(which by default has id and not the users itself cuz we
            //havn't populated it)
            // to check if the user requesting the deleting is the same user who has written that post
            if (post.user == req.user.id) {

                // delete all the comments whose objectids are referenced by the comments array of that particular post
                Comment.deleteMany({
                    _id: {
                        $in: post.comments
                    }
                }, function (err, result) {
                    if (err) {
                        console.log('error in deleting comments for this post');
                        return res.redirect('/');
                    }
                });


                // after deleting the comments of that post, we delete the post itself
                Post.findByIdAndDelete(req.query.id, function (err) {
                    if (err) {
                        console.log('error deleting post');
                        return res.redirect('/');
                    }

                    console.log('Successfully deleted that post');
                    return res.redirect('/');
                });
            }

            else{
                console.log('Unauthorised');
                return res.redirect('/');
            }

        });




}