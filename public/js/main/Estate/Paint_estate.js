/**
 * Created by Administrator on 2016/3/23.
 */
function paint_estatetraj(estate){
    /******************************************
     *       load data
     *******************************************/
    var data=estate.data;
    var p=map.latLngToContainerPoint(L.latLng(data.latitude, data.longitude))
    /******************************************
     *       draw poi
     *******************************************/

    var estatetraj=d3.select("#mapobjectsvg")
            .append("image")
            .attr("data",data)
            .style("position","absolute")
            .style("height","20px")
            .style("width","20px")
            .attr("x",(p.x-10)+"px")
            .attr("y",(p.y-10)+"px")
            .attr("class","blogtraj")
            .attr("xlink:href", "image/map_legend_estate.svg")
            .style("pointer-events","visiblepainted")
            .on("mouseup",function(){
                if(estate.highlight==0){
                    estate.highlight=map_highlightzindex;
                    map_highlightzindex++;

                }
                else{
                    for(var i=0;i<map_object.length;i++){
                        if(map_object[i].highlight>estate.highlight){
                            map_object[i].highlight--;
                        }
                    }
                    estate.highlight=0;
                }
                repaint_map_object();
                highlightrepaint_map_object();
            });
    
            if(estate.ismove!=0){
                estatetraj.style("height","40px")
                    .style("width","40px")
                    .attr("x",(p.x-20)+"px")
                    .attr("y",(p.y-20)+"px")
            }
            if(estate.highlight!=0){
                estatetraj.style("height","40px")
                    .style("width","40px")
                    .attr("x",(p.x-20)+"px")
                    .attr("y",(p.y-20)+"px")
            }
            
}

function highlightpaint_estatetraj(estate){
    /******************************************
     *       load data
     *******************************************/
    var data=estate.data;
    var p=map.latLngToContainerPoint(L.latLng(data.latitude, data.longitude))
    /***************************
     draw poi detail
     *************************/
    if(estate.highlight!=0&&(p.y-10)<428){
        var highlightestate = d3.select("#sceneviewfold")
            .append("div")
            .attr("class", "mappopestate")
            .style("z-index", estate.highlight)
            .style("left",(p.x*1+20)+"px")
            .on("mouseup",function(){
                if(!flag_is_textmouseup){
                    for(var i=0;i<map_object.length;i++){
                        if(map_object[i].highlight>estate.highlight){
                            map_object[i].highlight--;
                        }
                    }
                    estate.highlight=map_highlightzindex-1;
                    repaint_map_object();
                }
                else
                    flag_is_textmouseup=false;

            });
//            .style("top",  (p.y-120)+"px");


         highlightestate.append("div")
            .attr("class","mappoptitle")
            .text(estate.id);

        highlightestate.append("div")
            .attr("class","mappopattr mappopattrdrag")
            .text("Extract address")
            .on("mousedown",function(){
                 new_conditiondiv("positionpoint",
                    {lat:estate.data.latitude,lon:estate.data.longitude},d3.event.x,d3.event.y,estate.node,1);
            })
        highlightestate.append("img")
            .attr("class","mappopjiejing")
            .attr("src", "image/map_jiejing.svg")
            .on("mousedown",function(){
                highlightpaint_street_viewtraj(estate.data.longitude,
                    estate.data.latitude);
            })

        highlightestate.append("img")
            .attr("class","mappopicon")
            .attr("src", "image/map_objlist_estate.svg")

        //delete
         highlightestate.append("img")
             .attr("class","mappopdelete")
            .attr("src","image/delete.svg")
             .style("z-index","10")
            .on("mousedown", function () {
                estate.highlight=0;
                console.log(estate.highlight)
                repaint_map_object();
                highlightrepaint_map_object();
            });

        highlightestate.append("div").attr("class","mappopattr")
            .text(estate.data.areaname)
        highlightestate.append("div").attr("class","mappopattr")
            .text("Price : "+estate.data.Price)
        highlightestate.append("div").attr("class","mappopattr")
            .text("Space : "+estate.data.mianji)

        highlightestate.style("top",  (p.y-highlightestate.style("height").split("px")[0]*1)+"px")


    }
}


function paint_estatelisttraj(estatelist){
    var data=estatelist.data;
    for(var i=0;i<data.length;i++){
        var p=map.latLngToContainerPoint(L.latLng(data[i].latitude, data[i].longitude))
        /******************************************
         *       paint blog
         *******************************************/
        var blogtraj=d3.select("#mapobjectsvg")
            .append("image")
            .attr("count",i)
            .style("position","absolute")
            .style("height","20px")
            .style("width","20px")
            .attr("x",(p.x-10)+"px")
            .attr("y",(p.y-10)+"px")
            .attr("class","estatetraj")
            .attr("xlink:href", "image/map_legend_estate.svg")
            .style("pointer-events","visiblepainted")
            .on("mouseup",function(){
                add_mapobject("estate",data[d3.select(this).attr("count")],estatelist.node)
                map_object[map_object.length-1].highlight=map_highlightzindex;
                map_highlightzindex++;
                repaint_map_object();
                highlightrepaint_map_object();
            });

            if(estatelist.ismove!=0){
                    blogtraj.style("height","40px")
                        .style("width","40px")
                        .attr("x",(p.x-20)+"px")
                        .attr("y",(p.y-20)+"px")
                }
                if(estatelist.highlight!=0){
                    blogtraj.style("height","40px")
                        .style("width","40px")
                        .attr("x",(p.x-20)+"px")
                        .attr("y",(p.y-20)+"px")
                }

    }
}
