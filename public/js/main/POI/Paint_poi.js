/**
 * Created by Administrator on 2016/3/23.
 */
function paint_poitraj(poi){
    /******************************************
     *       load data
     *******************************************/
    var data=poi.data;
    var p=map.latLngToContainerPoint(L.latLng(data.latitude, data.longitude))
    /******************************************
     *       draw poi
     *******************************************/

    var poitraj=d3.select("#mapobjectsvg")
        .append("image")
        .attr("class","blogtraj")
        .attr("xlink:href", "image/map_legend_poi.svg")
        .attr("data",data)
        .style("position","absolute")
        .style("height","20px")
        .style("width","20px")
        .style("pointer-events","visiblepainted")
        .attr("x",(p.x-10)+"px")
        .attr("y",(p.y-10)+"px")
        .on("mouseenter",function(){
            if(poi.ismove==0){
                poi.ismove=map_highlightzindex;
                repaint_map_object();
                highlightrepaint_map_object();
            }
        })
        .on("mouseleave",function(){
            poi.ismove=0;
            repaint_map_object();
            highlightrepaint_map_object();
        })
        .on("click",function(){
            if(poi.highlight==0){
                poi.highlight=map_highlightzindex;
                map_highlightzindex++;
            }
            else{
                for(var i=0;i<map_object.length;i++){
                    if(map_object[i].highlight>poi.highlight){
                        map_object[i].highlight--;
                    }
                }
                poi.highlight=0;
            }
            repaint_map_object();
            highlightrepaint_map_object();
        });
     if(poi.ismove!=0||poi.highlight!=0){
                poitraj.style("height","40px")
                    .style("width","40px")
                    .attr("x",(p.x-20)+"px")
                    .attr("y",(p.y-20)+"px")
        }
}

function highlightpaint_poitraj(poi){
    /******************************************
     *       load data
     *******************************************/
    var data=poi.data;
    var p=map.latLngToContainerPoint(L.latLng(data.latitude, data.longitude))

    if((poi.highlight!=0||poi.ismove!=0)&&(p.y-10)<428){

        var  highlightpoi=d3.select("#sceneviewfold").append("div")
            .attr("class","mappoppoi")
            .style("z-index", poi.highlight)
            .style("left",(p.x+15)+"px")
            .on("mouseup",function(){
                if(!flag_is_textmouseup){
                    for(var i=0;i<map_object.length;i++){
                        if(map_object[i].highlight>poi.highlight){
                            map_object[i].highlight--;
                        }
                    }
                    poi.highlight=map_highlightzindex-1;
                    repaint_map_object();
                }
                else
                    flag_is_textmouseup=false;

            });

        highlightpoi.append("div").attr("class","mappoptitle")
            .text(poi.data.name);

        highlightpoi.append("img")
            .attr("class","mappopicon")
            .attr("src","image/map_objlist_poi.svg");

        highlightpoi.append("img")
            .attr("class","mappopjiejing")
            .attr("src", "image/map_jiejing.svg")
            .on("click",function(){
                highlightpaint_street_viewtraj(poi.data.longitude+"000",
                    poi.data.latitude+"00");
            })
            .on("mouseenter",function(){
                highlightpoi.selectAll(".hover").remove();
                highlightpoi.append("div").attr("class","hover").text("The Street View").style("top","70px").style("left","149px")
                .style("width","113px")
            })
            .on("mouseleave",function(){
                highlightpoi.selectAll(".hover").remove();
            })

        highlightpoi.append("img")
            .attr("class","mappopdelete")
            .attr("src","image/delete.svg")
            .style("z-index","10")
            .on("mousedown",function(){
                poi.highlight=0;
                highlightrepaint_map_object();
            });

        highlightpoi.append("div")
            .attr("class","mappopattr")
            .text(function(){
                if(poi.data.type==undefined)
                    return "Type: ---"
                return "Type: "+ poi.data.type
                
            })

        highlightpoi.append("div")
            .attr("class","mappopattr mappopattrdrag")
            .text("Extract Position")
            .on("mousedown",function(){
                new_conditiondiv("positionpoint",
                    {lat:poi.data.latitude,lon:poi.data.longitude,id:poi.data.id,source:"point_of_interest"},d3.event.x,d3.event.y,poi.node,1);
            })

        highlightpoi.append("div")
            .attr("class","mappopattr")
            .text("Telphone: "+ poi.data.tel);

        highlightpoi.append("div")
            .attr("class","mappopattr")
            .text(function(){
                if(poi.data.address=="null")
                    return "Detail: ---"
                return "Detail: "+ poi.data.address
                
            });

       highlightpoi.style("top",  (p.y-highlightpoi.style("height").split("px")[0]*1)+"px")

    }
}

function paint_poilisttraj(poilist){
    var data=poilist.data;
    for(var i=0;i<data.length;i++){
        var p=map.latLngToContainerPoint(L.latLng(data[i].latitude, data[i].longitude))
        /******************************************
         *       paint blog
         *******************************************/
        
        var poitraj=d3.select("#mapobjectsvg")
            .append("image")
            .attr("count",i)
            .attr("data",data[i])
            .style("position","absolute")
            .style("height","20px")
            .style("width","20px")
            .attr("x",(p.x-10)+"px")
            .attr("y",(p.y-10)+"px")
            .attr("class","poitraj")
            .attr("xlink:href", "image/map_legend_poi.svg")
            .style("pointer-events","visiblepainted")
            .on("click",function(){
                add_mapobject("poi",data[d3.select(this).attr("count")],poilist.node)
                map_object[map_object.length-1].highlight=map_highlightzindex;
                map_highlightzindex++;
                highlightrepaint_map_object();
            })
            
            .on("mouseout",function(){
                d3.selectAll(".mapobjecthover").remove()
            })

            if(poilist.ismove!=0){
                    poitraj.style("height","40px")
                        .style("width","40px")
                        .attr("x",(p.x-20)+"px")
                        .attr("y",(p.y-20)+"px")
                }
                if(poilist.highlight!=0){
                    poitraj.style("height","40px")
                        .style("width","40px")
                        .attr("x",(p.x-20)+"px")
                        .attr("y",(p.y-20)+"px")
                }

    }
}