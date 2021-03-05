
/**
 * Created by Administrator on 2015/11/16.
 */


function condition_node_newnode(mouse,node) {

    /**************************
     *  add node to nodelist
     **************************/
    var newnode=Node.createNew();
    if(typeof node !== 'undefined'){
        console.log(node)
        newnode.setid("node"+nodelist.getlistlength())
        newnode.setnodetype("condition")
        newnode.settype(node.gettype())
        newnode.changecondition(node.getcondition())
        newnode.fromRecommend=true;
        nodelist.pushitem(newnode);
    }else{
        newnode.setid("node"+nodelist.getlistlength())
        newnode.setnodetype("condition")
        newnode.settype("car")
        nodelist.pushitem(newnode);
    }

    /***********************
     *      nodediv
     ***********************/
    var nodediv = d3.select("#nodelist")
        .append("div")
        .attr("count",nodelist.getlistlength()-1)
        .style("z-index",nodelist.getlistlength())
        .attr("class", "condition_nodediv")
        .attr("id", "nodediv" + (nodelist.getlistlength()-1))
        .on("mousedown", function () {
            //z-index up
            for(var i = 0;i < nodelist.getlistlength() ; i++){
                if(nodelist.list[i].islive) {
                    if (d3.select("#nodediv" + i).style("z-index") >
                        d3.select(this).style("z-index")) {
                        d3.select("#nodediv" + i).style("z-index",
                            d3.select("#nodediv" + i).style("z-index") - 1);
                    }
                }
            }
            d3.select(this).style("z-index",nodelist.getlistlength());
            activenode=d3.select(this).attr("count")
        })
    activenode=nodediv.attr("count")
    //nodediv position : is mouse x_y used?
    if(mouse!=null){
        nodediv
            .style("top",mouse[1]+"px")
            .style("left",mouse[0]+"px")
            .attr("x", mouse[0])
            .attr("y", mouse[1])
    }

    /***********************
     *      nodediv
     ***********************/
    var node = nodediv.append("div")
        .attr("count",nodelist.getlistlength()-1)
        .attr("id", "node" + (nodelist.getlistlength()-1))
        .attr("class", "condition_node")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("operation",false)
        .on("mousedown",function(){
            //  confirm  node  name
            if(document.getElementById(node.attr("id")+"nameinput")!=null){
                if (document.getElementById(node.attr("id")+"nameinput").value != "")
                {
                    if (d3.select("#" + node.attr("id")+ "nameinput")[0][0].value.length<=20){
                        d3.select("#nodename"+node.attr("id"))
                            .text(d3.select("#" + node.attr("id")+ "nameinput")[0][0].value)
                            .style("font-size",16+"px")
                            .style("top", "12px");
                    }
                    else
                    {
                        d3.select("#nodename"+node.attr("id"))
                            .text(d3.select("#" + node.attr("id")+ "nameinput")[0][0].value)
                            .style("font-size",12+"px")
                            .style("top", "14px");
                    }
                }
                    
                d3.select("#nodename"+node.attr("id")).select("div").remove()
            }
        })

    //background img
    nodediv.append("img").attr("src", "image/bgCard2.svg")
        .style("left", "0")
        .style("width", "285px")
        .style("height", "100%")
        .style("top", "0")
        .attr("draggable", false)

    //nodediv_dragdiv
    var dragdiv = nodediv.append("div")
        .attr("id", "dragdiv" + "node" + (nodelist.getlistlength()-1))
        .attr("class", "condition_dragdiv")
        .append("div")
        .style("height","100%")
        .attr("count", nodelist.getlistlength()-1)
        .on("mousedown", function () {
            nownode=d3.select(this).attr("count")
            nodedrag = {boolean:true,
                mousex:(d3.event.x-d3.select("#nodediv"+dragdiv.attr("count")).style("left").split("px")[0]),
                mousey:d3.event.y-d3.select("#nodediv"+dragdiv.attr("count")).style("top").split("px")[0]};
        })
    dragdiv.append("div")
        .attr("id","nodenamenode" + (nodelist.getlistlength()-1))
        .style("font-weight", "bold")
        .style("font-size", "16px")
        .style("position","absolute")
        .style("color","#000")
        .style("height", "16px")
        .style("width", "100%")
        .style("top", "12px")
        .text("Condition \""+node.attr("count")+"\"")
        .on("dblclick", function () {
            var nodename_input=d3.select(this).append("div")
                .style("top","0px")
            nodename_input.append("input")
                .attr("type","text")
                .attr("id",node.attr("id")+ "nameinput")
                .attr("name",node.attr("id")+ "nameinput")
                .style("color","#4c4c4c")
                .style("font-weight","light")
                .style("font-size","13px")
                .style("height","18px")
                .style("padding","0px")
                .style("height","25px")
                .style("width","120px")
                .style("left","80px")
                .style("border","1px solid #d3d3d3")
                .style("border-radius","2px")
                .style("position","absolute")
                .style("top","-5px")
            d3.select("#" + node.attr("id")+ "nameinput")[0][0].value=d3.select(this).text()
        })

    //backtip and delete tip
    nodediv.append("div")
        .style("position","absolute")
        .style("filter:alpha","(opacity=100)")
        .style("cursor","pointer")
        .style("height","16px")
        .style("width","16px")
        .style("top","12px")
        .style("right","10px")
        .on("mousedown", function () {
            nodelist.getlistiditem(node[0][0].id).showdetail=false;
            hide_condition_nodedetail(node);
            linepaint();
        })

    nodediv.append("div")
        .style("position","absolute")
        .style("filter:alpha","(opacity=100)")
        .style("height","16px")
        .style("width","16px")
        .style("top","12px")
        .style("left","10px")
        .style("cursor","pointer")
        .on("mousedown", function () {
            nodelist.getlistiditem(node.attr("id")).islive=false;
            nodediv.style("display","none")
            //nodelist.deleteitem(node.attr("count"));
            linepaint();
            log("delete")
        })

    //query tip
    nodediv.append("div")
        .attr("class", "condition_query_tip")
        .on("mousedown", function () {
            query(node.attr("count"))
        })
        .text("search")

    // debugger
    show_condition_nodedetail(node);
}

