d3.select("#help")
    .attr("class","newnodetip")
    .on("click", function () {
        if(d3.selectAll(".Information_panel")[0].length==0){
            d3.selectAll(".mouse_on_tag").remove();
            var Information_panel=d3.select("#leftmenu").append("div")
                .attr("class","Information_panel")
                .attr("id","Information_panel")
                .style("opacity","0")
                .style("left","40px")
                .style("top","140px")
                .style("position","absolute")
                .style("width","1225px")
                .style("background-color","white")


            Information_panel.append("div")
                    .style("width","100%").style("cursor","default")
                    .style("padding","10px 0px 10px 0")
                    .style("text-align","center")
                    .style("background-color","rgb(229,229,229)")
                    .text("Information panel")

            var  Informationtable=Information_panel.append("table")
                .style("font-size","14px")
                .style("cursor","default")
                .style("font-weight","normal")
                .attr("cellspacing","0px")


            var dataset=Informationtable.append("tr")
            var attridset=Informationtable.append("tr")
            var attrwhereset1=Informationtable.append("tr")
            var attrwhereset2=Informationtable.append("tr")
            var attrwhenset=Informationtable.append("tr")
            var attrwhatset1=Informationtable.append("tr")
            var attrwhatset2=Informationtable.append("tr")
            var attrwhatset3=Informationtable.append("tr")
            var attrwhatset4=Informationtable.append("tr")
                dataset.append("th").text("Dataset")
                    .classed("Information_td",true)
                    .style("padding","0")


                var Mobile_phone=dataset.append("td")
                    .style("cursor","pointer")
                    .attr("show_distributrion","false")
                    .on("click",function(){
                        if(d3.select(this).attr("show_distributrion")=="false"){

                            d3.select("#information_panel_statistic").remove()
                                d3.select("#Information_panel").append("div")
                                    .attr("id","information_panel_statistic")
                                    .style("opacity","0").style("width","250px")
                                    .style("height","110px")

                                d3.select("#information_panel_statistic").append("div")
                                        .style("width","100%").style("cursor","default")
                                        .style("padding","20px 0px 20px 0")
                                        .style("background-color","rgb(229,229,229)")
                                d3.select("#information_panel_statistic")
                                    .append("div")
                                    .attr("id","information_panel_statistic_contain")
                                    .style("padding","20px 20px 20px 20px")
                                    .style("height","30px")
                                    .style("width","210px")

                                d3.select(this).attr("show_distributrion","true")
                                taxi_geo_time_distubution();


                                d3.select("#information_panel_statistic")
                                    .style("background-color","white")
                                    .transition().ease("linear")
                                    .duration(300)
                                    .delay(0)
                                    .style("opacity","1")
                        }
                        else{
                            d3.select("#information_panel_statistic").remove()
                            d3.select(this).attr("show_distributrion","false")
                            Heatmap_information_panel.setLatLngs([])      
                        }

                    })


                    Mobile_phone.append("div").style("float","left")
                    .classed("dataset_img",true)
                    .style("background","url(image/map_obj_car_unoccupied.svg) no-repeat")
                    .style("background-size","100% 100%")
                    Mobile_phone.append("div")
                    .classed("Information_td",true)
                    .text("Taxi GPS trajectory data")

                    
                
                var Mobile_phone=dataset.append("td")
                    Mobile_phone.append("div").style("float","left")
                    .classed("dataset_img",true)
                    .attr("show_distributrion","false")
                    .style("background","url(image/map_legend_people.svg) no-repeat")
                    .style("background-size","100% 100%")
                    Mobile_phone.append("div")
                    .classed("Information_td",true)
                    .text("Mobile phone location data")

                var Mobile_phone=dataset.append("td")
                    Mobile_phone.append("div").style("float","left")
                    .classed("dataset_img",true)
                    .attr("show_distributrion","false")
                    .style("background","url(image/map_legend_blog.svg) no-repeat")
                    .style("background-size","100% 100%")
                    Mobile_phone.append("div")
                    .classed("Information_td",true)
                    .text("Microblog data")

                    var Mobile_phone=dataset.append("td")
                    Mobile_phone.append("div").style("float","left")
                    .classed("dataset_img",true)
                    .attr("show_distributrion","false")
                    .style("background","url(image/map_legend_estate.svg) no-repeat")
                    .style("background-size","100% 100%")
                    Mobile_phone.append("div")
                    .classed("Information_td",true)
                    .text("Real estate data")


                    var Mobile_phone=dataset.append("td")
                    Mobile_phone.append("div").style("float","left")
                    .classed("dataset_img",true)
                    .attr("show_distributrion","false")
                    .style("background","url(image/map_objlist_poi.svg) no-repeat")
                    .style("background-size","100% 100%")
                    Mobile_phone.append("div")
                    .classed("Information_td",true)
                    .text("POIs data")

                    var Mobile_phone=dataset.append("td").style("border-right","0")
                    Mobile_phone.append("div").style("float","left")
                    .classed("dataset_img",true)
                    .attr("show_distributrion","false")
                    .style("background","url(image/map_objlist_socialnet.svg) no-repeat")
                    .style("background-size","100% 100%")
                    Mobile_phone.append("div")
                    .classed("Information_td",true)
                    .text("Social network data")


            attridset.append("th").text("Which Attribute").classed("information_panel_attribute",true)
            attridset.append("td").text("ID").classed("information_panel_attribute",true)
            attridset.append("td").text("ID").classed("information_panel_attribute",true)
            attridset.append("td").text("Content ID").classed("information_panel_attribute",true)
            attridset.append("td").text("Name").classed("information_panel_attribute",true)
            attridset.append("td").text("Functionality").classed("information_panel_attribute",true)
            attridset.append("td").text("User IDs").classed("information_panel_attribute",true)
            .style("border-right","0")


            attrwhereset1.append("th").attr("rowspan","2").text("Where Attribute")
            .classed("information_panel_attribute",true)
            attrwhereset1.append("td").text("Longitude").classed("information_panel_attribute",true)
            .style("border-bottom","0")
            attrwhereset1.append("td").text("Longitude").classed("information_panel_attribute",true)
            .style("border-bottom","0")
            attrwhereset1.append("td").text("Longitude").classed("information_panel_attribute",true)
            .style("border-bottom","0")
            attrwhereset1.append("td").text("Longitude").classed("information_panel_attribute",true)
            .style("border-bottom","0")
            attrwhereset1.append("td").text("Longitude").classed("information_panel_attribute",true)
            .style("border-bottom","0")
            attrwhereset1.append("td").text("---").classed("information_panel_attribute",true)
            .style("border-bottom","0")
            .style("border-right","0")
            attrwhereset2.append("td").text("Latitude").classed("information_panel_attribute",true)
            attrwhereset2.append("td").text("Latitude").classed("information_panel_attribute",true)
            attrwhereset2.append("td").text("Latitude").classed("information_panel_attribute",true)
            attrwhereset2.append("td").text("Latitude").classed("information_panel_attribute",true)
            attrwhereset2.append("td").text("Latitude").classed("information_panel_attribute",true)
            attrwhereset2.append("td").text("").classed("information_panel_attribute",true)
            .style("border-right","0")

            attrwhenset.append("th").text("When Attribute").classed("information_panel_attribute",true)
            attrwhenset.append("td").text("Time stamp").classed("information_panel_attribute",true)
            attrwhenset.append("td").text("Time stamp").classed("information_panel_attribute",true)
            attrwhenset.append("td").text("Time stamp").classed("information_panel_attribute",true)
            attrwhenset.append("td").text("---").classed("information_panel_attribute",true)
            attrwhenset.append("td").text("---").classed("information_panel_attribute",true)
            attrwhenset.append("td").text("Time stamp").classed("information_panel_attribute",true)
            .style("border-right","0")


            attrwhatset1.append("th").attr("rowspan","4").text("What Attribute")
            .classed("information_panel_attribute",true)
            attrwhatset1.append("td") 
                    .text("Speed")
                    .classed("information_panel_attribute",true)
                    .style("border-bottom","0")
                    .on("click",function(){
                                d3.select("#information_panel_statistic").remove()
                                d3.select("#Information_panel").append("div")
                                    .attr("id","information_panel_statistic")
                                    .style("opacity","0")

                                d3.select("#information_panel_statistic").append("div")
                                        .style("width","100%").style("cursor","default")
                                        .style("padding","20px 0px 20px 0")
                                        .style("background-color","rgb(229,229,229)")
                                d3.select("#information_panel_statistic")
                                    .append("div").attr("id","information_panel_statistic_contain")
                                    .style("padding","10px 0 0 0")
                                    .style("height","348px")
                                    .style("width","100%")
                                taxi_speed_distubution();
                                d3.select("#information_panel_statistic")
                                    .style("background-color","white")
                                    .transition().ease("linear")
                                    .duration(300)
                                    .delay(0)
                                    .style("opacity","1")
                        })
            attrwhatset1.append("td").text("---").classed("information_panel_attribute",true)
            .style("border-bottom","0")
            attrwhatset1.append("td").text("Position name").classed("information_panel_attribute",true)
            .style("border-bottom","0")
            attrwhatset1.append("td").text("Estate type").classed("information_panel_attribute",true)
            .style("border-bottom","0")
            attrwhatset1.append("td").text("Address name").classed("information_panel_attribute",true)
            .style("border-bottom","0")
            attrwhatset1.append("td").text("Duration").classed("information_panel_attribute",true)
            .style("border-bottom","0")
            .style("border-right","0")

            attrwhatset2.append("td").text("Direction").classed("information_panel_attribute",true)
            .style("border-bottom","0")
            attrwhatset2.append("td").text(" ").classed("information_panel_attribute",true)
            .style("border-bottom","0")
            attrwhatset2.append("td").text("Author's nickname").classed("information_panel_attribute",true)
            .style("border-bottom","0")
            attrwhatset2.append("td").text("Real estate area").classed("information_panel_attribute",true)
            .style("border-bottom","0")
            attrwhatset2.append("td").text("Type")
                    .classed("information_panel_attribute",true)
                    .style("border-bottom","0")
                    .on("click",function(){
                            d3.select("#information_panel_statistic").remove()
                                d3.select("#Information_panel").append("div")
                                    .attr("id","information_panel_statistic")
                                    .style("opacity","0")

                                d3.select("#information_panel_statistic").append("div")
                                        .style("width","100%").style("cursor","default")
                                        .style("padding","20px 0px 20px 0")
                                        .style("background-color","rgb(229,229,229)")
                                d3.select("#information_panel_statistic")
                                    .append("div")
                                    .attr("id","information_panel_statistic_contain")
                                    .style("padding","10px 0 0 0")
                                    .style("height","348px")
                                    .style("width","100%")
                                poi_type_distubution();


                                d3.select("#information_panel_statistic")
                                    .style("background-color","white")
                                    .transition().ease("linear")
                                    .duration(300)
                                    .delay(0)
                                    .style("opacity","1")
                        })
            attrwhatset2.append("td").text(" ").classed("information_panel_attribute",true)
            .style("border-bottom","0")
            .style("border-right","0")

            attrwhatset3.append("td").text(" ").classed("information_panel_attribute",true)
            .style("border-bottom","0")
            attrwhatset3.append("td").text(" ").classed("information_panel_attribute",true)
            .style("border-bottom","0")
            attrwhatset3.append("td").text(" ").classed("information_panel_attribute",true)
            .style("border-bottom","0")
            attrwhatset3.append("td").text("Sales price").classed("information_panel_attribute",true)
            .style("border-bottom","0")
            attrwhatset3.append("td").text(" ").classed("information_panel_attribute",true)
            .style("border-bottom","0")
            attrwhatset3.append("td").text(" ").classed("information_panel_attribute",true)
            .style("border-bottom","0")
            .style("border-right","0")

            attrwhatset4.append("td").text(" ").classed("information_panel_attribute",true)
            attrwhatset4.append("td").text(" ").classed("information_panel_attribute",true)
            attrwhatset4.append("td").text(" ").classed("information_panel_attribute",true)
            attrwhatset4.append("td").text("Building constructed date").classed("information_panel_attribute",true)
            attrwhatset4.append("td").text(" ").classed("information_panel_attribute",true)
            attrwhatset4.append("td").text(" ").classed("information_panel_attribute",true)
            .style("border-right","0")


            Information_panel.transition()
                    .ease("linear")
                    .duration(300)
                    .delay(0)
                    .style("opacity","1")
                    .style("top", "140px") 
        }else{
            d3.selectAll(".Information_panel").remove();
        }
    })
    .on("mouseover", function () {
        if(d3.selectAll(".Information_panel")[0].length==0&&
                    d3.select("#help").select(".mouse_on_tag")[0][0]==undefined){
            d3.select("#help").append("div")
                .attr("class","mouse_on_tag")
                .text("Information").style("opacity","0")
                .append("svg").attr("class","mouse_on_tag_xiaosanjiao")
                .append('polygon')
                .attr('style', 'fill:rgb(48,48,48);')
                .attr('points', '0,20 6,15 6,25')

                d3.select("#help").select(".mouse_on_tag").transition()
                    .ease("linear")
                    .duration(300)
                    .delay(0)
                    .style("opacity","1") 
        }
    })
    .on("mouseout", function () {
        d3.select("#help").selectAll(".mouse_on_tag").remove();
    })


