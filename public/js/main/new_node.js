/**
 * Created by Administrator on 2015/12/17.
 */

d3.select("#new_node_div")
    .attr("class","newnodetip")
    .on("mousedown", function () {
        var interactiondiv=d3.select("body").append("div")
            .attr("id","interactiondiv")
        var tempelementdiv=interactiondiv.append("img")
            .attr("src", "image/filter.png")
            .attr("draggable", false)
            .style("position", "absolute")
            .style("width", "80px")
            .style("height", "75px")
            .style("top", (d3.event.y-37) + "px")
            .style("left", (d3.event.x - 40) + "px")
        interactiondiv.on("mousemove", function () {
            tempelementdiv.style("left",(d3.event.x - 40) + "px");
            tempelementdiv.style("top",(d3.event.y-37) + "px");
        })
            .on("mouseup", function (e) {
                e = e ? e : window.event;
                condition_node_newnode([e.clientX, e.clientY]);
                log("Create a new condition node")
                d3.select(this).remove();
            })
    })
    .on("mouseover", function () {
        d3.selectAll(".mouse_on_tag").remove();
        d3.select("#new_node_div").append("div")
            .attr("class","mouse_on_tag")
            .text("Add Node").style("opacity","0")
            .append("svg")
            .attr("class","mouse_on_tag_xiaosanjiao")
            .append('polygon')
            .attr('style', 'fill:rgb(48,48,48);')
            .attr('points', '0,20 6,15 6,25')

        d3.select("#new_node_div").select(".mouse_on_tag").transition()
                    .ease("linear")
                    .duration(300)
                    .delay(0)
                    .style("opacity","1") 
    })
    .on("mouseout", function () {
        d3.selectAll(".mouse_on_tag").remove();
    })

d3.select("#new_node_div").append("img").style("pointer-events","none")
    .attr("src","image/query_addNode.svg")
    .style("position","absolute")
    .style("height","40px")
    .style("width","40px");