function hide_condition_nodedetail(node) {

    d3.select("#nodediv" + node.attr("count"))
        .style("display","none")


    var hidediv=d3.select("#nodelist").append("div")
        .attr("class","nodehide")
        .attr("count",node.attr("count"))
        .attr("id","node_cricle"+node.attr("count"))
        .style("left",d3.select("#nodediv"+node.attr("count")).style("left"))
        .style("top",d3.select("#nodediv"+node.attr("count")).style("top"))
        .attr("x",d3.select("#nodediv"+node.attr("count")).style("left").split("px")[0])
        .attr("y",d3.select("#nodediv"+node.attr("count")).style("top").split("px")[0])
    //background img
    hidediv.append("img").attr("src", "image/card_s_bg_1.svg")
        .style("left", "0")
        .style("width", "185px")
        .style("height", "90px")
        .style("top", "0")
        .attr("draggable", false)

    //nodediv_dragdiv
    var hideiddiv = hidediv.append("div")
        .attr("class", "hideattrdiv")
        .style("top",0)
        .attr("count",node.attr("count"))
        .on("mousedown", function () {
            nownode=d3.select(this).attr("count")
            nodedrag = {boolean:true,
                mousex:(d3.event.x-d3.select("#node_cricle"+node.attr("count")).style("left").split("px")[0]),
                mousey:d3.event.y-d3.select("#node_cricle"+node.attr("count")).style("top").split("px")[0]};
        })
        .on("dblclick", function () {
            nodelist.getlistiditem(node[0][0].id).showdetail=true;
            show_condition_nodedetail(node);
            linepaint();
        })
    hideiddiv.append("div")
        .attr("id","nodenamenode" + (nodelist.getlistlength()-1))
        .style("height", "16px")
        .style("width", "100%")
        .style("position","absolute")
        .style("top", function(){
            if(d3.select("#nodenamenode" + node.attr("count"))[0][0].textContent.length<=18)
            return "14px"
            else
            return "4px"
        })
        .style("font-weight", "normal")
        .style("font-size", "15px")
        .style("color","#ffffff")
        .attr("count",node.attr("count"))
        .text(d3.select("#nodenamenode" + node.attr("count"))[0][0].textContent)
       

    var hidetip_div = hidediv.append("div")
        .attr("class", "hideattrdiv")
        .style("top","45px")
    var thisnode=nodelist.getlistiditem("node"+node.attr("count"));

    var whichicon = hidetip_div.append("object")
        .attr("data","image/card_s_which_disabled.svg")
        .style("position","relative")
        .style("float","left")
        .attr("height","45px" )
        .attr("width","40px" )

    var whenicon = hidetip_div.append("object")
        .attr("data","image/card_s_when_disabled.svg")
        .style("position","relative")
        .style("float","left")
        .attr("height","45px" )
        .attr("width","40px" )

    var whereicon = hidetip_div.append("object")
        .attr("data","image/card_s_where_disabled.svg")
        .style("position","relative")
        .style("float","left")
        .attr("height","45px" )
        .attr("width","40px" )

    var whaticon =  hidetip_div.append("object")
        .attr("data","image/card_s_what_disabled.svg")
        .style("position","relative")
        .style("float","left")
        .attr("height","45px" )
        .attr("width","40px" );

    
        var when=[],what=[],where=[],which=[];
        for(var i=0;i<thisnode.getcondition().length;i++){
            if(getwhen(thisnode.getcondition()[i])!=null)
                when.push(getwhen(thisnode.getcondition()[i]))
            if(getwhat(thisnode.getcondition()[i])!=null)
            what.push(getwhat(thisnode.getcondition()[i]))
        if(getwhere(thisnode.getcondition()[i])!=null)
            where.push(getwhere(thisnode.getcondition()[i]))
        if(getwhich(thisnode.getcondition()[i])!=null)
            which.push(getwhich(thisnode.getcondition()[i]))
        }
        
        if (where.length!=0){
            whereicon.attr("data","image/card_s_where.svg");
        }if (when.length!=0){
             whenicon.attr("data","image/card_s_when.svg");
        }if (what.length!=0){
            whaticon.attr("data","image/card_s_what.svg")
        }if (which.length!=0){
            whichicon.attr("data","image/card_s_which.svg");
        }

//    if(thisnode.getwherelist().length==0&&thisnode.gettimelist().length==0&&thisnode.getwhatlist().length==0){
//        hidetip_div.append("div")
//            .style("position","relative")
//            .style("float","left")
//            .attr("height","20px" )
//            .attr("width","14px" )
//            .style("left","60px")
//            .style("top","13px")
//            .style("color","#ffffff")
//            .text("ALL")
//    }
    linepaint();
}
function getwhen(condition){
    if(condition.type=="time"){
        return [condition.data]
    }
    if(condition.type=="+"){
        var when=[];
        for(var i=0;i<condition.data.length;i++){
            if(getwhen(condition.data[i])!=null)
                when.push(getwhen(condition.data[i]))
        }
        if(when.length!=0)
            return when
        else{return null}
    }
    return null
}
function getwhere(condition){
    if(condition.type=="where"){
        return [condition.data]
    }
    if(condition.type=="+"){
        var when=[];
        for(var i=0;i<condition.data.length;i++){
            if(getwhere(condition.data[i])!=null)
                when.push(getwhere(condition.data[i]))
        }
        if(when.length!=0)
        return when
        else{return null}
    }
    return null
}
function getwhat(condition){
    if(condition.type=="what"){
        return [condition.data]
    }
    if(condition.type=="+"){
        var when=[];
        for(var i=0;i<condition.data.length;i++){
            if(getwhat(condition.data[i])!=null)
                when.push(getwhat(condition.data[i]))
        }
        if(when.length!=0)
        return when
        else{return null}
    }
    return null
}
function getwhich(condition){
    if(condition.type=="which"){
        return [condition.data]
    }
    if(condition.type=="+"){
        var when=[];
        for(var i=0;i<condition.data.length;i++){
            if(getwhich(condition.data[i])!=null)
                when.push(getwhich(condition.data[i]))
        }
        if(when.length!=0)
        return when
        else{return null}
    }
    return null
}
function paint_conditionnode(node){
    for(var i=0;i<nodelist.getlist().length;i++){
        if(nodelist.getlist()[i].id==node.attr("id")) {
            if (nodelist.getlist()[i].islive){
                if (nodelist.getlist()[i].showdetail) {
                    show_condition_nodedetail(node)
                } else {
                    d3.selectAll("#node_cricle"+node.attr("count")).remove();
                    hide_condition_nodedetail(node)
                }
            }else{
                hide_condition_nodedetail(node)
                d3.selectAll("#node_cricle"+node.attr("count")).remove();
            }
        }
    }
}

