 /**
 * Created by Administrator on 2016/3/6.
 */


function paint_linechart(Num,xname,yname,width,height,left,top,div,nodenum)
{

    var linechart=div.append("div").attr("class","linechart_div")

        .style("position","absolute")
        .style("left",left+"px")
        .style("top",top+"px")
        .style("width",width+"px")
        .style("height",height+"px")
        .style("border-radius","8px");

    var linechartsvg=linechart.append("svg")
        .style("width","100%")
        .style("height","100%")
        .style("-webkit-user-select","none");

    //�����ܱߵĿհ�
    var padding={left:35,top:30,right:10,bottom:30}
    //����һ������
    var dataset =(Num);
    //x��ı����
    var xScale = d3.scale.ordinal()
        .domain(d3.range(dataset.length))
        .rangeRoundBands([0, width - padding.left - padding.right]);
    var XStep=(width - padding.left - padding.right)/(dataset.length);

    //y��ı����
    var yScale = d3.scale.linear()
        .domain([0,Math.round(ymax)])
        .range([height - padding.top - padding.bottom, 0]);
    //����x��
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

    //����y��
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

    //����֮��Ŀհ�
    var rectPadding = 2;
    /*//���x��
     linechartsvg.append("g")
     .attr("class","axis")
     .attr("transform","translate(" + padding.left + "," + (height - padding.bottom) + ")")
     .call(xAxis)
     .style("fill","white")
     .append("text")
     .attr("class", "label")
     .attr("x", width-padding.left-padding.right/2)
     .attr("y", 25)
     .style("text-anchor", "end")
     .style("-webkit-user-select","none")
     .text(xname);

     //���y��
     linechartsvg.append("g")
     .attr("class","axis")
     .attr("transform","translate(" + padding.left + "," + padding.top + ")")
     .call(yAxis)
     .style("fill","white")
     .append("text")
     .attr("class","label")
     .attr("x",0)
     //.attr("transform", "rotate(90)")
     .attr("transform","translate("+(0)+","+(-padding.bottom)+")")
     .attr("y", 6)
     .attr("dy", ".71em")
     .style("text-anchor", "end")
     .style("-webkit-user-select","none")
     .text(yname);*/




    var leftpad=35,bottpad=30,
        rightpad=10,
        chartwidth=width-leftpad-rightpad,
        chartheight=height-bottpad;
    var data=[];
    for (var i=0;i<Num.length;i++)
    {
        data.push([i+1,Num[i]]);
    }

    //linechartsvg.append("rect")
    //    .attr("x",260)
    //    .attr("y",20)
    //    .attr("rx",5)
    //    .attr("ry",5)
    //    .style("width",100).style("height",3)
    //    .style("fill","rgba(0,0,0,0.8)")
    //linechartsvg.append("rect")
    //    .attr("class","parameter_bar")
    //    .attr("x",260)
    //    .attr("y",12)
    //    .attr("rx",5)
    //    .attr("ry",5)
    //    .style("width",5).style("height",20)
    //    .style("fill","rgba(0,0,0,0.8)")
    //    .on("mousedown",function(){
    //        div.append("svg").style("position","absolute")
    //            .style("width","1000px")
    //            .style("left",left+"px")
    //            .style("top",top+"px")
    //            .style('height',"1000px")
    //            .on("mousemove",function(){
    //                if(d3.mouse(this)[0]<260){
    //                    d3.select(".parameter_bar").attr("x",260)
    //                    return
    //                }
    //                if(d3.mouse(this)[0]>355){
    //                    d3.select(".parameter_bar").attr("x",355)
    //                    return
    //                }
    //                d3.select(".parameter_bar").attr("x",d3.mouse(this)[0])
    //                console.log(parseInt((d3.mouse(this)[0]-260)/15))
    //            })
    //            .on("mouseup",function(){
    //                d3.select(this).remove();
    //            })
    //    })


    var xmax=0,ymax= 0,
        step=data.length,
        foot=chartwidth/step;
    for(var i=1;i<data.length;i++){
        if(xmax<data[i][0])
            xmax=data[i][0]
        if(ymax<data[i][1])
            ymax=data[i][1]
    }
    ymax=ymax*1.2;
    /*for (var i=0;i<=Math.round(d3.max(Num)*1.2);i++)
     {
     linechartsvg.append("line")
     .attr("x1",leftpad)
     .attr("y1",chartheight-((chartheight-padding.top)/Math.round(d3.max(Num)*1.2))*i)
     .attr("x2",width-rightpad)
     .attr("y2",chartheight-((chartheight-padding.top)/Math.round(d3.max(Num)*1.2))*i)
     .style("stroke","rgb(230,230,230)")
     .style("stroke-width","0.2");
     }*/
    //x y name
    for(var i= 0;i<=6;i++){
        linechartsvg.append("line")
            .attr("x1",leftpad)
            .attr("y1",chartheight-(chartheight-padding.top)/6*i)
            .attr("x2",width-rightpad)
            .attr("y2",chartheight-(chartheight-padding.top)/6*i)
            .style("stroke","#888")
            .style("stroke-width","0.2")
        linechartsvg.append("line")
            .attr("x1",leftpad+chartwidth/6*i)
            .attr("y1",chartheight)
            .attr("x2",leftpad+chartwidth/6*i)
            .attr("y2",chartheight+5)
            .style("stroke","#888)")
            .style("stroke-width","0.3")
        linechartsvg.append("text")
            .style("fill","#888")
            .attr("x",leftpad+chartwidth/6*i-8)
            .attr("y",chartheight+20)
            .attr("font-size","6px")
            .text(parseInt(dataset.length/6*i))
        linechartsvg.append("text")
            .style("fill","#888")
            .style("font-size","6px")
            .attr("x",5)
            .attr("y",chartheight-(chartheight-padding.top)/6*i+5)
            .text(parseInt(ymax/6*i))
    }

    //data
    var points="";
    var Line_begin_x=(xScale.rangeBand() - rectPadding)/2+rectPadding/2;

    for(var i=0;i<data.length;i++){
        points=points+(Line_begin_x+leftpad+XStep*i)+","+(chartheight-((chartheight-padding.top)/Math.round(d3.max(Num)*1.2))*Num[i])+" ";
    }
    linechartsvg.append("polyline")
        .attr("points",points)
        .style("fill","none")
        .style("stroke","#15c19c")
        .style("stroke-width","1")


    function Line_red(startpoints,endpoints)
    {
        var Line_red_points=""
        for(var i=startpoints;i<=endpoints;i++){

            Line_red_points=Line_red_points+(Line_begin_x+leftpad+XStep*i)+","+(chartheight-((chartheight-padding.top)/ymax)*Num[i])+" ";

        }
        linechartsvg.append("polyline")
            .attr("class","Line_red_points_class")
            .attr("points",Line_red_points)
            .style("fill","none")
            .style("stroke","rgb(199,80,80)")
            .style("stroke-width","1")

    }


    var detailwidth=130,detailheight=50;
    var Red_points_x,Red_points_y,Red_points;
    var selectareaflag=false;
    var SelectFlagX=false;
    var selectareaflagheight=false;
    var SelectFlagY=false;
    var Linechartxlabel=false,
        Linechartylabel=false;

    linechartsvg.on("mousemove",function(){
        linechartsvg.selectAll(".chartmouseover").remove();
        linechartsvg.selectAll(".chartmouseoverx").remove();
        if((data[parseInt((d3.mouse(this)[0]-leftpad)/foot)]!=undefined)&&((parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/XStep))>=0)){
            linechartsvg.append("circle")
                .attr("class","chartmouseover")
                .style("fill","rgba(255,255,255,0.7)")
                .attr('cx', Line_begin_x+leftpad+XStep*(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/XStep)))
                .attr('cy', (chartheight-((chartheight-padding.top)/Math.round(ymax))*Num[(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/XStep))]))
                .attr('r', 8)
            linechartsvg.append("circle")
                .attr("class","chartmouseover")
                .style("fill","#ff6e1c")
                .attr('cx', Line_begin_x+leftpad+XStep*(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/XStep)))
                .attr('cy', (chartheight-((chartheight-padding.top)/Math.round(ymax))*Num[(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/XStep))]))
                .attr('r', 4)
