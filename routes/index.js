const express = require('express');
const router = express.Router();
const url = require('url');
const nodemailer = require('nodemailer');
const MongoClient = require('mongodb').MongoClient;
const urldb = "mongodb://localhost:27017/userd";
const globals = require('./globals.js');

var dbo;

MongoClient.connect(urldb , { useNewUrlParser: true } , function(err , db){
	if(err)
		throw err;
	dbo = db.db('users');
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'achha sa title' });
});

router.get('/info' , function(req , res , next){
	res.render('info' , {title : 'disad'});
});

router.get('/user' , function(req , res , next){
    console.log(globals.global_login);
	res.render('profile');
});

router.get('/requests' , function(req , res , next) {
    res.render('request');
});

router.get('/landing' , function(req , res , next) {
    res.render('landing_login');
});

router.get('/network' , function(req , res , next) {
    res.render('connections');
});

router.get('/login' , function(req , res_login) {
	let credentials = JSON.parse(req.query.cred);
	let coll = dbo.collection("users");
	coll.findOne(credentials , function(err_find , res_find){
		if(res_find) {
			console.log('success');
			res_login.send(res_find.email);
		}
		else {
			console.log('fail');
			res_login.send('FAIL');
		}
	});
});

module.exports = router;
