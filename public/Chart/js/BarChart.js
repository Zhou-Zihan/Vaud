var Bar_margin = {top: 80, right: 20, bottom: 30, left: 40},
	Bar_width = 250,
	Bar_height = 270;

var Bar_x = d3.scale.ordinal()
	.rangeBands([0, Bar_width], 0.1);
var Bar_slider_x = d3.scale.ordinal()
	.rangeBands([0, Bar_width]);
var Bar_y = d3.scale.linear()
	.range([Bar_height, 0]);

var Bar_xdomain;
var Bar_ydomain;

var Bar_xAxis = d3.svg.axis()
	.scale(Bar_x)
	.orient("bottom");
var Bar_yAxis = d3.svg.axis()
	.scale(Bar_y)
	.orient("left");

var Bar_color = "#8EE5EE";

var Bar_svg = d3.select("body").append("svg")
	.attr("id", "Bar_svg")
	.style("float", "left")
	.attr("width", Bar_width + Bar_margin.left + Bar_margin.right)
	.attr("height", Bar_height + Bar_margin.top + Bar_margin.bottom)
	.append("g")
	.attr("transform", "translate(" + Bar_margin.left + "," + (Bar_margin.top - 25) + ")");

var Bar_data;

d3.csv("data/2.csv", function(error, data) {
	if (error) throw error;
	//稍微修改数据格式
	data.forEach(function(d) {
		d.TimePercent = d.TimePercent.substring(0,d.TimePercent.length-1)/100;
	});
	Bar_data = data;
	Bar_xdomain = data.map(function(d) { return d.TimePercent; });
	Bar_x.domain(Bar_xdomain);
	Bar_slider_x.domain(Bar_xdomain);
	Bar_ydomain = [50, d3.max(data, function(d) { return d.Intensity; })];
	Bar_y.domain(Bar_ydomain);

	//Bar X 轴
	Bar_svg.append("g")
		.attr("class", "x Bar_axis")
		.attr("transform", "translate(0," + Bar_height + ")")
		.call(Bar_xAxis)
	.append("text")
		.attr("class", "label")
		.attr("x", Bar_width)
		.attr("y", -6)
		.style("text-anchor", "end")
		.text("");
	//Bar Y 轴
	Bar_svg.append("g")
		.attr("class", "y Bar_axis")
		.call(Bar_yAxis)
	.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("");
	//ClipPath
	Bar_svg.append("clipPath")
        .attr("id", "Bar_clip")
        .append("rect")
        .attr("width", Bar_width + 15)
        .attr("height", Bar_height + 25)
        .attr("transform", "translate(0, -25)");
	
	//Bar
	Bar_svg.selectAll(".Bar_bar")
		.data(data)
	.enter().append("rect")
		.attr("id", "Bar_rect")
		.attr("class", "Bar_bar")
		.attr("clip-path", "url(#Line_clip)")
		.attr("x", function(d) { return Bar_x(d.TimePercent); })
		.attr("width", Bar_x.rangeBand())
		.attr("y", function(d) { return Bar_y(d.Intensity); })
		.attr("height", function(d) { return Bar_height - Bar_y(d.Intensity); });
});

