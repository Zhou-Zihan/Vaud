var settings = require('./settings');
var mysql = require('mysql');

var client = null;
// = mysql.createConnection(settings, function(err, stream) {
//});

// var client = mysql.createConnection('mysql://root:123456@10.76.0.184/mobiledata');

// client.connect(function(err) {
// 	if (err) {
// 		console.log('error connecting: ' + err.stack);
// 		throw err;
// 	}
// 	console.log('connect as id' + client.threadId);
// })
// client.on('error', function() {});
module.exports = client;
