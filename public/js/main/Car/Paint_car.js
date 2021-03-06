/**
 * Created by Administrator on 2016/3/23.
 */
/*************
 * @ car
 */

function paint_cartraj(car){
    var data=car.data;

    if(data.texiInfo.length>0){
        var polylinelist=[],
            latlngs = "",
            heatpath=[],
            path=[],
            ispassengerin=data.texiInfo[0].ispassengerin,
            trajpointnum=0;
            console.log()

        let tformat = d3.time.format("%Y-%m-%dT%H:%M");
        for (var i = 0; i < data.texiInfo.length; i++) {
            if(data.texiInfo[i].time<=timearea[1]&&
               data.texiInfo[i].time>=timearea[0]){
                var p=map.latLngToContainerPoint(
                    L.latLng(data.texiInfo[i].latitude, data.texiInfo[i].longitude)
                )
                latlngs=latlngs+ p.x+","+ p.y+" ";
                heatpath.push([data.texiInfo[i].latitude, data.texiInfo[i].longitude,10])
                path.push({lat: p.x,lon: p.y,ispassengerin:data.texiInfo[i].ispassengerin})
                trajpointnum++;
                if(data.texiInfo[i].ispassengerin!=ispassengerin){
                    polylinelist.push({path:latlngs,ispassengerin:ispassengerin})
                    latlngs=p.x+","+ p.y+" "
                }
                ispassengerin=data.texiInfo[i].ispassengerin;
            }
        }

        polylinelist.push({path:latlngs,ispassengerin:ispassengerin})
        /***************************
         draw car traj
         *************************/
        for(var i=0;i<polylinelist.length;i++){
            var polyline=d3.select("#mapobjectsvg")
                .append('polyline')
                .attr("id","car_traj"+data.ID)
                .style("pointer-events","none")
                .attr('points', polylinelist[i].path)
            if(car.ismove!=0){
                var polylineupper = d3.select("#mapobjectsvg")
                    .append('polyline')
                    .attr("id","car_traj"+data.ID)
                    .attr('points', polylinelist[i].path);
                if(polylinelist[i].ispassengerin==0){
                    polylineupper.attr('class',"cartraj cartrajismove");
                    polyline.attr("class","cartraj cartrajismovebg")
                }
                else{
                    polylineupper.attr("class","cartraj cartrajismove cartrajpassagein");
                    polyline.attr("class","cartraj cartrajismovebg");
                }
            }else{
                if(polylinelist[i].ispassengerin==0)
                    polyline.attr("class","cartraj cartrajisnotmove")
                else
                    polyline.attr("class","cartraj cartrajisnotmove cartrajpassagein")

            }
        }
    }
}

function highlightpaint_cartraj(car){
    if(car.highlight!=0) {
        //setHeatmap(heatpath);
        var highlightcar = d3.select("#sceneviewfold")
            .append("div")
            .attr("class", "highlightcar")
            .style("z-index", car.highlight)
            .on("mouseup", function () {
                for (var i = 0; i < map_object.length; i++) {
                    if (map_object[i].highlight > car.highlight) {
                        map_object[i].highlight--;
                    }
                }
                car.highlight = map_highlightzindex - 1;
                repaint_map_object();
            });
        //drag
        highlightcar.append("div")
            .attr("class","highlightcartitle")
            .text(car.data.ID)
            .on("mousedown",function(){
                d3.select("body").append("svg")
                    .style("position","absolute")
                    .style("z-index","1000")
                    .style("width","100%")
                    .style("left",0)
                    .style("top",0)
                    .style('height',"100%")
                    .on("mousemove",function(){
                        highlightcar.style("left",(d3.event.x-105)+"px")
                            .style("top",(d3.event.y-15)+"px")
                    })
                    .on("mouseup",function(){
                        d3.select(this).remove();
                    })
            })

        /***************************
         fetch a point on the trajactory
         *************************/
        highlightcar.append("div")
            .attr("class","highlightcarattr")
            .text("Extract a point on the trajactory")
            .on("mousedown", function () {
                positionselection=[];
                for (var i = 0; i < car.data.texiInfo.length; i++) {
                    console.log()
                    if(car.data.texiInfo[i].time<timearea[1]&&
                        car.data.texiInfo[i].time>timearea[0]){
                        positionselection.push({nodecount:car.node,data:car.data.texiInfo[i],id:car.data.ID})
                    }
                }
                repaint_map_carpositionselection();
            })

        showcarchart(car,highlightcar);

        highlightcar.append("img")
            .attr("src", "image/map_objlist_car.svg")
            .style("position","absolute")
            .style("top","0px")
            .attr("height", "28px")
            .attr("width", "28px");

        //delete
        highlightcar.append("img")
            .attr("src","image/delete.svg")
            .style("position","absolute")
            .style("height","16px")
            .style("width","16px")
            .style("top","6px")
            .style("right","8px")
            .style("cursor","pointer")
            .on("mousedown", function () {
                car.highlight = 0;
                highlightrepaint_map_object();
            })
    }
}

