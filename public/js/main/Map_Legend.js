/**
 * Created by Administrator on 2016/3/20.
 */

/*******************  legend   ***************************************/
{
    d3.select("#sceneviewfold").append("div")
        .attr("class", "map_legend")
        .attr("style", "bottom: 30px").style("cursor", "default")
        .text("Trajectory of taxi (unoccupied)")
        .append("div")
        .attr("class", "map_legend_trajicon")
        .attr("style", "background-color: #c6efdc")

    d3.select("#sceneviewfold").append("div")
        .attr("class", "map_legend")
        .attr("style", "bottom: 50px").style("cursor", "default")
        .text("Trajectory of taxi (occupied)")
        .append("div")
        .attr("class", "map_legend_trajicon")
        .attr("style", "background-color: #15c19c")

    d3.select("#sceneviewfold").append("div")
        .attr("class", "map_legend")
        .attr("style", "bottom: 70px")
        .text("Trajectory of mobile phone").style("cursor", "default")
        .append("div")
        .attr("class", "map_legend_trajicon")
        .attr("style", "background-color: #ff6e1c")

    d3.select("#sceneviewfold").append("div")
        .attr("class", "map_legend")
        .attr("style", "bottom: 90px")
        .text("Geo tags of blog").style("cursor", "default")
        .append("div")
        .attr("class", "map_legend_pointicon")
        .append("img")
        .attr("src", "image/map_legend_blog.svg")
        .attr("height", "20px")
        .attr("width", "20px")

    d3.select("#sceneviewfold").append("div")
        .attr("class", "map_legend")
        .attr("style", "bottom: 110px")
        .text("Location of estate")
        .style("cursor", "default")
        .append("div")
        .attr("class", "map_legend_pointicon")
        .append("img")
        .attr("src", "image/map_legend_estate.svg")
        .attr("height", "20px")
        .attr("width", "20px")
    d3.select("#sceneviewfold").append("div")
        .attr("class", "map_legend")
        .attr("style", "bottom: 130px")
        .text("Location of taxi (unoccupied)")
        .style("cursor", "default")
        .append("div")
        .attr("class", "map_legend_pointicon")
        .append("img")
        .attr("src", "image/map_obj_car_unoccupied.svg")
        .attr("height", "20px")
        .attr("width", "20px")
    d3.select("#sceneviewfold").append("div")
        .attr("class", "map_legend")
        .attr("style", "bottom: 150px")
        .text("Location of taxi (occupied)")
        .style("cursor", "default")
        .append("div")
        .attr("class", "map_legend_pointicon")
        .append("img")
        .attr("src", "image/map_obj_car_occupied.svg")
        .attr("height", "20px")
        .attr("width", "20px")
    d3.select("#sceneviewfold").append("div")
        .attr("class", "map_legend")
        .attr("style", "bottom: 170px")
        .text("Location of a person")
        .style("cursor", "default")
        .append("div")
        .attr("class", "map_legend_pointicon")
        .append("img")
        .attr("src", "image/map_legend_people.svg")
        .attr("height", "20px")
        .attr("width", "20px")
    d3.select("#sceneviewfold").append("div")
        .attr("class", "map_legend")
        .attr("style", "bottom: 190px")
        .text("Location of poi")
        .style("cursor", "default")
        .append("div")
        .attr("class", "map_legend_pointicon")
        .append("img")
        .attr("src", "image/map_objlist_poi.svg")
        .attr("height", "20px")
        .attr("width", "20px")
}



/***********************
 *    time   linekluuky
 **********************/
let format = d3.time.format("%Y-%m-%dT%H:%M");


var timearea=[format.parse( "2014-01-01T00:00" ) , format.parse( "2014-01-16T23:59" )];
var tleft=730,
    ttop=20,
    twidth=1100,
    tright=1830;
var isplay=false;


function gethstime(time){
    return format.parse( "2014-01-01T"+Math.floor(time/60)+":"+time%60);
}

