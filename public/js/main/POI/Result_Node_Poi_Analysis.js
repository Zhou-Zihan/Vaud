/**
 * Created by Administrator on 2016/3/23.
 */

function show_point_of_interestanalysis(node){
    //sourcedivlist
    d3.select("#sourcediv" + node.attr("id")).selectAll("div").remove();

    var poitip = d3.select("#sourcediv" + node.attr("id")).append("div")
        .attr("class", "analysistip")

    poitip.append("div").attr("class", "analysistip_attr")
        .style("width",136+"px")
        .on("mousedown", function () {
            show_poinodetype(node);
        })
        .text("Bar chart")

       d3.select("#sourcediv" + node.attr("id")) .append("div")
            .text("The statistics of POIs over type")
            .style("cursor","default")
            .style("font-size","13px")
            .style("position","absolute")
            .style("left","42px")
            .style("top","48px")
            .style("color","#000")

    poitip.append("div")
        .attr("class", "analysistip_attr")
        .style("width",136+"px")
        .on("mousedown", function () {
            show_heatmap(node);
        })
        .text("Heat map")

    d3.select("#sourcediv" + node.attr("id")).append("div")
        .attr("id", "sourcedivlist" + node.attr("id"))
        .attr("class","sourcedivlist")
    show_poinodetype(node)
}


function show_poinodetype(node){
    d3.select(("#sourcedivlist" + node.attr("id"))).selectAll("svg").remove();
    d3.select(("#sourcedivlist" + node.attr("id"))).selectAll("div").remove();
    //Sum POIData by kjm
    var POIData=nodelist.getlistiditem(node.attr("id")).getdatalist();
    var ClassPOIData=[];
    var POIflag=false;
    for (i=0;i<POIData.length ;i++)
    {
        POIflag=false;
        for (j=0;j<ClassPOIData.length;j++)
        {
            if (ClassPOIData.length>0)
            {
                if(ClassPOIData[j][0]==POIData[i].type)
                {
                    ClassPOIData[j][1]=ClassPOIData[j][1]+1;
                    POIflag=true;
                    break;
                }
            }
        }

        if (!POIflag)
        {
            ClassPOIData.push([POIData[i].type,1]);
            POIflag=true;
        }
    }

    var templist=[],othernum=0;

    for(var i=0;i<ClassPOIData.length;i++){
        if(ClassPOIData[i][1]>5||ClassPOIData.length<20){
            templist.push(ClassPOIData[i])
        }else{
            othernum++;
        }
    }
    // templist.push(["other",othernum]);

    console.log(templist)
    var xdata=[],ydata=[];
    for(var i=0;i<templist.length;i++){
        xdata.push(templist[i][0])
        ydata.push(templist[i][1])
    }
    var myChart = echarts.init(document.getElementById("sourcedivlist" + node.attr("id")));

        option = {
            color: ['#15c19c'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                            left: '5%',
                    right: '17%',
                    bottom:'3%',
                    containLabel: true
                        },
            xAxis : [
                { name : 'type',
                    axisLabel: {show: false},
                    type : 'category',
                    data : xdata,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {name : 'Frequency',
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'Frequency',
                    type:'bar',
                    barWidth: '60%',
                    data:ydata
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        

        //add to compare
        var compare_tip=d3.select("#sourcedivlist" + node.attr("id")).append("div")
            .style("cursor","pointer")
            .style("height","17px")
            .style("width","17px")
            .style("position","absolute")
            .style("left","16px")
            .style("top","14px")
            .style("background-color","rgb(21,193,156)")

        compare_tip.append("img").style("pointer-events","none")
            .attr("src","image/query_addNode.svg")
            .style("position","absolute")
            .style("height","17px")
            .style("width","17px")
            .style("left","0px").style("top","0px")

        compare_tip.on("click",function(e){
                d3.select("#sceneviewfold").append("div").style("background",
                        "url(image/compare.png) no-repeat").attr("id","animation_add_to_comparepanel")
                    .style("background-size","100% 100%")
                    .style("width","50px")
                    .style("height","50px")
                    .style("border","4px solid rgb(21,193,156)")
                    .style("position","absolute")
                    .style("left",d3.event.x+"px")
                    .style("top",d3.event.y+"px")
                    .style("z-index","200")

                d3.select("#animation_add_to_comparepanel").transition()
                            .ease("linear")
                            .duration(300)
                            .delay(0)
                            .style("left","40px") 
                            .style("top",$("#sceneviewfold").height()-1+200+"px")
                            .style("width","32px")
                            .style("height","32px")
                d3.select("#animation_add_to_comparepanel").transition()
                            .ease("linear").duration(0).delay(300)
                            .remove();

                d3.select("#sceneviewfold").append("div").attr("id","animation_add_to_comparepaneltext")
                            .style("padding","10px 12px 0 12px")
                            .text("+1")
                            .style("color","rgb(21,193,156)")
                            .style("font-size","20px")
                            .style("left","40px") 
                            .style("top",$("#sceneviewfold").height()-1+200+"px")
                            .style("width","32px")
                            .style("height","32px")
                            .style("position","absolute")
                            .style("opacity","0")
                

                d3.select("#animation_add_to_comparepaneltext").transition()
                            .ease("linear").duration(1).delay(300).style("opacity","1")
                d3.select("#animation_add_to_comparepaneltext").transition()
                            .ease("linear").duration(500).delay(400)
                            .style("opacity","0.1")
             d3.select("#animation_add_to_comparepaneltext").transition()
                            .ease("linear").duration(0).delay(1000).remove()

                data={};
                data.title='Type of POIs : '+d3.select("#nodename"+node.attr("id")).text()
                data.xName='type'
                data.yName='Frequency'
                data.type='bar'
                data.xArr=xdata
                data.yArr=ydata
                
                compare_data.push(data)

                if(d3.select("#compare_panel")[0][0]!=undefined){
                    addcompare("compare_panel");
                }
            })
            .on("mousemove", function () {
                    if(d3.select(this).select("div")[0][0]==undefined){
                        d3.select(this).append("div").style("height","100%")
                            .style("position","absolute")
                            .style("top","17px")
                            .style("left","0px")
                            .style("background-color","rgb(21,193,156)")
                            .style("position","absolute")
                            .text("Compare")
                            .style("color","#fff").style("font-size","10px")
                            .style("opacity","0") 

                         d3.select(this).select("div").transition()
                            .ease("linear")
                            .duration(300)
                            .delay(0)
                            .style("opacity","1") 
                    }
                })
                .on("mouseout", function () {
                    d3.select(this).selectAll("div").remove();
                })

}