function showcarchart(car,highlightcar) {
    //load data
    var data=car.data;
    var nodenum=car.node;
    var thisdata=[]
    for (var i = 0; i < data.texiInfo.length; i++) {
        if(data.texiInfo[i].time<timearea[1]&&
            data.texiInfo[i].time>timearea[0]){
            thisdata.push(data.texiInfo[i])
        }
    }

    //chart div
    highlightcar.selectAll(".chart").remove()
    var chartdiv = highlightcar.append("div")
        .style("position","absolute")
        .style("top","62px")
        .attr("class", "chart")
        .style("width", "100%")
        .style("height", "260px")
        .style("border-top","1px solid #ccc")



    //speed
        chartdiv.append("div")
            .text("The statistical graph of speed")
            .style("cursor","default")
            .style("font-size","13px")
            .style("position","absolute")
            .style("left","42px")
            .style("top","5px")
            .style("color","#000")
        chartdiv.append("div")
            .text("frequency")
            .style("cursor","default")
            .style("font-size","10px")
            .style("font-weight","lighter")
            .style("position","absolute")
            .style("left","3px")
            .style("top","23px")
            .style("color","#000")
        chartdiv.append("div").style("font-size","10px")
            .text("speed").style("cursor","default")
            .style("position","absolute")
            .style("right","3px")
            .style("bottom","5px")
            .style("color","#000")
        var speedchartdata = []
        for (var i = 0; i < 100; i++) {
            speedchartdata.push([0])
        }
        for (var i = 0; i < thisdata.length; i++) {
            if (thisdata[i].speed != 0&&thisdata[i].speed<100) {
                speedchartdata[thisdata[i].speed]++;
            }
        }
        paint_linechart(speedchartdata, "speed", "frequency", 250, 230, 0, 20, chartdiv, nodenum);


        //add to compare
        var compare_tip=chartdiv.append("div")
            .style("cursor","pointer")
            .style("height","17px")
            .style("width","17px")
            .style("position","absolute")
            .style("left","225px")
            .style("top","41px")
            .style("background-color","rgb(21,193,156)")

        compare_tip.append("img").style("pointer-events","none")
            .attr("src","image/query_addNode.svg")
            .style("position","absolute")
            .style("height","17px")
            .style("width","17px")
            .style("left","0px").style("top","0px")

        compare_tip.on("click",function(e){
                d3.select("#sceneviewfold").append("div").style("background",
                        "url(image/compare.png) no-repeat").attr("id","animation_add_to_comparepanel")
                    .style("background-size","100% 100%")
                    .style("width","50px")
                    .style("height","50px")
                    .style("border","4px solid rgb(21,193,156)")
                    .style("position","absolute")
                    .style("left",d3.event.x+"px")
                    .style("top",d3.event.y+"px")
                    .style("z-index","200")

                d3.select("#animation_add_to_comparepanel").transition()
                            .ease("linear")
                            .duration(300)
                            .delay(0)
                            .style("left","40px") 
                            .style("top",$("#sceneviewfold").height()-1+200+"px")
                            .style("width","32px")
                            .style("height","32px")
                d3.select("#animation_add_to_comparepanel").transition()
                            .ease("linear").duration(0).delay(300)
                            .remove();

                d3.select("#sceneviewfold").append("div").attr("id","animation_add_to_comparepaneltext")
                            .style("padding","10px 12px 0 12px")
                            .text("+1")
                            .style("color","rgb(21,193,156)")
                            .style("font-size","20px")
                            .style("left","40px") 
                            .style("top",$("#sceneviewfold").height()-1+200+"px")
                            .style("width","32px")
                            .style("height","32px")
                            .style("position","absolute")
                            .style("opacity","0")
                

                d3.select("#animation_add_to_comparepaneltext").transition()
                            .ease("linear").duration(1).delay(300).style("opacity","1")
                d3.select("#animation_add_to_comparepaneltext").transition()
                            .ease("linear").duration(500).delay(400)
                            .style("opacity","0.1")
             d3.select("#animation_add_to_comparepaneltext").transition()
                            .ease("linear").duration(0).delay(1000).remove()

                data={};
                data.title='Speed-count of '+thisdata[0].name
            var time = Math.floor(timearea[0]/60);
            data.subtitle=thisdata[0].date+" "+(Array(2).join(0)+time).slice(-2)+":"
            var time = timearea[0]%60;
            data.subtitle=data.subtitle+(Array(2).join(0)+time).slice(-2)+"~"
            var time = Math.floor(timearea[1]/60);
            data.subtitle=data.subtitle+(Array(2).join(0)+time).slice(-2)+":"
            var time = timearea[1]%60;
            data.subtitle=data.subtitle+(Array(2).join(0)+time).slice(-2)


                data.xName='speed'
                data.yName='count'
                data.type='line'
                data.xArr=[]
                data.yArr=[]
                for (var i = 1; i < 100; i++) {
                    data.xArr.push(i+"km/h")
                    data.yArr.push(speedchartdata[i])
                }
                compare_data.push(data)

                if(d3.select("#compare_panel")[0][0]!=undefined){
                    addcompare("compare_panel");
                }
            })
            .on("mousemove", function () {
                    if(d3.select(this).select("div")[0][0]==undefined){
                        d3.select(this).append("div").style("height","100%")
                            .style("position","absolute")
                            .style("top","0px")
                            .style("left","17px")
                            .style("background-color","rgb(21,193,156)")
                            .style("position","absolute")
                            .text("Compare")
                            .style("color","#fff").style("font-size","10px")
                            .style("opacity","0") 

                         d3.select(this).select("div").transition()
                            .ease("linear")
                            .duration(300)
                            .delay(0)
                            .style("opacity","1") 
                    }
                })
                .on("mouseout", function () {
                    d3.select(this).selectAll("div").remove();
                })

  
        //draw heatmap
        var latlngs=[];
        for (var i = 0; i < thisdata.length; i++) {
            latlngs.push(L.latLng(thisdata[i].latitude, thisdata[i].longitude))
        }
        // {gradient:{0: '#ffffff',0.8: 'red'}
        Heatmap_Object.setOptions({radius: 10,max: thisdata.length/5000*mapheatmap_value})
        objectheat_latlon=latlngs;
        heatmapalive_detection()
    
}

