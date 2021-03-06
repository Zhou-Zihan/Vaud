/**
 * Created by Administrator on 2016/3/23.
 */


function paint_blogtraj(blog){
    /******************************************
     *       load data
     *******************************************/
    var data=blog.data;
    var p=map.latLngToContainerPoint(L.latLng(data.lat, data.lng))
    /******************************************
     *       paint blog
     *******************************************/
    var blogtraj=d3.select("#mapobjectsvg")
        .append("image")
        .style("pointer-events","visiblepainted")
        .attr("data",data)
        .style("position","absolute")
        .style("height","20px")
        .style("width","20px")
        .attr("x",(p.x-10)+"px")
        .attr("y",(p.y-10)+"px")
        .attr("class","blogtraj")
        .attr("xlink:href", "image/map_legend_blog.svg")
        .style("pointer-events","visiblepainted")
        .on("mouseover",function(){
            if(blog.ismove==0){
                blog.ismove=map_highlightzindex;
                repaint_map_object();
                highlightrepaint_map_object();
            }
        })
        .on("mouseout",function(){
            blog.ismove=0;
            repaint_map_object();
            highlightrepaint_map_object();
        })
        .on("mouseup",function(){
            if(blog.highlight==0){
                blog.highlight=map_highlightzindex;
                map_highlightzindex++;
            }
            else{
                for(var i=0;i<map_object.length;i++){
                    if(map_object[i].highlight>blog.highlight)
                        map_object[i].highlight--;
                }
                blog.highlight=0;
            }
            highlightrepaint_map_object();
            repaint_map_object();
        });

    if(blog.ismove!=0){
        blogtraj
            .attr("x",(p.x-20)+"px")
            .attr("y",(p.y-20)+"px")
            .transition()
            .duration(1000)
            .style("height","40px")
            .style("width","40px")
    }
    if(blog.highlight!=0){
        blogtraj.style("height","40px")
            .style("width","40px")
            .attr("x",(p.x-20)+"px")
            .attr("y",(p.y-20)+"px")
    }
}



function paint_bloglisttraj(bloglist){
    var data=bloglist.data;
    for(var i=0;i<data.length;i++){
        var p=map.latLngToContainerPoint(L.latLng(data[i].lat, data[i].lng))
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
            .attr("class","blogtraj")
            .attr("xlink:href", "image/map_legend_blog.svg")
            .style("pointer-events","visiblepainted")
            .on("mouseup",function(){
                add_mapobject("blog",data[d3.select(this).attr("count")],bloglist.node)
                map_object[map_object.length-1].highlight=map_highlightzindex;
                map_highlightzindex++;
                highlightrepaint_map_object();
            });

            if(bloglist.ismove!=0){
                    blogtraj.style("height","40px")
                        .style("width","40px")
                        .attr("x",(p.x-20)+"px")
                        .attr("y",(p.y-20)+"px")
                }
                if(bloglist.highlight!=0){
                    blogtraj.style("height","40px")
                        .style("width","40px")
                        .attr("x",(p.x-20)+"px")
                        .attr("y",(p.y-20)+"px")
                }

    }
}

function highlightpaint_blogtraj(blog){
    /******************************************
     *       load data
     *******************************************/
    var data=blog.data;
    var p=map.latLngToContainerPoint(L.latLng(data.lat, data.lng))
    /***************************
     draw blog detail
     *************************/
    if((blog.highlight!=0||blog.ismove!=0)&&(p.y-10)<428){
        var  highlightblog=d3.select("#sceneviewfold").append("div")
            .attr("class","highlightblog")
            .style("z-index", blog.highlight)
            .style("left",(p.x*1+15)+"px")
            .style("top",  p.y-160+"px")
            .on("mouseup",function(){
                if(!flag_is_textmouseup){
                    for(var i=0;i<map_object.length;i++){
                        if(map_object[i].highlight>blog.highlight){
                            map_object[i].highlight--;
                        }
                    }
                    blog.highlight=map_highlightzindex-1;
                    repaint_map_object();
                }
                else
                    flag_is_textmouseup=false;

            });
//        highlightblog.append("object")
//            .attr("class","highlight_delete")
//            .attr("data", "image/map_tips_angle.svg")
//            .style("position","absolute")
//            .style("height","30px")
//            .style("width","30px")
//            .style("bottom","-2px")
//            .style("left","-30px")

        highlightblog.append("div")
            .attr("class","highlightblogtip")
            .text("@"+blog.data.name);

        highlightblog.append("img")
            .attr("src","image/map_objlist_blog.svg")
            .style("width","28px")
            .style("height","28px")
            .style("position","absolute")
            .style("top","0px");

        highlightblog.append("img")
            .attr("src","image/delete.svg")
            .style("position","absolute")
            .style("height","16px")
            .style("width","16px")
            .style("top","6px")
            .style("right","28px")
            .style("cursor","pointer")
            .on("mousedown", function () {
                blog.highlight=0;
                highlightrepaint_map_object();
            })


//        blogattrdiv.append("div")
//            .attr("class","highlightblogattr")
//            .style("top", "24px") .style("right",0)
//            .text("@"+blog.data.name)

// var strictIsoParse = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ");

        let tformat = d3.time.format("%Y-%m-%d %H:%M:%S"),
        thiscelltime=tformat(blog.data.time);

        highlightblog.append("div")
            .attr("class","highlightblogattr")
            .style("left","0px")
            .style("top", "0px")
            .style("font-size", "10px")
            .text("Time: "+thiscelltime)
            .on("mousedown",function(){
                new_conditiondiv("timepoint",{date:thiscelltime.split(" ")[0],time:thiscelltime.split(" ")[1],id:blog.data.id,source:"blog"}
                    ,d3.event.x,d3.event.y,blog.node,1);
            });

        highlightblog.append("div")
            .attr("class","highlightblogattr")
            .style("top", "25px")
            .text("Extract position")
            .on("mousedown",function(){
                new_conditiondiv("positionpoint",
                    {lat:blog.data.lat,lon:blog.data.lng,id:blog.data.id,source:"blog"},d3.event.x,d3.event.y,blog.node,1);
            })

        highlightblog.append("img")
            .attr("src", "image/map_jiejing.svg")
            .style("cursor","pointer")
            .style("width","50px")
            .style("height","50px")
            .style("position","absolute")
            .style("top","28px")
            .style("right","16px")
            .style("cursor","pointer")
            .on("mousedown",function(){
                highlightpaint_street_viewtraj(blog.data.lng,
                    blog.data.lat);
            })

        highlightblog.append("div")
            .attr("class","highlightblogtext")
            .text("Text:   "+blog.data.content)
            .on("mousedown",function(){
                flag_is_textmouseup=true;
            })
            .on("mouseup",function(){
                flag_is_textmouseup=true;
            });

        //delete
//
    }
}