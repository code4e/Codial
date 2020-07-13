module.exports.home = function(req, res){
    return res.render('home', {
        title: 'home'
    });
}
// module.exports.otherHome = function(req, res){
//     return res.send('<h1>Other home Rendered</h1>');
// }