function timeline(){
    d3.select("#mapoptionsvg").append("rect")
        .attr("class","timelineattr")
        .attr("x",tleft)
        .attr("y",ttop)
        .attr("rx","5px")
        .attr("ry","5px")
        .style("width",twidth+"px");
    d3.select("#mapoptionsvg").append("rect")
        .attr("class","timelineattr")
        .attr("id","timelineleft")
        .attr("x",tleft)
        .attr("y",ttop)
        .style("cursor","e-resize")
        .on("mousedown",function(){
            d3.select("body").append("div")
                .attr("id","interactiondiv")
                .on("mousemove", function () {
                    if(d3.event.x-5>=tleft&&d3.event.x-5<=d3.select("#timelineright").attr("x")-10){
                        
                        d3.select("#timelineleft").style("x",d3.event.x-5+"px")
                        d3.select("#timelineleft").attr("x",d3.event.x-5)
                        d3.select("#timelinemiddle").style("x",d3.event.x-1+6+"px")
                        d3.select("#timelinemiddle").style("width",
                            d3.select("#timelineright").attr("x")-d3.select("#timelineleft").attr("x")-10+"px")
                        timearea[0]=gethstime(parseInt((d3.select("#timelineleft").attr("x")-tleft)/(twidth-20)*1440))
                        timearea[1]=gethstime(parseInt((d3.select("#timelineright").attr("x")-tleft-10)/(twidth-20)*1440))
                        repaint_map_object()
                        highlightrepaint_map_object()
                    }else{
                        if(d3.event.x-5<tleft){
                            if(d3.select("#timelineleft").attr("x")!=tleft){
                                d3.select("#timelineleft").style("x",tleft+"px")
                                d3.select("#timelineleft").attr("x",tleft)
                                d3.select("#timelinemiddle").style("x",(tleft+10)+"px")
                                d3.select("#timelinemiddle").style("width",
                                    d3.select("#timelineright").attr("x")-d3.select("#timelineleft").attr("x")-10+"px")
                        timearea[0]=gethstime(parseInt((d3.select("#timelineleft").attr("x")-tleft)/(twidth-20)*1440))
                        timearea[1]=gethstime(parseInt((d3.select("#timelineright").attr("x")-tleft-10)/(twidth-20)*1440))
                                repaint_map_object()
                                highlightrepaint_map_object()
                            }
                        }
                    }
                    d3.select("#timelinetext1").text(gettimetext(timearea[0]))
                    d3.select("#timelinetext2").text(gettimetext(timearea[1]))
                })
                .on("mouseup",function(){
                    d3.select(this).remove();
                })
            ;
        })
    d3.select("#mapoptionsvg").append("rect")
        .attr("class","timelineattr")
        .attr("id","timelineright")
        .attr("x",tright-10)
        .attr("y",ttop)
        .style("cursor","e-resize")
        .on("mousedown",function(){
            d3.select("body").append("div")
                .attr("id","interactiondiv")
                .on("mousemove", function () {
                    if(d3.event.x-1+6<=tright&&d3.event.x-15>=d3.select("#timelineleft").attr("x")){
                        d3.select("#timelineright").style("x",d3.event.x-5+"px")
                        d3.select("#timelineright").attr("x",d3.event.x-5)
                        d3.select("#timelinemiddle").style("width",
                            d3.select("#timelineright").attr("x")-d3.select("#timelineleft").attr("x")-10+"px")
                        timearea[0]=gethstime(parseInt((d3.select("#timelineleft").attr("x")-tleft)/(twidth-20)*1440))
                        timearea[1]=gethstime(parseInt((d3.select("#timelineright").attr("x")-tleft-10)/(twidth-20)*1440))
                        repaint_map_object()
                        highlightrepaint_map_object()
                    }else{
                        if(d3.event.x-1+6>tright){
                            if(d3.select("#timelineright").attr("x")!=tright-10){
                                d3.select("#timelineright").style("x",tright-10+"px")
                                d3.select("#timelineright").attr("x",tright-10)
                                d3.select("#timelinemiddle").style("width",
                                    d3.select("#timelineright").attr("x")-d3.select("#timelineleft").attr("x")-10+"px")
                        timearea[0]=gethstime(parseInt((d3.select("#timelineleft").attr("x")-tleft)/(twidth-20)*1440))
                        timearea[1]=gethstime(parseInt((d3.select("#timelineright").attr("x")-tleft-10)/(twidth-20)*1440))
                                repaint_map_object()
                                highlightrepaint_map_object()
                            }
                        }
                    }
                    d3.select("#timelinetext1").text(gettimetext(timearea[0]))
                    d3.select("#timelinetext2").text(gettimetext(timearea[1]))
                })
                .on("mouseup",function(){
                    d3.select(this).remove();
                })
            ;
        })
    d3.select("#mapoptionsvg").append("rect")
        .attr("class","timelineattr")
        .attr("id","timelinemiddle")
        .attr("x",tleft-1+11)
        .attr("y",ttop)
        .style("width",twidth-20+"px")
        .style("cursor","move")
        .on("mousedown",function(){
            var lastmousex1=d3.event.x-d3.select("#timelineleft").attr("x");
            var lastmousex2=d3.event.x-d3.select("#timelineright").attr("x");
            d3.select("body").append("div")
                .attr("id","interactiondiv")
                .on("mousemove", function () {
                    if(d3.event.x-lastmousex1>=tleft&&d3.event.x-lastmousex2+10<=tright){
                        d3.select("#timelineleft").style("x",d3.event.x-lastmousex1+"px")
                        d3.select("#timelineleft").attr("x",d3.event.x-lastmousex1)
                        d3.select("#timelinemiddle").style("x",d3.event.x-lastmousex1+10+"px")
                        d3.select("#timelineright").style("x",d3.event.x-lastmousex2+"px")
                        d3.select("#timelineright").attr("x",d3.event.x-lastmousex2)
                        timearea[0]=gethstime(parseInt((d3.select("#timelineleft").attr("x")-tleft)/(twidth-20)*1440))
                        timearea[1]=gethstime(parseInt((d3.select("#timelineright").attr("x")-tleft-10)/(twidth-20)*1440))
                        repaint_map_object()
                        highlightrepaint_map_object()
                    }else{
                        if(d3.event.x-lastmousex1<tleft){
                            if(d3.select("#timelineleft").attr("x")!=tleft){
                                d3.select("#timelineleft").style("x",tleft+"px")
                                d3.select("#timelineleft").attr("x",tleft)
                                d3.select("#timelinemiddle").style("x",tleft+10+"px")
                                d3.select("#timelineright").style("x",(tleft+lastmousex1)-lastmousex2+"px")
                                d3.select("#timelineright").attr("x",(tleft+lastmousex1)-lastmousex2)
                        timearea[0]=gethstime(parseInt((d3.select("#timelineleft").attr("x")-tleft)/(twidth-20)*1440))
                        timearea[1]=gethstime(parseInt((d3.select("#timelineright").attr("x")-tleft-10)/(twidth-20)*1440))
                                repaint_map_object()
                                highlightrepaint_map_object()
                            }
                        }
                        if(d3.event.x-lastmousex2+10>tright){
                            if(d3.select("#timelineright").attr("x")!=(tright-10)){
                                d3.select("#timelineleft").style("x",(tright-10+lastmousex2)-lastmousex1+"px")
                                d3.select("#timelineleft").attr("x",(tright-10+lastmousex2)-lastmousex1)
                                d3.select("#timelinemiddle").style("x",(tright-10+lastmousex2)-lastmousex1+10+"px")
                                d3.select("#timelineright").style("x",(tright-10)+"px")
                                d3.select("#timelineright").attr("x",(tright-10))
                        timearea[0]=gethstime(parseInt((d3.select("#timelineleft").attr("x")-tleft)/(twidth-20)*1440))
                        timearea[1]=gethstime(parseInt((d3.select("#timelineright").attr("x")-tleft-10)/(twidth-20)*1440))
                                repaint_map_object()
                                highlightrepaint_map_object()
                            }
                        }
                    }
                    d3.select("#timelinetext1").text(gettimetext(timearea[0]))
                    d3.select("#timelinetext2").text(gettimetext(timearea[1]))

                })
                .on("mouseup",function(){
                    d3.select(this).remove();
                })
            ;
        })

    /**************************
     * text tip
     **************************/
    d3.select("#mapoptionsvg").append("text").attr("class","timelineattr")
        .attr("id","timelinetext1")
        .text(gettimetext(timearea[0]))
        .attr("x",tleft-1+11)
        .attr("y",ttop+22)
        .style("fill","white")
    d3.select("#mapoptionsvg").append("text").attr("class","timelineattr")
        .attr("id","timelinetext2")
        .text(gettimetext(timearea[1]))
        .attr("x",tright-120)
        .attr("y",ttop+22)
        .style("fill","white")
    /**************************
     * play tip
     **************************/
    d3.select("#mapoptionsvg")
            .append("image")
            .attr("id","timelineattrimage")
            .attr("x",tleft+twidth/2-20)
            .attr("width",40)
            .attr("height",40)
            .attr("xlink:href","image/play.svg")
    var circle=d3.select("#mapoptionsvg")
        .append('circle')
        .attr("class","timelineattr")
        .attr('cx', tleft+twidth/2)
        .attr('cy', 20)
        .attr('r', 20)
        .style("pointer-events", 'visiblepainted')
        .style("fill","rgba(0,0,0,0)");
        
    circle.on("mouseup",function() {
            if(isplay){
                d3.select("#timelineattrimage").attr("xlink:href","image/play.svg");
                d3.selectAll(".videoobj").remove();
                isplay=false;
            }else{
                d3.select("#timelineattrimage").attr("xlink:href","image/pause.svg");
                time0=timearea[0]
                time1=timearea[1]
                isplay=true;

                var data=[]
                for(var i=0;i<map_object.length;i++){
                    if(map_object[i].type=="car"){
                        var thisdata=[]
                        for(var m=0;m<map_object[i].data.texiInfo.length;m++){
                            if(map_object[i].data.texiInfo[m].time<timearea[1]&&
                                map_object[i].data.texiInfo[m].time>timearea[0]) {
                                var p=map.latLngToContainerPoint(
                                    L.latLng(
                                        map_object[i].data.texiInfo[m].latitude,
                                        map_object[i].data.texiInfo[m].longitude
                                    )
                                )
                                thisdata.push([p.x, p.y,map_object[i].data.texiInfo[m].isPassengerIn,map_object[i].data.ID])
                            }
                        }
                        data.push(thisdata);
                    }
                    if(map_object[i].type=="carlist"){
                        for (var num=0;num<map_object[i].data.length;num++) {
                            var thisdata=[]
                            for (var m = 0; m < map_object[i].data[num].texiInfo.length; m++) {
                                if (map_object[i].data[num].texiInfo[m].time < timearea[1] &&
                                   map_object[i].data[num].texiInfo[m].time > timearea[0]) {
                                    var p = map.latLngToContainerPoint(
                                        L.latLng(
                                            map_object[i].data[num].texiInfo[m].latitude,
                                            map_object[i].data[num].texiInfo[m].longitude
                                        )
                                    )
                                    thisdata.push([p.x, p.y, map_object[i].data[num].texiInfo[m].isPassengerIn,map_object[i].data[num].ID])
                                }
                            }
                            if(thisdata.length>0)
                                data.push(thisdata);
                        }
                    }
                }
                for(var i=0;i<data.length;i++) {
                    Drawing(d3.select("#sceneviewfold"),data[i], "image/map_obj_car_unoccupied.svg",30, 30)
                }
                if(data.length==0){
                    isplay=false;
                }
            }
            //for (var i = 0; i < time1-time0; i++) {
            //    (function(i){setTimeout(function(){List(i);},i*200);})(i);
            //}
            //setTimeout(function(){
            //    timearea[0] =time0
            //    timearea[1]=time1
            //    isplay=false;
            //    repaint_map_object();
            //}, (time1-time0)*200);

        })
    latlngs=((tleft+twidth/2)-5)+","+ (ttop-7)+" "
        +((tleft+twidth/2)-5)+","+ (ttop-1+8)+" "
        +(tleft+twidth/2-1+9)+","+ (ttop)+" "
    // var polyline=d3.select("#mapoptionsvg")
    //     .append('polyline')
    //     .attr('points', latlngs)
    //     .style("fill","white")
    //     .style("pointer-events","none")


}

