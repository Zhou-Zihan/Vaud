/**
 * Created by Administrator on 2016/3/23.
 */

function  show_carlist(node) {
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
            add_mapobject("carlist",data,node.attr("count"))
            // debugger
            console.log(nodelist.getlistindexof(node.attr("count")))
            if(nodelist.getlistindexof(node.attr("count")).timearea!=null){
                console.log(nodelist.getlistindexof(node.attr("count")).timearea)
                var time1=nodelist.getlistindexof(node.attr("count")).timearea[0],
                time2=nodelist.getlistindexof(node.attr("count")).timearea[1];
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
                new_conditiondiv("carlist",data,d3.event.x,d3.event.y,activenode,1);
            }
        }).text("Select All")
        .style("padding","13px 30px 13px 30px")
        .style("font-size","14px")
        .style("font-weight","lighter")
        .style("text-align","center")
        .style("cursor","pointer")

    var sourcedivlist = d3.select("#sourcediv" + node.attr("id"))
        .append("div")
        .attr("id", "sourcedivlist" + node.attr("id"))
        .attr("class","sourcedivlist")


        // 浙CT0230

    if (data != null) {
        let count=0;
        for (let car of data.values()){
             var thiselementdiv = sourcedivlist.append("div")
                .attr("class", "listelement")
                .attr("taxiid", car.ID)
                .attr("intid",count)
                .text(car.ID)

            thiselementdiv.append("object")
                .attr("data","image/unfold.svg")
                .style("position","absolute")
                .style("top","0px")
                .style("left","0px")

            thiselementdiv
                .on("mousedown", function () {
                    mousex = d3.event.x;
                    mousey = d3.event.y;
                    isabledrag_new_condition=true;
                })
                .on("mouseup", function () {
                    isabledrag_new_condition=false;
                    add_mapobject("car", {ID:car.ID , data:car} , node.attr("count"))
                })
                .on("mousemove", function () {
                    if ((d3.event.x - mousex > 5 || d3.event.y - mousey > 5)
                        &&isabledrag_new_condition) {
                        isabledrag_new_condition=false;
                        new_conditiondiv("car",car,d3.event.x,d3.event.y,activenode,1);
                    }
                });

            if(count>20)
                break;
            else
                count++;
        }
    }
}