function paint_carlisttraj(carlist){
    var data=carlist.data;
    /***************************
     loaddata
     *************************/
     var thislistnum=0;
        data.forEach(car=>{
                   var polylinelist = [],
                    latlngs = "",
                    heatpath = [],
                    path = [],
                    carid=car.ID,
                    ispassengerin = car.texiInfo[0].ispassengerin,
                    trajpointnum = 0;
                    isintime=false;
                for ( let cell of car.texiInfo) {
                     if(cell.time<=timearea[1] && cell.time>=timearea[0]){
                        isintime=true;
                        var p = map.latLngToContainerPoint(
                            L.latLng(cell.latitude, cell.longitude)
                        )
                        latlngs = latlngs + p.x + "," + p.y + " ";
                        heatpath.push([cell.latitude, cell.longitude, 10])
                        path.push({lat: p.x, lon: p.y, ispassengerin: cell.ispassengerin})
                        trajpointnum++;
                        if (cell.ispassengerin != ispassengerin) {
                            polylinelist.push({id:carid,path: latlngs, ispassengerin: ispassengerin})
                            latlngs = p.x + "," + p.y + " "
                            carid=car.ID;
                        }
                        ispassengerin = cell.ispassengerin;
                    }
                }
                polylinelist.push({id:carid,path: latlngs, ispassengerin: ispassengerin})
                /***************************
                 draw car traj
                 *************************/
                
                if(isintime){
                    thislistnum++;
                }

                for (var i = 0; i < polylinelist.length; i++) {
                    var polyline = d3.select("#mapobjectsvg")
                        .append('polyline')
                        .attr('points', polylinelist[i].path)
                        .attr("carid", polylinelist[i].id)
                        .attr("id","carlist_traj"+carlist.id)
                        .on("mouseup",function(){
                            console.log(d3.select(this).attr("opacity"))
                            add_mapobject("car",d3.select(this).attr("carid"),carlist.node)
                        });
                    if (carlist.ismove != 0) {
                        var polylineupper = d3.select("#mapobjectsvg")
                            .append('polyline')
                            .attr("id","carlist_traj"+carlist.id)
                            .attr('points', polylinelist[i].path);
                        if (polylinelist[i].ispassengerin == 0) {
                            polylineupper.attr('class', "cartraj cartrajismove");
                            polyline.attr("class", "cartraj cartrajismovebg carlisttrajpolyline")
                        }
                        else {
                            polylineupper.attr("class", "cartraj cartrajismove cartrajpassagein carlisttrajpolyline");
                            polyline.attr("class", "cartraj cartrajismovebg carlisttrajpolyline");
                        }
                    } else {
                        if (polylinelist[i].ispassengerin == 0)
                            polyline.attr("class", "cartraj cartrajisnotmove carlisttrajpolyline")
                        else
                            polyline.attr("class", "cartraj cartrajisnotmove cartrajpassagein carlisttrajpolyline")
                    }
                }
        })

        let alpha=1;
         if(thislistnum>40)
                alpha=0.5;
         if(thislistnum>100)
                alpha=0.4;
         if(thislistnum>500)
                alpha=0.3;
            if(thislistnum>1000)
                alpha=0.2;
            if(thislistnum>2000)
                alpha=0.1;
            if(thislistnum>3000)
                alpha=0.06;
         // console.log(alpha) 
            
    d3.select("#mapobjectsvg").selectAll(".carlisttrajpolyline").style("stroke-opacity",alpha)
                    .attr("opacity",alpha)
}

