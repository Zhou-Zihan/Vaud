/**
 * Created by Administrator on 2016/3/23.
 */

function  show_point_of_interestlist(node) {
    //load data
    var data = nodelist.getlistiditem(node.attr("id")).getdatalist();

    //sourcedivlist
    d3.select("#sourcediv" + node.attr("id")).selectAll("div").remove();

    d3.select("#sourcediv" + node.attr("id")).append("div")
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
            add_mapobject("poilist",data,node.attr("count"))
        })
        .on("mousemove", function () {
            if ((d3.event.x - mousex > 5 || d3.event.y - mousey > 5)
                &&isabledrag_new_condition) {
                isabledrag_new_condition=false;
                new_conditiondiv("poilist",data,d3.event.x,d3.event.y,activenode,1);
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

        for (var i = 0; i < data.length&&i<50; i++) {
            var thiselementdiv = sourcedivlist.append("div")
                .attr("class", "listelement")
                .attr("poiname", data[i].name)
                .attr("intid",i)
                .text(data[i].name)
            //triangle
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
                    add_mapobject("poi",data[d3.select(this).attr("intid")],node.attr("count"))
                })
                .on("mouseup", function () {
                    isabledrag_new_condition=false;
                })
                .on("mousemove", function () {
                    if ((d3.event.x - mousex > 5 || d3.event.y - mousey > 5)
                        &&isabledrag_new_condition) {
                        isabledrag_new_condition=false;
                        new_conditiondiv("poi",data[d3.select(this).attr("intid")],d3.event.x,d3.event.y,activenode,1);
                    }
                });
            ;
        }
    }
}