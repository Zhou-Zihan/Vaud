/**
 * Created by Administrator on 2016/3/23.
 */
function show_bloganalysis(node){
    //sourcedivlist
    d3.select("#sourcediv" + node.attr("id")).selectAll("div").remove();

    var attrtip = d3.select("#sourcediv" + node.attr("id"))
        .append("select")
        .style("color","#4c4c4c")
        .style("font-weight","light")
        .style("font-size","14px")
        .style("border","1px solid #d3d3d3")
        .style("border-radius","2px")
        .style("position","absolute")
        .style("top","5px")
        .style("left","10px")
        .style("height","32px")
        .style("width","260px")
        .on("change", function () {
            if (attrtip[0][0].value == "heat map") {
                show_heatmap(node);
            }
            if (attrtip[0][0].value == "time") {
                show_blognodetime(node);
            }
        });
    attrtip.append("option").text("heat map")
    attrtip.append("option").text("time")
    attrtip.selectAll("option").style("color","#4c4c4c")
        .style("font-weight","light")
        .style("font-size","13px")
    d3.select("#sourcediv" + node.attr("id")).append("div")
        .attr("id", "sourcedivlist" + node.attr("id"))
        .attr("class","sourcedivlist")
    show_heatmap(node);
}

function  show_blognodetime(node){
    d3.select(("#sourcedivlist" + node.attr("id"))).selectAll("svg").remove();
    d3.select(("#sourcedivlist" + node.attr("id"))).selectAll("div").remove();
    //load data
    var data = nodelist.getlistiditem(node.attr("id")).getdatalist();

    if (data != null) {
        var chartdata = []
        for (var i = 0; i < 24; i++) {
            chartdata.push([0])
        }
        for (var i = 0; i < data.length; i++) {
            chartdata[parseInt(data[i].date.split("T")[1].split(":")[0])]++;
        }
        console.log(chartdata)
        paint_linechart(chartdata, "time", "num", 260, 260, 0, 0, d3.select("#sourcedivlist" + node.attr("id")), node.attr("count"))
        d3.select("#sourcedivlist" + node.attr("id"))
            .style("background","rgb(0,0,0)")

    }

}
