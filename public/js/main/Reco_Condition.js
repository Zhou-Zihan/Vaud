function condition_reconode_newnode(reconode){

   /**************************
     *  add node to recolist
     **************************/
    var newnode=Node.createNew();
    newnode.setid("reconode"+reconode.idx)
    newnode.setnodetype("condition")
    newnode.settype(reconode.source)
    newnode.changecondition(reconode.condition)
    newnode.recoid=reconode.id;
    recolist.pushitem(newnode);
    // var result=query_result(reconode);
    // recolist.pushresult({
    //     // num: reconode.resultnum,
    //     data: result
    // })


    /***********************
     *      reconodediv
     ***********************/

    var top = document.getElementById('queryrecommand').offsetTop;
    var left = document.getElementById('queryrecommand').offsetLeft;
    
    var reconodediv = d3.select("#reconodelist")
        .append("div")
        .attr("count",recolist.getlistlength()-1)
        .attr("class", "reconodediv")
        .attr("id", "reconodediv"+(recolist.getlistlength()-1))
        .style('height','150px')
        .style("position","absolute")
        .style('top',top+90+200*(recolist.getlistlength()-1)+"px")
        .style("left",left+40+"px")
        .style('z-index',1000001)
        .on("mouseover", function(){
            linepaint_for_reco(reconode.idx);
            // show_result_heatmap(reconode.idx);
        })
        .on("mouseout", function(){
            d3.selectAll("#reco_polygon").remove();
            d3.selectAll("#reco_path").remove();
            // objectheat_latlon = [];
            // heatmapalive_detection()
        });
    
    //background img
    reconodediv.append("img").attr("src", "image/bgRecoCard.svg")
        .style("left", "0")
        .style("width", "220px")
        .style("height", "100%")
        .style("top", "0")
        .attr("draggable", false)
    
    //data source
    var source=reconodediv.append("div")
        .attr("class", "reco_source")
        .style("position","absolute")
        .style("top","0px")
        .style("left","10px")
        .style("width","15%")
        .style("height","30px")
    if(reconode.source=="point_of_interest"){
        source.style("background","url(image/map_objlist_poi_normal.svg) no-repeat")
        .style("background-size","100% 100%")
    }else{
        source.style("background","url(image/map_objlist_"+reconode.source+"_normal.svg) no-repeat")
        .style("background-size","100% 100%")
    }

    //reco - data number
    reconodediv.append("div")
        .attr("class", "reco_num")
        .style("position","absolute")
        .style("top","6px")
        .style("right","10px")
        .style("width","15%")
        .style("height","30px")
        .style('color','white')
        .style('text-align','center')
        .style('font-weight','bold')
        .style('font-size','13px')
        .text(reconode.resultnum)
        
    reconodediv.append("div")
        .style("position","absolute")
        .style("top","4px")
        .style("left","20%")
        .style("width","60%")
        .style("height","30px")
        .style('color','white')
        .style('text-align','center')
        .style('font-weight','bold')
        .style('font-size','16px')
        .text("Condition List")
        .on("mousedown",function(){
            new_reco_drag(reconode.idx,reconode.resultnum,reconode.source,d3.event.x,d3.event.y);            
        });
    
    show_reco_conditionlist(reconode.idx);
}

function new_reco_drag(count,num,type,mousex,mousey){
    d3.select("body").append("div")
        .attr("class","drag_conditiondiv")
        .on("mousemove",function(){
            d3.select("#new_conditiondiv")
                .style("top",d3.event.y-20+"px")
                .style("left",d3.event.x-50+"px")
        })
        .on("click",function(){
            //new condition node
            var reconode = recolist.getlistindexof(count)
            condition_node_newnode([d3.event.x, d3.event.y ],reconode);

            // draw line
            var pointlist=recolist.getfather_and_son();
            for(var i= 0;i<pointlist.length;i++){
                if(pointlist[i].son==count){
                    // debugger
                    var ff=find_node_son(pointlist[i].father);
                    console.log("ff",ff);
                    nodelist.pushfather_and_son({
                        father: ff,
                        son: nodelist.getlist().length - 1
                    })
                }
            }
            linepaint();
            
            query(nodelist.getlistlength()-1)

            d3.select(".drag_conditiondiv").remove();
        })
    
    var thisnewdiv=d3.select(".drag_conditiondiv").append("div")
        .attr("id","new_conditiondiv")
        .attr("class","drag_condition")
        .style("width",'45px')
        .style("height",'25px')
        .style("top",mousey-20+"px")
        .style("left",mousex-50+"px")

    var img=thisnewdiv.append("img")
        .style("position","absolute")
        .style("left","5px")
        .style("top","3px")
        .attr("height","30px")
        .attr("width","30px")
    if(type=="point_of_interest"){
        img.attr("src","image/map_objlist_poi_normal.svg")
    }else{
        img.attr("src","image/map_objlist_"+type+"_normal.svg")
    }
        
    
    thisnewdiv.append("img")
        .style("position","absolute")
        .style("left","45px")
        .style("top","3px")
        .attr("height","30px")
        .attr("width","20px").attr("src","image/delete1.svg")

    thisnewdiv.append("div")
        .style("position","relative")
        .style("float","left")
        .attr("height","20px" )
        .attr("width","14px" )
        .style("left","40px")
        .style("color","white")
        .text(num)
    
}

function show_result_heatmap(id){
    var result = recolist.getresult(id).data;
    var reconode = recolist.getlistindexof(id);
    if(reconode.type=="car"){
        var latlngs=[];
        for (var i = 0; i < result.length; i++) {
            for(var m = 0; m<result[i].points.length; m++){
                latlngs.push(L.latLng(result[i].points[m].latitude, result[i].points[m].longitude))
            }
        }
        Heatmap_Object.setOptions({radius: 10,max: latlngs.length/5000*mapheatmap_value})
        objectheat_latlon=latlngs;
        heatmapalive_detection()
    }
    if(reconode.type=="blog"){
        var latlngs=[];
        for (var i = 0; i < result.length; i++) {
            latlngs.push(L.latLng(result[i].lat, result[i].lng))
        }
        Heatmap_Object.setOptions({radius: 10,max: latlngs.length/5000*mapheatmap_value})
        objectheat_latlon=latlngs;
        heatmapalive_detection()
    }
    if(reconode.type=="point_of_interest"){
        var latlngs=[];
        for (var i = 0; i < result.length; i++) {
            latlngs.push(L.latLng(result[i].latitude, result[i].longitude))
        }
        Heatmap_Object.setOptions({radius: 10,max: latlngs.length/5000*mapheatmap_value})
        objectheat_latlon=latlngs;
        heatmapalive_detection()
    }
    if(reconode.type=="people"){
        var latlngs=[];
        for (var i = 0; i < result.length; i++) {
            for(var m = 0; m<result[i].points.length; m++){
                latlngs.push(L.latLng(result[i].points[m].latitude, result[i].points[m].longitude))
            }
        }
        Heatmap_Object.setOptions({radius: 10,max: latlngs.length/5000*mapheatmap_value})
        objectheat_latlon=latlngs;
        heatmapalive_detection()
    }    
}