d3.select("#help").append("img").style("pointer-events","none")
    .attr("src","image/help.png")
    .style("position","absolute")
    .style("height","24px")
    .style("width","24px")
    .style("left","8px").style("top","8px");


var taxi_geo_time_data=[];
$(function(){
    $.ajax({
        url: 'statis/newtaxistatistic.txt',
        dataType: 'text',
        success: function(data) {
            var temp=data.split("\r")
            for(var i=0;i<temp.length-1;i++){
                var readline=temp[i].split("$");
                taxi_geo_time_data.push({ 
                    time:readline[0] ,longitude:readline[1],latitude:readline[2], count:readline[3]*1
                })  

            }
        }
    });
});

function taxi_geo_time_distubution(){
        //出租车在地理上的分布
            var latlngs=[];
            var max=0;
            console.log(taxi_geo_time_data.length)
            for(var i=0;i<taxi_geo_time_data.length;i++){
                if(taxi_geo_time_data[i].count>max){
                    max=taxi_geo_time_data[i].count
                }
                for(var m = 0 ; m < taxi_geo_time_data[i].count/50 ; m++){
                    latlngs.push(L.latLng(
                    taxi_geo_time_data[i].latitude.split("-")[1]-Math.random()*(taxi_geo_time_data[i].latitude.split("-")[1]-
                        taxi_geo_time_data[i].latitude.split("-")[0])
                    ,taxi_geo_time_data[i].longitude.split("-")[1]-Math.random()*(taxi_geo_time_data[i].longitude.split("-")[1]-
                        taxi_geo_time_data[i].longitude.split("-")[0])))
                }
            }
            Heatmap_information_panel.setOptions({radius: 10,max:  max*0.00035})
            Heatmap_information_panel.setLatLngs(latlngs)

            d3.select("#information_panel_statistic_contain")
                .append("div").attr("id","information_slider")
                .attr("is_active","false")
                $("#information_slider").slider()
                    .on( "slide", function( event, ui ) {
                        Heatmap_information_panel.setOptions({radius: 10,max: max*0.000005*ui.value})
                    })                 
                    .slider( "option", "min", 1 )
                    .slider( "option", "max", 200 )
                    .slider( "option", "step", 1 )
                    .slider( "value", 70 )   

                    
}