function show_condition_nodedetail(node) {

        d3.select("#nodediv" + node.attr("count"))
            .style("display","block")
        d3.selectAll("#node_cricle"+node.attr("count")).remove();
        clean_all(node);

        /*********************************
                 condition list
         ***********************************/
        show_conditionlist(node.attr("id"));
        node.append("div").text("Condition list")
            .style("position","absolute")
            .style("top","132px")
            .style("width","250px")
            .style("height","35px")
            .style("left","0").style("padding-left","10px")
            .style("line-height","35px")
            .style("cursor","default")
            .style("border-bottom","1px solid #eee")
            .style("font-size","13px")
            .style("font-weight","bold")
        /*********************************
                condition node tip
         ***********************************/
        node.append("div").attr("id", "selectdiv" + node.attr("id"))
            .attr("class", "condition_selectdiv")
        //   tctip
        node.append("div")
            .attr("id", "nodetip" + node.attr("id"))
            .attr("class", "condition_nodetip")

        show_nodetip(node, "which");
        /*********************************
                     source selection
         ***********************************/
        showsource_selection(node);

        if(!nodelist.getlistiditem(node.attr("id")).islive){
            d3.select("#nodediv" + node.attr("count"))
                .style("display","none")
        }
}

function showsource_selection(node){
    node.select(".sourcediv").remove();
    var sourcediv =node.append("div")
        .attr("class","sourcediv")
        .style("z-index","100")
        .style("position","absolute")
        .style("bottom","50px")
        .style("width","100%")
        .style("height","47px")

    var sourcetip=sourcediv.append("div")
        .style("position","relative")
        .style("top","0px")
        .style("left","0px")
        .style("width","100%")
        .style("height","47px")
        .style("background-color","#f2f2f2")
        
    

    sourcetip.append("div")
        .attr("class","sourcetip")
        .style("background",function(){
            if(nodelist.getlistiditem(node.attr("id")).gettype()=="car")
                return "url(image/map_objlist_car_normal.svg) no-repeat";
            else
                return "url(image/map_objlist_car_disabled.svg) no-repeat";
        })
        .style("background-size","100% 100%")
        .on("mouseover",function(){
            if(nodelist.getlistiditem(node.attr("id")).gettype()!="car")
                d3.select(this).style("background","url(image/map_objlist_car_active.svg) no-repeat")
                .style("background-size","100% 100%")
                

            sourcetip.selectAll(".hover").remove();
            sourcetip.append("div").attr("class","hover")
                .text("Taxi GPS trajectory data").style("top","46px")
        })
        .on("mouseout",function(){
            if(nodelist.getlistiditem(node.attr("id")).gettype()!="car")
                d3.select(this).style("background","url(image/map_objlist_car_disabled.svg) no-repeat")
                .style("background-size","100% 100%")

            sourcetip.selectAll(".hover").remove();
        })
        .on("mousedown",function(){
            log("select Taxi GPS trajectory data as "+d3.select("#nodename"+node.attr("id"))[0][0].outerText+" source")
            nodelist.getlistiditem(node.attr("id")).settype("car")
            showsource_selection(node);
        })


    sourcetip.append("div")
        .attr("class","sourcetip")
        .style("background",function(){
            if(nodelist.getlistiditem(node.attr("id")).gettype()=="people")
                return "url(image/map_objlist_people_normal.svg) no-repeat";
            else
                return "url(image/map_objlist_people_disabled.svg) no-repeat";
        })
        .style("background-size","100% 100%")
        .on("mouseover",function(){
            if(nodelist.getlistiditem(node.attr("id")).gettype()!="people")
                d3.select(this).style("background","url(image/map_objlist_people_active.svg) no-repeat")
                .style("background-size","100% 100%")

            sourcetip.selectAll(".hover").remove();
            sourcetip.append("div").attr("class","hover").text("Mobile phone location data").style("top","46px").style("left","46.6px")
         })
        .on("mouseout",function(){
            if(nodelist.getlistiditem(node.attr("id")).gettype()!="people")
                d3.select(this).style("background","url(image/map_objlist_people_disabled.svg) no-repeat")
                .style("background-size","100% 100%")

            sourcetip.selectAll(".hover").remove();
        })
        .on("mousedown",function(){
           log("select mobile phone location data as "+d3.select("#nodename"+node.attr("id"))[0][0].outerText+" source")
            nodelist.getlistiditem(node.attr("id")).settype("people")
            showsource_selection(node);
        })

    sourcetip.append("img")
        .attr("src",function(){
//            show_nodetip(node, "which")
            if(nodelist.getlistiditem(node.attr("id")).gettype()=="blog")
                return "image/map_objlist_blog_normal.svg";
            else
                return "image/map_objlist_blog_disabled.svg";
        })
        .attr("class","sourcetip")
        .style("width","46px")
        .on("mouseover",function(){
            if(nodelist.getlistiditem(node.attr("id")).gettype()=="blog")
                d3.select(this).attr("src","image/map_objlist_blog_normal.svg")
            else
                d3.select(this).attr("src","image/map_objlist_blog_active.svg")
            sourcetip.selectAll(".hover").remove();
            sourcetip.append("div").attr("class","hover").text("Microblog data").style("top","46px").style("left","92px")
        })
        .on("mouseout",function(){
            sourcetip.selectAll(".hover").remove();
            if(nodelist.getlistiditem(node.attr("id")).gettype()=="blog")
                d3.select(this).attr("src","image/map_objlist_blog_normal.svg")
            else
                d3.select(this).attr("src","image/map_objlist_blog_disabled.svg")
        })
        .on("mousedown",function(){
            log("select Microblog data as "+d3.select("#nodename"+node.attr("id"))[0][0].outerText+" source")
            nodelist.getlistiditem(node.attr("id")).settype("blog")
            showsource_selection(node);
        })
    sourcetip.append("img")
        .attr("src",function(){
            if(nodelist.getlistiditem(node.attr("id")).gettype()=="estate")
                return "image/map_objlist_estate_normal.svg";
            else
                return "image/map_objlist_estate_disabled.svg";
        })
        .attr("class","sourcetip")
        .style("width","46px")
        .on("mouseover",function(){
            if(nodelist.getlistiditem(node.attr("id")).gettype()=="estate")
                d3.select(this).attr("src","image/map_objlist_estate_normal.svg")
            else
                d3.select(this).attr("src","image/map_objlist_estate_active.svg")
            sourcetip.selectAll(".hover").remove();
            sourcetip.append("div").attr("class","hover").text("Real estate data").style("top","46px").style("left","139px")
        })
        .on("mouseout",function(){
            sourcetip.selectAll(".hover").remove();
            if(nodelist.getlistiditem(node.attr("id")).gettype()=="estate")
                d3.select(this).attr("src","image/map_objlist_estate_normal.svg")
            else
                d3.select(this).attr("src","image/map_objlist_estate_disabled.svg")
        })
        .on("mousedown",function(){
            log("select Real estate data as "+d3.select("#nodename"+node.attr("id"))[0][0].outerText+" source")
            nodelist.getlistiditem(node.attr("id")).settype("estate")
            showsource_selection(node);
        })
    sourcetip.append("img")
        .attr("src",function(){
            if(nodelist.getlistiditem(node.attr("id")).gettype()=="point_of_interest")
                return "image/map_objlist_poi_normal.svg";
            else
                return "image/map_objlist_poi_disabled.svg";
        })
        .attr("class","sourcetip")
        .on("mouseover",function(){
            if(nodelist.getlistiditem(node.attr("id")).gettype()=="point_of_interest")
                d3.select(this).attr("src","image/map_objlist_poi_normal.svg")
            else
                d3.select(this).attr("src","image/map_objlist_poi_active.svg")
            sourcetip.selectAll(".hover").remove();
            sourcetip.append("div").attr("class","hover").text("POIs data").style("top","46px").style("left","185px")
        })
        .on("mouseout",function(){
            sourcetip.selectAll(".hover").remove();
            if(nodelist.getlistiditem(node.attr("id")).gettype()=="point_of_interest")
                d3.select(this).attr("src","image/map_objlist_poi_normal.svg")
            else
                d3.select(this).attr("src","image/map_objlist_poi_disabled.svg")
        })
        .on("mousedown",function(){
            log("select POIs data as "+d3.select("#nodename"+node.attr("id"))[0][0].outerText+" source")
            nodelist.getlistiditem(node.attr("id")).settype("point_of_interest")
            showsource_selection(node);
        })
    sourcetip.append("img")
        .attr("src",function(){
            if(nodelist.getlistiditem(node.attr("id")).gettype()=="social_network")
                return "image/map_objlist_socialnet_normal.svg";
            else
                return "image/map_objlist_socialnet_disabled.svg";
        })
        .attr("class","sourcetip")
        .on("mouseover",function(){
            sourcetip.selectAll(".hover").remove();
            sourcetip.append("div").attr("class","hover").text("Social network data").style("top","46px").style("right","0px")
            if(nodelist.getlistiditem(node.attr("id")).gettype()=="social_network")
                d3.select(this).attr("src","image/map_objlist_socialnet_normal.svg")
            else
                d3.select(this).attr("src","image/map_objlist_socialnet_active.svg")

        })
        .on("mouseout",function(){
            sourcetip.selectAll(".hover").remove();
            if(nodelist.getlistiditem(node.attr("id")).gettype()=="social_network")
                d3.select(this).attr("src","image/map_objlist_socialnet_normal.svg")
            else
                d3.select(this).attr("src","image/map_objlist_socialnet_disabled.svg")
        })
        .on("mousedown",function(){
            log("select Social network data as "+d3.select("#nodename"+node.attr("id"))[0][0].outerText+" source")
            nodelist.getlistiditem(node.attr("id")).settype("social_network")
            showsource_selection(node);
        })
}

