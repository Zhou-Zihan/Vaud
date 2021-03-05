function Bar_Chart_fun(Num,xname,yname,width,height,left,top,div,rectPadding)
{


	//画布周边的空白
	var padding={left:30,top:30,right:30,bottom:30}

	
	
	var dataset_x=[];
	var dataset_y=[];
	
	//定义一个数组
	for (i = 0;i < Num.length;i++){
		dataset_x.push(Num[i][0])
		dataset_y.push(Num[i][1])

	}
	var dataset = dataset_y;
	if (dataset_x.length>=10)
	{
		rectPadding=1;
	}
	else
	{
		rectPadding=10;
	}



		
	//x轴的比例尺
	var xScale = d3.scale.ordinal()
		.domain(d3.range(dataset.length))
		.rangeRoundBands([0, width - padding.left - padding.right]);
	//y轴的比例尺
	var yScale = d3.scale.linear()
		.domain([0,d3.max(dataset)])
		.range([height - padding.top - padding.bottom, 0]);

	//定义x轴
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");
		
	//定义y轴
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left");

	//矩形之间的空白
	var rectPadding = rectPadding;



	var Bar_pery=((height-padding.top-padding.bottom)/(d3.max(dataset)));
	var Bar_perx=((width-padding.left-padding.right)/dataset.length)
	var svg = div
		.append("svg")
		/*.style("background","#000000")*/
		.attr("id","Bar_svg")
		.style("width", width+"px")
		.style("height", height+"px")
		.style("position","absolute")
		.style("left",left+"px")
		.style("top",top+"px");
	svg.on("mousemove",function(){
			d3.selectAll(".MyRect_hover").remove();
			d3.selectAll(".BarChartmouseover").remove();
			var mousex=d3.event.offsetX;
			var mousey=d3.event.offsetY;
			if (mousex>padding.left&&mousex<width-padding.right)
			{
				
				var rect_location=Math.floor((mousex-padding.left)/Bar_perx);
				svg.append("rect").attr("class","MyRect_hover")
					/*.style("opacity",0.5)*/
					.attr("transform","translate(" + padding.left + "," + padding.top + ")")
					.attr("x", rectPadding / 2 + Bar_perx * rect_location)
					.attr("width", 1)
					.attr("y",yScale(dataset[rect_location]))
					.attr("height",height - padding.top - padding.bottom - yScale(dataset[rect_location]))
					.style("fill","#ff6e1c")
				
				svg.append("rect").attr("class","MyRect_hover")
					/*.style("opacity",0.5)*/
					.attr("transform","translate(" + padding.left + "," + padding.top + ")")
					.attr("x", rectPadding / 2 + Bar_perx * rect_location+Bar_perx - rectPadding-1)
					.attr("width", 1)
					.attr("y",yScale(dataset[rect_location]))
					.attr("height",height - padding.top - padding.bottom - yScale(dataset[rect_location]))
					.style("fill","#ff6e1c")
					
				svg.append("rect").attr("class","MyRect_hover")
					/*.style("opacity",0.5)*/
					.attr("transform","translate(" + padding.left + "," + padding.top + ")")
					.attr("x", rectPadding / 2 + Bar_perx * rect_location+1)
					.attr("width", Bar_perx - rectPadding-2)
					.attr("y",yScale(dataset[rect_location]))
					.attr("height",1)
					.style("fill","#ff6e1c")
				// svg.append("image")
    //                 .attr("class","BarChartmouseover")
    //                 .attr("xlink:href","../../image/chart_linechart_pop.svg")
    //                 .style("width",100)
    //                 .style("height",20)
    //                 .style("x",mousex-50)
    //                 .style("y",yScale(dataset[rect_location])-3)
    	// 		var BarChartw = $('body').append($('<span stlye="display:none;" id="textWidth"/>')).find('#textWidth').html(dataset_x[rect_location]+":"+dataset[rect_location]).width();  
     //  			$('#textWidth').remove();
     //  			svg.append("rect").attr("class","MyRect_hover")
     //  				//.attr("transform","translate(" + padding.left + "," + padding.top + ")")
					// .attr("x", padding.left)
					// .attr("width", BarChartw/8*5)
					// .attr("y",5)
					// .attr("height",13)
					// .style("fill","rgba(0,0,0,0.1)")

		//写字
                svg.append("text").attr("class","BarChartmouseover")
	                .style("fill","#444")
	                .style("font-size","14px")
	                .attr("x",padding.left)
	                .attr("y",15)
	                .style("font-size","10px")
	                .text(dataset_x[rect_location]+":"+dataset[rect_location]);

	            var BarChartw = $('body')
	            .append($('<span stlye="display:none;" id="textWidth"/>'))
	            .find('#textWidth')
	            .html(dataset_x[rect_location]+":"+dataset[rect_location]).width();  


      			$('#textWidth').remove();
      			console.log(dataset_x[rect_location]+":"+dataset[rect_location])
	            // var LeftLevel=0;
	            // if (dataset[rect_location]>=1000){
	            // 	LeftLevel=(xScale.rangeBand()-rectPadding)/3.5;
	            // }
	            // else if(dataset[rect_location]>=100){
	            // 	LeftLevel=(xScale.rangeBand()-rectPadding)/3.2;
	            // }
	            // else if(dataset[rect_location]>=10){
	            // 	LeftLevel=(xScale.rangeBand()-rectPadding)/2.85;
	            // }
	            // else
	            // {
	            // 	LeftLevel=(xScale.rangeBand()-rectPadding)/2.5;

	            // }
	            // svg.append("text").attr("class","BarChartmouseover")
	            //     .style("fill","#444")
	            //     .style("font-size","12px")
	            //     .attr("x",rectPadding / 2 + xScale.rangeBand() * rect_location+padding.left+LeftLevel)
	            //     .attr("y",yScale(dataset[rect_location])+30)
	            //     .text(dataset[rect_location]);

			}
		})
		// .style("opacity",0.6)
		
// 		.on("mousedown",function(){
// 				var mousex=Math.round((d3.event.x-left-padding.left)/(xScale.rangeBand()))*(xScale.rangeBand())+left+padding.left+rectPadding/2;
// 				var Drag_x_value=Math.round((d3.event.x-left-padding.left)/(xScale.rangeBand()));
// 				var mousey=Math.round((d3.event.y-top-padding.top)/Bar_pery)*Bar_pery+top+padding.top;
// 				var Drag_y_value=d3.max(dataset)-Math.round((d3.event.y-top-padding.top)/Bar_pery);
// 				var MouseX=d3.event.x;
// 				var MouseY=d3.event.y;

// 				if (MouseX>left+padding.left&&MouseY<top+height-padding.top){
				
// 				d3.select("#Bar_svg_cover").remove();
// 				d3.select("#Bar_svg_cover_axis_x").remove();
// 				d3.select("#Bar_Svg_Cover_Remove").remove();
// 				d3.selectAll(".MyRect_cover").remove();
// 				div.append("svg")
// 					.attr("id","Bar_svg_cover")
// 					.style("position","absolute")
// 					.style("background","#FFFFFF")
// 					.style("top",padding.top+top+"px")
// 					.style("left",Math.max(padding.left+left,mousex)+"px")
// 					.style("width",0+"px")
// 					.style("height",height - padding.top - padding.bottom +"px")
// 					.style("opacity",0.2);
// 				div.append("svg")
// 					.attr("id","Bar_svg_cover_axis_x")
// 					.style("position","absolute")
// 					.style("background","rgb(21,193,156)")
// 					.style("top",top-padding.bottom+height+"px")
// 					.style("left",Math.max(padding.left+left,mousex)+"px")
// 					.style("width",0+"px")
// 					.style("height",padding.bottom-10 +"px")
// 					.style("opacity",0.3);
// 				d3.select("body").append("svg")
// 					.attr("id","Bar_svg_cover_assist")
// 					.style("position","absolute")
// 					.style("left",0+"px")
// 					.style("top",0+"px")
// 					.style("width",1000+"px")
// 					.style("height",1000+"px")
// 					.on("mousemove",function(){
// 						if (d3.event.x<width-padding.left+left)
// 						{
// 							d3.select("#Bar_svg_cover").style("width",d3.event.x-mousex+"px");
// 							d3.select("#Bar_svg_cover_axis_x").style("width",d3.event.x-mousex+"px");
							
// 						}

// 					})
// 					.on("mouseup",function(){
// 						if (d3.event.x<width-padding.left+left){
// 						d3.select("#Bar_svg_cover").style("width",Math.round((d3.event.x-mousex)/(xScale.rangeBand()))*xScale.rangeBand()+"px");
// 						d3.select("#Bar_svg_cover_axis_x").style("width",Math.round((d3.event.x-mousex)/(xScale.rangeBand()))*xScale.rangeBand()+"px");
// 						d3.selectAll(".MyRect_cover").remove();
// 						var Drag_x_value_End=Math.round((d3.event.x-mousex)/(xScale.rangeBand()))+Drag_x_value;
// 						if (Drag_x_value<=(Drag_x_value_End-1)){
// 						console.log(xname+":["+Drag_x_value+","+(Drag_x_value_End-1)+"]");
// 						/*var assist1=Num.slice(Drag_x_value,Drag_x_value_End);
// 						console.log(assist1)*/
// 						/*var assist1=[];
// 						var ii=0;
// 						for (i=Drag_x_value;i<=(Drag_x_value_End-1);i++){
// 							assist1[ii]=dataset_y[i];
// 							ii++;
							
// 						}
// 						console.log(Drag_x_value);
// 						var rects_cover = svg.selectAll(".MyRect_cover")
// 							.data(assist1)
// 							.enter()
// 							.append("rect")
// 							.attr("class","MyRect_cover")
// 							.style("fill","rgb(21,193,156)")
// 							.attr("transform","translate(" + padding.left + "," + padding.top + ")")
// 							.attr("x", function(d,i){
// 								console.log(Drag_x_value);
// 								return xScale(i+Drag_x_value) + rectPadding/2;
// 							} )
// 							.attr("width", xScale.rangeBand() - rectPadding )
// 							.attr("y",function(d){
// 								return yScale(d);
// 							})
// 							.attr("height", function(d){
// 								return height - padding.top - padding.bottom - yScale(d);
// 							});
// */

// 						Bar_Svg_Cover_Remove(Math.max(padding.left+left,mousex)+Math.round((d3.event.x-mousex)/(xScale.rangeBand()))*xScale.rangeBand(),top-padding.bottom+height);}
// 						}
// 						else{
// 						d3.select("#Bar_svg_cover").style("width",width-padding.left-mousex+left+"px");
// 						d3.select("#Bar_svg_cover_axis_x").style("width",width-padding.left-mousex+left+"px");
						
// 						var Drag_x_value_End=Math.round((width-padding.left-mousex+left)/(xScale.rangeBand()))+Drag_x_value;
// 						if (Drag_x_value<=(Drag_x_value_End-1)){
// 						console.log(xname+":["+Drag_x_value+","+(Drag_x_value_End-1)+"]");}
// 						Bar_Svg_Cover_Remove(width-padding.left+left,height-padding.bottom+top);
// 						}
// 						d3.select(this).remove();
// 					});
// 				}
// 				else if (MouseX>left+padding.left&&MouseY>=top+height-padding.top){
// 				d3.select("#Bar_svg_cover_axis_x").remove();
// 				d3.select("#Bar_svg_cover").remove();
// 				d3.select("#Bar_Svg_Cover_Remove").remove();
// 				div.append("svg")
// 					.attr("id","Bar_svg_cover")
// 					.style("position","absolute")
// 					.style("background","#FFFFFF")
// 					.style("top",padding.top+top+"px")
// 					.style("left",Math.max(padding.left+left,mousex)+"px")
// 					.style("width",0+"px")
// 					.style("height",height - padding.top - padding.bottom +"px")
// 					.style("opacity",0.2);
// 				div.append("svg")
// 					.attr("id","Bar_svg_cover_axis_x")
// 					.style("position","absolute")
// 					.style("background","rgb(21,193,156)")
// 					.style("top",top-padding.bottom+height+"px")
// 					.style("left",Math.max(padding.left+left,mousex)+"px")
// 					.style("width",0+"px")
// 					.style("height",padding.bottom-10 +"px")
// 					.style("opacity",0.3);			
// 				d3.select("body").append("svg")
// 					.attr("id","Bar_svg_cover_assist")
// 					.style("position","absolute")
// 					.style("left",0+"px")
// 					.style("top",0+"px")
// 					.style("width",1000+"px")
// 					.style("height",1000+"px")

// 					.on("mousemove",function(){
// 						if (d3.event.x<width-padding.left+left)
// 						{
// 							d3.select("#Bar_svg_cover").style("width",d3.event.x-mousex+"px");
// 							d3.select("#Bar_svg_cover_axis_x").style("width",d3.event.x-mousex+"px");						
						
// 						}

// 					})
// 					.on("mouseup",function(){
// 						if (d3.event.x<=width-padding.left+left){
// 						d3.select("#Bar_svg_cover").style("width",Math.round((d3.event.x-mousex)/(xScale.rangeBand()))*xScale.rangeBand()+"px");
// 						d3.select("#Bar_svg_cover_axis_x").style("width",Math.round((d3.event.x-mousex)/(xScale.rangeBand()))*xScale.rangeBand()+"px");
						
// 						var Drag_x_value_End=Math.round((d3.event.x-mousex)/(xScale.rangeBand()))+Drag_x_value;
// 						if (Drag_x_value<=(Drag_x_value_End-1)){
// 						console.log(xname+":["+Drag_x_value+","+(Drag_x_value_End-1)+"]");
// 						/*var assist1=[];
// 						var ii=0;
// 						for (i=Drag_x_value;i<=(Drag_x_value_End-1);i++){
// 							assist1[ii]=dataset_y[i];
// 							ii++;
							
// 						}
// 						console.log(Drag_x_value);
// 						var rects_cover = svg.selectAll(".MyRect_cover")
// 							.data(assist1)
// 							.enter()
// 							.append("rect")
// 							.attr("class","MyRect_cover")
// 							.style("fill","rgb(21,193,156)")
// 							.attr("transform","translate(" + padding.left + "," + padding.top + ")")
// 							.attr("x", function(d,i){
// 								console.log(Drag_x_value);
// 								return xScale(i+Drag_x_value) + rectPadding/2;
// 							} )
// 							.attr("width", xScale.rangeBand() - rectPadding )
// 							.attr("y",function(d){
// 								return yScale(d);
// 							})
// 							.attr("height", function(d){
// 								return height - padding.top - padding.bottom - yScale(d);
// 							});*/

// 						Bar_Svg_Cover_Remove(Math.max(padding.left+left,mousex)+Math.round((d3.event.x-mousex)/(xScale.rangeBand()))*xScale.rangeBand(),height-padding.bottom+top);}
// 						}
						
// 						else{
// 						d3.select("#Bar_svg_cover").style("width",width-padding.left-mousex+left+"px");
// 						d3.select("#Bar_svg_cover_axis_x").style("width",width-padding.left-mousex+left+"px");
						
// 						var Drag_x_value_End=Math.round((width-padding.left-mousex+left)/(xScale.rangeBand()))+Drag_x_value;
// 						if (Drag_x_value<=(Drag_x_value_End-1)){
// 						console.log(xname+":["+Drag_x_value+","+(Drag_x_value_End-1)+"]");
// 						Bar_Svg_Cover_Remove(width-padding.left+left,top-padding.bottom+height);}
// 					}

// 						d3.select(this).remove()
// 				});
// 				}
// 				else if(MouseX<=left+padding.left)
// 				{
// 				d3.select("#Bar_svg_cover_y").remove();
// 				d3.select("#Bar_svg_cover_y_axis").remove();
// 				div.append("svg")
// 					.attr("id","Bar_svg_cover_y")
// 					.style("position","absolute")
// 					.style("background","#FFFFFF")
// 					.style("top",Math.max(padding.top+top,mousey)+"px")
// 					.style("left",padding.left+left+"px")
// 					.style("width",width-padding.left-padding.right+"px")
// 					.style("height",0 +"px")
// 					.style("opacity",0.3);
// 				div.append("svg")
// 					.attr("id","Bar_svg_cover_y_axis")
// 					.style("position","absolute")
// 					.style("background","rgb(21,193,156)")
// 					.style("top",Math.max(padding.top+top,mousey)+"px")
// 					.style("left",left+10+"px")
// 					.style("width",padding.left-10+"px")
// 					.style("height",0 +"px")
// 					.style("opacity",0.3);
// //-webkit-user-select:none;
// //cursor:default;
// 				d3.select("body").append("svg")
// 					.attr("id","Bar_svg_cover_assist_y")
// 					.style("position","absolute")
// 					.style("left",0+"px")
// 					.style("top",0+"px")
// 					.style("width",1000+"px")
// 					.style("height",1000+"px")
// 					.on("mousemove",function(){
// 						if (d3.event.y<top+height-padding.bottom)
// 						{
// 							d3.select("#Bar_svg_cover_y").style("height",d3.event.y-mousey+"px");
// 							d3.select("#Bar_svg_cover_y_axis").style("height",d3.event.y-mousey+"px");
// 						}

// 					})
// 					.on("mouseup",function(){
// 						if (d3.event.y<=top+height-padding.bottom-padding.top){
// 						d3.select("#Bar_svg_cover_y")
// 							.style("height",Math.round((d3.event.y-mousey)/Bar_pery)*Bar_pery+"px");
// 						d3.select("#Bar_svg_cover_y_axis")
// 							.style("height",Math.round((d3.event.y-mousey)/Bar_pery)*Bar_pery+"px");
// 						var Drag_y_value_End=Drag_y_value-Math.round((d3.event.y-mousey)/Bar_pery);
// 						if (Drag_y_value>Drag_y_value_End){
// 							console.log(yname+":["+Drag_y_value_End+","+Drag_y_value+"]");
// 						}
// 						}
// 						else{
// 						d3.select("#Bar_svg_cover_y").attr("height",top+height-padding.bottom-mousey)
// 							.style("height",top+height-padding.bottom-mousey+"px");
// 						d3.select("#Bar_svg_cover_y_axis").attr("height",top+height-padding.bottom-mousey)
// 							.style("height",top+height-padding.bottom-mousey+"px");
// 						var Drag_y_value_End=Drag_y_value-Math.round((top+height-padding.bottom-mousey)/Bar_pery);
// 						if (Drag_y_value>Drag_y_value_End){
// 							console.log(yname+":["+Drag_y_value_End+","+Drag_y_value+"]");
// 						}
// 						}

// 						d3.select(this).remove()
// 					});
// 				}
// 			});

for (var i=0;i<=6;i++)
    {
    	svg.append("line")
    		.attr("x1",padding.left)
    		//.attr("y1",height-((height-padding.top)/Math.round(d3.max(dataset)))*i)
    		.attr("y1",height-padding.top-((height-padding.top-padding.bottom)/6)*i)
    		.attr("x2",width-padding.right)
            //.attr("y2",height-((height-padding.top)/Math.round(d3.max(dataset)))*i)
            .attr("y2",height-padding.top-((height-padding.top-padding.bottom)/6)*i)
            .style("stroke","rgb(230,230,230)")
            .style("stroke-width","0.2");
        /*svg.append("text")
            .style("fill","rgb(255,255,255)")
            .attr("x",10)
            .attr("y",height-padding.top-((height-padding.top-padding.bottom)/6)*i+5)
            .style("font-family","Tahoma")
            .style("font-size",12+"px")
            .text(parseInt(Math.round(d3.max(dataset))/6*i))*/
    }
	svg.append("text")
            .style("fill","rgb(255,255,255)")
            .attr("x",10)
            .attr("y",height-padding.top-((height-padding.top-padding.bottom)/6)*i+20)
            .text(yname)
            .style("font-size",12+"px")




function Bar_Svg_Cover_Remove(left,top){
	/*var circle=div.append("svg")
		.attr("id","Bar_Svg_Cover_Remove")
		.style("position","absolute")
		.style("left",left+"px")
		.style("top",top+"px")
		.style("width",12+"px")
		.style("height",12+"px")
		.on("mousedown",function(){
				d3.select("#Bar_svg_cover_y").remove();
				d3.select("#Bar_svg_cover").remove();
				d3.select("#Bar_svg_cover_axis_x").remove();
				d3.select("#Bar_svg_cover_y_axis").remove();
				d3.select("#Bar_Svg_Cover_Remove").remove();
				d3.selectAll(".MyRect_cover").remove();
		})
		.append("circle")
		.attr("id","Bar_circle_Cover_Remove")
        .attr('cx',5)
        .attr('cy',5)
        .attr('r',4)
        .attr('stroke','red')
	    .attr('stroke-width',2)
	    .style('fill','red');*/
};

	//添加矩形元素
	var rects = svg.selectAll(".MyRect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("class","MyRect")
		.style("opacity",0.8)
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.attr("x", function(d,i){
			return rectPadding / 2 + Bar_perx * i ;
			// return xScale(i) + rectPadding/2;
		} )
		.attr("width", Bar_perx - rectPadding )
		/*.attr("y",function(d){
			var min = yScale.domain()[0];
			return yScale(min);
		})
		.attr("height", function(d){
			return 0;
		})
		.transition()
		.delay(function(d,i){
			return i * 100;
		})
		.duration(500)
		.ease("bounce")*/
		.attr("y",function(d){
			return yScale(d);
		})
		.attr("height", function(d){
			return height - padding.top - padding.bottom - yScale(d);
		})
		.style("fill","#15c19c")
		.attr("rx",2)
		.attr("ry",2)
		// .on("mousemove",function(d,i){
			// svg.append("rect").attr("class","MyRect_hover")
			// 	/*.style("opacity",0.5)*/
			// 	.attr("transform","translate(" + padding.left + "," + padding.top + ")")
			// 	.attr("x", rectPadding / 2 + xScale.rangeBand() * i)
			// 	.attr("width", 1)
			// 	.attr("y",yScale(d))
			// 	.attr("height",height - padding.top - padding.bottom - yScale(d))
			// 	.style("fill","#ff6e1c")
				
			// svg.append("rect").attr("class","MyRect_hover")
			// 	/*.style("opacity",0.5)*/
			// 	.attr("transform","translate(" + padding.left + "," + padding.top + ")")
			// 	.attr("x", rectPadding / 2 + xScale.rangeBand() * i+xScale.rangeBand() - rectPadding-1)
			// 	.attr("width", 1)
			// 	.attr("y",yScale(d))
			// 	.attr("height",height - padding.top - padding.bottom - yScale(d))
			// 	.style("fill","#ff6e1c")
				
			// svg.append("rect").attr("class","MyRect_hover")
			// 	/*.style("opacity",0.5)*/
			// 	.attr("transform","translate(" + padding.left + "," + padding.top + ")")
			// 	.attr("x", rectPadding / 2 + xScale.rangeBand() * i+1)
			// 	.attr("width", xScale.rangeBand() - rectPadding-2)
			// 	.attr("y",yScale(d))
			// 	.attr("height",1)
			// 	.style("fill","#ff6e1c")
		// })
		// .on("mouseleave",function(){
		// 	d3.selectAll(".MyRect_hover").remove();
		// });

	//添加文字元素
	// var texts = svg.selectAll(".MyText")
	// 	.data(dataset)
	// 	.enter()
	// 	.append("text")
	// 	.style("-webkit-user-select","none")
	// 	.style("font-size",10+"px")
 //        .style("fill","#444")
	// 	.attr("class","MyText")
	// 	.attr("transform","translate(" + padding.left + "," + padding.top*2/3 + ")")
	// 	.attr("x", function(d,i){
	// 		return rectPadding / 2 + xScale.rangeBand() * i;
	// 	} )
	// 	.attr("dx",function(){
	// 		return (xScale.rangeBand() - rectPadding)/2;
	// 	})
	// 	.attr("dy",function(d){
	// 		return 17;
	// 	})
	// 	.text(function(d){
	// 		return d;
	// 	})
		/*.attr("y",function(d){
			var min = yScale.domain()[0];
			return yScale(min);
		})
		.transition()
		.delay(function(d,i){
			return i * 100;
		})
		.duration(500)
		.ease("bounce")*/
		// .attr("y",function(d){
		// 	return yScale(d)-12;
		// });
	/*var xScale = d3.scale.ordinal()
		.domain(dataset_x)
		.rangeRoundBands([0, width - padding.left - padding.right]);
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");
		console.log(padding.left+dataset_x.length*xScale.rangeBand()+xScale.rangeBand()/2)*/

//svg.append("text")
//	.attr("x", padding.left+(dataset_x.length-1)*xScale.rangeBand()+xScale.rangeBand()/2+15)
//	.attr("y", height-padding.bottom+15)
//	.style("font-size",12+"px")
//	.style("fill","white")
//	.style("font-family","Tahoma")
//	.text(xname)

	//添加x轴
	/*svg.append("g")
		.attr("class","axis")
		.attr("transform","translate(" + padding.left + "," + (height - padding.bottom) + ")")
		.call(xAxis)
		.append("text")
		.attr("class", "label")
		.attr("x", width-padding.left-padding.right/2)
		.attr("y", 25)
		.style("text-anchor", "end")
		.style("-webkit-user-select","none")
		.text(xname);*/ 
		
	//添加y轴
	/*svg.append("g")
		.attr("class","axis")
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.call(yAxis)
		.append("text")
		.attr("class","label")
		.attr("x",0)
		//.attr("transform", "rotate(90)")
		.attr("transform","translate("+(0)+","+(-padding.bottom)+")")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.style("-webkit-user-select","none")
		.text(yname);*/
}