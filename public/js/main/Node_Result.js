
/**
 * Created by Administrator on 2015/11/16.
 */

function paint_datanode(node){
    for(var i=0;i<nodelist.getlist().length;i++){
        if(nodelist.getlist()[i].id==node.attr("id")) {
            if (nodelist.getlist()[i].islive){
                if (nodelist.getlist()[i].showdetail) {
                    show_data_nodedetail(node)
                } else {
                    d3.selectAll("#node_cricle"+node.attr("count")).remove();
                    hide_data_nodedetail(node)
                }
            }else{
                hide_data_nodedetail(node)
                d3.selectAll("#node_cricle"+node.attr("count")).remove();
            }
        }
    }
}

function data_node_newnode(sourcetype,mouse) {
    //nodelist_add
    var newnode=Node.createNew();
    newnode.setid("node"+nodelist.getlistlength())
    newnode.settype(sourcetype)
    newnode.setnodetype("data")
    nodelist.pushitem(newnode);


    //nodediv
    var nodediv = d3.select("#nodelist")
        .append("div")
        .attr("count",nodelist.getlistlength()-1)
        .style("z-index",nodelist.getlistlength())
        .attr("class", "nodediv")
        .attr("id", "nodediv" + (nodelist.getlistlength()-1))
        //z-index up
        .on("mousedown", function () {
            for(var i = 0;i < nodelist.getlistlength() ; i++){
                if(nodelist.list[i].islive){
                    if( d3.select("#nodediv"+i).style("z-index") >
                        d3.select(this).style("z-index"))
                    {
                        d3.select("#nodediv"+i)
                            .style("z-index",
                            d3.select("#nodediv"+i).style("z-index")-1);
                    }
                }
            }
            d3.select(this).style("z-index",nodelist.getlistlength());
            activenode=d3.select(this).attr("count")
        })
        .style("background","url(image/bgCard2.svg) no-repeat")
        .style("background-size","100% 100%")

    activenode=nodediv.attr("count")

    if(mouse!=null){
        nodediv.style("top",mouse[1]+"px")
            .style("left",mouse[0]+"px")
            .attr("x", mouse[0])
            .attr("y", mouse[1])
    }else{
        nodediv .style("left",250+"px")
            .style("top",600+"px")
    }

    var node = nodediv.append("div")
        .attr("count",nodelist.getlistlength()-1)
        .attr("id", "node" + (nodelist.getlistlength()-1))
        .attr("class", "data_node")
        .on("mousedown",function(){
            //confirm  node  name
            if(document.getElementById(node.attr("id")+"nameinput")!=null){
                if (document.getElementById(node.attr("id")+"nameinput").value != ""){
                    if (d3.select("#" + node.attr("id")+ "nameinput")[0][0].value.length<=20)
                    {
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
                            .style("top", "14px");;
                    }
                }
                d3.select("#nodename"+node.attr("id")).select("div").remove()
            }
        })

    //nodediv_dragdiv
    var dragdiv = nodediv.append("div")
        .attr("id", "dragdiv" + "node" + (nodelist.getlistlength()-1))
        .attr("class", "condition_dragdiv")
        .append("div")
        .style("height","100%")
        .attr("count", nodelist.getlistlength()-1)
        .on("mousedown", function () {
            nownode=d3.select(this).attr("count")
            nodedrag = {
                boolean:true,
                mousex:(d3.event.x-d3.select("#nodediv"+dragdiv.attr("count")).style("left").split("px")[0]),
                mousey:d3.event.y-d3.select("#nodediv"+dragdiv.attr("count")).style("top").split("px")[0]};
        })

    dragdiv.append("div")
        .attr("id","nodenamenode" + (nodelist.getlistlength()-1))
        .style("left", "130")
        .style("font-weight", "bold")
        .style("font-size", "16px")
        .style("position","absolute")
        .style("color","#4c4c4c")
        .style("height", "16px")
        .style("width", "100%")
        .style("top", "12px")
        .text("Result \""+node.attr("count")+"\"")
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
                .style("width","100px")
                .style("left","90px")
                .style("border","1px solid #d3d3d3")
                .style("border-radius","2px")
                .style("position","absolute")
                .style("top","-5px")
            d3.select("#" + node.attr("id")+ "nameinput")[0][0].value=d3.select(this).text()
        })

    //backtip tip
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
            hide_data_nodedetail(node);
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

    show_data_nodedetail(node);
}

function clean_data_node_all(node){
    node.selectAll("div").remove();
    node.selectAll("svg").remove();
}

