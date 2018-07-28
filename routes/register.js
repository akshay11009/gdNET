const express = require('express');
const router = express.Router();
const url = require('url');
const nodemailer = require('nodemailer');
const MongoClient = require('mongodb').MongoClient;
const urldb = "mongodb://localhost:27017/userd";

var dbo;

MongoClient.connect(urldb , { useNewUrlParser: true } , function(err , db){
	if(err)
		throw err;
	dbo = db.db('users');
});

let email_id = '';

router.post('/confirm' , function(req , res_confirm) {
    console.log("Here");
	let user_obj = JSON.parse(req.query.signup_info);
    let coll = dbo.collection("users");
	let user = {
		username : user_obj.username,
		email : user_obj.email,
		password : user_obj.password,
		skills : '',
		score : 'nil',
		gender : '',
		work : '',
		birthday : '',
		img : '',
        name : '',
        role : '',
        place : '',
        website : ''
	};
    email_id = user_obj.email;
	coll.findOne({username : user_obj.username} , function(err_find , res_find) {
		if(!res_find) {
			coll.findOne({email : user_obj.email} , function(err_find1 , res_find1) {
				if(!res_find1) {
					coll.insertOne(user , function(err_insert , res_insert){
						if(err_insert) throw err_insert;
						console.log(res_insert.ops);
						res_confirm.send('SUCCESS');
					});
				}
				else {
					res_confirm.send('0');
				}
			});
		}
		else {
			res_confirm.send('1');
		}
	});
});

router.post('/personal' , function(req , res_skills) {
    console.log(req.query);
    let obj = JSON.parse(req.query.obj);
    let query = {email : email_id};
    let coll = dbo.collection("users");
    let new_values = {$set : obj};
    console.log('email id : ' + email_id);
    coll.updateOne(query , new_values , function(err , res_update) {
        if(err) throw err;
        console.log('Updated');
        res_skills.send('SUCCESS');
    });
});

router.get('/further' , function(req , res , next) {
    if(email_id == '')
        res.send('404 Not Found');
    else
        res.render('otherinfo')
});

router.get('/signup' , function(req , res , next){
    email_id = '';
	res.render('signup' , {title: 'achha sa title'});
});

MongoClient.connect(urldb , { useNewUrlParser: true } , function(err , db){
	if(err)
		throw err;
    db.close();
});

module.exports = router;
