/**
 * Created by Administrator on 2016/3/23.
 */
function show_caranalysis(node){

    //sourcedivlist
    d3.select("#sourcediv" + node.attr("id")).selectAll("div").remove();


    var cartip = d3.select("#sourcediv" + node.attr("id")).append("div")
        .attr("class", "analysistip")

    cartip.append("div").attr("class", "analysistip_attr")
        .on("mousedown", function () {
            d3.select(".analysistip_attr.analysistip_attr_select")
                .attr("class","analysistip_attr");
            show_carnodespeed(node);
            d3.select(this).attr("class","analysistip_attr analysistip_attr_select");
        })
        .attr("class","analysistip_attr analysistip_attr_select")
        .text("Speed")

    cartip.append("div")
        .attr("class", "analysistip_attr")
        .on("mousedown", function () {
            show_heatmap(node);
            d3.select(".analysistip_attr.analysistip_attr_select")
                .attr("class","analysistip_attr");
            d3.select(this).attr("class","analysistip_attr analysistip_attr_select");
        })
        .text("Heat map")

     cartip.append("div").attr("class", "analysistip_attr")
        .on("mousedown", function () {
            show_carnodedirection(node);
            d3.select(".analysistip_attr.analysistip_attr_select")
                .attr("class","analysistip_attr");
            d3.select(this).attr("class","analysistip_attr analysistip_attr_select");
        })
        .text("Direction")
        .style("border","none")


    d3.select("#sourcediv" + node.attr("id")).append("div")
        .attr("id", "sourcedivlist" + node.attr("id"))
        .attr("class","sourcedivlist")
        .style("overflow","hidden");

    show_carnodespeed(node);
}

function  show_carnodedirection(node){
    d3.select(("#sourcedivlist" + node.attr("id"))).selectAll("svg").remove();
    d3.select(("#sourcedivlist" + node.attr("id"))).selectAll("div").remove();
    //load data
    var data = nodelist.getlistiditem(node.attr("id")).getdatalist();

    if (data != null) {
        var speedanaly_data=[
            
                {axis:"North",value:0},
                {axis:"Northeast",value:0},
                {axis:"East",value:0},
                {axis:"Southeast",value:0},
                {axis:"South",value:0},
                {axis:"Southwest",value:0},
                {axis:"West",value:0},
                {axis:"Northwest",value:0}
            ];
        for (var i = 0; i < data.length; i++) {
            for (var m = 0; m < data[i].texiInfo.length; m++) {
                speedanaly_data[data[i].texiInfo[m].direction].value++
            }
        }
        var max=0;
        for (var i = 0; i < speedanaly_data.length; i++) {
                if(max<speedanaly_data[i].value)
                max=speedanaly_data[i].value
        }
        max=max*1.2;
        console.log(speedanaly_data)
        var myChart = echarts.init(document.getElementById("sourcedivlist" + node.attr("id")));
            option = {
                title : { 
                  left: 'center',
                   text: 'Direction statistics'
                },
                tooltip : {
                    trigger: 'axis'
                },
                polar : [
                   {
                       indicator : [
                           { text: 'North', max: max},
                           { text: 'Northeast', max: max},
                           { text: 'East', max: max},
                           { text: 'Southeast', max: max},
                           { text: 'South', max: max},
                           { text: 'Southwest', max: max},
                           { text: 'West', max: max},
                           { text: 'Northwest', max: max}
                        ]
                        ,radius : 70
                    }
                ],
                calculable : true,
                series : [
                    {
                        name: 'Direction',
                        type: 'radar',
                        data : [
                            {
                                value : [speedanaly_data[0].value, 
                                speedanaly_data[1].value,
                                speedanaly_data[2].value,
                                speedanaly_data[3].value,
                                speedanaly_data[4].value,
                                speedanaly_data[5].value,
                                speedanaly_data[6].value,
                                speedanaly_data[7].value],
                                name : 'Direction'
                            }
                        ]
                    }
                ]
            };
                    
            myChart.setOption(option);



        // RadarChart(("#sourcedivlist" + node.attr("id")), speedanaly_data, 0,0,195,200);
    }

}

function  show_carnodespeed(node){
    d3.select(("#sourcedivlist" + node.attr("id"))).selectAll("svg").remove();
    d3.select(("#sourcedivlist" + node.attr("id"))).selectAll("div").remove();

    d3.select(("#sourcedivlist" + node.attr("id"))).append("div")
            .text("The statistical graph of speed")
            .style("cursor","default")
            .style("font-size","13px")
            .style("position","absolute")
            .style("left","42px")
            .style("top","15px")
            .style("color","#000")

    //load data
    var data = nodelist.getlistiditem(node.attr("id")).getdatalist();

    if (data != null) {

        var speedchartdata = []
            speedchartspeed=[]
        for (var i = 0; i < 99; i++) {
            speedchartdata.push(0)
            speedchartspeed.push(i+"km/h");
        }
        for (var i = 0; i < data.length; i++) {
            for (var m = 0; m < data[i].texiInfo.length; m++) {
                if (data[i].texiInfo[m].speed != 0) {
                    speedchartdata[data[i].texiInfo[m].speed]++;
                }
            }
        }

        console.log(speedchartdata)
        var myChart = echarts.init(document.getElementById("sourcedivlist" + node.attr("id")));
            option = {
                title: {
                    left: 'center',
                    text: 'The statistical graph of speed',
                    textStyle: {fontSize: 12}
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '5%',
                    right: '5.3%',
                    top:35,
                    bottom: 55,
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: speedchartspeed
                },
                yAxis: {
                    type: 'value'
                },dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 100
                }, {
                    start: 0,
                    end: 100,  
                    bottom: 5,
                    height:25,
                    show: true,
                    type: 'slider',
                }],
                series:
                    {
                        name:'Frequency',
                        type:'line',
                        stack: '总量',
                        data:speedchartdata,
                        lineStyle: {normal: {curveness: 0.3,color: 'rgba(21,193,156,0.5)'}}
                    }
            };
            myChart.setOption(option);


        // paint_linechart(speedchartdata, "speed", "frequency",260,280, 5,5, d3.select("#sourcedivlist" + node.attr("id")), node.attr("count"))
    }
}