//                .style("stroke","rgb(0,0,0)")
//                .style("stroke-width","1")
            var detailtransform;
            if (data[parseInt((d3.mouse(this)[0]-leftpad)/foot)][1]>100)
            {
                detailwidth=120;
                detailtransformy=detailwidth/3.6;
                detailtransformx=detailwidth/9;
                linechartsvg.append("image")
                    .attr("class","chartmouseover")
                    .attr("xlink:href","../../image/chart_linechart_pop2.svg")
                    .style("width",detailwidth)
                    .style("height",detailheight+1)
                    .style("x",Line_begin_x+leftpad+XStep*(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/XStep))-detailwidth/2)
                    .style("y",(chartheight-((chartheight-padding.top)/Math.round(ymax))*Num[(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/XStep))])-detailheight-10)

            }
            else
            {
                detailwidth=100;
                detailtransformy=detailwidth/3;
                detailtransformx=detailwidth/11;
                linechartsvg.append("image")
                    .attr("class","chartmouseover")
                    .attr("xlink:href","../../image/chart_linechart_pop.svg")
                    .style("width",detailwidth)
                    .style("height",detailheight+1)
                    .style("x",Line_begin_x+leftpad+XStep*(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/XStep))-detailwidth/2)
                    .style("y",(chartheight-((chartheight-padding.top)/Math.round(ymax))*Num[(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/XStep))])-detailheight-10)

            }
            


