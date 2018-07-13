const express = require('express');
const router = express.Router();
const url = require('url');
const nodemailer = require('nodemailer');
const MongoClient = require('mongodb').MongoClient;
const urldb = "mongodb://localhost:27017/userd";

var letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
var randomCode = "";
var mail_sent = false;

var dbo;

MongoClient.connect(urldb , { useNewUrlParser: true } , function(err , db){
	if(err)
		throw err;
	dbo = db.db('users');
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'achha sa title' });
});

router.get('/info' , function(req , res , next){
	res.render('info' , {title : 'disad'});
});

router.get('/signup' , function(req , res , next){
	res.render('signup' , {title: 'achha sa title'});
});

router.get('/reset' , function(req , res , next){
	let code = url.parse(req.url,true).query.code;
	console.log('Code : ' + code);
	if(code === randomCode && randomCode.length > 5)
		res.render('reset' , {title : 'Reset Password'});
	else
		res.send('Invalid Code');
});

router.get('/forgot' , function(req , res){
	let email_id = url.parse(req.url , true).query.email;
	console.log(email_id);
	for(let i = 0 ; i < 10 ; i++)
		randomCode = randomCode + letters[Math.floor(Math.random() * 36)];

	console.log(randomCode);

	let mail_text = '<a href = "localhost:3000' + '/reset?code=' + randomCode + '">' + 'Reset Password' + '</a>';

	console.log(mail_text);

	var transporter = nodemailer.createTransport({
  		service: 'gmail',
		auth: {
   		user: 'gmail id', // enter gmail id here
   		pass: 'password' // enter password here
  		}
	});
		//console.log(randomCode);
	var mailOptions = {
		from : 'jksprt0@gmail.com',
		to : email_id,
		subject : 'Reset Password',
		html: mail_text
	};

	transporter.sendMail(mailOptions, function(error, info){
  		if (error) {
    		console.log(error);
    		res.send('FAIL');
  		} else {
  			mail_sent = true;
  			res.send('SUCCESS');
  		}
	}); 
});

router.get('/user' , function(req , res , next){
	res.render('profile' , {title: 'achha sa title'});
});

router.post('/confirm' , function(req , res_confirm) {
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
		img : ''
	};
	coll.findOne({ username : user_obj.username } , function(err_find , res_find) {
		if(!res_find) {
			coll.findOne({ email : user_obj.email } , function(err_find_email , res_find_email){
				if(!res_find_email) {
					coll.insertOne(user_obj , function(err_insert , res_insert){
						res_confirm.send('SUCCESS');
					});
				}
				else
					res_confirm.send('0');
			})
		}
		else 
			res_confirm.send('1');

	});
});

router.get('/login' , function(req , res_login) {
	let credentials = JSON.parse(req.query.cred);
	let coll = dbo.collection("users");
	coll.findOne(credentials , function(err_find , res_find){
		if(res_find) {
			console.log('success');
			res_login.send('SUCCESS');
		}
		else {
			console.log('fail');
			res_login.send('FAIL');
		}
	});
});

router.get('/skills' , function(req , res_skills) {
	let colCode = req.query.colCode;
	console.log(colCode);
	let skills = '';
	let job = ['Game Programmer' , 'Game Designer' , 'Game Artist' , 'Engine Programmer' , 'Physics Programmer'];
	for(let i = 0 ; i < 5 ; i++) {
		if(colCode[i] == '1') {
			skills += job[i];
			skills += ',';
		}
	}
	skills[skills.length - 1] = '.';
	res_skills.send(skills);
});

module.exports = router;