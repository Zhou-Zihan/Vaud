// 路径配置
require.config({
    paths: {
        echarts: 'http://echarts.baidu.com/build/dist'
    }
});

function repaintchartbysinglecar(data){
    d3.select("#informationview").selectAll("div").remove();
    d3.select("#informationview").append("div").attr("id","speed_time").style("width","300px")
        .style("height","200px")
    d3.select("#informationview").append("div").attr("id","speedstatistics").style("width","300px")
        .style("height","200px")
    d3.select("#informationview").append("div").attr("id","direction").style("width","300px")
        .style("height","200px")
    require(
        [
            'echarts',
            'echarts/chart/line',
            'echarts/chart/bar',
            'echarts/chart/radar'
        ],
        function (ec) {

            //方向统计线图
            var direction = ec.init(document.getElementById('direction'));
            datadirectinfo=[];
            for(var i=0;i<8;i++){
                datadirectinfo.push(0);
            }
            for(var i=0;i<data.texiInfo.length;i++){
                datadirectinfo[data.texiInfo[i].direction]++;
            }
            var max=0;
            for(var i=0;i<8;i++){
                if(max<datadirectinfo[i]){
                    max=datadirectinfo[i];
                }
            }
            max*=1.2;
            option = {
                title : { x : 'left',
                    text: 'direction'
                },
                tooltip : {
                    trigger: 'axis'
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: false},
                        dataView : {show: false, readOnly: false},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                polar : [
                    {
                        indicator : [
                            { text: 'N', max: max},
                            { text: 'NW', max: max},
                            { text: 'W', max: max},
                            { text: 'WS', max: max},
                            { text: 'S', max: max},
                            { text: 'SE', max: max},
                            { text: 'E', max: max},
                            { text: 'NE', max: max}
                        ]
                    }
                ],
                calculable : true,
                series : [
                    {
                        name: 'radardirection',
                        type: 'radar',
                        data : [
                            {  value : datadirectinfo
                                //,name : '120.0,28.0'
                            }
                        ]
                    }
                ]
            };
            direction.setOption(option);


            // 速度对应时间线图
            var myChart = ec.init(document.getElementById('speed_time'));
            datanum=[];
            for(var i=0;i<data.texiInfo.length;i++){
                datanum.push(data.texiInfo[i].date+" "+data.texiInfo[i].time);
            }
            datainfo=[];
            for(var i=0;i<data.texiInfo.length;i++){
                if(data.texiInfo[i].speed<0){
                    datainfo.push(-data.texiInfo[i].speed);
                }else{
                datainfo.push(data.texiInfo[i].speed);}
            }
            option = {
                title : {    x : 'center',
                    text: 'speed'
                },
                tooltip : {
                    trigger: 'axis'
                },
                toolbox: {
                    show : false,
                    feature : {
                        mark : {show: false},
                        dataView : {show: false, readOnly: false},
                        magicType : {show: true, type: ['line', 'stack']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                dataZoom : {
                    show : true,
                    realtime : true,
                    x: 0,
                    y : 180,
                    width: 300,
                    height: 20,
                    start : 0,
                    end : 100
                },
                grid:
                {   x:'25',
                    width:'250'
                }
                ,
                calculable : true,
                xAxis : [
                    {   position:'left',
                        type : 'category',
                        boundaryGap : false,
                        data : datanum
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],

                series : [
                    {
                        name: 'speed',
                        type: 'line',
                        smooth: true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: datainfo
                    }
                ]
            };
            myChart.setOption(option);

            //速度统计线图
            var speedstatistics = ec.init(document.getElementById('speedstatistics'));
            dataspeedstanum=[];
            for(var i=0;i<100;i++){
                dataspeedstanum.push(i);
            }
            dataspeedstainfo=[];
            for(var i=0;i<100;i++){
                dataspeedstainfo.push(0);
            }
            for(var i=0;i<data.texiInfo.length;i++){
                dataspeedstainfo[data.texiInfo[i].speed]++;
            }
            timeoption = {
                title : {
                    x : 'center',
                    text: data.ID+'speedstatistics'
                },
                tooltip : {
                    trigger: 'axis'
                },
                toolbox: {
                    show : false,
                },
                dataZoom : {
                    show : true,
                    realtime : true,
                    x: 0,
                    y : 180,
                    width: 300,
                    height: 20,
                    start : 0,
                    end : 100
                },
                xAxis : [
                    {

                        type : 'category',
                        boundaryGap : false,
                        data : dataspeedstanum
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],grid:
                {   x:'25',
                    width:'250'
                }
                ,
                series : [
                    {
                        name:'dz',
                        type:'line',
                        data:dataspeedstainfo
                    }
                ],
                calculable:false
            };
            speedstatistics.setOption(timeoption);
        }
    )
}



//
//d3.select("#"+"detaildiv"+node.attr("id")).append("div").attr("id","speedstatistics")
//    .style("width","35em")
//    .style("height","250px")
//    .style("top","0")
//require(
//    [
//        'echarts',
//        'echarts/chart/line',
//        'echarts/chart/bar',
//        'echarts/chart/radar'
//    ],
//    function (ec) {
//        //速度统计线图
//        var speedstatistics = ec.init(document.getElementById('speedstatistics'));
//        dataspeedstanum=[];
//        for(var i=0;i<100;i++){
//            dataspeedstanum.push(i);
//        }
//        dataspeedstainfo=[];
//        for(var i=0;i<100;i++){
//            dataspeedstainfo.push(0);
//        }
//        for(var j=0;j<data.length;j++) {
//            for (var i = 0; i < data[j].texiInfo.length; i++) {
//                dataspeedstainfo[data[j].texiInfo[i].speed]++;
//            }
//        }
//        timeoption = {
//            title : {
//                x : 'center',
//                text: 'speedstatistics'
//            },
//            tooltip : {
//                trigger: 'axis'
//            },
//            toolbox: {
//                show : false,
//            },
//            dataZoom : {
//                show : true,
//                realtime : true,
//                x: 15,
//                y : 220,
//                width: 380,
//                height: 20,
//                start : 0,
//                end : 100
//            },
//            xAxis : [
//                {
//
//                    type : 'category',
//                    boundaryGap : false,
//                    data : dataspeedstanum
//                }
//            ],
//            yAxis : [
//                {
//                    type : 'value'
//                }
//            ],grid:
//            {   x:'25',
//                width:'90%',
//                height: '130px',
//            }
//            ,
//            series : [
//                {
//                    name:'dz',
//                    type:'line',
//                    data:dataspeedstainfo
//                }
//            ],
//            calculable:false
//        };
//        speedstatistics.setOption(timeoption);
//    }
//)



function repaintwhat2bymultcar(data,node){
    d3.select("#"+node.attr("id")+"detaildiv").append("div").attr("id","direction").style("width","300px")
        .style("height","200px")
    require(
        [
            'echarts',
            'echarts/chart/line',
            'echarts/chart/bar',
            'echarts/chart/radar'
        ],
        function (ec) {

            //方向统计线图
            var direction = ec.init(document.getElementById('direction'));
            datadirectinfo=[];
            for(var i=0;i<8;i++){
                datadirectinfo.push(0);
            }
            for(var j=0;j<data.length;j++) {
                for (var i = 0; i < data[j].texiInfo.length; i++) {
                    datadirectinfo[data[j].texiInfo[i].direction]++;
                }
            }
            var max=0;
            for(var i=0;i<8;i++){
                if(max<datadirectinfo[i]){
                    max=datadirectinfo[i];
                }
            }
            max*=1.2;
            option = {
                title : { x : 'left',
                    text: 'direction'
                },
                tooltip : {
                    trigger: 'axis'
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: false},
                        dataView : {show: false, readOnly: false},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                polar : [
                    {
                        indicator : [
                            { text: 'N', max: max},
                            { text: 'NW', max: max},
                            { text: 'W', max: max},
                            { text: 'WS', max: max},
                            { text: 'S', max: max},
                            { text: 'SE', max: max},
                            { text: 'E', max: max},
                            { text: 'NE', max: max}
                        ]
                    }
                ],
                calculable : true,
                series : [
                    {
                        name: 'radardirection',
                        type: 'radar',
                        data : [
                            {  value : datadirectinfo
                                //,name : '120.0,28.0'
                            }
                        ]
                    }
                ]
            };
            direction.setOption(option);

        }
    )
}

function repaintwhat3bymultcar(data,node){
    d3.select("#"+node.attr("id")+"detaildiv").append("div").attr("id","speed_time").style("width","300px")
        .style("height","200px")
    require(
        [
            'echarts',
            'echarts/chart/line',
            'echarts/chart/bar',
            'echarts/chart/radar'
        ],
        function (ec) {
            // 速度对应时间线图
            var myChart = ec.init(document.getElementById('speed_time'));
            datanum=[];
            console.log(data);
            for(var i=0;i<data.texiInfo.length;i++){
                datanum.push(data.texiInfo[i].date+" "+data.texiInfo[i].time);
            }
            datainfo=[];
            for(var i=0;i<data.texiInfo.length;i++){
                datainfo.push(data.texiInfo[i].speed);
            }
            option = {
                title : {    x : 'center',
                    text: 'speed'
                },
                tooltip : {
                    trigger: 'axis'
                },
                toolbox: {
                    show : false,
                    feature : {
                        mark : {show: false},
                        dataView : {show: false, readOnly: false},
                        magicType : {show: true, type: ['line', 'stack']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                dataZoom : {
                    show : true,
                    realtime : true,
                    x: 0,
                    y : 180,
                    width: 300,
                    height: 20,
                    start : 0,
                    end : 100
                },
                grid:
                {   x:'25',
                    width:'250'
                }
                ,
                calculable : true,
                xAxis : [
                    {   position:'left',
                        type : 'category',
                        boundaryGap : false,
                        data : datanum
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],

                series : [
                    {
                        name: 'speed',
                        type: 'line',
                        smooth: true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: datainfo
                    }
                ]
            };
            myChart.setOption(option);

        }
    )
}