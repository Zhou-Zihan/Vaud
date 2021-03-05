
let compare_data=[]

d3.select("#compare")
	    .attr("class","newnodetip")
	    .on("click", function () {
	    	if(d3.selectAll("#compare_panel")[0][0]==undefined){
	    		d3.selectAll(".mouse_on_tag").remove();
			    	var comparepanel=d3.select("#leftmenu").append("div")
			    		.attr("id","compare_panel")
				    	.style("height","600px")
				    	.style("width","1373px")
				    	.style("top","200px")
				    	.style("left","40px")
				    	.style("opacity","0")
				    	.style("position","absolute")
				    	.style("background-color","white")
				    
					addcompare("compare_panel");


					comparepanel.transition().ease("linear")
	                    .duration(300).delay(0)
	                    .style("opacity","1") 
				}else{
					d3.selectAll("#compare_panel").remove()
				}
	    })
	  	.on("mousemove", function () {
	        if(d3.selectAll("#compare_panel")[0][0]==undefined&&
	        			d3.select("#compare").select(".mouse_on_tag")[0][0]==undefined){
	            d3.select("#compare").append("div")
	                .attr("class","mouse_on_tag").style("opacity","0")
	                .text("Compare")
	                .append("svg").attr("class","mouse_on_tag_xiaosanjiao")
	                .append('polygon')
	                .attr('style', 'fill:rgb(48,48,48);')
	                .attr('points', '0,20 6,15 6,25')

	             d3.select("#compare").select(".mouse_on_tag").transition()
                    .ease("linear")
                    .duration(300)
                    .delay(0)
                    .style("opacity","1") 
	        }
	    })
	    .on("mouseout", function () {
	        d3.select("#compare").selectAll(".mouse_on_tag").remove();
	    })


d3.select("#compare")
	.append("img").style("pointer-events","none")
    .attr("src","image/compare.png")
    .style("position","absolute")
    .style("height","24px")
    .style("width","24px")
    .style("left","8px").style("top","8px");
 

 function addcompare(x){
        let name=$('#'+x)
        //   清空
        name.children().each((x,y)=>{
            y.remove()
        })

		d3.select('#'+x).append("div")
				    	.style("width","100%")
				    	.style("padding","10px 0px 10px 0")
				    	.style("text-align","center")
				    	.style("background-color","rgb(229,229,229)")
				    	.text("Compare panel")



        //  添加每个小面板，宽度最大，高度给定
        name.append(`<div id="${x}_panel" style="position:relative; overflow:scroll; height:560px;width:100%;">`)
        let panel=$(`#${x}_panel`)
        compare_data.forEach((compare_data,index)=>{
            //  外面套了一层自适应给定间隔换行
            panel.append(`<div float:left style="padding:20px 20px 20px 20px;display:inline-block";>
            	<div id="home_panel_id_${index}" style="height:300px;width:300px"></div></div>`)
            myChart = echarts.init(document.getElementById('home_panel_id_'+index))
            //  其实只要把series里面的type改一下就好了，但不知道这两个图会不会有不同的其他操作地方，所以写了两个
            if(compare_data.type=='line'){
                option = {
                    title : {
                    	left: 'center',
                        text: compare_data.title,
                        subtext:  compare_data.subtitle,
                        textStyle: {fontSize: 12}
                    },grid: {
                        left: '0',
                        right: '20%',
                        bottom:'5%',
                        containLabel: true
                		},
                    tooltip : {
                        trigger: 'axis'
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            name : compare_data.xName,
                            type : 'category',
                            data : compare_data.xArr
                        }],
                    yAxis : [{
                            name : compare_data.yName,
                            type : 'value'}],
                    series : [{name: compare_data.title,
                            type:'line',
                            data: compare_data.yArr,
                            lineStyle: {normal: {curveness: 0.3,color: 'rgba(21,193,156,0.5)'}}
                        }]
                };
            }
            if(compare_data.type=='bar'){
                option = {

                    color: ['#15c19c'],
                    tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                     },
                    title : {
                        text: compare_data.title
                    },grid: {
                            left: '10%',
                    right: '20%',
                    containLabel: true
                		},
                    toolbox: {
                        show : true,
                        feature : {
                            dataView : {show: true, readOnly: false},
                        }
                    },
                    xAxis : [
                        {
                            name : compare_data.xName,
                            type : 'category',
                            data : compare_data.xArr
                        }
                    ],
                    yAxis : [
                        {
                            name : compare_data.yName,
                            type : 'value'
                        }
                    ],
                    series : [{
                            name: compare_data.yName,
                            type:'bar',
                            data: compare_data.yArr,

                        }]
                };
            }
            console.log(compare_data.yName)
            myChart.setOption(option)
        })
    }