function highlightpaint_carlisttraj(carlist){
    if(carlist.highlight!=0) {

        var highlightcar = d3.select("#sceneviewfold")
            .append("div")
            .attr("class", "highlightcar")
            .style("z-index", carlist.highlight)
            .on("mouseup", function () {
                for (var i = 0; i < map_object.length; i++) {
                    if (map_object[i].highlight > carlist.highlight) {
                        map_object[i].highlight--;
                    }
                }
                carlist.highlight = map_highlightzindex - 1;
                repaint_map_object();
            });
        //drag
        highlightcar.append("div")
            .attr("class","highlightcartitle")
            .text(carlist.id)
            .on("mousedown",function(){
                d3.select("body").append("svg")
                    .style("position","absolute")
                    .style("z-index","1000")
                    .style("width","100%")
                    .style("left",0)
                    .style("top",0)
                    .style('height',"100%")
                    .on("mousemove",function(){
                        highlightcar.style("left",(d3.event.x-150)+"px")
                            .style("top",(d3.event.y-15)+"px")
                    })
                    .on("mouseup",function(){
                        d3.select(this).remove();
                    })
            })
        showcarlistchart(carlist,highlightcar);

        highlightcar.append("img")
            .attr("src", "image/map_objlist_car.svg")
            .style("position","absolute")
            .style("top","0px")
            .attr("height", "28px")
            .attr("width", "28px");

        //delete
        highlightcar.append("img")
            .attr("src","image/delete.svg")
            .style("position","absolute")
            .style("height","16px")
            .style("width","16px")
            .style("top","6px")
            .style("right","8px")
            .style("cursor","pointer")
            .on("mousedown", function () {
                carlist.highlight = 0;
                highlightrepaint_map_object();
            })
    }
}