function Drawing(div,data,src,width,height){
    var img=div.append("img")
        .attr("class", "videoobj")
        .attr("src",src)
        .style("position","absolute")
        .style("left",(data[0][0]-width/2)+"px")
        .style("top",(data[0][1]-height/2)+"px")
        .attr("width",width)
        .attr("height",height);
    var taxiid=div.append("div")
        .attr("class", "videoobj")
        .text(data[0][3])
        .style("position","absolute")
        .style("left",(data[0][0]-20)+"px")
        .style("top",(data[0][1]*1+10)+"px")
        .style("font-size","10px")

    if(data[0][2]==1)
        img.attr("src","image/map_obj_car_occupied.svg")
    else
        img.attr("src",src)
    for (i=1;i<data.length;i++){
        //time.text(currenttime).delay(300*i)
        if((data[i][1] - height / 2)>d3.select("#sceneviewfold").style("height").split("px")[0]){
            // console.log("bbb")
             taxiid.transition()
                    .ease("linear")
                    .duration(300)
                    .delay(300 * i)
                    .style("left", (data[i][0] -20) + "px")
                    .style("top", (data[i][1]*1+10) + "px") .style("display", "none");
            if (data[i][2] == 1) {
                img.transition()
                    .ease("linear").attr("src", "image/map_obj_car_occupied.svg")
                    .duration(300)
                    .delay(300 * i)
                    .style("left", (data[i][0] - width / 2) + "px")
                    .style("top", (data[i][1] - height / 2) + "px") .style("display", "none");
            }
            else {
                img.transition()
                    .ease("linear").attr("src", src)
                    .duration(300)
                    .delay(300 * i)
                    .style("left", (data[i][0] - width / 2) + "px")
                    .style("top", (data[i][1] - height / 2) + "px") .style("display", "none");
            }
        }else{
            // console.log("aaa")
             taxiid.transition()
                    .ease("linear")
                    .duration(300)
                    .delay(300 * i)
                    .style("left", (data[i][0]-20) + "px")
                    .style("top", (data[i][1]*1+10) + "px") .style("display", "block");
            if (data[i][2] == 1) {
                img.transition()
                    .ease("linear").attr("src", "image/map_obj_car_occupied.svg")
                    .duration(300)
                    .delay(300 * i)
                    .style("left", (data[i][0] - width / 2) + "px")
                    .style("top", (data[i][1] - height / 2) + "px") .style("display", "block");
            }
            else {
                img.transition()
                    .ease("linear").attr("src", src)
                    .duration(300)
                    .delay(300 * i)
                    .style("left", (data[i][0] - width / 2) + "px")
                    .style("top", (data[i][1] - height / 2) + "px") .style("display", "block");
            }
        }
    }
    img.transition().remove().delay(300*data.length)
    taxiid.transition().remove().delay(300*data.length)

}