function hide_data_nodedetail(node) {
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
    hidediv.append("img").attr("src", "image/card_s_bg_2.svg")
        .style("left", "0")
        .style("width", "185px")
        .style("height", "100%")
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
            show_data_nodedetail(node);
            linepaint();
        })
    hideiddiv.append("div")
        .attr("id","nodenamenode" + (nodelist.getlistlength()-1))
        .style("font-weight", "normal")
        .style("font-size", "15px")
        .style("position","absolute")
        .style("color","#15c19c")
        .style("height", "16px")
        .style("width", "100%")
        .style("top", function(){
            if(d3.select("#nodenamenode" + node.attr("count"))[0][0].textContent.length<=18||d3.select("#nodenamenode" + node.attr("count"))[0][0].textContent=="Taxis from the origin")
            return "14px"
            else
            return "4px"
        })
        .attr("count",node.attr("count"))
        .text(d3.select("#nodenamenode" + node.attr("count"))[0][0].textContent)


    var hidetip_div = hidediv.append("div")
        .attr("class", "hideattrdiv")
        .style("top","45px")
    var thisnode=nodelist.getlistiditem("node"+node.attr("count"))
    var type=hidetip_div.append("img")
        .style("position","relative")
        .style("float","left")
        .attr("height","45px" )
        .attr("width","40px" )
        .style("left","25px")
    if(thisnode.type=="car"){
        type.attr("src","image/card_s_car2.svg")
    }
    if(thisnode.type=="blog"){
        type.attr("src","image/card_s_blog2.svg")
    }
    if(thisnode.type=="people"){
        type.attr("src","image/card_s_people2.svg")
    }
    if(thisnode.type=="point_of_interest"){
        type.attr("src","image/map_objlist_poi.svg")
    }
    if(thisnode.type=="estate"){
        type.attr("src","image/map_objlist_estate.svg")
    }
    if(thisnode.type=="social_network"){
        type.attr("src","image/map_objlist_socialnet.svg")
    }
    hidetip_div.append("object")
        .attr("data","image/delete.svg")
        .style("position","relative")
        .style("float","left")
        .attr("height","30px" )
        .attr("width","20px" )
        .style("left","30px")
        .style("top","8px")
    hidetip_div.append("div")
        .style("position","relative")
        .style("float","left")
        .attr("height","20px" )
        .attr("width","14px" )
        .style("left","40px")
        .style("top","13px")
        .style("color","#15c19c")
        .text(thisnode.getdatalist().length)


    linepaint();

}

function show_data_nodedetail(node) {

    d3.select("#nodediv" + node.attr("count"))
        .style("display","block")
    d3.selectAll("#node_cricle"+node.attr("count")).remove();
    clean_data_node_all(node);

    //sourcediv
    node.append("div")
        .attr("id", "sourcediv" + node.attr("id"))
        .attr("class", "sourcediv")

    //   tctip
    node.append("div")
        .attr("id", "nodetip" + node.attr("id"))
        .attr("class", "nodetip")
    show_data_nodetip(node,"record");

}

function show_data_nodetip(node,type) {
    var nodetip = node.select("#nodetip" + node.attr("id"))
    nodetip.selectAll("div").remove();

    var recordtip=nodetip.append("div")
        .style("position","absolute")
        .style("width","55px")
        .style("left","10px")
    recordtip.append("div")
        .style("position","absolute")
        .style("height","26px")
        .style("top","14px")
        .style("width","80px")
        .text("Results")
        .style("color","#4c4c4c")
        .style("text-align","left")
        .style("font-weight","normal")
        .style("font-size","14px")
        .on("mousedown", function () {
            show_data_nodetip(node, "record");
        })
    var analysistip=nodetip.append("div")
        .style("position","absolute")
        .style("width","70px")
        .style("left","180px")
    analysistip.append("div")
        .text("Analysis")
        .style("color","#4c4c4c")
        .style("font-weight","normal")
        .style("font-size","14px")
        .style("text-align","right")
        .style("position","absolute")
        .style("height","26px")
        .style("width","70px")
        .style("top","14px")
        .on("mousedown", function () {
            show_data_nodetip(node, "analysis");
        })

    nodetip.append("object")
        .attr("data","image/next.svg")
        .style("position","absolute")
        .style("height","16px")
        .style("width","16px")
        .style("top","15px")
        .style("right","10px")
    nodetip.append("div")
        .style("position","absolute")
        .style("filter:alpha","(opacity=100)")
        .style("cursor","pointer")
        .style("height","16px")
        .style("width","90px")
        .style("top","12px")
        .style("left","180px")
        .on("mousedown", function () {
            show_data_nodetip(node, "analysis");
            //show analysis
        })
    if (type == "record") {
        d3.select("#sourcediv" + node.attr("id")).select("select").remove();
        recordtip.select("div").style("font-weight","bold")
        if (nodelist.getlistiditem(node.attr("id")).type=="car") {
            show_carlist(node,"record");
        }
        if(nodelist.getlistiditem(node.attr("id")).type=="blog"){
            show_bloglist(node,"record");
        }
        if (nodelist.getlistiditem(node.attr("id")).type=="people") {
            show_peoplelist(node,"record");
        }
        if (nodelist.getlistiditem(node.attr("id")).type=="estate") {
            show_estatelist(node,"record");
        }
        if (nodelist.getlistiditem(node.attr("id")).type== "point_of_interest") {
            show_point_of_interestlist(node,"record");
        }
        if (nodelist.getlistiditem(node.attr("id")).type== "social_network") {
            show_social_networklist(node,"record");
        }
        if (nodelist.getlistiditem(node.attr("id")).type== "weather") {
            show_weatherlist(node,"record");
        }
    }

    else{
        d3.select("#sourcediv" + node.attr("id")).selectAll("div").remove();
        analysistip.select("div").style("font-weight","bold")
        if (nodelist.getlistiditem(node.attr("id")).type=="car") {
            show_caranalysis(node);
        }
        if (nodelist.getlistiditem(node.attr("id")).type=="blog") {
            show_bloganalysis(node);
        }
        if (nodelist.getlistiditem(node.attr("id")).type=="point_of_interest") {
            show_point_of_interestanalysis(node);
        }
        if (nodelist.getlistiditem(node.attr("id")).type=="social_network") {
            show_sntanalysis(node);
        }
        
    }
}

function  show_weatherlist(node) {
}
