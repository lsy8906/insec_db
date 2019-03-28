var express = require('express');
var router = express.Router();
var User = require('../models/User');

// index
router.get('/', function(req, res) {
    User.find({})
    .sort({username:1})
    .exec(function(err, users) {
        if(err) return res.json(err);
        res.render('users/index', {users:users});
    });
});

// new
router.get('/new', function(req, res) {
    var user = req.flash('user')[0] || {};
    var errors = req.flash('errors')[0] || {};
    res.render('users/new', { user:user, errors:errors });
});

// create
router.post('/', function(req, res) {
    User.create(req.body, function(err, user) {
        if(err) {
            req.flash('user', req.body);
            req.flash('errors', parseError(err));
            return res.redirect('/users/new');
        }
        res.redirect('/users');
    });
});

// show
router.get('/users', function(req, res) {
    User.findOne({username:req.params.username}, function(err, user) {
        if(err) return res.json(err);
        res.render('users/show', {user:user});
    });
});

module.exports = router;

// Functions
function parseError(errors) {
    var parsed = {};
    if (errors.name == 'ValidationError') {
        for (var name in errors.errors) {
            var validationError = errors.errors[name];
            parsed[name] = { message: validationError.message };
        }
    } else if (errors.code == '11000' && errors.errmsg.indexOf('username') > 0) {
        parsed.username = { message: '중보된 username입니다.' };
    } else {
        parsed.unhandled = JSON.stringify(errors);
    }
    return parsed;
}