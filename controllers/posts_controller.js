const Post = require('../models/post');
const User = require('../models/users');
module.exports.createPost = function(req, res){
    if(!req.body.content){
        return res.send('Do not send empty content');
    }
    if(!req.user){
        return res.send('Please Sign First');
    }
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err, post){
        if(err){
            console.log('Oops! Something went wrong');
            return res.redirect('back');
        }
        return res.redirect('back');
    });
}