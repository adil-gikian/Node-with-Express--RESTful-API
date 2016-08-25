var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    date_Of_birth: Date
});

var User = mongoose.model('users', userSchema);

module.exports = User;