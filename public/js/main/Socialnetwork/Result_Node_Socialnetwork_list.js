/**
 * Created by Administrator on 2016/3/23.
 */
function  show_social_networklist(node) {
    //load data
    var data = nodelist.getlistiditem(node.attr("id")).getdatalist();

    //sourcedivlist
    d3.select("#sourcedivlist" + node.attr("id")).remove();

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
        console.log(data)
        for (var i = 0; i < data.length&&i<20; i++) {
        if(data[i].length>0){
            console.log(i)
            var thiselementdiv = sourcedivlist.append("div")
                .attr("class", "listelement")
                .attr("id",node.attr("id")+"connection"+i)
                .attr("people_count",i)
                .attr("peopleid", function() {
                    if (data[i][0].thisid != "0")
                        return data[i][0].thisid
                    else {
                        return "Unknow number"
                    }
                })
                .text(function(){
                        if (data[i][0].thisid != "0")
                        return data[i][0].thisid
                    else {
                        return "Unknow number"
                    }
                  })
                .on("mousedown", function () {
                    mousex = d3.event.x;
                    mousey = d3.event.y;
                    isabledrag_new_condition=true;
                    add_mapobject("social_networklist",data[d3.select(this).attr("people_count")],node.attr("count"))
                })
                .on("mouseup", function () {
                    isabledrag_new_condition=false;
                })
                .on("mousemove", function () {
                    if ((d3.event.x - mousex > 5 || d3.event.y - mousey > 5)
                        &&isabledrag_new_condition) {
                        isabledrag_new_condition=false;
                        new_conditiondiv("people",d3.select(this).attr("peopleid"),d3.event.x,d3.event.y,activenode,1);
                    }
                });
            
            thiselementdiv.append("img")
                .attr("src", "image/unfold.svg")
                .style("position","absolute")
                .style("top","0px")
                .style("left","0px")
                .attr("count",i)
                .on("mousedown", function () {
                    for (var m = 0; m < data[d3.select(this).attr("id")].length&&m<20; m++) {
                     thiselementdiv.append("div")
                                    .attr("class", "listelement")
                                    .attr("upcount",d3.select(this).attr("count"))
                                    .attr("count",m)
                                    .attr("peopleid", function() {
                                        if (data[d3.select(this).attr("id")][m].otherid != "0")
                                            return data[d3.select(this).attr("id")][m].otherid
                                        else {
                                            return "Unknow number"
                                        }
                                    })
                                    .text(function(){
                                        if(data[d3.select(this).attr("id")][m].otherid!="0")
                                            return data[d3.select(this).attr("id")][m].otherid
                                        else{
                                            return "Unknow number"
                                        }
                                    })
                                    .on("mousedown", function () {
                                        mousex = d3.event.x;
                                        mousey = d3.event.y;
                                        isabledrag_new_condition=true;
                                        add_mapobject("social_network",data[d3.select(this).attr("id")]
                                            [d3.select(this).attr("count")],node.attr("count"))
                                    })
                    }
                })
            }
        }
    }
}