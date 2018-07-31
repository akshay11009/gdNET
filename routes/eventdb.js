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

router.post('/request_events' , function(req , res) {
    let dateObj = new Date();
    let yyyy = dateObj.getFullYear();
    let mm = dateObj.getMonth() + 1;
    let dd = dateObj.getDate();
    let hh = dateObj.getHours();
    let mi = dateObj.getMinutes();
    dd = (dd < 10) ? ('0' + dd) : dd;
    mm = (mm < 10) ? ('0' + mm) : mm;
    let coll = dbo.collection('event');
    coll.find({}).toArray(function(err , res_find) {
        if(err) throw err;
        if(res_find) {
            let del_query = {$or : []};
            for(let i = 0 ; i < res_find.length ; i++) {
                if(Number(yyyy) > Number(res_find[i].ev_ends.substring(0,4)) ||
                  (Number(mm) > Number(res_find[i].ev_ends.substring(5,7)) && Number(yyyy) == Number(res_find[i].ev_ends.substring(0,4)))  ||
                  (Number(dd) > Number(res_find[i].ev_ends.substring(8,10)) && Number(mm) == Number(res_find[i].ev_ends.substring(5,7)))
                  )
                        del_query.$or.push({ev_name : res_find[i].ev_name});
            }
            console.log(del_query);
            coll.deleteMany(del_query , function(err_delete , res_delete) {
                coll.find({}).toArray(function(err_result , res_result) {
                    if(err_result) throw err_result;
                    let result = {
                        result : res_result
                    };
                    res.send(JSON.stringify(result));
                });
            });
        } else
            console.log('Didnt ran');
    });
});

router.post('/submit_event' , function(req , res) {
    let obj = JSON.parse(req.query.ev_obj);
    let coll = dbo.collection('event');
    coll.insertOne(obj , function(err , res_insert) {
        if(err) throw err;
        console.log('Document Inserted');
    });
});

router.get('/addevent' , function(req , res , next) {
    res.render('addevent');
});

MongoClient.connect(urldb , { useNewUrlParser: true } , function(err , db){
	if(err)
		throw err;
    db.close();
});

module.exports = router;
