var express = require('express');
var router = express.Router();
var TrainingDate = require('../models/TrainingDate');
var util = require('../util');

// index
router.get('/', function(req, res) {
    TrainingDate.find({})
    .sort('-startDate')
    .exec(function(err, trainingDates) {
        if(err) return res.json(err);
        res.render('trainingDates/index', {trainingDates:trainingDates});
	});
});

// new
router.get('/new', util.isLoggedin, function(req, res) {
    res.render('trainingDates/new');
});

// create
router.post('/', util.isLoggedin, function(req, res) {
    TrainingDate.create(req.body, function (err, trainingDate) {
        if(err) return res.json(err);
        res.redirect('/trainingDates');
    });
});

// edit
router.get('/edit', function(req, res) {
    TrainingDate.find({})
    .sort('-startDate')
    .exec(function(err, trainingDates) {
        if(err) return res.json(err);
        res.render('trainingDates/edit', {trainingDates:trainingDates});
    });
});


// update
router.put('/', function(req, res) {
    let arr = []
    
    let bodyID = req.body.id

    bodyID.forEach(item => {
        arr.push(item);
    })

    let obj = {
        id: req.body.id,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        title: req.body.title,
        period: req.body.period,
        time: req.body.time,
        place: req.body.place
    }

    arr.forEach((data, count) => {
        req.body.id = obj.id[count]
        req.body.startDate = obj.startDate[count]
        req.body.endDate = obj.endDate[count]
        req.body.title = obj.title[count]
        req.body.period = obj.period[count]
        req.body.time = obj.time[count]
        req.body.place = obj.place[count]
        req.body.updatedAt = Date.now();

        TrainingDate.findOneAndUpdate({ _id: req.body.id }, req.body, {runValidators:true}, (err, trainingDate) => {
            if(err) {
                req.flash('trainingDate', req.body);
                return req.flash('errors', util.parseError(err));
            }
        });      
    });
    res.redirect('/trainingDates');
});

// destroy
router.delete('/trainingDates', function(req, res) {
    let arr = []
    
    let bodyID = req.body.id

    bodyID.forEach(item => {
        arr.push(item);
    })

    let obj = {
        id: req.body.id
    }

    arr.forEach((data, count) => {
        req.body.id = obj.id[count]
    });

    console.log(arr);

    bodyID.forEach(item => {
        console.log(item);
        TrainingDate.remove({_id:req.body.id}, function(err) {
            res.redirect('/trainingDates');
        });
    })
});

module.exports = router;
