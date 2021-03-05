var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var util = require('util');
var bodyParser = require('body-parser');
var multer = require('multer'); 
var client = require('./database/connect')
var db = require('./database/querydb.js');
var test = require('./database/test')

app.use(express.static('./public'));
app.use(express.static('./database'));

app.use(require('body-parser').urlencoded({limit: '5mb', extended: true}));
app.get('/', function(req, res) {
    res.sendFile("index.html");
    // next();
});


function parseReqJson(json, res, client) {
  if (json.reqType === 'queryPoiByTraj') {
    db.readText(res);
  } else if (json.reqType === 'queryDb') {
    db.query(res, client, json);
  } else if (json.reqType === 'test') {
    test.readText(res, json.fileName, json.begin, json.readLineLimit);
  }
}



//nors
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "X-Requested-With");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')  
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
});  

app.post("/",function(req, res) {
	console.log(req.body);
	parseReqJson(req.body, res, client);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('My web is listening at http://%s:%s', host, port);
});