function show_nodetip(node, type) {
    var nodetip = node.select("#nodetip" + node.attr("id"))
    nodetip.append("svg")
        .style("position","absolute")
        .style("height","9px")
        .style("top","24px")
        .attr("id","xiaosanjiaonodetip"+node.attr("id"))
        .append("polygon")
        .attr("points","30,10 35,0 40,10")
        .style("fill","#f9fafb")
    //tip div add
    var whichtip=nodetip.append("div")
        .attr("class","conditiontip")
        .on("mousedown", function () {
            //xiaosanjiao
            d3.select("#xiaosanjiaonodetip"+node.attr("id"))
                .selectAll("polygon").remove()
            d3.select("#xiaosanjiaonodetip"+node.attr("id"))
                .append("polygon").attr("points","30,10 35,0 40,10")
                .style("fill","#f9fafb")

            //selection
            clean_for_selectdiv(node);
            show_whichselection(node.attr("id"));
             //tipcss
            node.selectAll(".conditiontip").classed("conditiontip_select",false)
            d3.select(this).classed("conditiontip_select",true)
        })
        .text("which")


    var whentip=nodetip.append("div").attr("class","conditiontip")
        .on("mousedown", function () {
            //xiaosanjiao
            d3.select("#xiaosanjiaonodetip"+node.attr("id"))
                .selectAll("polygon").remove()
            d3.select("#xiaosanjiaonodetip"+node.attr("id"))
                .append("polygon").attr("points","100,10 105,0 110,10")
                .style("fill","#f9fafb")

            //selection
            clean_for_selectdiv(node);
            show_whenselection(node.attr("id"),"lianxu");
            //tipcss
            node.selectAll(".conditiontip").classed("conditiontip_select",false)
            d3.select(this).classed("conditiontip_select",true)
        })
        .text("when")

    var wheretip=nodetip.append("div").attr("class","conditiontip")
        .on("mousedown", function () {
            //xiaosanjiao
            d3.select("#xiaosanjiaonodetip"+node.attr("id"))
                .selectAll("polygon").remove()
            d3.select("#xiaosanjiaonodetip"+node.attr("id"))
                .append("polygon").attr("points","170,10 175,0 180,10")
                .style("fill","#f9fafb")

            //selection
            clean_for_selectdiv(node);
            show_whereselection(node.attr("id"));
            //tipcss
            node.selectAll(".conditiontip").classed("conditiontip_select",false)
            d3.select(this).classed("conditiontip_select",true)
        })
        .text("where")

    var whattip=nodetip.append("div").attr("class","conditiontip")
        .on("mousedown", function () {
            //xiaosanjiao
            d3.select("#xiaosanjiaonodetip"+node.attr("id"))
                .selectAll("polygon").remove()
            d3.select("#xiaosanjiaonodetip"+node.attr("id"))
                .append("polygon").attr("points","240,10 245,0 250,10")
                .style("fill","#f9fafb")

            //selection
            clean_for_selectdiv(node);
            show_whatselection(node.attr("id"));
            //tipcss
            node.selectAll(".conditiontip").classed("conditiontip_select",false)
            d3.select(this).classed("conditiontip_select",true)
        })
        .text("what")


    show_whichselection(node.attr("id"));
    whichtip.classed("conditiontip_select",true)
    showboolean_tip(node);
}

