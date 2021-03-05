var Line_margin = {top: 80, right: 20, bottom: 30, left: 40},
	Line_width = 250,
	Line_height = 270;

var Line_x = d3.scale.linear()
	.range([0, Line_width]);
var Line_slider_x = d3.scale.linear()
	.range([0, Line_width]);
var Line_y = d3.scale.linear()
	.range([Line_height, 0]);

var Line_xdomain;
var Line_ydomain;

var Line_xAxis = d3.svg.axis()
	.scale(Line_x)
	.orient("bottom")
	.ticks(6);
var Line_yAxis = d3.svg.axis()
	.scale(Line_y)
	.orient("left");

var Line_color = "#8EE5EE";
var Line_dot_r = 2;

var Line_line = d3.svg.line()
	.interpolate("cardinal")
	.x(function(d) { return Line_x(d.TimePercent); })
	.y(function(d) { return Line_y(d.Intensity); });

var Line_svg = d3.select("body").append("svg")
	.style("float", "left")
	.attr("width", Line_width + Line_margin.left + Line_margin.right)
	.attr("height", Line_height + Line_margin.top + Line_margin.bottom)
	.append("g")
	.attr("transform", "translate(" + Line_margin.left + "," + Line_margin.top + ")");

d3.csv("data/1.csv", function(error, data) {
	if (error) throw error;
	//稍微修改数据格式
	data.forEach(function(d) {
		d.TimePercent = d.TimePercent.substring(0,d.TimePercent.length-1)/100;
	});

	Line_xdomain = [d3.min(data, function(d) { return d.TimePercent; }), d3.max(data, function(d) { return d.TimePercent; })];
	Line_x.domain(Line_xdomain);
	Line_slider_x.domain(Line_xdomain);
	Line_ydomain = [d3.min(data, function(d) { return d.Intensity; }), d3.max(data, function(d) { return d.Intensity; })];
	Line_y.domain(Line_ydomain);

	//Line X 轴
	Line_svg.append("g")
		.attr("class", "x Line_axis")
		.attr("transform", "translate(0," + Line_height + ")")
		.call(Line_xAxis)
	.append("text")
		.attr("class", "label")
		.attr("x", Line_width)
		.attr("y", -6)
		.style("text-anchor", "end")
		.text("TimePercent");
	//Line Y 轴
	Line_svg.append("g")
		.attr("class", "y Line_axis")
		.call(Line_yAxis)
	.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Intensity");
	//ClipPath
	Line_svg.append("clipPath")
        .attr("id", "Line_clip")
        .append("rect")
        .attr("width", Line_width + 15)
        .attr("height", Line_height + 25)
        .attr("transform", "translate(0, -25)");
	
	//Line
	Line_svg.append("path")
		.datum(data)
		.attr("id", "Line_line")
		.attr("class", "Line_line")
		.attr("clip-path", "url(#Line_clip)")
		.style("stroke", Line_color)
		.attr("d", Line_line);

	//tooltip
	var tooldiv = d3.select("body")
		.append("div")
		.style("opacity", 0)
		.attr("class", "Line_tooltip");
	var toolp = tooldiv.append("p");
	toolp.append("strong")
		.text("Intensity: ");
	toolp.append("span")
		.attr("id","Intensity")
		.text(0);
	var toolp = tooldiv.append("p");
	toolp.append("strong")
		.text("TimePercent: ");
	toolp.append("span")
		.attr("id","TimePercent")
		.text(0);
	var tooltip = d3.select(".Line_tooltip");

    //Dot
	Line_svg.selectAll(".dot")
		.data(data)
	.enter().append("circle")
		.attr("clip-path", "url(#Line_clip)")
		.attr("r", 3)
		.attr("cx", function(d) { return Line_x(d.TimePercent); })
		.attr("cy", function(d) { return Line_y(d.Intensity); })
		.style("fill", "#F5F5F5")
		.style("stroke", Line_color)
		.style("stroke-width", Line_dot_r + "px")
		.on("mouseover", function(d) {
			var xPosition = parseFloat(d3.select(this).attr("cx")) + 20;
			var yPosition = parseFloat(d3.select(this).attr("cy")) + 30;
			tooltip.style("opacity", 1)
				.style("left", xPosition + "px")
				.style("top", yPosition + "px")
				.select("#Intensity")
				.text(d.Intensity);
			tooltip.select("#TimePercent")
				.text(d.TimePercent);
		})
		.on("mouseout", function() {
			d3.select(".Line_tooltip").style("opacity", 0);;
		});
});

