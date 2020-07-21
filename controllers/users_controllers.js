module.exports.profile = function(req, res){
    return res.render('users', {
        title: 'users'
    });
}

// module.exports.username = function(req, res){
//     return res.send('<h1>Username Rendered</h1>');
// }