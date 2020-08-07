const Post = require('../models/post');
const User = require('../models/users');
const Comment = require('../models/comment');
module.exports.createPost = function (req, res) {
    if (!req.body.content) {
        return res.send('Do not send empty content');
    }
    if (!req.user) {
        return res.send('Please Sign First');
    }
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



module.exports.destroy = function (req, res) {

    Post.findById(req.query.id)
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
            if (post.user == req.user.id) {
                Comment.deleteMany({
                    _id: {
                        $in: post.comments
                    }
                }, function (err, result) {
                    if (err) {
                        console.log('error in deleting comments for this post');
                        return res.redirect('/');
                    }
                    console.log('********', result);
                });


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