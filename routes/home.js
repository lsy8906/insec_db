var express = require('express');
var router = express.Router();
var passport = require('../config/passport');

// index
router.get('/', function(req, res) {
    res.render('index');
});

// Login
router.get('/login', function (req, res) {
    var username = req.flash('username')[0];
    var errors = req.flash('errors')[0] || {};
    res.render('home/login', {
        username:username,
        errors:errors
    });
});

// Post Login
router.post('/login',
    function(req, res, next) {
        var errors = {};
        var isValid = true;
        if(!req.body.username) {
            isValid = false;
            errors.username = '아이디를 적어 주세요.';
        }
        if(!req.body.password) {
            isValid = false;
            errors.password = '패스워드를 적어 주세요.';
        }

        if(isValid) {
            next();
        } else {
            req.flash('errors', errors);
            res.redirect('/login');
        }
    },
    passport.authenticate('local-login', {
        successRedirect : '/',
        failureRedirect : '/login'
    })
);

// Logout
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;