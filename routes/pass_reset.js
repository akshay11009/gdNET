const express = require('express');
const router = express.Router();
const url = require('url');
const nodemailer = require('nodemailer');

var letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
var randomCode = "";
var mail_sent = false;

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

module.exports = router;
