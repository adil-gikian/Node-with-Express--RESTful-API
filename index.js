var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

//setting the view engine
//app.set('view engine', 'ejs');

//middleware for downloading static files automatically
app.use('/assets', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('index');
});

var blog = require('./routes/blog');
app.use('/blog', blog);

app.listen(port);