function showboolean_tip(node){
    var nodetip=node.select("#nodetip" + node.attr("id"))
    nodetip.select(".boolean_selection").remove();
    
    nodetip.append("div").attr("class","boolean_selection")
        .append("img")
        .attr("src", "image/card_b_jiao.svg")
        .style("height","30px")
        .style("position","absolute").style("left","0px")
        .on("mousedown",function(){
            d3.select("#coverdiv").remove();
            d3.select("#nodelist").append("div").attr("id","coverdiv")
                .style("z-index",nodelist.getlistlength()-1)
            node.attr("operation","+")
            d3.select(".conditionlist").style("cursor","pointer")

            d3.select(this).on("mousedown",function(){
                // add  +
                if(node.attr("operation")=="+"){

                    node.attr("operation","false")
                    if(operationstack.length!=0){
                        console.log(operationstack)
                        var newcondition={type:"+",data:[]}
                        var conditions=nodelist.getlistiditem(node.attr("id")).getcondition();
                        for(var k=0;k<operationstack.length;k++){
                            newcondition.data.push(conditions[operationstack[k]])
                        }
                        var temp=[newcondition];
                        for (var k = 0; k < conditions.length; k++) {
                            var exist=false;
                            for(var i=0;i<operationstack.length;i++) {
                                if(operationstack[i]==k){
                                    exist=true;
                                }
                            }
                            if(!exist){
                                temp.push(conditions[k])
                            }
                        }
                        nodelist.getlistiditem(node.attr("id")).changecondition(temp)
                        console.log(nodelist.getlistiditem(node.attr("id")).getcondition())
                    }
                    operationstack=[]
                    d3.select("#coverdiv").remove();
                }
                show_conditionlist(node.attr("id"));
                showboolean_tip(node)
            })
        })
        nodetip.append("div").attr("class","boolean_selection").style("right","45px")
        .append("img")
        .attr("src", "image/card_b_fei.svg")
        .style("height","30px")
        .style("position","absolute").style("left","0px")
}


