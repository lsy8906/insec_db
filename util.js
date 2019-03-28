var util = {};

util.isLoggedin = function(req, res, next) {
    if(req.isAuthenticated()){
        next();
    } else {
        req.flash('errors', {login:'로그인이 필요합니다.'});
        req.redirect('/login');
    }
}

util.noPermission = function(req, res) {
    req.flash('errors', {login: '권한이 없습니다.'})
    req.logout();
    res.redirect('/login');
}

module.exports = util;