"use strict";
var test = {};

test.readLineNum = 0;
test.nowSiteIndex = 0;
test.readStrs = [];
test.result = {};
test.readText = function (res, name, begin,limit) {
	var fs = require('fs'),
	readline = require('readline');
	console.log("read.....");
	test.readLineNum = 0;
	test.readStrs = [];
	test.result = {};
	var rd = readline.createInterface({
		input: fs.createReadStream('database/' + name),
		console: false
	});

	rd.on('line', function(line) {
		test.readLineNum ++;
		if (test.readLineNum < parseInt(begin)) {
			return;
		}
		if (!line && test.readStrs.length > 0) {
			test.result[test.nowSiteIndex] = test.readStrs;
			test.readStrs = [];
			return;
		}
		if (line.indexOf("\t") != -1) {
			test.nowSiteIndex = line.split("\t")[0];
			test.readStrs.push(line.split("\t")[1]);
		} else {
			test.readStrs.push(line);
		}
		if(test.readLineNum > parseInt(limit)) {
			rd.close();
		}
		// if (line.indexOf("Topic--Term Associations, Phi[k][w] (beta=0.5)") != -1) {
		// 	rd.close();
		// }
	});
	rd.on("close", function() {
		console.log("read: ", test.readLineNum, test.nowSiteIndex);
		res.send(JSON.stringify(test.result));
	})
};

module.exports = test;
