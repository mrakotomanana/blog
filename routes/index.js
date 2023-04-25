const express = require("express");
const router = express.Router();

var getData = function () {
    var data = {
        'element1': 'https://images.unsplash.com/photo-1563422156298-c778a278f9a5',
        'element2': 'https://images.unsplash.com/photo-1620173834206-c029bf322dba',
        'element3': 'https://images.unsplash.com/photo-1602491673980-73aa38de027a'
    };
    return data;
};

router.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next();
});

// route middleware to validate :name
router.param('name', function(req, res, next, name) {
    // do validation on name here
    // blah blah validation
    // log something so we know its working
    console.log('doing name validations on ' + name);

    // once validation is done save the new item in the req
    req.name = name;
    // go to the next thing
    next();
});

router.get('/', function (req, res) {
    res.render('index', { title: 'Express', "data": getData() });
});

router.get('/test/', function (req, res) {
    res.send("test connextion");
});

router.get('/test/:name', function(req, res) {
    res.send('test ' + req.name + '!');
});

module.exports = router;