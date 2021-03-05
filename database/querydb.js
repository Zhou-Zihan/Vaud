"use strict";
var db = {};

function stringFormat() {
	if (arguments.length == 0)
		return null;
	var str = arguments[0];
	for (var i = 1; i < arguments.length; i++) {
		var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
		str = str.replace(re, arguments[i]);
	}
	return str;
}

// it will be 
let cache = new Map();
db.query = function (res, client, json) {
	var queryStr;
	if (json.operate === 'select') {
		queryStr = stringFormat('select {0} from {1} {2}', json.column, json.table,
			  json.limit ? json.limit : '');
	}
	if (cache.has(queryStr)) {
		console.log("cache:", queryStr);
		res.send(cache.get(queryStr));
		return;
	}
	console.log('query sql:' + queryStr);
	client.query(queryStr, function(err, result) {
		if (err) {
			console.log(err.message);
			return;
		}
		let resJ = JSON.stringify(result);
		cache.set(queryStr, resJ);
		console.log("success!!");
		res.send(resJ);
	});
};

// db.queryDb = function(client, operateType, params, callBack) {
// 	var queryStr;
// 	if (operateType == "select") {
// 		queryStr = stringFormat('select {0} from {1} {2}', params.column, 
// 				params.table, params.limit ? params : '');
// 	}
// 	console.log("query sql:" + queryStr);
// 	client.query(queryStr, function(err, result) {
// 		if (err) {
// 			console.log(err.message);
// 			return;
// 		}
// 		callBack(result);
// 	});
// };

// db.queryFucs = {};
// db.queryFucs['findPoisByStation'] = function(res, client, queryParams) {

// };

module.exports = db;