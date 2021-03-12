/**
 * Created by Administrator on 2016/2/24.
 */

function new_conditiondiv(type,data,mousex,mousey,activenode,numble){
    d3.select("body").append("div")
        .attr("class","drag_conditiondiv")
        .on("mousemove",function(){
            d3.select("#new_conditiondiv")
                .style("top",d3.event.y-20+"px")
                .style("left",d3.event.x-50+"px")
        })
        .on("mouseup",function(){
            //add_condition_drag
            var node=if_mouseinnode(d3.event.x,d3.event.y);
            if(node!=null){
                //line father son node
                var fathersonexist = false;
                for (var i = 0; i < nodelist.getfather_and_son().length; i++) {
                    if (nodelist.getfather_and_son()[i].father == activenode
                        && nodelist.getfather_and_son()[i].son == node) {
                        fathersonexist = true;
                        break;
                    }
                }
                if (!fathersonexist) {
                    nodelist.pushfather_and_son({
                        father: activenode,
                        son: node
                      })
                    linepaint();
                }

                //��������
                if(type=="positionpoint"){
                    data_wherepoint_placein(data,node)
                    show_conditionlist("node"+node);
                    d3.select(".drag_conditiondiv").remove();
                }
                if(type=="positionlist"){
                    data_wherelist_placein(data,node,numble)
                    show_conditionlist("node"+node);
                    d3.select(".drag_conditiondiv").remove();
                }
                if(type=="timepoint"){
                    data_timepoint_placein(data,node)
                    show_conditionlist("node"+node);
                    d3.select(".drag_conditiondiv").remove();
                }
                if(type=="timelist"){
                    data_timelist_placein(data,node,numble)
                    show_conditionlist("node"+node);
                    d3.select(".drag_conditiondiv").remove();
                }
                if(type=="blog"){
                    data_blog_placein(data,node)
                    show_conditionlist("node"+node);
                    d3.select(".drag_conditiondiv").remove();
                }
                if(type=="car"){
                    data_car_placein(data,node)
                    show_conditionlist("node"+node);
                    d3.select(".drag_conditiondiv").remove();
                }
                if(type=="people"){
                    data_people_placein(data,node)
                    show_conditionlist("node"+node);
                    d3.select(".drag_conditiondiv").remove();
                }
                if(type=="bloglist"){
                    data_bloglist_placein(data,node)
                    show_conditionlist("node"+node);
                    d3.select(".drag_conditiondiv").remove();
                }
                if(type=="carlist"){
                    d3.select("#new_conditiondiv").remove();
                   var conditionin_option= d3.select(".drag_conditiondiv").append("div")
                        .attr("class","conditionin_option")
                        .style("left",d3.select("#nodediv"+node).style("left"))
                        .style("top",d3.select("#nodediv"+node).style("top").split("px")[0]*1+120+"px")
                        .style("height","168px").style("background-color","rgb(255,255,255)")
                    conditionin_option.append("div")
                        .style("position","absolute")
                        .style("font-size","14px")
                        .text("Find duplication, Select merge type")
                        .style("left","8px")
                        .style("top","20px")
                        .style("width","262px")
                    conditionin_option.append("div")
                        .attr("class","conditionin_optionattr")
                        .style("left","35px")
                        .style("top","75px")
                        .append("img").style("position","absolute").style("top","0").style("left",0)
                        .attr("src", "image/card_b_bing.svg")
                        .on("mouseup",function(){
                            data_carlist_placein(data,node,"bing")
                            show_conditionlist("node"+node);
                            d3.select(".drag_conditiondiv").remove();
                        })
                        .on("mouseover",function(){
                               conditionin_option.selectAll(".hover").remove();
                                conditionin_option.append("div")
                                .attr("class","hover")
                                .text("Union")
                                .style("top","118px")
                                .style("left","35px")
                                .style("width","40px")
                        }).on("mouseout",function(){conditionin_option.selectAll(".hover").remove()})
                    conditionin_option.append("div")
                        .attr("class","conditionin_optionattr")
                        
                        .style("left","114px")
                        .style("top","75px").append("img").style("position","absolute").style("top","0").style("left",0)
                        .attr("src", "image/card_b_jiao.svg")
                        .on("mouseup",function(){
                            data_carlist_placein(data,node,"jiao")
                            show_conditionlist("node"+node);
                            d3.select(".drag_conditiondiv").remove();
                        }).on("mouseover",function(){
                               conditionin_option.selectAll(".hover").remove();
                                conditionin_option.append("div")
                                .attr("class","hover")
                                .text("Intersection")
                                .style("top","118px")
                                .style("left","114px")
                                .style("width","86px")
                        })
                        .on("mouseout",function(){conditionin_option.selectAll(".hover").remove()})
                    conditionin_option.append("div")
                        .attr("class","conditionin_optionattr")
                        
                        .style("left","190px")
                        .style("top","75px").append("img").style("position","absolute").style("top","0").style("left",0)
                        .attr("src", "image/card_b_fei.svg")
                        .on("mouseup",function(){
                            data_carlist_placein(data,node,"jiao")
                            show_conditionlist("node"+node);
                            d3.select(".drag_conditiondiv").remove();
                        }).on("mouseover",function(){
                               conditionin_option.selectAll(".hover").remove();
                                conditionin_option.append("div")
                                .attr("class","hover")
                                .text("Complement")
                                .style("top","119px")
                                .style("left","189px")
                                .style("width","99px")
                        }).on("mouseout",function(){conditionin_option.selectAll(".hover").remove()})
                }
                if(type=="speed"){
                    data_speed_in(data,node)
                    show_conditionlist("node"+node);
                    d3.select(".drag_conditiondiv").remove();
                }

            }else{
                condition_node_newnode([d3.event.x, d3.event.y ]);

                nodelist.pushfather_and_son({
                    father: activenode,
                    son: nodelist.getlist().length - 1
                })
                linepaint();

                //��������
                if(type=="positionpoint")
                    data_wherepoint_placein(data, nodelist.getlistlength() - 1,true);
                if(type=="positionlist")
                    data_wherelist_placein(data,nodelist.getlistlength() - 1,numble)
                if(type=="timepoint")
                    data_timepoint_placein(data,nodelist.getlistlength() - 1,true)
                if(type=="timelist")
                    data_timelist_placein(data,nodelist.getlistlength() - 1,numble)
                if(type=="blog")
                    data_blog_placein(data,nodelist.getlistlength() - 1)
                if(type=="car")
                    data_car_placein(data,nodelist.getlistlength() - 1)
                if(type=="people")
                    data_people_placein(data,nodelist.getlistlength() - 1)
                if(type=="peoplelist")
                    data_peoplelist_placein(data,nodelist.getlistlength() - 1,"bing")
                if(type=="bloglist")
                    data_bloglist_placein(data,nodelist.getlistlength() - 1)
                if(type=="carlist")
                    data_carlist_placein(data,nodelist.getlistlength() - 1,"bing")
                if(type=="speed")
                    data_speed_in(data,nodelist.getlistlength() - 1)
                show_conditionlist("node"+(nodelist.getlistlength() - 1));
                d3.select(".drag_conditiondiv").remove();
            }

        })

    var thisnewdiv=d3.select(".drag_conditiondiv").append("div")
        .attr("id","new_conditiondiv")
        .attr("class","drag_condition")
        .style("top",mousey-20+"px")
        .style("left",mousex-50+"px")

    if(type == "speed"){
        thisnewdiv.text(type)
        thisnewdiv.append("img")
        .style("position","absolute")
        .style("left","10px")
        .style("top","8px")
        .attr("height","20px")
        .attr("width","20px").attr("src","image/speed2.png")
    }
    if(type == "car"){
        thisnewdiv.text(type+" "+data.ID)
        thisnewdiv.append("img")
        .style("position","absolute")
        .style("left","10px")
        .style("top","3px")
        .attr("height","30px")
        .attr("width","30px").attr("src","image/map_objlist_car_normal.svg")
    }
    if(type == "blog"){
        thisnewdiv.text(type+" "+data.userid)
        thisnewdiv.append("img")
        .style("position","absolute")
        .style("left","10px")
        .style("top","3px")
        .attr("height","30px")
        .attr("width","30px").attr("src","image/map_objlist_car_normal.svg")
    }
    if(type == "carlist"){
        thisnewdiv.text(type)
        thisnewdiv.append("img")
        .style("position","absolute")
        .style("left","10px")
        .style("top","3px")
        .attr("height","30px")
        .attr("width","30px").attr("src","image/map_objlist_car_normal.svg")
    }
    if(type == "people"){
        console.log(data)
        thisnewdiv.text("person"+" "+data).style("font-size","12px")
        thisnewdiv.append("img")
        .style("position","absolute")
        .style("left","10px")
        .style("top","3px")
        .attr("height","30px")
        .attr("width","30px").attr("src","image/map_objlist_car_normal.svg").attr("src","image/map_objlist_people_normal.svg")
    }
    if(type == "peoplelist"){
        thisnewdiv.text(type)
        thisnewdiv.append("img")
        .style("position","absolute")
        .style("left","10px")
        .style("top","3px")
        .attr("height","30px")
        .attr("width","30px").attr("src","image/map_objlist_people_normal.svg")
    }
    if(type == "timepoint"){
        var time = gettimestring(data.time,2)
        thisnewdiv.text(data.date+" "+time[0])
        thisnewdiv.append("img")
        .style("position","absolute")
        .style("left","10px")
        .style("top","15px")
        .attr("height","30px")
        .attr("width","30px").attr("src","image/map_objlist_car_normal.svg").attr("src","image/card_s_when.svg")
    }
    if(type == "positionpoint"){
        thisnewdiv.text("position")
        thisnewdiv.append("img")
        .style("position","absolute")
        .style("left","10px")
        .style("top","3px")
        .attr("height","30px")
        .attr("width","30px").attr("src","image/map_objlist_car_normal.svg").attr("src","image/card_s_where.svg")
    }

}

