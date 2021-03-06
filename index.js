var express = require('express');
var mongoose = require('mongoose');
var app = express();

var port = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost/blogDB');

//setting the view engine
app.set('view engine', 'ejs');

//middleware for downloading static files automatically
app.use('/assets', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('index');
});

var blog = require('./routes/blog');
var users = require('./routes/user');
app.use('/blog', blog);
app.use('/user', users);

app.listen(port);
