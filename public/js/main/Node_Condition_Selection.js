/**
 * Created by Administrator on 2016/3/16.
 */

function show_whichselection(id){
    var whichoption=d3.select("#selectdiv" + id)
        .append("div")
        .attr("class","attrselection")

    //id select
    whichoption.append("div")
        .text(function(){
//            if(nodelist.getlistiditem(id).type=="blog"){
//                return "Key word :"
//            }
//            else{
                return  "ID :"
//            }

        })
        .style("position","absolute")
        .style("top","18px")
        .style("left","10px")
        .style("height","13px")
        .style("width","40px")
        .style("font-weight","lighter")
        .style("text-align","center")
        .style("cursor","default")

    whichoption.append("input")
        .attr("type","text")
        .attr("id",id+ "idinput")
        .attr("name",id+ "idinput")
        .style("color","#4c4c4c")
        .style("font-weight","light")
        .style("font-size","13px")
        .style("padding","0px")
        .style("position","absolute")
        .style("top","10px")
        .style("right","60px")
        .style("height","30px")
        .style("width","158px")
        .style("border","1px solid #d3d3d3")
        .style("border-radius","2px")

    //ok tip
    whichoption.append("div")
        .attr("class","select_tip_ok")
        .on("mousedown",function(){
            //confirm ID
            if (document.getElementById(id+"idinput").value != "") {
                var whichinterval = d3.select("#" + id+ "idinput")[0][0].value
                var tempnode=nodelist.getlistiditem(id);
                tempnode.pushwhichlistitem(whichinterval);
                nodelist.changelistiditem(id,tempnode)
                console.log(d3.select("#nodename"+id))
                log("Select id:"+whichinterval +" into "+d3.select("#nodename"+id)[0][0].outerText)
            }
            show_conditionlist(id);
        })
        .text("OK")
}

function show_whereselection(id) {
    var whereoption = d3.select("#selectdiv" + id)
        .append("div")
        .attr("class", "attrselection")

    whereoption.append("div")
        .text("Region selection:")
        .style("position","absolute")
        .style("top","7px")
        .style("left","10px")
        .style("height","14px")
        .style("width","80px")
        .style("font-weight","lighter")
        .style("text-align","center")
        .style("cursor","default")


    var mapselection=whereoption.append("div")
        .attr("class","mapselection")

    mapselection.append("div").attr("class","mapselectionattr")
        .style("border-top-left-radius","4px")
        .style("border-top-right-radius","4px")
        .style("position","relative")
        .append("img")
        .attr("src", "image/card_b_where_point.svg")
        .attr("height", "28px")
        .attr("width", "28px")
    mapselection.append("div").attr("class","mapselectionattr")
        .style("border-bottom-left-radius","4px")
        .style("border-bottom-right-radius","4px")
        .style("position","relative")
        .on("mouseup",function(){
            //mengban
            d3.select("#coverdiv").remove();
            d3.select("#nodelist").append("div").attr("id","coverdiv")
                .style("z-index",nodelist.getlistlength()-1)

            var selectrect=false;
            d3.select("#sceneviewfold").append("svg")
                .attr("id","mapselect_svg")
                .style("position","absolute")
                .style("top",0)
                .style("left",0)
                .style("cursor","crosshair")
                .style("width","100%")
                .style("height","100%")
                .on("mousemove",function(){
                    if(selectrect){
                        if(d3.event.y>d3.select("#mapselect_rect").attr("thisy"))
                            d3.select("#mapselect_rect")
                                .attr("height",(d3.event.y-d3.select("#mapselect_rect").attr("thisy")))
                        else
                            d3.select("#mapselect_rect")
                                .attr("y",d3.event.y)
                                .attr("height",(d3.select("#mapselect_rect").attr("thisy")-d3.event.y))
                        if(d3.event.x>d3.select("#mapselect_rect").attr("thisx"))
                            d3.select("#mapselect_rect")
                                .attr("width",(d3.event.x-d3.select("#mapselect_rect").attr("thisx")))
                        else
                            d3.select("#mapselect_rect")
                                .attr("x",d3.event.x)
                                .attr("width",(d3.select("#mapselect_rect").attr("thisx")-d3.event.x))
                    }
                })
                .on("mousedown",function(){
                    d3.select("#mapselect_rect")
                        .attr("x",d3.event.x)
                        .attr("y",d3.event.y)
                        .attr("thisy",d3.event.y)
                        .attr("thisx",d3.event.x)
                        .attr("stroke","rgb(21,193,156)")
                        .attr("stroke-width","1")
                        .attr("width",0)
                        .attr("height",0)
                    selectrect=true;
                })
                .on("mouseup",function(){
                    selectrect=false;
                })
            d3.select("#mapselect_svg").append("rect")
                .attr("id","mapselect_rect")
                .style("fill","rgba(21,193,156,0.2)")
                .attr("width",0)
                .attr("height",0)
                .attr("x",0)
                .attr("y",0)
                .style("pointer-events","visiblepainted")
        })
        .append("img")
        .attr("src", "image/card_b_where_area.svg")
        .attr("height", "28px")
        .attr("width", "28px")


    //ok tip
    whereoption.append("div")
        .attr("class","select_tip_ok")
        .on("mousedown",function(){
            d3.select("#coverdiv").remove();
            if(d3.select("#mapselect_rect")[0][0]!=null){
                x1 = d3.select("#mapselect_rect").attr("x")
                y1 = d3.select("#mapselect_rect").attr("y")
                x2 = d3.select("#mapselect_rect").attr("x") - 1 + (d3.select("#mapselect_rect").attr("width") - 1)
                y2 = d3.select("#mapselect_rect").attr("y") - 1 + (d3.select("#mapselect_rect").attr("height") - 1)
                var point1 = map.containerPointToLatLng([x1, y1])
                var point2 = map.containerPointToLatLng([x2, y2])
                var whereinterval = [
                    point2.lat,
                    point1.lng,
                    point1.lat,
                    point2.lng,"region"
                ]
                var tempnode = nodelist.getlistiditem(id);
                tempnode.pushwherelistitem(whereinterval);
                nodelist.changelistiditem(id, tempnode)
                log("Select region into " + d3.select("#nodename"+id)[0][0].outerText)
                show_conditionlist(id);

            }
            delete_mapselectarea();
        })
        .text("OK")
}