function showcarlistchart(carlist,highlightcar) {
    var data=carlist.data;
    var nodenum=carlist.node;
    var thisdata=[]
    data.forEach(car=>{
        car.texiInfo.forEach(cell=>{
            if(cell.time<=timearea[1]&&cell.time>=timearea[0]){
                thisdata.push(cell)
            }
        })
    })

    highlightcar.selectAll(".chart").remove()
    var chartdiv = highlightcar.append("div")
        .style("position","absolute")
        .style("top","38px")
        .attr("class", "chart")
        .style("width", "100%")
        .style("height", "280px")
        .style("border-top","1px solid #ccc")

        //speed
        chartdiv.append("div")
            .text("The statistical graph of speed")
            .style("cursor","default")
            .style("font-size","13px")
            .style("position","absolute")
            .style("left","42px")
            .style("top","15px")
            .style("color","#000")
        chartdiv.append("div")
            .text("frequency")
            .style("cursor","default")
            .style("font-size","10px")
            .style("font-weight","lighter")
            .style("position","absolute")
            .style("left","3px")
            .style("top","43px")
            .style("color","#000")
        chartdiv.append("div").style("font-size","10px")
            .text("speed").style("cursor","default")
            .style("position","absolute")
            .style("right","3px")
            .style("bottom","5px")
            .style("color","#000")
        var speedchartdata = []
        for (var i = 0; i < 100; i++) {
            speedchartdata.push(0)
        }
        for (var i = 0; i < thisdata.length; i++) {
            if (thisdata[i].speed != 0&&thisdata[i].speed<100) {
                speedchartdata[thisdata[i].speed]++;
            }
        }
        var sum=0;
        for(var i=1;i<speedchartdata.length;i++){
            sum+=speedchartdata[i];
        }
        var thisspeedchartdata=[];
        for(var i=1;i<speedchartdata.length;i++){
            thisspeedchartdata.push(Math.round(speedchartdata[i]/sum*10000)/100)
        }

        paint_linechart(thisspeedchartdata, "speed", "frequency", 250, 230, 0, 40, chartdiv, nodenum);
        
        
        //add to compare
        var compare_tip=chartdiv.append("div")
            .style("cursor","pointer")
            .style("height","17px")
            .style("width","17px")
            .style("position","absolute")
            .style("left","225px")
            .style("top","41px")
            .style("background-color","rgb(21,193,156)")

        compare_tip.append("img").style("pointer-events","none")
            .attr("src","image/query_addNode.svg")
            .style("position","absolute")
            .style("height","17px")
            .style("width","17px")
            .style("left","0px").style("top","0px")

        compare_tip.on("click",function(e){
                d3.select("#sceneviewfold").append("div").style("background",
                        "url(image/compare.png) no-repeat").attr("id","animation_add_to_comparepanel")
                    .style("background-size","100% 100%")
                    .style("width","50px")
                    .style("height","50px")
                    .style("border","4px solid rgb(21,193,156)")
                    .style("position","absolute")
                    .style("left",d3.event.x+"px")
                    .style("top",d3.event.y+"px")
                    .style("z-index","200")

                d3.select("#animation_add_to_comparepanel").transition()
                            .ease("linear")
                            .duration(300)
                            .delay(0)
                            .style("left","40px") 
                            .style("top",$("#sceneviewfold").height()-1+200+"px")
                            .style("width","32px")
                            .style("height","32px")
                d3.select("#animation_add_to_comparepanel").transition()
                            .ease("linear").duration(0).delay(300)
                            .remove();

                d3.select("#sceneviewfold").append("div").attr("id","animation_add_to_comparepaneltext")
                            .style("padding","10px 12px 0 12px")
                            .text("+1")
                            .style("color","rgb(21,193,156)")
                            .style("font-size","20px")
                            .style("left","40px") 
                            .style("top",$("#sceneviewfold").height()-1+200+"px")
                            .style("width","32px")
                            .style("height","32px")
                            .style("position","absolute")
                            .style("opacity","0")
                

                d3.select("#animation_add_to_comparepaneltext").transition()
                            .ease("linear").duration(1).delay(300).style("opacity","1")
                d3.select("#animation_add_to_comparepaneltext").transition()
                            .ease("linear").duration(500).delay(400)
                            .style("opacity","0.1")
             d3.select("#animation_add_to_comparepaneltext").transition()
                            .ease("linear").duration(0).delay(1000).remove()

                data={};
                data.title='Speed-count of node'+nodenum


            var time = Math.floor(timearea[0]/60);
            data.subtitle=thisdata[0].date+" "+(Array(2).join(0)+time).slice(-2)+":"
            var time = timearea[0]%60;
            data.subtitle=data.subtitle+(Array(2).join(0)+time).slice(-2)+"~"
            var time = Math.floor(timearea[1]/60);
            data.subtitle=data.subtitle+(Array(2).join(0)+time).slice(-2)+":"
            var time = timearea[1]%60;
            data.subtitle=data.subtitle+(Array(2).join(0)+time).slice(-2)
                data.xName='speed'
                data.yName='count'
                data.type='line'
                data.xArr=[]
                data.yArr=[]
                for (var i = 1; i < 100; i++) {
                    data.xArr.push(i+"km/h")
                    data.yArr.push(speedchartdata[i])
                }
                compare_data.push(data)
                if(d3.select("#compare_panel")[0][0]!=undefined){
                    addcompare("compare_panel");
                }
            })
            .on("mousemove", function () {
                    if(d3.select(this).select("div")[0][0]==undefined){
                        d3.select(this).append("div").style("height","100%")
                            .style("position","absolute")
                            .style("top","0px")
                            .style("left","17px")
                            .style("background-color","rgb(21,193,156)")
                            .style("position","absolute")
                            .text("Compare")
                            .style("color","#fff").style("font-size","10px")
                            .style("opacity","0") 

                         d3.select(this).select("div").transition()
                            .ease("linear")
                            .duration(300)
                            .delay(0)
                            .style("opacity","1") 
                    }
                })
                .on("mouseout", function () {
                    d3.select(this).selectAll("div").remove();
                })
    
        //draw heatmap
        var latlngs=[];
        for (var i = 0; i < thisdata.length; i++) {
            latlngs.push(L.latLng(thisdata[i].latitude, thisdata[i].longitude))
        }
        // {gradient:{0: '#ffffff',0.8: 'red'}
        Heatmap_Object.setOptions({radius: 10,max: thisdata.length/50000*mapheatmap_value})
        objectheat_latlon=latlngs;
        heatmapalive_detection()

}

