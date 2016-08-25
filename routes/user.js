'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const indicative = require('indicative')
var app = express();
var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//var jsonParser = bodyParser.json()

var UserModel = require('../models/user');

router.get('/all', function(req, res) {
    getAllUsers(res);
});

router.get('/:id', urlencodedParser, function(req, res) {
    getUser(req.params.id, res);
});

router.post('/login', urlencodedParser, function(req, res) {
    validateLoginRequest(req.body, res);
});

router.post('/signup', urlencodedParser, function(req, res) {
    validateSignupRequest(req.body, res);
});

function validateLoginRequest(data, res) {
    const rules = {
        email     : 'required|email',
        password  : 'required|min:6|max:30'
    }
    const messages = {
        'password.required' : 'Password is required to continue',
        'email.required'    : 'Email is required for further communication',
        'password.min' : 'Length of password must be greater than 6.'
    }
    indicative.validate(data, rules, messages).then(function () {
        validateUser(data, res);
    })
    .catch(function (errors) {
        res.send(errors);
    });
}

function validateUser(data, res) {
    UserModel.findOne({ 
         'email': data.email,
         'password': data.password}, function(err, docs) {
             if(err) res.send(err);
            res.send(docs);
    });   
}

function validateSignupRequest(data, res) {
    let rules = {
        email         : 'required|email',
        password      : 'required|min:6',
        firstname     : 'required',
        lastname      : 'required',
        date_of_birth : 'required|date'       
    };

    let messages = {
        'required'  : '{{field}} is required.',
        'email'     : '{{field}} is not a valid email',
        'min'       : 'Length of {{field}} must be greater than 6.',
        'date'      : '{{field}} must be a proper date'
    };

    indicative.validate(data, rules, messages).then(function () {
        signupUser(data, res);
    })
    .catch(function (errors) {
        console.log(errors);
        res.send(errors);
    });
}

function signupUser(data, res) {
    var User = UserModel(data);
    User.save(data, function(err, user) {
        if(err) throw err;
        res.send(user);
    });
}

function getAllUsers(res) {
    UserModel.find({}, function(err, docs) {
        if(err) res.send(err);
        res.send(docs);
    });
}

function getUser(Id, res) {
    UserModel.findOne({'_id': Id}, function(err, docs) {
        if(err) res.send(err);
        res.send(docs);
    });
}
module.exports = router;