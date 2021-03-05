//滑动条
d3.select("body")
	.append("div")
	.attr("id","Bar_slider")
	.style("left", Bar_margin.left  + Line_width + Line_margin.left + Line_margin.right + "px")
	.style("top", Bar_height + Bar_margin.top + Bar_margin.bottom - 24 + "px")
	.style("width", Bar_width + "px")
	.call(d3.slider()
		.min(0).max(Bar_width)
		.value([0, Bar_width])
		.on("slide", function(evt, value) {
			if (value[0] < 0 || value[0] > Bar_width || value[1] < 0 || value[1] > Bar_width) return;
			var Xmin = 999;
			var map =  Bar_data.map(function(d) { 
					if (Bar_slider_x(d.TimePercent) >= value[0] && Bar_slider_x(d.TimePercent) <= value[1]) {
						Xmin = Math.min(Xmin, Bar_slider_x(d.TimePercent));
						return d.TimePercent; 
					}});
			Bar_trans(map, Xmin);
		}));

function Bar_trans(map, Xmin){
	Bar_x.domain(map);
	var Bar_transition = Bar_svg.transition().duration(1000);
	Bar_transition.select(".x.Bar_axis").call(Bar_xAxis);
	
	Bar_transition.selectAll("#Bar_rect")
		.attr("x", function(d) { return (Bar_x(d.TimePercent)) ? Bar_x(d.TimePercent) : (Bar_slider_x(d.TimePercent) < Xmin ? -100 : Bar_width + 100) ; });
}


var BarZoomOutButton = Bar_svg.append("g");
	
BarZoomOutButton.append("rect")
	.attr("class", "ZoomOut")
	.attr("width", 74)
	.attr("height", 25)
	.attr("x", 7.5)
	.attr("y", -44)
	.on("click", function () {
		var map =  Bar_data.map(function(d) { 
				return d.TimePercent; 
			})
		Bar_trans(map, 0);

		var Bar_transition = d3.select("#Bar_slider").transition().duration(1);
		Bar_transition.select("#handle-one")
			.style("left", "0%");
		Bar_transition.select("#handle-two")
			.style("left", "100%");
		Bar_transition.select("div")
			.style("left", "0%")
			.style("right", "0%");
	});

BarZoomOutButton.append("text")
	.attr("class", "ZoomOutText")
	.attr("width", 50)
	.attr("height", 25)
	.attr("x", 16)
	.attr("y", -28)
	.text("ZoomOut");
