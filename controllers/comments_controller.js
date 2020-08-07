const Comment = require('../models/comment');
const Post = require('../models/post');
const mongoose = require('mongoose');
module.exports.createComment = function(req, res){
    Post.findById(req.body.post, function(err, post){
        if(err){
            console.log('Error in finding the post');
            return res.redirect('back');
        }

        // create comment only if the post for that comment exists
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            },function(err, comment){
                if(err){
                    console.log('Error while commenting');
                    return res.redirect('back');
                }
                // push the id of that comment into Comments array in Post Schema to have all comments for that particular post have thier ids 
                // stored inside that array itself so that when we render a post, we can render all comments of that post by just going through 
                // all the elements of comments array in post schema and poputating them with Comment schema
                post.comments.push(comment);

                // saving the instance of that post after pushing the id of the comment in the post
                post.save();
                console.log(post);
                return res.redirect('/');
            });
        }
        else{
            return res.redirect('back');
        }
    });

    
}

module.exports.destroyComment = function(req, res){


    Comment.findById(req.query.CommentId, function(err, comment){
        if(err){
            console.log('Error occured while deleting');
            return res.redirect('/');
        }

        if(comment.user == req.user.id){
            let pId = comment.post;
            let cId = comment.id;
            comment.remove();
            Post.findById(pId, function(err, post){
                if(err){
                    console.log('Error');
                    return;
                }
        
                var objectId = mongoose.Types.ObjectId(cId);
                let index = post.comments.findIndex(element => objectId.equals(element));
                post.comments.splice(index, 1);
                post.save();
                console.log('comment deleted');
                return res.redirect('/');
        
            });

        }
        else{
            return res.redirect('/');
        }
    });




    
        
    
        
    
    
}