function repaint_map_carpositionselection() {
    d3.select("#mapobjectsvg").selectAll(".map_positionselection").remove();
    d3.select("#mapobjectsvg").selectAll(".selectcarpositionthis").remove();
    for (var i = 0; i < positionselection.length;i++){
        var latlon=[positionselection[i].data.latitude,positionselection[i].data.longitude]
        var p = map.latLngToContainerPoint(L.latLng(latlon[0], latlon[1]))

        d3.select("#mapobjectsvg")
            .append("image")
            .style("position","absolute")
            .style("height","20px")
            .style("width","20px")
            .attr("x",(p.x-10)+"px")
            .attr("y",(p.y-10)+"px")
            .attr("class", "map_positionselection")
            .style("pointer-events", "all")
            .attr("xlink:href", function(){
                if(i==positionselectionhigh)
                    return "image/map_objlist_car.svg"
                return "image/map_objlist_carempl.svg"
            })
            .attr("count",i)
            .attr("show",function(){
                if(i==positionselectionhigh)
                    return "true"
                return "false"})
            .on("mousedown", function () {
                d3.selectAll(".selectcarpositionthis")
                .attr("show","false")
                .attr("xlink:href", "image/map_objlist_carempl.svg")
                .attr("class", "map_positionselection")
                        .
                positionselectionhigh=d3.select(this).attr("count")
                d3.select(this).attr("show","true").attr("class","selectcarpositionthis");
                d3.selectAll(".carpoint").remove()

                var data=positionselection[d3.select(this).attr("count")];
                var latlon=[data.data.latitude,data.data.longitude]
                var p = map.latLngToContainerPoint(L.latLng(latlon[0], latlon[1]))

                var highg=d3.select("#mapobjectsvg").append("g")
                    .attr("class","carpoint")
                    .style("pointer-events", "all")
                    .attr("x",(p.x-120))
                    .attr("y",(p.y-90))
                highg.append("rect")
                    .attr("x",highg.attr("x")*1)
                    .attr("y",highg.attr("y")*1)
                    .style("width","240px")
                    .style("height","70px")
                    .style("fill","rgba(242,242,242,0.5)")
                    .attr("stroke","rgb(21,193,156)")
                    .attr("stroke-width","1")

                highg.append("image")
                    .style("position","absolute")
                    .style("height","20px")
                    .style("width","20px")
                    .attr("x",(highg.attr("x")*1+220)+"px")
                    .attr("y",(highg.attr("y")*1+2)+"px")
                    .attr("xlink:href", "image/delete.svg")
                    .style("cursor","pointer")
                    .on("mousedown", function () {
                        positionselectionhigh=-1;
                        d3.selectAll(".carpoint").remove();
                        positionselection=[];
                        repaint_map_carpositionselection();
                    })

                highg.append("text").attr("class","carpoint")
                    .text("A point on Taxi Trajectory")
                    .style("pointer-events", "all")
                    .attr("x",highg.attr("x")*1+10)
                    .attr("y",highg.attr("y")*1+20)
                    .style("fill","#000") .style("cursor","default")
                    .style("font-size","14px")
                    .attr("count",d3.select(this).attr("count"))

                let format = d3.time.format("%Y-%m-%d %H:%M:%S"),
                thiscelltime=format(positionselection[d3.select(this).attr("count")].data.time);
                highg.append("text")
                    .attr("class","carpoint")
                    .text("Time:   "+ thiscelltime)
                    .attr("x",highg.attr("x")*1+10)
                    .attr("y",highg.attr("y")*1+40)
                    .style("pointer-events", "all")
                    .style("fill","#15c19c")
                    .style("cursor","pointer")
                    .style("font-size","14px")
                    .attr("count",d3.select(this).attr("count"))
                    .on("mousedown",function(){
                        new_conditiondiv("timepoint",{date:thiscelltime.split(" ")[0],time:thiscelltime.split(" ")[1],id:positionselection[d3.select(this).attr("count")].id,source:"car"},
                            d3.event.x,d3.event.y,data.nodecount,1);
                    })


                highg.append("text").attr("class","carpoint")
                    .text("Extract Position")
                    .style("pointer-events", "all")
                    .attr("x",highg.attr("x")*1+10)
                    .attr("y",highg.attr("y")*1+60)
                    .style("cursor","pointer")
                    .style("fill","#15c19c")
                    .style("font-size","14px")
                    .attr("count",d3.select(this).attr("count"))
                    .on("mousedown",function(){
                        var data=positionselection[d3.select(this).attr("count")];
                        var latlon=[data.data.latitude,data.data.longitude]
                        new_conditiondiv("positionpoint",
                            {lat: latlon[0], lon: latlon[1],id:positionselection[d3.select(this).attr("count")].id,source:"car"}, d3.event.x, d3.event.y,data.nodecount, 1);
                    })

            })
            .on("mouseover", function () {
                d3.select(this).attr("xlink:href","image/map_objlist_car.svg")
            })
            .on("mouseout", function () {
                if(d3.select(this).attr("show")=="false")
                    d3.select(this).attr("xlink:href", "image/map_objlist_carempl.svg")
            })
    }
}
