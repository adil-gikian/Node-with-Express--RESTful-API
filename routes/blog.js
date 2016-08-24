var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

mongoose.connect('mongodb://localhost/blogDB');
var router = express.Router();
//using body-parser middleware to parse POST parameters and attach them to request's body
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//var jsonParser = bodyParser.json()

var Schema = mongoose.Schema;
var blogSchema = Schema({
    author: String,
    title: String,
    summary: String,
    description: String
});

var Blog = mongoose.model('blogPosts', blogSchema);

router.get('/', function(req, res) {
    Blog.find({}, function(err, docs) {
        res.send(docs);
    });
});

router.post('/submit', urlencodedParser, function(req, res) {
    var post = Blog(req.body);
    post.save(function(err, post) {
        if(err) throw err;
        res.send(post);
    });  
});

module.exports = router;
