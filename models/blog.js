var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var blogSchema = Schema({
    author: String,
    title: String,
    summary: String,
    description: String
});

var Blog = mongoose.model('blogPosts', blogSchema);

module.exports = Blog;