//                .attr("class","chartmouseover")
//                .attr("x",Line_begin_x+leftpad+XStep*(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/XStep))-detailwidth/2)
//                .attr("y",(chartheight-((chartheight-padding.top)/Math.round(ymax))*Num[(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/XStep))])-detailheight-10)
//                .attr("rx",3)
//                .attr("ry",3)
//                .style("width",detailwidth)
//                .style("height",detailheight)
//                .style("fill","rgba(247,247,247,0.8)").style("stroke","rgb(0,0,0)")
//                .style("stroke-width","1")
            linechartsvg.append("text").attr("class","chartmouseover")
                .style("fill","#444")
                .style("font-size","12px")
                .attr("x",Line_begin_x+leftpad+XStep*(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/XStep))-detailwidth/2+detailwidth/4.5)
                .attr("y",(chartheight-((chartheight-padding.top)/Math.round(ymax))
                *Num[(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/XStep))])-detailheight-10+detailheight-detailtransformy)
                .text(xname+" : "+data[parseInt((d3.mouse(this)[0]-leftpad)/foot)][0])
            linechartsvg.append("text").attr("class","chartmouseover")
                .style("fill","#444")
                .style("font-size","12px")
                .attr("x",Line_begin_x+leftpad+XStep*(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/XStep))-detailwidth/2+detailtransformx)
                .attr("y",(chartheight-((chartheight-padding.top)/Math.round(ymax))
                *Num[(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/XStep))])-detailheight-10+detailheight-detailwidth/6.4)
                .text(yname+" : "+data[parseInt((d3.mouse(this)[0]-leftpad)/foot)][1])
        }
        if(selectareaflag){
            d3.select(".chartselctarea")
                .style("width",Line_begin_x+leftpad+XStep*(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/XStep))-d3.select(".chartselctarea").attr("x")+"px")
                .attr("width",Line_begin_x+leftpad+XStep*(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/XStep))-d3.select(".chartselctarea").attr("x"));
            d3.select(".chartselctareax")
                .style("width",Line_begin_x+leftpad+XStep*(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/XStep))
                -d3.select(".chartselctarea").attr("x")+"px");

        }
        if(selectareaflagheight){
            d3.select(".chartselctareaheight")
                .style("height",parseInt((d3.mouse(this)[1]-d3.select(".chartselctareaheight").attr("y"))/((chartheight-padding.top)/Math.round(ymax)))*((chartheight-padding.top)/Math.round(ymax))+"px")
                .attr("height",parseInt((d3.mouse(this)[1]-d3.select(".chartselctareaheight").attr("y"))/((chartheight-padding.top)/Math.round(ymax)))*((chartheight-padding.top)/Math.round(ymax)));

            d3.select(".chartselctareay")
                .style("height",parseInt((d3.mouse(this)[1]-d3.select(".chartselctareaheight").attr("y"))/((chartheight-padding.top)/Math.round(ymax)))*((chartheight-padding.top)/Math.round(ymax))+"px");

        }
    })
        .on("mousedown",function(){


            if (d3.mouse(this)[0]>=padding.left)
            {
                      
                if (Linechartxlabel&&d3.mouse(this)[0]>=Number.parseFloat(d3.select(".chartselctarea").attr("x"))&&
                    d3.mouse(this)[0]<=Number.parseFloat((d3.select(".chartselctarea").attr("x")))+
                    Number.parseFloat(d3.select(".chartselctarea").attr("width")))
                {
                    var Line_red_X=(d3.select(".chartselctarea").attr("x")-padding.left)/XStep-0.5;
                    var xname_first=parseInt(Line_red_X);
                    var xname_end=(parseInt((d3.select(".chartselctarea").attr("width"))/XStep)+parseInt(Line_red_X));
                    console.log(xname+":("+xname_first+","+xname_end+")");
                    new_conditiondiv(xname,[xname_first,xname_end],d3.event.x,d3.event.y,nodenum,1);
                }
                else
                {
                    d3.selectAll(".Line_red_points_class").remove();
                    d3.selectAll(".Line_Svg_Cover_Remove").remove();
                    d3.selectAll(".chartselctarea").remove();
                    d3.selectAll(".chartselctareax").remove();
                    d3.selectAll(".Linechart_Red_points_x").remove();
                    linechartsvg.append("rect")
                        .attr("class","chartselctarea")
                        .attr("x",Line_begin_x+leftpad+XStep*(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/XStep)))
                        .attr("y",padding.left)
                        .style("width",0+"px")
                        .style("height",chartheight-padding.left+"px")
                        .style("fill","rgba(0,0,0,0.1)")
                    linechartsvg.append("rect")
                        .attr("class","chartselctareax")
                        .attr("x",Line_begin_x+leftpad+XStep*(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/XStep)))
                        .attr("y",chartheight)
                        .style("width",0+"px")
                        .style("height",25+"px")
                        .style("fill","rgba(0,0,0,0.1)")
                    selectareaflag=true;
                    SelectFlagX=true;
                    Linechartxlabel=false;
                }
            }

            else if (d3.mouse(this)[0]>=0)
            {
                if (Linechartylabel&&d3.mouse(this)[1]>=Number.parseFloat(d3.select(".chartselctareaheight").attr("y"))&&d3.mouse(this)[1]<=Number.parseFloat(d3.select(".chartselctareaheight").attr("y"))+Number.parseFloat(d3.select(".chartselctareaheight").attr("height")))
                {
                    var Line_red_y=parseInt(Math.round(ymax)-(d3.select(".chartselctareaheight").attr("y")-padding.top)/((chartheight-padding.top)/Math.round(ymax)));
                    var yname_first=Line_red_y-parseInt(d3.select(".chartselctareaheight").attr("height")/((chartheight-padding.top)/Math.round(ymax)));
                    var yname_end=Line_red_y;
                    console.log(yname+":("+yname_first+","+yname_end+")");
                    new_conditiondiv(yname,[yname_first,yname_end],d3.event.x,d3.event.y,nodenum,1);
                }
                else
                {
                    d3.selectAll(".Linechart_Red_points").remove();
                    d3.selectAll(".chartselctareaheight").remove();
                    d3.selectAll(".chartselctareay").remove();
                    d3.selectAll(".Linechart_Red_points_y").remove();
                    linechartsvg.append("rect")
                        .attr("class","chartselctareaheight")
                        .attr("x",padding.left-40)
                        .attr("y",parseInt((d3.mouse(this)[1]-padding.top)/((chartheight-padding.top)/Math.round(ymax)))*((chartheight-padding.top)/Math.round(ymax))+padding.top)
                        .style("width",40+"px")
                        .style("height",0+"px")
                        .style("fill","rgba(0,0,0,0.1)")
                    linechartsvg.append("rect")
                        .attr("class","chartselctareay")
                        .attr("x",padding.left)
                        .attr("y",parseInt((d3.mouse(this)[1]-padding.top)/((chartheight-padding.top)/Math.round(ymax)))*((chartheight-padding.top)/Math.round(ymax))+padding.top)
                        .style("width",width-padding.left-padding.right+"px")
                        .style("height",0+"px")
                        .style("fill","rgba(0,0,0,0.1)")
                    selectareaflagheight=true;
                    SelectFlagY=true;
                    Linechartylabel=false;
                }

            }

        })
        .on("mouseup",function(){
            if (selectareaflag)
            {
                var Line_red_X=(d3.select(".chartselctarea").attr("x")-padding.left)/XStep-0.5;
                var xname_first=parseInt(Line_red_X);
                var xname_end=(parseInt((d3.mouse(this)[0]-d3.select(".chartselctarea").attr("x"))/XStep)+parseInt(Line_red_X));
                if (xname_end>xname_first)
                {
                    // Line_red(parseInt(Line_red_X),parseInt((d3.mouse(this)[0]-d3.select(".chartselctarea").attr("x"))/XStep)+Line_red_X);
                    //Line_Svg_Cover_Remove((parseInt((d3.mouse(this)[0]-d3.select(".chartselctarea").attr("x"))/XStep)+Line_red_X)*XStep+padding.left,chartheight);
                    Linechartxlabel=true;
                    Red_points_x=[];
                    for (i=parseInt(Line_red_X);i<=(parseInt((d3.mouse(this)[0]-d3.select(".chartselctarea").attr("x"))/XStep)+Line_red_X);i++)
                    {
                        Red_points_x[i-parseInt(Line_red_X)]=[i,Num[i]];
                    }
                    if (!Red_points_y){
                        Red_points=Red_points_x;
                        for (i=0;i<Red_points_x.length;i++)
                        {
                            linechartsvg.append("circle")
                                .attr("class","Linechart_Red_points_x")
                                .style("fill","#ff6e1c")
                                .attr('cx', Line_begin_x+leftpad+XStep*Red_points_x[i][0])
                                .attr('cy', (chartheight-((chartheight-padding.top)/Math.round(ymax))*Red_points_x[i][1]))
                                .attr('r', 3)
                        }
                    }
                    else
                    {
                        Red_points=[];
                        d3.selectAll(".Linechart_Red_points_y").remove();
                        for (i=0;i<Red_points_x.length;i++)
                        {
                            for (j=0;j<Red_points_y.length;j++)
                            {
                                if (Red_points_y[j][0]==Red_points_x[i][0])
                                {
                                    linechartsvg.append("circle")
                                    .attr("class","Linechart_Red_points_x")
                                    .style("fill","#ff6e1c")
                                    .attr('cx', Line_begin_x+leftpad+XStep*Red_points_x[i][0])
                                    .attr('cy', (chartheight-((chartheight-padding.top)/Math.round(ymax))*Red_points_x[i][1]))
                                    .attr('r', 3);
                                    Red_points.push([i,Red_points_x[i][0]]);
                                    break;

                                }
                                
                            }
                            
                        }
                    }
                    
                }
            }
            if (selectareaflagheight)
            {

                var Line_red_y=parseInt(Math.round(ymax)-(d3.select(".chartselctareaheight").attr("y")-padding.top)/((chartheight-padding.top)/Math.round(ymax)));
                var yname_first=Line_red_y-parseInt(d3.select(".chartselctareaheight").attr("height")/((chartheight-padding.top)/Math.round(ymax)));
                var yname_end=Line_red_y;
                if (yname_end>yname_first)
                {
                    Linechartylabel=true;

                    Red_points_y=[];
                    var assistnumber01=0;
                    for (i=0;i<Num.length;i++)
                    {
                        if (Num[i]>=yname_first&&Num[i]<=yname_end)
                        {
                            Red_points_y[assistnumber01]=[i,Num[i]];
                            assistnumber01++;
                        }
                    }
                    

                    if (!Red_points_x){
                        for (i=0;i<assistnumber01;i++)
                        {
                            Red_points=Red_points_y;
                            linechartsvg.append("circle")
                                .attr("class","Linechart_Red_points_y")
                                .style("fill","#ff6e1c")
                                .attr('cx', Line_begin_x+leftpad+XStep*Red_points_y[i][0])
                                .attr('cy', (chartheight-((chartheight-padding.top)/Math.round(ymax))*Red_points_y[i][1]))
                                .attr('r', 3)
                        }
                    }
                    else
                    {
                        d3.selectAll(".Linechart_Red_points_x").remove();
                        Red_points=[];
                        for (i=0;i<assistnumber01;i++)
                        {
                            for (j=0;j<Red_points_x.length;j++)
                            {
                                if (Red_points_x[j][0]==Red_points_y[i][0])
                                {
                                linechartsvg.append("circle")
                                    .attr("class","Linechart_Red_points_y")
                                    .style("fill","#ff6e1c")
                                    .attr('cx', Line_begin_x+leftpad+XStep*Red_points_y[i][0])
                                    .attr('cy', (chartheight-((chartheight-padding.top)/Math.round(ymax))*Red_points_y[i][1]))
                                    .attr('r', 3);
                                Red_points.push([j,Red_points_x[j][0]]);
                                break;
                                }
                            }
                            
                        }
                    }
                    
                }

            }
            selectareaflag=false;
            SelectFlagX=false;
            selectareaflagheight=false;
            SelectFlagY=false;
        });
    //function Line_Svg_Cover_Remove(left,top){
    //    var circle=linechartsvg
    //        .append("circle")
    //        .attr("class","Line_Svg_Cover_Remove")
    //        .attr('cx',left)
    //        .attr('cy',padding.top)
    //        .attr('r',4)
    //        .attr('stroke','red')
    //        .attr('stroke-width',2)
    //        .style('fill','red')
    //        .on("mousedown",function(){
    //            Linechartxlabel=false;
    //            Linechartylabel=false;
    //            d3.selectAll(".Line_red_points_class").remove();
    //            d3.selectAll(".chartselctarea").remove();
    //            d3.selectAll(".chartselctareax").remove();
    //            d3.selectAll(".chartselctareaheight").remove();
    //            d3.selectAll(".chartselctareay").remove();
    //            d3.selectAll(".Line_Svg_Cover_Remove").remove();
    //            d3.selectAll(".Linechart_Red_points").remove();
    //        });
    //};


}