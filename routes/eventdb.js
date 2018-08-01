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

router.post('/add_connection' , function(req , res) {
    let obj = JSON.parse(req.query.obj);
    let coll = dbo.collection('users');
    coll.findOne({email : obj.receiver} , function(err_find , res_find) {
        if(err_find) throw err_find;
        res_find.requests.push(obj.sender);
        let req_update = res_find.requests;
        let newVal = {$set : {requests : req_update}};
        coll.updateOne({email : obj.receiver} , newVal , function(err_update , res_update) {
            if(err_update) throw err_update;
            console.log(res_update);
        });
    });
});

router.post('/pull_request' , function(req , res) {
    let cur_user = req.query.user;
    let coll = dbo.collection('users');
    coll.findOne({email : cur_user} , function(err_find , res_find) {
        if(err_find) throw err_find;
        if(res_find) {
            let find_query = {$or : []};
            for(let i = 0 ; i < res_find.requests.length ; i++)
                find_query.$or.push({email: res_find.requests[i]});
            console.log(find_query);
            coll.find(find_query).toArray(function(err_result , res_result) {
                let send_res = {
                    result : res_result
                };
                console.log(res_result);
                res.send(JSON.stringify(send_res));
            });
        }
        else
            res.send("NOR");
    });
});

router.post('/add_to_connection' , function(req , res) {
    let obj = JSON.parse(req.query.obj);
    let coll = dbo.collection('users');
    coll.findOne({email: obj.receiver} , function(err_find , res_find) {
        if(err_find) throw err_find;
        let q_requests = res_find.requests;
        q_requests.splice(q_requests.indexOf(obj.sender) , 1);
        console.log(res_find);
        let newVal = {$set : {requests: q_requests}};
        coll.updateOne({email: obj.receiver} , newVal , function(err_update , res_update) {
            if(err_update) throw err_update;
            console.log(res_update.result.nModified);
        });
        if(obj.flag == 1) {
            coll.findOne({email: obj.receiver} , function(err_find , res_find) {
                if(err_find) throw err_find;
                coll.findOne({email: obj.sender} , function(err_findRec , res_findRes) {
                    if(err_findRec) throw err_findRec
                    res_find.network.push({name: res_findRes.name , role: res_findRes.role , email: res_findRes.email});
                    let updatedVal = {$set : {network: res_find.network}};
                    coll.updateOne({email: obj.sender} , updatedVal , function(err_update , res_update) {
                        if(err_update) throw err_update;
                        console.log('Flag sender' + res_update.result.nModified);
                    });
                });
            });
            coll.findOne({email: obj.sender} , function(err_find , res_find) {
                if(err_find) throw err_find;
                coll.findOne({email: obj.receiver} , function(err_findRec , res_findRes) {
                    if(err_findRec) throw err_findRec
                    res_find.network.push({name: res_findRes.name , role: res_findRes.role , email: res_findRes.email});
                    let updatedVal = {$set : {network: res_find.network}};
                    coll.updateOne({email: obj.sender} , updatedVal , function(err_update , res_update) {
                        if(err_update) throw err_update;
                        console.log('Flag-1 sender' + res_update.result.nModified);
                    });
                });
            });
        }
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
