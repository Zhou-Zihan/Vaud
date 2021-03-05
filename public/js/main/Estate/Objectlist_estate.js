/**
 * Created by Administrator on 2016/3/23.
 */
function showobjectlist_estate(obj){
    var thisestatediv=d3.select("#map_objectlistdiv").append("div")
        .attr("class","map_objectlist_obj")
        .attr("type",obj.type)
        .attr("estatename",obj.data.detailname)
        .attr("id","objlistcardiv"+obj.data.detailname)
        .on("mousemove",function(){
            if(obj.ismove==0){
                obj.ismove=map_highlightzindex;
                repaint_map_object();
            }
        })
        .on("mouseout",function(){
            obj.ismove=0;
            highlightrepaint_map_object();
        })
        .on("mouseup",function(){
            if(obj.highlight==0){
                obj.highlight=map_highlightzindex;
                map_highlightzindex++;
            } else{
                for(var i=0;i<map_object.length;i++){
                    if(map_object[i].highlight>obj.highlight){
                        map_object[i].highlight--;
                    }
                }
                obj.highlight=0;
            }
            highlightrepaint_map_object();
        })

    thisestatediv.append("img")
        .attr("src","image/map_objlist_estate.svg")
        .style("position","absolute")
        .style("left","0px")
        .style("top","17px")
        .attr("height","30px")
        .attr("width","30px")

    thisestatediv.append("div")
        .text(obj.data.detailname)
        .attr("class","listobjid")
        .style("font-size","13px")

    thisestatediv.append("img")
        .attr("src","image/delete.svg")
        .style("position","absolute")
        .style("left","222px")
        .style("width","16px")
        .style("top","24px")
        .style("cursor","pointer")
        .style("z-index","10")
        .attr("class","list_trash")
        .attr("estatename",obj.data.detailname)
        .on("mouseup",function(){
            var temp=[];
            for(var i=0;i<map_object.length;i++){
                if(map_object[i].data.detailname!=d3.select(this).attr("estatename")){
                    temp.push(map_object[i])
                }
            }
            map_object=temp;
            repaint_map_object();
            if(map_object.length==0){
                delete_map_object_listdiv();
            }
            d3.select("#objlistcardiv"+d3.select(this).attr("estatename")).remove();

        })


    //?????????

    var attrdiv=thisestatediv.append("div").attr("class","attr")
    attrdiv.append("div").text("lon:   "+obj.data.longitude)
    attrdiv.append("div").text("lat:   "+obj.data.latitude)
    console.log(obj.data);
}


function showobjectlist_estatelist(obj){
    var thisestatediv=d3.select("#map_objectlistdiv").append("div")
        .attr("class","map_objectlist_obj")
        .attr("type",obj.type)
        .attr("estatename",obj.id)
        .attr("id","objlistestatediv"+obj.id)
        .on("mousemove",function(){
            if(obj.ismove==0){
                obj.ismove=map_highlightzindex;
                repaint_map_object();
            }
        })
        .on("mouseout",function(){
            obj.ismove=0;
            repaint_map_object();
        })
        .on("mouseup",function(){
            if(obj.highlight==0){
                obj.highlight=map_highlightzindex;
                map_highlightzindex++;
            } else{
                for(var i=0;i<map_object.length;i++){
                    if(map_object[i].highlight>obj.highlight){
                        map_object[i].highlight--;
                    }
                }
                obj.highlight=0;
            }
            highlightrepaint_map_object();
        })

    thisestatediv.append("img")
        .attr("src","image/map_objlist_estate.svg")
        .attr("height","30px")
        .attr("width","30px")
        .style("position","absolute")
        .style("left","0px")
        .style("top","11px")

    thisestatediv.append("div")
        .text(obj.id)
        .attr("class","listobjid")
        .style("font-size","13px").style("line-height","20px");

    
    thisestatediv.append("img")
        .attr("src","image/delete.svg")
        .style("position","absolute")
        .attr("height","16px")
        .style("left","222px") .style("top","18px")
        .style("cursor","pointer")
        .style("z-index","10")
        .attr("class","list_trash")
        .attr("estatename",obj.id)
        .on("mouseup",function(){
            var temp=[];
            for(var i=0;i<map_object.length;i++){
                if(map_object[i].id!=d3.select(this).attr("estatename")){
                    console.log(map_object[i].id)
                    temp.push(map_object[i])
                }
            }
            map_object=temp;
            repaint_map_object();
            if(map_object.length==0){
                delete_map_object_listdiv();
            }
            d3.select("#objlistestatediv"+d3.select(this).attr("estatename")).remove();
        })
    
    var attrdiv=thisestatediv.append("div").attr("class","attr")
    attrdiv.append("div").text("number :  "+obj.data.length)
    //attrdiv.append("div").text("time:   "+parseInt(obj.data.time/60)+" : "+parseInt((obj.data.time)%60))
}