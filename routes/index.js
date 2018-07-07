var express = require('express');
var router = express.Router();
var url = require('url');
var nodemailer = require('nodemailer');

var letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
var randomCode = "";
var mail_sent = false;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'achha sa title' });
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
   		user: //Enter your gmail id
   		pass: // Enter your password
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
