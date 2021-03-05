var QueryDb = {};
QueryDb.query = function (myData, successFunc, isAsync) {
	$.ajax({
		dataType: "json",
		url: myData.url,
		type: myData.type,
		data: myData.data,
		async: isAsync,
		success: successFunc,
		error: function (xhr, status, error) {
			console.log('Error: ' + error.message);
			$('#lblResponse').html('Error connecting to the server.');
		}
	});
};

QueryDb.pquery = function (myData) {
	return new Promise((resolve, reject) => {
		$.ajax({
			dataType: "json",
			url: "http://10.76.0.184:3000/",
			type: "POST",
			data: myData,
			success: resolve,
		})
	});
};

QueryDb.getPoi = function(condition,func){
		QueryDb.query({
			data:condition,
			url:"http://10.76.0.196:7001/poi",
			type:"POST"
		}
			// {
			// reqType:"queryDb",
			// operate:"select",
			// column:"*",
			// table:"poi",
			// limit:condition,
			// }
		, function(result) {
			func(result);
		}, true);

};

QueryDb.getWeibo = function(condition,func){
		let result;
		QueryDb.query({
				data:condition,
				url:"http://10.76.0.196:7001/weibo",
				type:"GET"
			}
			// {
			// 	reqType: "queryDb",
			// 	operate: "select",
			// 	column: "*",
			// 	table: "blog",
			// 	limit:condition,
			// }
			, function(data) {
				result=data;
			}, false);
		func(result);
};

QueryDb.getValue = function(condition,func){
	QueryDb.query({
			reqType:"queryDb",
			operate:"select",
			column:"*",
			table:"estate",
			limit:condition,
		}, function(result) {
			func(result);
		}, true);
	
};


QueryDb.getcar=function(condition,func){
	QueryDb.query({
			data:condition,
			url:"http://10.76.0.196:7001/taxi",
			type:"POST"
		}
		// {
			// reqType:"queryDb",
			// operate:"select",
			// column:"*",
			// table:"taxi_traj",
			// limit:condition,
		// }
		, function(result) {
			func(result);
		}, false);
};

QueryDb.getcargeoindex=function(condition,func){
	QueryDb.query({
			reqType:"queryDb",
			operate:"select",
			column:"*",
			table:"taxi_geo_index",
			limit:condition,
		}, function(result) {
			func(result);
		}, false);
};

QueryDb.getcarbygeoindex=function(condition,timeString,func){
	    // console.log(condition)
	QueryDb.getcargeoindex(
            condition,
            function(data){
            // console.log(data);
            var indexlist=[];
            data.forEach(o=>{
            	indexlist.push(o.date+"-"+o.id)
            })
            if (timeString==null){
					var sql="where time between '2014-01-14 00:00:00' and '2014-01-14 23:59:59' and   stindex in ("
            }else{
            	var sql=timeString+"and   stindex in ("
            }
            
            indexlist.forEach(o=>{
            	sql+= "'"+o+"' , "
            })
            sql+="'0')"
             // group by Taxi_name
            
            console.log(sql);
			QueryDb.query({
					reqType:"queryDb",
					operate:"select",
					column:"*",
					table:"taxi_geo_query",
					limit:sql,
				}, function(result) {
					func(result);
				}, false);
    })
};

QueryDb.getrecommend = function(condition,func){
	QueryDb.query({
			data:"TEST",
			url:"http://10.189.206.177:5000/recommend",
			type:"POST"
		}
		// {
			// reqType:"queryDb",
			// operate:"select",
			// column:"*",
			// table:"taxi_traj",
			// limit:condition,
		// }
		, function(result) {
			func(result);
		}, false);
};



var qm = (function() {

var qm = {version: "1.0.0"};

////////////////////////////////////////////////////////////
qm.findPoisByStation = function(lac, cell, func) {
		qm.query({
			reqType:"queryDb",
			operate:"select",
			column:"*",
			table:"base_station",
			limit:"where lac = " + lac + " and cell = " + cell,
		}, function(result) {
			
		}, true);
};
////////////////////////////////////////////////////////////
/**
 *
 * @namespace The top-level namespace, <tt>qm</tt>.
 */

qm.getWhichByMulti = function(pos, time, num, operate, order,func) {
	$.ajax({
        type:'post',
        url:"/getWhich/getWhichByMulti",
        data: {'pos':pos, 'time':time, 'num':num, 'operate':operate,'order':order},
		success: function(data){
			func(data);
        }
    });
};


qm.getWhoTraj = function(id,order,func){
	$.ajax({
		type:'post',
		url:"/getWhich/getWhoTraj",
		data: {'id':id,'order':order},
		success: function(data){
			func(data);
        }
	});
};

qm.getMultiWhoTraj = function(id,order,func){
	$.ajax({
		type:'post',
		url:"/getWhich/getMultiWhoTraj",
		data: {'id':id,'order':order},
		success: function(data){
			func(data);
        }
	});
};

qm.getWhoTrajLimit = function(id,limit,order,func){
	$.ajax({
		type:'post',
		url:"/getWhich/getWhoTrajLimit",
		data: {'id':id,'limit':limit,'order':order},
		success: function(data){
			func(data);
        }
	});
};

qm.getWhichBySingle = function(pos, time, order,func) {
	
	$.ajax({
        type:'post',
        url:"/getWhich/getWhichBySingle",
        data: {'pos':pos, 'time':time,'order':order},
		success: function(data){
			func(data);
        }
    });
	
};

qm.getPhoneConnection=function(id,order,func){

	$.ajax({
		type:'post',
		url:"/getWhich/getPhoneConnection",
		data:{'id':id,'order':order},
		success:function(data){
			func(data);
		}
	});
};


qm.getPhoneConnectionExpand=function(id,expand,order,func){

	$.ajax({
		type:'post',
		url:"/getWhich/getPhoneConnectionExpand",
		data:{'id':id,'expand':expand,'order':order},
		success:function(data){
			func(data);
		}
	});
};

// qm.getWeather=function(condition,order,func){
// 	$.ajax({
// 		type:'post',
// 		url:"/getWhich/getWeather",
// 		data:{'condition':condition,'order':order},
// 		success:function(data){
// 			func(data);
// 		}
// 	});
// };

return qm; })();