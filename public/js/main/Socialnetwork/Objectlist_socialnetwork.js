/**
 * Created by Administrator on 2016/3/23.
 */
function showobjectlist_social_network(obj){
    var thissocial_networkdiv=d3.select("#map_objectlistdiv").append("div")
        .attr("class","map_objectlist_obj")
        .attr("type",obj.type)
        .attr("blogname",obj.id)
        .attr("id","objlistcardiv"+obj.id)
        .on("mouseover",function(){
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
    thissocial_networkdiv.append("img")
        .attr("src","image/map_objlist_socialnet.svg")
        .attr("height","30px")
        .attr("width","30px")
        .style("position","absolute")
        .style("left","2px")
        .style("top","22px")



    thissocial_networkdiv.append("div")
        .text("@"+obj.id)
        .attr("class","listobjid")
        .style("font-size","13px");

    thissocial_networkdiv
        .append("img")
        .attr("src", "image/delete.svg")
        .style("position","absolute")
        .style("left","222px")
        .style("width","16px")
        .style("cursor","pointer")
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

    var attrdiv=thissocial_networkdiv.append("div").attr("class","attr")
    var DuraToFormat;
        if (obj.data.dura<=60)
        {
            DuraToFormat=obj.data.dura+"s";
        }
        else if(obj.data.dura<=3600)
        {
            DuraToFormat=Math.floor(obj.data.dura/60)+"min"+obj.data.dura%60+"s";
        }
        else
        {
            DuraToFormat=Math.floor(obj.data.dura/3600)+"h"+Math.floor((obj.data.dura-Math.floor(obj.data.dura/3600)*3600)/60)+"min"+obj.data.dura%60+"s";
        }
    attrdiv.append("div").text("start time:   "+obj.data.startTime.substring(0,obj.data.startTime.length-2))
    attrdiv.append("div").text("during:   "+DuraToFormat)
    //attrdiv.append("div").text("start time:   "+obj.data.startTime )
    //attrdiv.append("div").text("during:   "+obj.data.dura)
}

function showobjectlist_social_networklist(obj){
    var thissocial_networkdiv=d3.select("#map_objectlistdiv").append("div")
        .attr("class","map_objectlist_obj")
        .attr("type",obj.type)
        .attr("blogname",obj.id)
        .attr("id","objlistcardiv"+obj.id)
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
    thissocial_networkdiv.append("img")
        .attr("src","image/map_objlist_socialnet.svg")
        .attr("height","30px")
        .attr("width","30px")
        .style("position","absolute")
        .style("left","2px")
        .style("top","12px")

    thissocial_networkdiv.append("div")
        .text("@"+obj.id)
        .attr("class","listobjid")
        .style("font-size","13px");

    thissocial_networkdiv
        .append("img")
        .attr("src", "image/delete.svg")
        .style("position","absolute")
        .style("left","222px")
        .style("width","16px")
        .style("cursor","pointer")
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

    var attrdiv=thissocial_networkdiv.append("div").attr("class","attr")
    var DuraToFormat;
        if (obj.data.dura<=60)
        {
            DuraToFormat=obj.data.dura+"s";
        }
        else if(obj.data.dura<=3600)
        {
            DuraToFormat=Math.floor(obj.data.dura/60)+"min"+obj.data.dura%60+"s";
        }
        else
        {
            DuraToFormat=Math.floor(obj.data.dura/3600)+"h"+Math.floor((obj.data.dura-Math.floor(obj.data.dura/3600)*3600)/60)+"min"+obj.data.dura%60+"s";
        }

    attrdiv.append("div").text("connect number:   "+obj.data.length)
}