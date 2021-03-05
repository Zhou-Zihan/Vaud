/**
 * Created by Administrator on 2016/3/23.
 */
function showobjectlist_poi(obj){
    var thispoidiv=d3.select("#map_objectlistdiv").append("div")
        .attr("class","map_objectlist_obj")
        .attr("type",obj.type)
        .attr("poiname",obj.data.name)
        .attr("id","objlistcardiv"+obj.data.name)
        .on("mousemove",function(){
            if(obj.ismove==0){
                obj.ismove=map_highlightzindex;
                repaint_map_object();
                highlightrepaint_map_object();
            }
        })
        .on("mouseout",function(){
            obj.ismove=0;
            repaint_map_object();
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

    thispoidiv.append("img")
        .attr("src","image/map_objlist_poi.svg")
        .attr("height","28px")
        .attr("width","28px")
        .style("position","absolute")
        .style("left","1px")
        .style("top","18px")

    thispoidiv.append("div")
        .text(obj.data.name)
        .attr("class","listobjid")
        .style("font-size","13px");

    thispoidiv.append("img")
        .attr("src", "image/delete.svg")
        .style("position","absolute")
        .style("left","222px")
        .style("width","16px")
        .style("top","24px")
        .style("z-index","10")
        .style("cursor","pointer")
        .attr("class","list_trash")
        .attr("poiname",obj.data.name)
        .on("mouseup",function(){
            var temp=[];
            for(var i=0;i<map_object.length;i++){
                if(map_object[i].data.name!=d3.select(this).attr("poiname")){
                    temp.push(map_object[i])
                }
            }
            map_object=temp;
            repaint_map_object();
            if(map_object.length==0){
                delete_map_object_listdiv();
            }
            d3.select("#objlistcardiv"+d3.select(this).attr("poiname")).remove();
        })
    //?????????
    var attrdiv=thispoidiv.append("div").attr("class","attr")
    attrdiv.append("div").text("type:   "+obj.data.type)
    attrdiv.append("div").text("detail:   "+obj.data.address)
}

function showobjectlist_poilist(obj){
    var thispoidiv=d3.select("#map_objectlistdiv").append("div")
        .attr("class","map_objectlist_obj")
        .attr("type",obj.type)
        .attr("poiname",obj.id)
        .attr("id","objlistpoidiv"+obj.id)
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

    thispoidiv.append("img")
        .attr("src","image/map_objlist_poi.svg")
        .attr("height","26px")
        .attr("width","26px")
        .style("position","absolute")
        .style("left","1px")
        .style("top","18px")

    thispoidiv.append("div")
        .text(obj.id)
        .attr("class","listobjid")
        .style("font-size","13px").style("line-height","20px");

    thispoidiv.append("img")
        .attr("src","image/delete.svg")
        .style("position","absolute")
        .attr("width","16px")
        .style("left","222px") .style("top","24px")
        .style("cursor","pointer")
        .style("z-index","10")
        .attr("class","list_trash")
        .attr("poiname",obj.id)
        .on("mouseup",function(){
            var temp=[];
            for(var i=0;i<map_object.length;i++){
                if(map_object[i].id!=d3.select(this).attr("poiname")){
                    temp.push(map_object[i])
                }
            }
            map_object=temp;
            repaint_map_object();
            if(map_object.length==0){
                delete_map_object_listdiv();
            }
            d3.select("#objlistpoidiv"+d3.select(this).attr("poiname")).remove();

        })
    
    var attrdiv=thispoidiv.append("div").attr("class","attr")
    attrdiv.append("div").text("number :  "+obj.data.length)
    //attrdiv.append("div").text("time:   "+parseInt(obj.data.time/60)+" : "+parseInt((obj.data.time)%60))
}