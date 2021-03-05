var Line_drag = d3.behavior.drag();
var Line_band = Line_svg.append("rect")
	.attr("width", 0)
	.attr("height", 0)
	.attr("x", 0)
	.attr("y", 0)
	.attr("class", "ZoomBand");

var BandPos = [[-1,-1], [-1,-1]];

var Line_Zoom = Line_svg.append("rect")
	.attr("width", Line_width)
	.attr("height", Line_height)
	.attr("class", "ZoomOverlay")
	.call(Line_drag);

var ZoomArea = {
	x1: 0,
	y1: 0,
	x2: Line_width,
	y2: Line_height
};

Line_drag.on("drag", function () {
	BandPos[1] = d3.mouse(this);
	BandPos[1][0] = Math.max( 0, Math.min(BandPos[1][0], Line_width) );
	BandPos[1][1] = Math.max( 0, Math.min(BandPos[1][1], Line_height) );
	var translate_x = BandPos[0][0];
	var translate_y = BandPos[0][1];
	if (BandPos[1][0] < BandPos[0][0]) {
		translate_x = BandPos[1][0];
	}
	if (BandPos[1][1] < BandPos[0][1]) {
		translate_y = BandPos[1][1];
	}

	if (BandPos[0][0] == -1) {
		BandPos[0] = BandPos[1];
		translate_x = BandPos[0][0];
		translate_y = BandPos[0][1];
	}
	d3.select(".ZoomBand").
		attr("transform", "translate(" + translate_x + "," + translate_y + ")");

	d3.select(".ZoomBand").transition().duration(1)
		.attr("width", Math.abs(BandPos[0][0] - BandPos[1][0]))
		.attr("height", Math.abs(BandPos[0][1] - BandPos[1][1]));
});

Line_drag.on("dragend", function () {
	BandPos[1][0] = Math.max( 0, Math.min(BandPos[1][0], Line_width) );
	BandPos[1][1] = Math.max( 0, Math.min(BandPos[1][1], Line_height) );
	var x1 = Line_x.invert(BandPos[0][0]);
	var x2 = Line_x.invert(BandPos[1][0]);

	if (x1 < x2) {
		slider( BandPos[0][0], BandPos[1][0] );
		ZoomArea.x1 = x1;
		ZoomArea.x2 = x2;
	} else {
		slider( BandPos[1][0], BandPos[0][0] );
		ZoomArea.x1 = x2;
		ZoomArea.x2 = x1;
	}

	var y1 = Line_y.invert(BandPos[1][1]);
	var y2 = Line_y.invert(BandPos[0][1]);

	if (y1 < y2) {
		ZoomArea.y1 = y1;
		ZoomArea.y2 = y2;
	} else {
		ZoomArea.y1 = y2;
		ZoomArea.y2 = y1;
	}

	BandPos = [[-1, -1], [-1, -1]];

	d3.select(".ZoomBand").transition()
		.attr("width", 0)
		.attr("height", 0)
		.attr("x", BandPos[0][0])
		.attr("y", BandPos[0][1]) ;

	Line_x.domain([ZoomArea.x1, ZoomArea.x2]);
	Line_y.domain([ZoomArea.y1, ZoomArea.y2]);
	Zoom();
});

function Zoom() {
	var Line_transition = Line_svg.transition().duration(1000);
	Line_transition.select(".x.Line_axis").call(Line_xAxis);
	Line_transition.select(".y.Line_axis").call(Line_yAxis);
	
	Line_transition.selectAll("circle")
		.attr("cx", function(d) { return Line_x(d.TimePercent); })
		.attr("cy", function(d) { return Line_y(d.Intensity); });

	Line_line.x(function(d) { return Line_x(d.TimePercent); });
	Line_line.y(function(d) { return Line_y(d.Intensity); });

	Line_transition.select("#Line_line")
		.attr("d", Line_line);

}

var ZoomOutButton = Line_svg.append("g");
	
ZoomOutButton.append("rect")
	.attr("class", "ZoomOut")
	.attr("width", 74)
	.attr("height", 25)
	.attr("x", 7.5)
	.attr("y", -45)
	.on("click", function () {
		Line_x.domain(Line_xdomain);
		Line_y.domain(Line_ydomain);
		Zoom();
		slider(0, Line_width);
	});

ZoomOutButton.append("text")
	.attr("class", "ZoomOutText")
	.attr("width", 50)
	.attr("height", 25)
	.attr("x", 16)
	.attr("y", -29)
	.text("ZoomOut");
