
function ForceDirected(GraphData,div,width,height,left,top)
{
var color = ["rgb(255,127,14)","rgb(255,127,14)","rgb(31,119,180)","rgb(174,199,232)","rgb(174,139,132)","rgb(174,139,132)","rgb(174,139,132)"]

var force = d3.layout.force()
              .charge(-20)
              .linkDistance(20)
              .size([width, height]);

var svg =div.append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("position","absolute")
    .style("left",left+"px")
    .style("z-index","10000000")
    .style("top",top+"px");



  force
      .nodes(GraphData.nodes)
      .links(GraphData.links)
      .start();

  var link = svg.selectAll(".link")
      .data(GraphData.links)
      .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });
    //link.append("title")
      //.text(function(d){return d.value;});
    link.on("mousemove",function(d){
        d3.selectAll(".hovertext").remove();
        svg.append("text")
            .attr("class","hovertext")
            .attr("x",0)
            .attr("y",20)
            .text(d.source.name+" to "+d.target.name)
            .style("font-size","10px");
        svg.append("text")
            .attr("class","hovertext")
            .attr("x",0)
            .attr("y",40)
            .text("Frequency:"+d.value)
            .style("font-size","10px");
        //console.log(d.name);
      });
    //link.on("mousedown",function(d){console.log(d.value)})

  var node = svg.selectAll(".node")
      .data(GraphData.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .style("fill", function(d) { return color[d.group]; })
      .on("mousemove",function(){

      })
      .call(force.drag);
node.on("mousemove",function(d){
        d3.selectAll(".hovertext").remove();
        svg.append("text")
            .attr("class","hovertext")
            .attr("x",0)
            .attr("y",20)
            .text(d.name)
            .style("font-size","10px");
        svg.append("text")
            .attr("class","hovertext")
            .attr("x",0)
            .attr("y",40)
            .text("Level:"+d.group)
            .style("font-size","10px");
        //console.log(d.name);
      });
  //node.append("title")
      //.text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });

}

