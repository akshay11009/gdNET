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

router.post('/search_user' , function(req , res) {
    let coll = dbo.collection('users');
    let query = req.query.query;
    coll.find({}).toArray(function(err_find , res_find) {
        if(err_find) throw err_find;
        let result = {
            result : []
        };
        for(let i = 0 ; i < res_find.length ; i++) {
            let cur_string = res_find[i].email;
            console.log('-------->' + cur_string);
            if(cur_string != undefined && cur_string.indexOf(query) != -1) {
                result.result.push({name : res_find[i].name , email : res_find[i].email});
            }
        }
        res.send(JSON.stringify(result));
    });
});

MongoClient.connect(urldb , { useNewUrlParser: true } , function(err , db){
	if(err)
		throw err;
    db.close();
});

module.exports = router;
