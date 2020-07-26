
// render the home page of codial app
module.exports.home = function(req, res){
    return res.render('home', {
        title: 'home'
    });
}