function data_wherepoint_placein(data,node,isnewnode_fromexit){
    var whereinterval = [
        data.lat-0.002,
        data.lon-0.002,
        data.lat-0.002+0.004,
        data.lon-0.002+0.004,
        "region"
    ]
    var tempnode=nodelist.getlistiditem("node" + node);
    if(typeof isnewnode_fromexit!=='undefined'){
        tempnode.fromexist_id=data.id;
        tempnode.fromexist_source=data.source;
    }
    tempnode.pushwherelistitem(whereinterval);
    nodelist.changelistiditem("node" + node,tempnode)
    log("Extract position into "+d3.select("#nodenamenode"+node)[0][0].outerText)
}
function data_wherelist_placein(data,node,numble){
    var step=parseInt(data.texiInfo.length/numble)
    var whereinterval = [
        data.texiInfo[0].latitude-0.008,
        data.texiInfo[0].longitude-0.008,
        data.texiInfo[0].latitude-0.008+0.016,
        data.texiInfo[0].longitude-0.008+0.016,
        numble]
        for(var i=1;i<numble;i++){
            whereinterval.push(data.texiInfo[i*step].latitude-0.008)
            whereinterval.push(data.texiInfo[i*step].longitude-0.008)
            whereinterval.push(data.texiInfo[i*step].latitude-0.008+0.016)
            whereinterval.push(data.texiInfo[i*step].longitude-0.008+0.016)
        }

    var tempnode=nodelist.getlistiditem("node" + node);
    tempnode.pushwherelistitem(whereinterval);
    nodelist.changelistiditem("node" + node,tempnode)
    log("Extract positions into node"+node)
}

