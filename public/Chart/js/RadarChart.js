var Radar_margin = {top: 50, right: 110, bottom: 30, left: 50},
	Radar_width = 250,
	Radar_height = 270;

var Radardata = [
			[{axis:"Speed",value:65 },
			{axis:"East",value:0.7 },
			{axis:"South",value:0.3 },
			{axis:"West",value:0 },
			{axis:"North",value:0 }],

			[{axis:"Speed",value:50 },
			{axis:"East",value:0.6 },
			{axis:"South",value:0 },
			{axis:"West",value:0.0 },
			{axis:"North",value:0.4 }]
		];

var Radar_color = d3.scale.ordinal()
	.range(["#00C5CD","#7AC5CD"]);

RadarCharRun();

function RadarCharRun()
{
	var levels = 5;
	var axis_name = (Radardata[0].map(function(i, j){return i.axis})),
		axis_len = axis_name.length,
		radius = Math.min(Radar_width/2, Radar_height/2), 	//外圆半径
		avg_angle = Math.PI * 2 / axis_len;
	var maxValue = new Array();
	for (i = 0; i < axis_len; i++) maxValue[i] = 1;
	d3.max(Radardata, function(i){return d3.max(i.map(function(o, j){ maxValue[j] = Math.max(maxValue[j], o.value);return o.value;}))});

	var rScale = new Array();
	rScale[0] = d3.scale.linear()
			.range([0, radius])
			.domain([0, maxValue[0]]);
	for (i = 1; i < axis_len; i++)
		rScale[i] = d3.scale.linear()
			.range([0, radius])
			.domain([0, 1]);

	var svg = d3.select("body").append("svg")
			.attr("id", "Radar_svg")
			.style("float", "left")
			.attr("width",  Radar_width + Radar_margin.left + Radar_margin.right)
			.attr("height", Radar_height + Radar_margin.top + Radar_margin.bottom)
			.attr("class", "radarRadar_svg");	
	var g = svg.append("g")
			.attr("transform", "translate(" + (Radar_width/2 + Radar_margin.left * 2) + "," + (Radar_height/2 + Radar_margin.top) + ")");

	var axisGrid = g.append("g").attr("class", "axisWrapper");
	//circle
	axisGrid.selectAll(".levels")
		.data(d3.range(1,(levels+1)).reverse())
	.enter()
		.append("circle")
		.attr("class", "gridCircle")
		.attr("r", function(d){return radius/levels*d;})
		.style("fill", "#7AC5CD")
		.style("stroke", "#CDCDCD")
		.style("fill-opacity", 0.1);

	//lines
	var axis = axisGrid.selectAll(".axis")
		.data(axis_name)
	.enter()
		.append("g")
		.attr("class", "axis");
	axis.append("line")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", function(d, i){ return rScale[i](maxValue[i]) * Math.cos(avg_angle*i - Math.PI/2); })
		.attr("y2", function(d, i){ return rScale[i](maxValue[i]) * Math.sin(avg_angle*i - Math.PI/2); })
		.attr("class", "line")
		.style("stroke", "#CDCDCD")
		.style("stroke-width", "1px");
	//labels
	axis.append("text")
		.attr("class", "legend")
		.style("font-size", "11px")
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", function(d, i){ return rScale[i](maxValue[i] * 1.2) * Math.cos(avg_angle*i - Math.PI/2); })
		.attr("y", function(d, i){ return rScale[i](maxValue[i] * 1.2) * Math.sin(avg_angle*i - Math.PI/2); })
		.text(function(d){ return d; });

	//radial line
	var radarLine = d3.svg.line.radial()
		.interpolate("cardinal-closed")
		.radius(function(d, i) { return rScale[i](d.value); })
		.angle(function(d, i) {return i*avg_angle; });
	
	var blobWrapper = g.selectAll(".radarWrapper")
		.data(Radardata)
		.enter().append("g")
		.attr("class", "radarWrapper");

	blobWrapper.append("path")
		.attr("class", "radarArea")
		.attr("d", function(d, i) { return radarLine(d); })
		.style("fill", function(d, i) { return Radar_color(i); })
		.style("fill-opacity", 0.35)	
		.style("stroke-width", 1.5 + "px")
		.style("stroke", function(d,i) { return Radar_color(i); })
		.on('mouseover', function(d,i){
			d3.select(this)
				.transition().duration(300)
				.style("fill-opacity", 0.7);	
		})
		.on('mouseout', function(d,i){
			d3.select(this)
				.transition().duration(300)
				.style("fill-opacity", 0.35);
		});

	//tooltip
	var tooltip = g.append("rect")
		.attr("class", "Radar_tooltip")
		.attr("width", 30)
		.attr("height", 20)
		.style("opacity", 0);
	var tooltext = g.append("text")
		.attr("class", "Radar_tooltext")
		.style("opacity", 0);
	// var tooltip = g.append("text")
	// 	.attr("class", "tooltip")
	// 	.style("opacity", 0);

	//dots
	blobWrapper.selectAll(".radarCircle")
		.data(function(d,i) { return d; })
	.enter().append("circle")
		.attr("class", "radarCircle")
		.attr("r", 4)
		.attr("cx", function(d, i){ return rScale[i](d.value) * Math.cos(avg_angle*i - Math.PI/2); })
		.attr("cy", function(d, i){ return rScale[i](d.value) * Math.sin(avg_angle*i - Math.PI/2); })
		.style("fill", function(d, i, j) { return Radar_color(j); })
		.style("fill-opacity", 0.8)
		.on("mouseover", function(d,i) {
			newX =  parseFloat(d3.select(this).attr('cx')) - 10;
			newY =  parseFloat(d3.select(this).attr('cy')) - 10;		
			tooltext.attr('x', newX)
				.attr('y', newY)
				.transition().duration(200)
				.text(d.value)
				.style('opacity', 1);
			tooltip.attr('x', newX-8)
				.attr('y', newY-15)
				.transition().duration(200)
				.style('opacity', 1);
		})
		.on("mouseout", function(){
			tooltip.transition().duration(200)
				.style("opacity", 0);
			tooltext.transition().duration(200)
				.style("opacity", 0);
		});
}