/**
 * Created by Administrator on 2016/3/23.
 */
function showobjectlist_blog(obj){
    var thisblogdiv=d3.select("#map_objectlistdiv").append("div")
        .attr("class","map_objectlist_obj")
        .attr("type",obj.type)
        .attr("blogname",obj.id)
        .attr("id","objlistcardiv"+obj.id)
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
    thisblogdiv.append("img")
        .attr("src","image/map_objlist_blog.svg")
        .attr("height","30px")
        .attr("width","30px")
        .style("position","absolute")
        .style("left","0px")
        .style("top","17px")

    thisblogdiv.append("div")
        .text("@"+obj.data.name)
        .attr("class","listobjid")
        .style("font-size","13px");



    thisblogdiv.append("img")
        .attr("src","image/delete.svg")
        .style("position","absolute")
        .style("width","16px")
        .style("left","222px")
        .style("top","24px")
        .style("cursor","pointer")
        .style("z-index","10")
        .attr("class","list_trash")
        .attr("blogname",obj.id)
        .on("mouseup",function(){
            var temp=[];
            for(var i=0;i<map_object.length;i++){
                if(map_object[i].data.name!=d3.select(this).attr("blogname")){
                    temp.push(map_object[i])
                }
            }
            map_object=temp;
            repaint_map_object();
            if(map_object.length==0){
                delete_map_object_listdiv();
            }
            d3.select("#objlistcardiv"+d3.select(this).attr("blogname")).remove();
        })

    var attrdiv=thisblogdiv.append("div").attr("class","attr")
    let tformat = d3.time.format("%Y-%m-%d %H:%M");
    attrdiv.append("div").text("Time:   "+tformat(obj.data.time))
}



function showobjectlist_bloglist(obj){
    var thisblogdiv=d3.select("#map_objectlistdiv").append("div")
        .attr("class","map_objectlist_obj")
        .attr("type",obj.type)
        .attr("blogname",obj.id)
        .attr("id","objlistcardiv"+obj.id)
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
    //ID show  delete
//        thisblogdiv.append("div").style("position","relative").style("height","10px");

    //var input=thisblogdiv.append("div")
    //    .style("position","absolute")
    //    .style("left","8px")
    //    .style("width","14px")
    //    .style("height","14px").style("top","12px")
    //    .append("input")
    //    .attr("type","checkbox")
    //    .attr("id",obj.id)
    //    .attr("class","cBox")
    //    .attr("checked",true)
    //
    //thisblogdiv.select("div").append("label")
    //    .attr("for",obj.id)
    //    .on("mouseup",function(){
    //        for(var i=0;i<map_object.length;i++){
    //            if(map_object[i].id==d3.select(this).attr("for")){
    //                map_object[i].show=!map_object[i].show;
    //                repaint_map_object();
    //                return;
    //            }
    //        }
    //    });

    thisblogdiv.append("img")
        .attr("src","image/map_objlist_blog.svg")
        .attr("height","30px")
        .attr("width","30px")
        .style("position","absolute")
        .style("left","0px")
        .style("top","17px")

    thisblogdiv.append("div")
        .text("@"+obj.id)
        .attr("class","listobjid")
        .style("font-size","13px").style("line-height","20px");

    thisblogdiv.append("img")
        .attr("src","image/delete.svg")
        .style("position","absolute")
        .attr("height","16px")
        .style("left","222px") .style("top","24px")
        .style("cursor","pointer")
        .style("z-index","10")
        .attr("class","list_trash")
        .attr("blogname",obj.id)
        .on("mouseup",function(){
            var temp=[];
            for(var i=0;i<map_object.length;i++){
                if(map_object[i].id!=d3.select(this).attr("blogname")){
                    temp.push(map_object[i])
                }
            }
            map_object=temp;
            repaint_map_object();
            if(map_object.length==0){
                delete_map_object_listdiv();
            }
            d3.select("#objlistcardiv"+d3.select(this).attr("blogname")).remove();

        })
    
    var attrdiv=thisblogdiv.append("div").attr("class","attr")
    attrdiv.append("div").text("number :  "+obj.data.length)
    //attrdiv.append("div").text("time:   "+parseInt(obj.data.time/60)+" : "+parseInt((obj.data.time)%60))
}