function show_conditionlist(id){
    d3.select("#"+id+"conditionlist").remove();

    var tempnode=nodelist.getlistiditem(id);

    var conditions=tempnode.getcondition();

    var conditionlist = d3.select("#" +id)
        .append("div")
        .attr("id",id+"conditionlist")
        .attr("class","conditionlist")

    for(var i=0;i<conditions.length;i++){
        if(conditions[i].type=="+"){
            addconditionlist_inter(conditionlist,conditions[i],i,id)
        }

        if(conditions[i].type=="time"){
            addconditionlist_time(conditionlist,conditions[i],i,id)
        }

        if(conditions[i].type=="where"){
            addconditionlist_where(conditionlist,conditions[i],i,id)
        }

        if(conditions[i].type=="which"){
            addconditionlist_which(conditionlist,conditions[i],i,id)
        }
        if(conditions[i].type=="what"){
            addconditionlist_what(conditionlist,conditions[i],i,id)
        }

    }

}

function clean_for_selectdiv(node) {
    d3.select("#selectdiv" + node.attr("id")).selectAll("div").remove();
    d3.select("#selectdiv" + node.attr("id")).selectAll("img").remove();
    d3.select("#selectdiv" + node.attr("id")).selectAll("button").remove();
    d3.select("#selectdiv" + node.attr("id")).selectAll("input").remove();
    d3.select("#selectdiv" + node.attr("id")).selectAll("select").remove();
    d3.select("#selectdiv" + node.attr("id")).select("svg").remove();
}


