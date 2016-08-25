var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var BlogModel = require('../models/blog');

router.get('/', function(req, res) {
    BlogModel.find({}, function(err, docs) {
        res.send(docs);
    });
});

router.post('/submit', urlencodedParser, function(req, res) {
    var post = BlogModel(req.body);
    post.save(function(err, post) {
        if(err) throw err;
        res.send(post);
    });  
});

module.exports = router;