function data_timepoint_placein(data,node,isnewnode_fromexit){
    var time = gettimestring(data.time,2)
    var timeinterval = [data.date +" "+time[0],
        data.date +" "+time[1]]

    var tempnode=nodelist.getlistiditem("node" + node);
    if(typeof isnewnode_fromexit!=='undefined'){
        tempnode.fromexist_id=data.id;
        tempnode.fromexist_source=data.source;
    } 
    tempnode.pushtimelistitem(timeinterval);
    nodelist.changelistiditem("node" + node,tempnode)
    log("Extract timearea into node"+node)
}

function data_timelist_placein(data,node,numble){

    var step=parseInt(data.texiInfo.length/numble)

    var time =gettimestring(data.texiInfo[0].time,2)
    var timeinterval = [data.texiInfo[0].date +time[0],
        data.texiInfo[0].date +time[1],numble]

    for(var i=1;i<numble;i++){
        var time2 =gettimestring(data.texiInfo[step*i].time,2)
        timeinterval.push(data.texiInfo[0].date +time2[0])
        timeinterval.push(data.texiInfo[0].date +time2[1])
    }
    var tempnode=nodelist.getlistiditem("node" + node);
    tempnode.pushtimelistitem(timeinterval);
    nodelist.changelistiditem("node" + node,tempnode)
    log("Extract timeareas into "+d3.select("#nodenamenode"+node)[0][0].outerText)
}
function data_speed_in(data,node){
    var whatitem=["speed",data[0]+"~"+data[1]];
    var tempnode=nodelist.getlistiditem("node" + node);
    tempnode.pushwhatlistitem(whatitem);
    nodelist.changelistiditem("node" + node,tempnode)
    log("Extract speed into "+d3.select("#nodenamenode"+node)[0][0].outerText)
}
function gettimestring(time,time_jiange){
    var time_h,time_m_1,time_m_2;
    time_h=time.substring(0,3)
    time_m_1=parseInt(time.substring(3,5));
    time_m_2=parseInt(time.substring(3,5));

    time_m_1=time_m_1-time_jiange;
    time_m_2=time_m_2+time_jiange;
    if(time_m_1<0)
        time_m_1=0;
    if(time_m_2>60)
        time_m_2=60;

    if(time_m_1<10)
        time_m_1="0"+time_m_1

    if(time_m_2<10)
        time_m_2="0"+time_m_2
    return [time_h+time_m_1,time_h+time_m_2]
}


