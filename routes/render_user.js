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

router.post('/request_info',function(req , res) {
    let query = {
        email : req.query.email
    };
    let coll = dbo.collection('users');
    coll.findOne(query , function(err_find , res_find) {
        console.log(res_find);
        res.send(JSON.stringify(res_find));
    });
});

MongoClient.connect(urldb , { useNewUrlParser: true } , function(err , db){
	if(err)
		throw err;
    db.close();
});

module.exports = router;
