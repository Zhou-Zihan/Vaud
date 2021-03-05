//滑动条
d3.select("body")
	.append("div")
	.attr("id",'Line_slider')
	.style("left", Line_margin.left + "px")
	.style("top", Line_height + Line_margin.top + Line_margin.bottom + "px")
	.style("width", Line_width + "px")
	.call(d3.slider()
		.min(0).max(Line_width)
		.value([0, Line_width])
		.on("slide", function(evt, value) {
			Line_x.domain([Line_slider_x.invert(value[0]), Line_slider_x.invert(value[1])]);
			var Line_transition = Line_svg.transition().duration(1000);
			Line_transition.select(".x.Line_axis").call(Line_xAxis);
			
			Line_transition.selectAll("circle")
				.attr("cx", function(d) { return Line_x(d.TimePercent); });

			Line_line.x(function(d) { return Line_x(d.TimePercent); });
			Line_transition.select("#Line_line")
				.attr("d", Line_line);

			
			}
			)
		);

//更新滚动条
function slider(l,r){
	var Line_transition = d3.select("#Line_slider").transition().duration(1);
	l = l/Line_width*100.0;
	r = r/Line_width*100.0;
	Line_transition.select("#handle-one")
		.style("left", l +"%");
	Line_transition.select("#handle-two")
		.style("left", r +"%");
	Line_transition.select("div")
		.style("left", l +"%")
		.style("right", (100.0-r)+"%");
}