var taxi_speed_data=[];
$(function(){
    $.ajax({
        url: 'statis/Taxi+/TRK20140101speed.txt',
        dataType: 'text',
        success: function(data) {
            var temp=data.split("\r")
            for(var i=0;i<temp.length-1;i++){
                var readline=temp[i].split("$");
                taxi_speed_data.push({ 
                    speed:readline[0] ,count:readline[1]*1
                })    
               
            }
        }
    });
});
function taxi_speed_distubution(){
    var speedchartspeed=[],speedchartdata=[],sum=0;

    for(var i=1;i<taxi_speed_data.length;i++){
        sum+=taxi_speed_data[i].count;
    }

    for(var i=1;i<taxi_speed_data.length;i++){
        speedchartspeed.push(taxi_speed_data[i].speed+"km/h")
        speedchartdata.push(Math.round(taxi_speed_data[i].count/sum*10000)/100)
    }
    var myChart = echarts.init(document.getElementById("information_panel_statistic_contain"));
            option = {
                title: {
                    left: 'center',
                    text: 'The statistical graph of taxi speed',
                    textStyle: {fontSize: 12}
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: 55,
                    right: 55,
                    top:55,
                    bottom: 45,
                    containLabel: true
                },
                xAxis: {
                    name:'speed',
                    type: 'category',
                    boundaryGap: false,
                    data: speedchartspeed
                },
                yAxis: {
                    name:'frequnecy (%)',
                    type: 'value'
                },dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 100
                }, {
                    start: 0,
                    end: 100,  
                    left:45,
                    right:30,
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

            // paint_linechart(speedchartdata, "speed", "frequency", 250, 230, 0, 20, chartdiv, nodenum);
}


var poi_type_data=[];
$(function(){
    $.ajax({
        url: 'statis/poi_result_type.txt',
        dataType: 'text',
        success: function(data) {
            var temp=data.split("\r")
            for(var i=0;i<temp.length-1;i++){
                var readline=temp[i].split("$");
                poi_type_data.push({ 
                    type:readline[0] ,count:readline[1]*1
                }) 
            }
        }
    });
});
function poi_type_distubution(){

    console.log(poi_type_data)
    var poitype=[],poitypedata=[],sum=0;


    for(var i=1;i<poi_type_data.length;i++){
        if(poi_type_data[i].count>10){
        poitype.push(poi_type_data[i].type)
        poitypedata.push(poi_type_data[i].count)
        }
    }

    var myChart = echarts.init(document.getElementById("information_panel_statistic_contain"));
        option = {
            title: {
                    left: 'center',
                    text: 'The statistical graph of POI type',
                    textStyle: {fontSize: 12}
                },
            color: ['#15c19c'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '10%',
                right: '20%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {   name: 'type',
                    axisLabel: {show: false},
                    type : 'category',
                    data : poitype,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {   name: 'Frequency',
                    type : 'value'
                }
            ],dataZoom: [
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
            series : [
                {
                    name:'Frequency',
                    type:'bar',
                    barWidth: '60%',
                    data:poitypedata
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);


}