function clean_all(node){
    node.selectAll("div").remove();
    node.selectAll("svg").remove();
}


function confirm_time(node) {
   
    if(d3.select("#" + node.id + "starttime")[0][0]!= null){
        if (d3.select("#" + node.id + "starttime")[0][0].value != "" &&
            d3.select("#" + node.id + "endtime")[0][0].value != "") {
            var timeinterval = [d3.select("#" + node.id + "starttime")[0][0].value,
                d3.select("#" + node.id + "endtime")[0][0].value]
            console.log(timeinterval)
            var tempnode=nodelist.getlistiditem(node.id);
            tempnode.pushtimelistitem(timeinterval);
            nodelist.changelistiditem(node.id,tempnode)
            log("select time:"+timeinterval[0]+" ~ "+timeinterval[1] +" into "+d3.select("#nodename"+node.id)[0][0].outerText)
        }
    }else{
        if (d3.select("#" + node.id + "Timepicker")[0][0].value != "") {
            var timeinterval = ["00:00","06:00"]
            var tempnode=nodelist.getlistiditem(node.id);
            tempnode.pushtimelistitem(timeinterval);
            nodelist.changelistiditem(node.id,tempnode)
            log("select time into "+d3.select("#nodename"+node.id)[0][0].outerText)
        }
    }
    show_conditionlist(node.id);
}

