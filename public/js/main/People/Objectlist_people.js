/**
 * Created by Administrator on 2016/3/23.
 */
function showobjectlist_people(obj){
    var thisid=obj.id;
    var thiscardiv=d3.select("#map_objectlistdiv").append("div")
        .attr("class","map_objectlist_obj")
        .attr("type",obj.type)
        .attr("carid",thisid)
        .style("height","30px")
        .attr("id","objlistcardiv"+thisid)
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

    thiscardiv.append("div")
        .text(thisid)
        .attr("class","listobjid")
    thiscardiv.append("img")
        .attr("src","image/map_objlist_people.svg")
        .attr("height","30px")
        .attr("width","30px")
        .style("position","absolute")
        .style("left","0px")
        .style("top","0px")

    thiscardiv.append("img")
        .attr("src","image/delete.svg")
        .style("position","absolute")
        .style("left","222px")
        .style("width","16px")
        .style("top","6px")
        .style("cursor","pointer")
        .style("z-index","10")
        .attr("class","list_trash")
        .attr("carid",thisid)
        .on("mouseup",function(){
            var temp=[];
            for(var i=0;i<map_object.length;i++){
                if(map_object[i].id!=d3.select(this).attr("carid")){
                    temp.push(map_object[i])
                }
            }
            map_object=temp;
            repaint_map_object();
            if(map_object.length==0){
                delete_map_object_listdiv();
            }
            d3.select("#objlistcardiv"+d3.select(this).attr("carid")).remove();
        })


}

function showobjectlist_peoplelist(obj){
    var thiscarlistdiv=d3.select("#map_objectlistdiv").append("div")
        .attr("class","map_objectlist_obj")
        .attr("type",obj.type).style("height","47px")
        .attr("carname",obj.id)
        .style("height","")
        .attr("id","objlistcarlistdiv"+obj.id)
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

    thiscarlistdiv.append("img")
        .attr("src","image/map_objlist_people.svg")
        .attr("height","30px")
        .attr("width","30px")
        .style("position","absolute")
        .style("left","0")
        .style("top","7px");

    thiscarlistdiv.append("div")
        .text(obj.id)
         .style("height","40px")
        .attr("class","listobjid")
        .style("font-size","13px")


    thiscarlistdiv.append("img")
        .attr("src","image/delete.svg")
        .style("position","absolute")
        .style("cursor","pointer")
        .style("left","222px")
        .style("width","16px")
        .style("height","16px")
        .style("top","7px")
        .attr("thisid",obj.id)
        .on("mouseup",function(){
            var temp=[];
            for(var i=0;i<map_object.length;i++){
                if(map_object[i].id!=d3.select(this).attr("thisid")){
                    temp.push(map_object[i])
                }
            }
            map_object=temp;
            repaint_map_object();
            if(map_object.length==0){
                delete_map_object_listdiv();
            }
            d3.select("#objlistcardiv"+d3.select(this).attr("thisid")).remove();

        })
    //?????????
    var attrdiv=thiscarlistdiv.append("div").attr("class","attr").style("position","absolute").style("top","17px")
    attrdiv.append("div").text("number : "+obj.data.length)
    //attrdiv.append("div").text("time:   "+parseInt(obj.data.time/60)+" : "+parseInt((obj.data.time)%60))

}