function show_whenselection(id,type) {
    var whenoption = d3.select("#selectdiv" + id)
        .append("div")
        .attr("class", "attrselection")

        whenoption.append("div")
            .style("position","absolute")
            .style("height","23px")
            .style("width","23px")
            .style("left","14px")
            .style("top","15px")
            .style("cursor","pointer")
            .style("background","url(image/refresh.png) no-repeat")
            .style("background-size","100% 100%")
            .on("click",function(){
                whenoption.remove();
                if(type=="jiange")
                   show_whenselection(id,"lianxu");
                else 
                   show_whenselection(id,"jiange");
            })

    if(type=="jiange"){
        whenoption.append("input")
        .attr("id", id + "Timepicker")
        .attr("class","Timepicker")
        .style("margin", "0")
        .style("color","#979797")
        .style("font-weight","light")
        .style("font-size","13px")
        .style("height","18px")
        .style("padding","0px")
        .style("height","30px")
        .style("width","172px")
        .style("border","1px solid #d3d3d3")
        .style("border-radius","2px")
        .style("position","absolute")
        .style("top","10px")
        .style("left","49px")
        .style("line-height","25px")
        .attr("type", "text")
        .on("mousedown",function(){
                              yearbegin = 2005;
                              ifyearchosen = new Array(3000)
                              ifmonthchosen = new Array(12)
                              ifdatechosen = new Array(31)
                              ifweekchosen = new Array(7)
                              for(i=0;i<ifyearchosen.length;i++){ ifyearchosen[i] = 0}
                              for(i=0;i<ifmonthchosen.length;i++){ ifmonthchosen[i] = 0}
                              for(i=0;i<ifdatechosen.length;i++){ ifdatechosen[i] = 0}
                              for(i=0;i<ifweekchosen.length;i++){ ifweekchosen[i] = 0}
                              yearchosen = new Array()
                              monthchosen = new Array()
                              datechosen = new Array()
                              weekchosen = new Array()
                              nyear = 0
                              nmonth = 0
                              ndate = 0
                              nweek = 0
                              beginhour = 0
                              beginmin = 0
                              endhour = 0
                              endmin = 0
                              year = 0
                              month = 0
                              day = 0
                              date = 0
                              week = 0
                              timechosen = 0
            bigcircle = whenoption.append("div")//外框
            .style("position","absolute")
            .style("left","50px")
            .style("top","43px")
            .style("z-index","1000")
            .style("width","250px")
            .style("height","200px")
            .style("background-color","rgb(249,250,251)")
            .style("border","1px solid #828282")
            .style("border-radius","2px");
            innercircleup = bigcircle.append("div")//内上框
                .style("position","absolute")
                .style("top","2px")
                .style("left","2px")
                .style("width","244px")
                .style("height","25px")
                .style("border-radius","2px");
            Yeardiv = innercircleup.append("div")//年份
                .attr("id","Yeardiv")
                .style("position","absolute")
                .style("top","1px")
            .style("left","0px")
            .style("width","45px")
            .style("height","20px")
            .style("background-color","#e8e8e8")
            .style("text-align","center")
            .style("border","1px solid #d3d3d3")
                .style("border-radius","2px")
                .text("Year")
                    .style("font-size","15px")
                    .style("font-weight","bold")
                    .style("color","#8b8b8b")
                .on("mouseover",function(){
                    Yeardiv.style("border","1px solid #8f8f8f")
                    Yeardiv.style("color","black")
                })
                .on("mouseout",function(){
                    if(year == 0){
                        Yeardiv.style("border","1px solid #d3d3d3")
                        Yeardiv.style("color","#8e8e8e")
                    }
                })
                .on("click",function(){
                                                            year = 1,month = 0,day = 0
                                                            timechosen = 0
                                                            if(month == 0){
                                                                 Monthdiv.style("border","1px solid #d3d3d3")
                                                                 Monthdiv.style("color","#8e8e8e")
                                                            }
                                                            if(day == 0){
                                                                 Daydiv.style("border","1px solid #d3d3d3")
                                                                 Daydiv.style("color","#8e8e8e")
                                                            }
                                                            if(timechosen == 0){
                                                                 Timediv.style("border","1px solid #d3d3d3")
                                                                 Timediv.style("color","#8e8e8e")
                                                            }
                                                            Yeardiv.style("border","1px solid #8f8f8f")
                                                            Yeardiv.style("color","black")
                                                            year_board();
                                             })
                              year_board();
                              Yeardiv.style("border","1px solid #8f8f8f")
                              Yeardiv.style("color","black")
            Monthdiv = innercircleup.append("div")//月份
                .attr("id","Monthdiv")
                .style("position","absolute")
                .style("top","1px")
            .style("left","50px")
            .style("width","45px")
            .style("height","20px")
            .style("background-color","#e8e8e8")
            .style("text-align","center")
            .style("border","1px solid #d3d3d3")
                .style("border-radius","2px")
                .text("Month")
                .style("font-size","15px")
                .style("font-weight","bold")
                .style("color","#8b8b8b")
                .on("mouseover",function(){
                    Monthdiv.style("border","1px solid #8f8f8f")
                    Monthdiv.style("color","black")
                })
                .on("mouseout",function(){ 
                    if(month == 0){
                       Monthdiv.style("border","1px solid #d3d3d3")
                       Monthdiv.style("color","#8e8e8e")
                    }
                })
                .on("click",function(){
                                                            year = 0
                                                            month = 1
                                                            day = 0
                                                            timechosen = 0
                                                            if(year == 0){
                                                                 Yeardiv.style("border","1px solid #d3d3d3")
                                                                 Yeardiv.style("color","#8e8e8e")
                                                            }
                                                            if(day == 0){
                                                                 Daydiv.style("border","1px solid #d3d3d3")
                                                                 Daydiv.style("color","#8e8e8e")
                                                            }
                                                            if(timechosen == 0){
                                                                 Timediv.style("border","1px solid #d3d3d3")
                                                                 Timediv.style("color","#8e8e8e")
                                                            }
                                                            Monthdiv.style("border","1px solid #8f8f8f")
                                                            Monthdiv.style("color","black")
                                                            month_board();
                                             })
            Daydiv = innercircleup.append("div")//日期
                .attr("id","Daydiv")
                .style("position","absolute")
                .style("top","1px")
            .style("left","100px")
            .style("width","45px")
            .style("height","20px")
            .style("background-color","#e8e8e8")
            .style("text-align","center")
            .style("border","1px solid #d3d3d3")
                .style("border-radius","2px")
                .text("Day")
                                             .style("font-size","15px")
                                             .style("font-weight","bold")
                                             .style("color","#8b8b8b")
                .on("mouseover",function(){
                                                            Daydiv.style("border","1px solid #8f8f8f")
                                                            Daydiv.style("color","black")
                    //Daydiv.style("background-color","steelblue")
                })
                .on("mouseout",function(){
                                                            if(day == 0){
                                                                 Daydiv.style("border","1px solid #d3d3d3")
                                                                 Daydiv.style("color","#8e8e8e")
                                                            }
                    //Daydiv.style("background-color","#e8e8e8")
                })
                .on("click",function(){
                                                            year = 0
                                                            month = 0
                                                            day = 1
                                                            timechosen = 0
                                                            if(year == 0){
                                                                 Yeardiv.style("border","1px solid #d3d3d3")
                                                                 Yeardiv.style("color","#8e8e8e")
                                                            }
                                                            if(month == 0){
                                                                 Monthdiv.style("border","1px solid #d3d3d3")
                                                                 Monthdiv.style("color","#8e8e8e")
                                                            }
                                                            if(timechosen == 0){
                                                                 Timediv.style("border","1px solid #d3d3d3")
                                                                 Timediv.style("color","#8e8e8e")
                                                            }
                                                            Daydiv.style("border","1px solid #8f8f8f")
                                                            Daydiv.style("color","black")
                                                            day_board();
                                             })
            var Timediv = innercircleup.append("div")//时间段
                .attr("id","Begindiv")
                .style("position","absolute")
                .style("top","1px")
            .style("left","150px")
            .style("width","45px")
            .style("height","20px")
            .style("background-color","#e8e8e8")
            .style("text-align","center")
            .style("border","1px solid #d3d3d3")
                .style("border-radius","2px")
                .text("Time")
                                             .style("font-size","15px")
                                             .style("font-weight","bold")
                                             .style("color","#8b8b8b")
                .on("mouseover",function(){
                                                            Timediv.style("border","1px solid #8f8f8f")
                                                            Timediv.style("color","black")
                    //Timediv.style("background-color","steelblue")
                })
                .on("mouseout",function(){
                                                            if(timechosen == 0){
                                                                 Timediv.style("border","1px solid #d3d3d3")
                                                                 Timediv.style("color","#8e8e8e")
                                                            }
                    //Timediv.style("background-color","#e8e8e8")
                })
                .on("click",function(){
                                                            year = 0
                                                            month = 0
                                                            day = 0
                                                            timechosen = 1
                                                            if(year == 0){
                                                                 Yeardiv.style("border","1px solid #d3d3d3")
                                                                 Yeardiv.style("color","#8e8e8e")
                                                            }
                                                            if(month == 0){
                                                                 Monthdiv.style("border","1px solid #d3d3d3")
                                                                 Monthdiv.style("color","#8e8e8e")
                                                            }
                                                            if(day == 0){
                                                                 Daydiv.style("border","1px solid #d3d3d3")
                                                                 Daydiv.style("color","#8e8e8e")
                                                            }
                                                            Timediv.style("border","1px solid #8f8f8f")
                                                            Timediv.style("color","black")
                                                            time_board();
                                             })
            var Donediv = innercircleup.append("div")//确定
                .attr("id","Enddiv")
                .style("position","absolute")
                .style("top","1px")
            .style("left","200px")
            .style("width","43px")
            .style("height","20px")
            .style("background-color","#e8e8e8")
            .style("text-align","center")
            .style("border","1px solid #d3d3d3")
                .style("border-radius","2px")
                .text("Done")
                .attr("nodeid",id)
                .style("font-size","15px")
                .style("font-weight","bold")
                .style("color","#8b8b8b")
                .on("mouseover",function(){
                    Donediv.style("border","1px solid #8f8f8f")
                    Donediv.style("color","black")
                })
                .on("mouseout",function(){
                    Donediv.style("border","1px solid #d3d3d3")
                    Donediv.style("color","#8e8e8e")
                })
                .on("click",function(){
                   done_exe(d3.select(this).attr("nodeid"));
                })

                })
     whenoption.append("div")
            .attr("class","select_tip_ok")
            .text("OK")
            .attr("onclick","confirm_time("+id+")")
    }

//////////////////////////////////////////
if(type=="lianxu"){
    whenoption.append("input")
        .attr("id", id + "starttime")
        .attr("type", "text")
        .attr("name", "datetime")
        .attr("class", "ui_timepicker")
        .attr("value", "")
        .style("margin", "0")
        .style("color","#979797")
        .style("font-weight","light")
        .style("font-size","13px")
        .style("height","18px")
        .style("padding","0px")
        .style("height","30px")
        .style("width","77px")
        .style("border","1px solid #d3d3d3")
        .style("border-radius","2px")
        .style("position","absolute")
        .style("top","10px")
        .style("left","49px")
        .style("line-height","25px")

    whenoption.append("input")
        .attr("id", id + "endtime")
        .attr("type", "text")
        .attr("name", "datetime")
        .attr("class", "ui_timepicker")
        .attr("value", "")
        .style("margin", "0")
        .style("color","#979797")
        .style("font-weight","light")
        .style("font-size","13px")
        .style("height","18px")
        .style("padding","0px")
        .style("height","30px")
        .style("width","77px")
        .style("border","1px solid #d3d3d3")
        .style("border-radius","2px")
        .style("position","absolute")
        .style("top","10px")
        .style("left","145px")
        .style("line-height","25px")

    whenoption.append("div")
        .text("~")
        .style("display","inline-block")
        .style("position","absolute")
        .style("left","132px")
        .style("top","20px")
        .style("cursor","default")
    ;
    d3.select("#" + id + "starttime")[0][0].value="2014-1-01 00:00";
    d3.select("#" + id + "endtime")[0][0].value="2014-1-01 00:00";
    //ok tip
    whenoption.append("div")
        .attr("class","select_tip_ok")
        .text("OK")
        .attr("onclick","confirm_time("+id+")")
    $(function () {
        $(".ui_timepicker").datetimepicker({
            //showOn: "button",
            //buttonImage: "./css/images/icon_calendar.gif",
            //buttonImageOnly: true,
            //showSecond: true,
            dateFormat: "yy-m-dd",
            timeFormat: 'hh:mm',

            stepHour: 1,
            stepMinute: 1
        })
    })
}


}

