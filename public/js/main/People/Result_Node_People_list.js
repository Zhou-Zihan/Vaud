/**
 * Created by Administrator on 2016/3/23.
 */
function  show_peoplelist(node) {
    //load data
    var data = nodelist.getlistiditem(node.attr("id")).getdatalist();

    //sourcedivlist
    d3.select("#sourcediv" + node.attr("id")).selectAll("div").remove();

    var Select_all_inputdiv=d3.select("#sourcediv" + node.attr("id")).append("div")
        .style("top","0px")
        .style("height","14px")
        .style("left","0px")
        .style("position","absolute")
        .style("width","210px")
        .on("mousedown", function () {
            mousex = d3.event.x;
            mousey = d3.event.y;
            isabledrag_new_condition=true;
        })
        .on("mouseup", function () {
            isabledrag_new_condition=false;

            add_mapobject("peoplelist",data,node.attr("count"))

            if(nodelist.getlistindexof(node.attr("count")).timearea!=null){
                console.log(nodelist.getlistindexof(node.attr("count")).timearea)
                var time1=nodelist.getlistindexof(node.attr("count")).timearea[0][0],
                time2=nodelist.getlistindexof(node.attr("count")).timearea[0][1];
                    time1=time1.split(" ")[1].split(":")[0]*60+time1.split(" ")[1].split(":")[1]*1
                    time2=time2.split(" ")[1].split(":")[0]*60+time2.split(" ")[1].split(":")[1]*1
                    console.log(time1+"  "+time2)
                    repaint_timeline(time1,time2)
            };
        })
        .on("mousemove", function () {
            if ((d3.event.x - mousex > 5 || d3.event.y - mousey > 5)
                &&isabledrag_new_condition) {
                isabledrag_new_condition=false;
                new_conditiondiv("peoplelist",data,d3.event.x,d3.event.y,activenode,1);
            }
        })
        .text("Select All")
        .style("padding","13px 30px 13px 30px")
        .style("font-size","14px")
        .style("font-weight","lighter")
        .style("text-align","center")
        .style("cursor","pointer")

    var sourcedivlist = d3.select("#sourcediv" + node.attr("id"))
        .append("div")
        .attr("id", "sourcedivlist" + node.attr("id"))
        .attr("class","sourcedivlist")


    if (data != null) {
        for (var i = 0; i < data.length&&i<20; i++) {
            var thiselementdiv = sourcedivlist.append("div")
                .attr("class", "listelement")
                .attr("peopleid", data[i].ID)
                .attr("intid",i)
                .text(data[i].ID)
            //if(i%2!=1){
            //    thiselementdiv.style("background-color","rgb(226,226,226)")
            //}
            //detail data
            thiselementdiv.append("object")
                .attr("data","image/unfold.svg")
                .style("position","absolute")
                .style("top","0px")
                .style("left","0px")
            //interact_drag_new
            thiselementdiv
                .on("mousedown", function () {
                    mousex = d3.event.x;
                    mousey = d3.event.y;
                    isabledrag_new_condition=true;
                    
                })
                .on("mouseup", function () {
                    isabledrag_new_condition=false;
                    add_mapobject("people",data[d3.select(this).attr("intid")],node.attr("count"))
                })
                .on("mousemove", function () {
                    if ((d3.event.x - mousex > 5 || d3.event.y - mousey > 5)
                        &&isabledrag_new_condition) {
                        isabledrag_new_condition=false;
                        new_conditiondiv("people",d3.select(this).attr("peopleid"),d3.event.x,d3.event.y,activenode,1);
                    }
                });

        }
    }
}