function add_mapselectarea(){
    var mapselection=d3.select("#sceneviewfold").append("div")
        .attr("class","mapselection")

    mapselection.append("div").attr("class","mapselectionattr")
        .style("border-top-left-radius","4px")
        .style("border-top-right-radius","4px")
    mapselection.append("div").attr("class","mapselectionattr")
        .style("border-bottom-left-radius","4px")
        .style("border-bottom-right-radius","4px")
        .style("top","1px")
        .on("mouseup",function(){
            var selectrect=false;
            d3.select("#sceneviewfold").append("svg")
                .attr("id","mapselect_svg")
                .style("position","absolute")
                .style("top",0).style("left",0)
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
                        .attr("width",0)
                        .attr("height",0)
                        selectrect=true;
                })
                .on("mouseup",function(){
                    selectrect=false;
                })
            d3.select("#mapselect_svg").append("rect")
                .attr("id","mapselect_rect")
                .attr("class","timelineattr")
                .style("color","white")
                .style("fill","rgba(0,0,0,0.3)")
                .attr("width",0)
                .attr("height",0)
                .attr("x",0)
                .attr("y",0)
                .style("pointer-events","visiblepainted")

        })
}
function delete_mapselectarea(){
    //d3.selectAll(".mapselection").remove()
    d3.selectAll("#mapselect_svg").remove()
}