function show_whatselection(id){
    var whatoption=d3.select("#selectdiv" + id)
        .append("div")
        .style("z-index","100")
        .attr("class","attrselection")

    //ok tip
    var whatitem="direction";
    whatoption.append("div").attr("class","select_tip_ok")
        .style("z-index","200") .text("OK")
        .on("mouseup",function(){
            var item;
            if(whatitem=="speed"){
                item=["speed",
                    d3.select("#" + id + "start")[0][0].value+"~"+ d3.select("#" + id + "end")[0][0].value];
            }
            if(whatitem=="value"){
                item=["value",
                    d3.select("#" + id + "start")[0][0].value+"~"+ d3.select("#" + id + "end")[0][0].value];
            }
            if(whatitem=="size"){
                item=["size",
                    d3.select("#" + id + "start")[0][0].value+"~"+ d3.select("#" + id + "end")[0][0].value];
            }
            if(whatitem=="keyword"){
                item=["key word",
                    d3.select("#" + id + "start")[0][0].value];
            }
            var tempnode=nodelist.getlistiditem(id);
            tempnode.pushwhatlistitem(item);
            nodelist.changelistiditem(id,tempnode)
            log("Select what into " + d3.select("#nodename"+id)[0][0].outerText)
            show_conditionlist(id);

        })
       
    //����whatѡ����
    if(nodelist.getlistiditem(id).type=="car"){

        var whatselect_div=whatoption.append("div")
            .attr("class","whatselect_div")
            .style("width","84px")
            .style("left",0)

            //speed
        whatselect_div.append("div").style("position","relative")
            .attr("class","whatselection")
            .append("img").attr("id",id+"speed")
           .attr("src", "image/card_b_what_speed_active.svg")
            .attr("height", "28px")
            .attr("width", "28px")
            .on("mouseup",function(){
                whatoption.selectAll(".whatselection_attr").remove();
                whatitem="speed";

                whatoption.append("input")
                    .attr("class","whatselection_attr")
                    .attr("id", id + "start")
                    .attr("type", "text")
                    .attr("value", "0")
                    .style("margin", "0")
                    .style("color","#979797")
                    .style("font-weight","light")
                    .style("font-size","13px")
                    .style("height","18px")
                    .style("padding","0px")
                    .style("height","28px")
                    .style("width","45px")
                    .style("border","1px solid #d3d3d3")
                    .style("border-radius","2px")
                    .style("position","absolute")
                    .style("top","10px")
                    .style("left","100px")
                whatoption.append("div")
                    .text("~").attr("class","whatselection_attr")
                    .style("display","inline-block")
                    .style("position","absolute")
                    .style("left","153px")
                    .style("top","20px")
                    .style("cursor","default")
                ;
                whatoption.append("input") .attr("class","whatselection_attr")
                    .attr("id", id + "end")
                    .attr("type", "text")
                    .attr("value", "100")
                    .style("margin", "0")
                    .style("color","#979797")
                    .style("font-weight","light")
                    .style("font-size","13px")
                    .style("height","18px")
                    .style("padding","0px")
                    .style("height","28px")
                    .style("width","45px")
                    .style("border","1px solid #d3d3d3")
                    .style("border-radius","2px")
                    .style("position","absolute")
                    .style("top","10px")
                    .style("left","165px")

                d3.select(this).attr("src", "image/card_b_what_speed_active.svg")
                d3.select("#"+d3.select(this).attr("id").split("speed")[0]+"occupied").attr("src", "image/card_b_what_isPassager.svg")
                d3.select("#"+d3.select(this).attr("id").split("speed")[0]+"direction").attr("src", "image/card_b_what_direction.svg")
            })
            .on("mouseover",function(){
                whatoption.selectAll(".hover").remove();
                whatoption.append("div").attr("class","hover").text("speed").style("left","10px").style("top","40px").style("color","#fff")
            })
            .on("mouseout",function() {
                whatoption.selectAll(".hover").remove();
            })


        //occupied
        whatselect_div.append("div").style("position","relative")
            .attr("class","whatselection")
            .append("img").attr("id",id+"occupied")
            .attr("src", "image/card_b_what_isPassager.svg")
            .attr("height", "28px")
            .attr("width", "28px")
            .on("mouseup",function(){
                    d3.select(this).attr("src", "image/card_b_what_isPassager_active.svg")
                    d3.select("#"+d3.select(this).attr("id").split("occupied")[0]+"speed").attr("src", "image/card_b_what_speed.svg")
                d3.select("#"+d3.select(this).attr("id").split("occupied")[0]+"direction").attr("src", "image/card_b_what_direction.svg")
            })
            .on("mouseover",function(){
                whatoption.selectAll(".hover").remove();
                whatoption.append("div").attr("class","hover").text("Occupied").style("top","40px").style("left","30px").style("color","#fff")
            })
            .on("mouseout",function() {
                whatoption.selectAll(".hover").remove();
            })


        //direction
        whatselect_div.append("div").style("position","relative")
            .attr("class","whatselection")
            .append("img").attr("id",id+"direction")
            .attr("src", "image/card_b_what_direction.svg")
            .attr("height", "28px")
            .attr("width", "28px")
            .on("mouseup",function(){
                     d3.select(this).attr("src", "image/card_b_what_direction_active.svg")
                     d3.select("#"+d3.select(this).attr("id").split("directiondirection")[0]+"speed").attr("src", "image/card_b_what_speed.svg")
                    d3.select("#"+d3.select(this).attr("id").split("direction")[0]+"occupied").attr("src", "image/card_b_what_isPassager.svg")
            })
            .on("mouseover",function(){
                whatoption.selectAll(".hover").remove();
                whatoption.append("div").attr("class","hover").text("direction").style("top","40px").style("left","50px").style("color","#fff")
            })
            .on("mouseout",function() {
                whatoption.selectAll(".hover").remove();
            })
        

            whatoption.selectAll(".whatselection_attr").remove();
                whatitem="speed";

                whatoption.append("input")
                    .attr("class","whatselection_attr")
                    .attr("id", id + "start")
                    .attr("type", "text")
                    .attr("value", "0")
                    .style("margin", "0")
                    .style("color","#979797")
                    .style("font-weight","light")
                    .style("font-size","13px")
                    .style("height","18px")
                    .style("padding","0px")
                    .style("height","28px")
                    .style("width","45px")
                    .style("border","1px solid #d3d3d3")
                    .style("border-radius","2px")
                    .style("position","absolute")
                    .style("top","10px")
                    .style("left","100px")
                whatoption.append("div")
                    .text("~").attr("class","whatselection_attr")
                    .style("display","inline-block")
                    .style("position","absolute")
                    .style("left","153px")
                    .style("top","20px")
                    .style("cursor","default")
                ;
                whatoption.append("input") .attr("class","whatselection_attr")
                    .attr("id", id + "end")
                    .attr("type", "text")
                    .attr("value", "100")
                    .style("margin", "0")
                    .style("color","#979797")
                    .style("font-weight","light")
                    .style("font-size","13px")
                    .style("height","18px")
                    .style("padding","0px")
                    .style("height","28px")
                    .style("width","45px")
                    .style("border","1px solid #d3d3d3")
                    .style("border-radius","2px")
                    .style("position","absolute")
                    .style("top","10px")
                    .style("left","165px")
    }

    if(nodelist.getlistiditem(id).type=="blog"){
            var whatselect_div=whatoption.append("div")
            .attr("class","whatselect_div")
            .style("width","85px").style("top","16px").style("background-color","rgb(249,250,251)").style("border",0)
            .style("left",0).text("Key word :")

        whatitem="keyword";
        whatoption.append("input")
            .attr("class","whatselection_attr")
            .attr("id", id + "start")
            .attr("type", "text")
            .attr("value", "")
            .style("margin", "0")
            .style("color","#979797")
            .style("font-weight","light")
            .style("font-size","13px")
            .style("padding","0px")
            .style("height","28px")
            .style("width","112px")
            .style("border","1px solid #d3d3d3")
            .style("border-radius","2px")
            .style("position","absolute")
            .style("top","10px")
            .style("left","94px")



    }
    if(nodelist.getlistiditem(id).type=="people"){
    }

    //���۵�whatѡ����
    if(nodelist.getlistiditem(id).type=="estate"){
        var whatselect_div=whatoption.append("div")
            .attr("class","whatselect_div")
            .style("width","56px")
            .style("left",0)

        whatitem="value";
        whatoption.append("input")
            .attr("class","whatselection_attr")
            .attr("id", id + "start")
            .attr("type", "text")
            .attr("value", "10000")
            .style("margin", "0")
            .style("color","#979797")
            .style("font-weight","light")
            .style("font-size","13px")
            .style("padding","0px")
            .style("height","28px")
            .style("width","45px")
            .style("border","1px solid #d3d3d3")
            .style("border-radius","2px")
            .style("position","absolute")
            .style("top","10px")
            .style("left","78px")
        whatoption.append("div")
            .text("~").attr("class","whatselection_attr")
            .style("display","inline-block")
            .style("position","absolute")
            .style("left","129px")
            .style("top","18px")
            .style("cursor","default")
        ;
        whatoption.append("input") .attr("class","whatselection_attr")
            .attr("id", id + "end")
            .attr("type", "text")
            .attr("value", "20000")
            .style("margin", "0")
            .style("color","#979797")
            .style("font-weight","light")
            .style("font-size","13px")
            .style("height","28px")
            .style("padding","0px")
            .style("width","45px")
            .style("border","1px solid #d3d3d3")
            .style("border-radius","2px")
            .style("position","absolute")
            .style("top","10px")
            .style("left","141px")
        whatoption.append("div").text("yuan").style("position","absolute").style("width","45px").style("cursor","default")
            .style("left","192px").style("top","10px").attr("class","whatselection_attr")
            whatoption.append("div").text("/m^2").style("position","absolute").style("width","45px").style("cursor","default")
            .style("left","195px").style("top","26px").attr("class","whatselection_attr")
        //occupied
        whatselect_div.append("div").style("position","relative")
            .attr("class","whatselection")
            .append("img")
            .attr("src", "image/jinbi.svg")
            .attr("height", "16px")
            .attr("width", "16px")
            .style("position","relative")
            .style("left","6px")
            .style("top","6px")
            .on("mouseup",function(){
                whatoption.selectAll(".whatselection_attr").remove();
                whatitem="value";

                whatoption.append("input")
                    .attr("class","whatselection_attr")
                    .attr("id", id + "start")
                    .attr("type", "text")
                    .attr("value", "0")
                    .style("margin", "0")
                    .style("color","#979797")
                    .style("font-weight","light")
                    .style("font-size","13px")
                    .style("height","18px")
                    .style("padding","0px")
                    .style("height","30px")
                    .style("width","45px")
                    .style("border","1px solid #d3d3d3")
                    .style("border-radius","2px")
                    .style("position","absolute")
                    .style("top","10px")
                    .style("left","91px")
                whatoption.append("div")
                    .text("~").attr("class","whatselection_attr")
                    .style("display","inline-block")
                    .style("position","absolute")
                    .style("left","140px")
                    .style("top","20px")
                    .style("cursor","default")
                ;
                whatoption.append("input") .attr("class","whatselection_attr")
                    .attr("id", id + "end")
                    .attr("type", "text")
                    .attr("value", "100")
                    .style("margin", "0")
                    .style("color","#979797")
                    .style("font-weight","light")
                    .style("font-size","13px")
                    .style("height","18px")
                    .style("padding","0px")
                    .style("height","30px")
                    .style("width","45px")
                    .style("border","1px solid #d3d3d3")
                    .style("border-radius","2px")
                    .style("position","absolute")
                    .style("top","10px")
                    .style("left","150px")
                whatoption.append("div").text("yuan/m^2").style("position","absolute")
                    .style("left","200px").style("top","17px").attr("class","whatselection_attr")
            })
            .on("mouseover",function(){
                whatoption.selectAll(".hover").remove();
                whatoption.append("div").attr("class","hover").text("value").style("top","40px").style("left","10px").style("color","#fff")
            })
            .on("mouseout",function() {
                whatoption.selectAll(".hover").remove();
            })
        whatselect_div.append("div").style("position","relative")
            .attr("class","whatselection")
            .append("img")
            .attr("src", "image/card_b_what_isPassager.svg")
            .attr("height", "28px")
            .attr("width", "28px")
            .on("mouseup",function(){
                whatoption.selectAll(".whatselection_attr").remove();
                whatitem="size";

                whatoption.append("input")
                    .attr("class","whatselection_attr")
                    .attr("id", id + "start")
                    .attr("type", "text")
                    .attr("value", "0")
                    .style("margin", "0")
                    .style("color","#979797")
                    .style("font-weight","light")
                    .style("font-size","13px")
                    .style("height","18px")
                    .style("padding","0px")
                    .style("height","30px")
                    .style("width","45px")
                    .style("border","1px solid #d3d3d3")
                    .style("border-radius","2px")
                    .style("position","absolute")
                    .style("top","10px")
                    .style("left","91px")
                whatoption.append("div")
                    .text("~").attr("class","whatselection_attr")
                    .style("display","inline-block")
                    .style("position","absolute")
                    .style("left","140px")
                    .style("top","20px")
                    .style("cursor","default")
                ;
                whatoption.append("input") .attr("class","whatselection_attr")
                    .attr("id", id + "end")
                    .attr("type", "text")
                    .attr("value", "100")
                    .style("margin", "0")
                    .style("color","#979797")
                    .style("font-weight","light")
                    .style("font-size","13px")
                    .style("height","18px")
                    .style("padding","0px")
                    .style("height","30px")
                    .style("width","45px")
                    .style("border","1px solid #d3d3d3")
                    .style("border-radius","2px")
                    .style("position","absolute")
                    .style("top","10px")
                    .style("left","150px")
                whatoption.append("div").text("m^2").style("position","absolute")
                    .style("left","200px").style("top","17px").attr("class","whatselection_attr")
            })
            .on("mouseover",function(){
                whatoption.selectAll(".hover").remove();
                whatoption.append("div").attr("class","hover").text("size").style("top","40px").style("left","10px").style("color","#fff")
            })
            .on("mouseout",function() {
                whatoption.selectAll(".hover").remove();
            })
    }

    if(nodelist.getlistiditem(id).type=="street_view"){
    }
    if(nodelist.getlistiditem(id).type=="point_of_interest"){
    }
    if(nodelist.getlistiditem(id).type=="social_network"){
    }
    if(nodelist.getlistiditem(id).type=="weather") {
    }
}