function data_blog_placein(data,node,){
        tempnode = nodelist.getlistiditem("node" + node);
        tempnode.pushwhichlistitem(data.name);
        nodelist.changelistiditem("node" + node,tempnode)
    log("Extract position into "+d3.select("#nodenamenode"+node)[0][0].outerText)
}
function data_bloglist_placein(data,node){
    tempnode = nodelist.getlistiditem("node" + node);
    for(var i=0;i<data.length;i++){
        tempnode.pushwhichlistitem(data[i].name);
    }
    nodelist.changelistiditem("node" + node,tempnode)
    log("Extract blogs into "+d3.select("#nodenamenode"+node)[0][0].outerText)
}

function data_carlist_placein(data,node,type){
    tempnode = nodelist.getlistiditem("node" + node);
    if(type=="bing") {
        for (var i = 0; i < data.length; i++) {
            tempnode.pushwhichlistitem(data[i].ID);
        }
        console.log(tempnode.getwhichlist().length)
    }
    if(type=="jiao") {
        var newtempnode=[];
        for (var i = 0; i < data.length; i++) {
            l:for (var m = 0; m < tempnode.getwhichlist().length; m++) {
              if(data[i].ID==tempnode.getwhichlist()[m]){
                  newtempnode.push(data[i].ID);
                  break l;
              }
            }
        }
        console.log(tempnode.getwhichlist().length)
        console.log(newtempnode.length)
        tempnode.changewhichlist(newtempnode);
    }
    if(type=="fei") {
        for (var i = 0; i < data.length; i++) {
            tempnode.pushwhichlistitem(data[i].ID);
        }
    }
    nodelist.changelistiditem("node" + node,tempnode)
    log("Extract cars into "+d3.select("#nodenamenode"+node)[0][0].outerText)
}

function data_peoplelist_placein(data,node){
    tempnode = nodelist.getlistiditem("node" + node);
        for (var i = 0; i < data.length; i++) {
            tempnode.pushwhichlistitem(data[i].ID);
        }
        console.log(tempnode.getwhichlist().length)
    nodelist.changelistiditem("node" + node,tempnode)
    log("Extract persons into "+d3.select("#nodenamenode"+node)[0][0].outerText)
}

function data_car_placein(data,node){
    tempnode = nodelist.getlistiditem("node" + node);
    tempnode.pushwhichlistitem(data.ID);
    nodelist.changelistiditem("node" + node,tempnode)
    log("Extract region into "+d3.select("#nodenamenode"+node)[0][0].outerText)
}

function data_people_placein(data,node){
    tempnode = nodelist.getlistiditem("node" + node);
    tempnode.pushwhichlistitem(data);
    nodelist.changelistiditem("node" + node,tempnode)
    log("Extract person into "+d3.select("#nodenamenode"+node)[0][0].outerText)
}



function if_mouseinnode(mousex,mousey){
    var mouseinnode = null;
    for (var i = 0; i < nodelist.getlist().length; i++) {
        if (nodelist.getlistindexof(i).islive){
        // if node is not showing its detail
            if (nodelist.getlistindexof(i).showdetail == false) {
                // if mouse is in node

                if (mousex < d3.select("#nodediv" + i).attr("x") - 1 + 81
                    && mousex > d3.select("#nodediv" + i).attr("x")
                    && mousey < d3.select("#nodediv" + i).attr("y") - 1 + 76
                    && mousey > d3.select("#nodediv" + i).attr("y")) {
                    //if mouseinnode is null
                    if (mouseinnode == null) {
                        mouseinnode = i;
                    } else {
                        if (d3.select("#nodediv" + mouseinnode).style("z-index")
                            < d3.select("#nodediv" + i).style("z-index"))
                            mouseinnode = i;
                    }
                }
            }
            // if node show its detail
            else {
                if (mousex - 0 < d3.select("#nodediv" + i).attr("x") - 1 + 281
                    && mousex - 0 > d3.select("#nodediv" + i).attr("x")
                    && mousey - 0 < d3.select("#nodediv" + i).attr("y") - 1 + 413
                    && mousey - 0 > d3.select("#nodediv" + i).attr("y")) {
                    //if mouseinnode is null
                    if (mouseinnode == null) {
                        mouseinnode = i;
                    } else {
                        if (d3.select("#nodediv" + mouseinnode).style("z-index")
                            < d3.select("#nodediv" + i).style("z-index"))
                            mouseinnode = i;
                    }
                }
            }
        }
    }
    return mouseinnode;
}