timeline();

function repaint_timeline(time1,time2){
    timearea[0]=time1;
    timearea[1]=time2;
    d3.select("#timelineleft").attr("x", parseInt(time1/1440*(twidth-20)+tleft))
    .style("left",parseInt(time1/1440*(twidth-20)+tleft)+"px")
    d3.select("#timelineright").attr("x", parseInt(time2/1440*(twidth-20)+tleft+10))
    .style("left",parseInt(time2/1440*(twidth-20)+tleft+10)+"px")
    d3.select("#timelinemiddle").attr("x",d3.select("#timelineleft").attr("x")-1+11)
        .style("width",d3.select("#timelineright").attr("x")-d3.select("#timelineleft").attr("x")-10+"px")

    d3.select("#timelinetext1").text(gettimetext(timearea[0]))
    d3.select("#timelinetext2").text(gettimetext(timearea[1]))

    if(d3.select("#timelineleft").attr("x")-tleft>60){
                        d3.select("#timelinetext1").attr("x",
                            d3.select("#timelineleft").attr("x")*1-52)
    }if(tright-d3.select("#timelineright").attr("x")>60){
                        d3.select("#timelinetext2").attr("x",
                            d3.select("#timelineright").attr("x")*1+12)
    }
}

function gettimetext(time){
    let format = d3.time.format("%m-%d-%H:%M");
    return format(time); 
}
