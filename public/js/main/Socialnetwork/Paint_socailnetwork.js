/**
 * Created by Administrator on 2016/3/23.
 */
function paint_social_networktraj(snt){
    /******************************************
     *       load data
     *******************************************/
    var data=snt.data;
    console.log(data)
    if(data.this_latitude!=undefined&&data.this_longitude!=undefined)
        var p=map.latLngToContainerPoint(L.latLng(data.this_latitude, data.this_longitude))
    
    var blogtraj=d3.select("#mapobjectsvg")
        .append("image")
        .attr("data",data)
        .style("position","absolute")
        .style("height","40px")
        .style("width","30px")
        .attr("x",(p.x-15)+"px")
        .attr("y",(p.y-40)+"px")
        .attr("class","blogtraj")
        .attr("xlink:href", "image/map_objlist_socialnet.svg")
        .style("pointer-events","visiblepainted")
        .on("mouseup",function(){
            if(snt.highlight==0){
                snt.highlight=map_highlightzindex;
                map_highlightzindex++;
            }
            else{
                for(var i=0;i<map_object.length;i++){
                    if(map_object[i].highlight>snt.highlight)
                        map_object[i].highlight--;
                }
                snt.highlight=0;
            }
            highlightrepaint_map_object();
        });

    if(snt.ismove!=0){
        blogtraj.style("height","60px")
            .style("width","50px")
            .attr("x",(p.x-25)+"px")
            .attr("y",(p.y-60)+"px")
    }
    if(snt.highlight!=0){
        blogtraj.style("height","60px")
            .style("width","50px")
            .attr("x",(p.x-25)+"px")
            .attr("y",(p.y-60)+"px")
    }
}


function highlightpaint_social_networktraj(snt){
    /******************************************
     *       load data
     *******************************************/
    var data=snt.data;
    if(data.this_latitude!=undefined&&data.this_longitude!=undefined){
        var p=map.latLngToContainerPoint(L.latLng(data.this_latitude, data.this_longitude))
        if(snt.highlight!=0&&(p.y-10)<428){
            var  highlightsnt=d3.select("#sceneviewfold").append("div")
                .attr("class","mappopsnt")
                .style("z-index", snt.highlight)
                .style("left",(p.x*1+15)+"px")
                .style("top",  p.y-175+"px")
                .on("mouseup",function(){
                    if(!flag_is_textmouseup){
                        for(var i=0;i<map_object.length;i++){
                            if(map_object[i].highlight>snt.highlight){
                                map_object[i].highlight--;
                            }
                        }
                        snt.highlight=map_highlightzindex-1;
                        repaint_map_object();
                    }
                    else
                        flag_is_textmouseup=false;

                });

            highlightsnt.append("div").attr("class","mappoptitle")
                .text(snt.data.thisid);

            highlightsnt.append("img")
                .attr("class","mappopicon")
                .attr("src","image/map_objlist_socialnet.svg");

            highlightsnt.append("img")
                .attr("class","mappopjiejing")
                .attr("src", "image/map_jiejing.svg")
                .on("mousedown",function(){
                    highlightpaint_street_viewtraj(snt.data.longitude+"000",
                            snt.data.latitude+"00");
                })

            highlightsnt.append("img")
                .attr("class","mappopdelete")
                .attr("src","image/delete.svg")
                .style("z-index","10")
                .on("mousedown",function(){
                    snt.highlight=0;
                    highlightrepaint_map_object();
                });
            var caller = "To: ";
            if(snt.data.iscaller == "0"){
                caller = "From: "
            }
            highlightsnt.append("div")
                .attr("class","mappopattr")
                .text( caller+ snt.data.otherid);

            highlightsnt.append("div")
                .attr("class","mappopattr mappopattrdrag")
                .text("Fetch Position")
                .on("mousedown",function(){
                    new_conditiondiv("positionsntnt",
                        {lat:snt.data.this_latitude,lon:snt.data.this_longitude},d3.event.x,d3.event.y,snt.node,1);
                })

            var h = parseInt(snt.data.dura/3600);
            var m = parseInt((snt.data.dura-h*3600)/60);
            var s = parseInt(snt.data.dura-h*3600-60*m);
            if(h==0){
                highlightsnt.append("div")
                    .attr("class","mappopattr")
                    .text("Duration: "+ m + "m "+s + "s");
            }else{
                highlightsnt.append("div")
                    .attr("class","mappopattr")
                    .text("Duration: "+h+"h "+ m + "m "+s + "s");
            }

            highlightsnt.append("div")
                .attr("class","mappopattr mappopattrdrag")
                .text("Start time: "+ snt.data.startTime)
//                .on("mousedown",function(){
//                    new_conditiondiv("positionsntnt",
//                        {lat:snt.data.this_latitude,lon:snt.data.this_longitude},d3.event.x,d3.event.y,snt.node,1);
//                })

        }
    }
}

function highlightpaint_social_networklisttraj(snt){
    if(snt.highlight!=0) {
    var data=snt.data;
    var highlightcar = d3.select("#sceneviewfold")
            .append("div")
            .attr("class", "highlight_social_networklist")
            .style("z-index", snt.highlight)
            .on("mouseup", function () {
                for (var i = 0; i < map_object.length; i++) {
                    if (map_object[i].highlight > snt.highlight) {
                        map_object[i].highlight--;
                    }
                }
                snt.highlight = map_highlightzindex - 1;
                repaint_map_object();
            });
        //drag
        highlightcar.append("div")
            .attr("class","highlightcartitle")
            .text(data[0].thisid)
            .on("mousedown",function(){
                d3.select("body").append("svg")
                    .style("position","absolute")
                    .style("z-index","1000")
                    .style("width","100%")
                    .style("left",0)
                    .style("top",0)
                    .style('height',"100%")
                    .on("mousemove",function(){
                        highlightcar.style("left",(d3.event.x-105)+"px")
                            .style("top",(d3.event.y-15)+"px")
                    })
                    .on("mouseup",function(){
                        d3.select(this).remove();
                    })
            })

       
        showsntchart(snt,highlightcar);

        highlightcar.append("img")
            .attr("src", "image/map_objlist_socialnet.svg")
            .style("position","absolute")
            .style("top","0px")
            .attr("height", "28px")
            .attr("width", "28px");

        //delete
        highlightcar.append("img")
            .attr("src","image/delete.svg")
            .style("position","absolute")
            .style("height","16px")
            .style("width","16px")
            .style("top","6px")
            .style("right","8px")
            .style("cursor","pointer")
            .on("mousedown", function () {
                snt.highlight = 0;
                highlightrepaint_map_object();
            })
    }
}

function showsntchart(snt,highlightcar) {
    //load data
    var data=snt.data;
    var nodenum=snt.node;

    //chart div
    highlightcar.selectAll(".chart").remove()


    highlightcar.append("div")
            .text("The statistical graph of speed")
            .style("cursor","default")
            .style("font-size","13px")
            .style("position","absolute")
            .style("left","32px")
            .style("top","36px")
            .style("color","#000")

    var chartdiv = highlightcar.append("div")
        .style("position","absolute")
        .style("top","62px")
        .attr("class", "chart")
        .style("width", "100%")
        .style("height", "260px")
        .style("border-top","1px solid #ccc")

        
        var sntData=data;
            var ClasssntData=[];
            var sntflag=false;
            for (i=0;i<sntData.length;i++)
            {
               if (sntData[i].dura!=0){
                sntflag=false;
                for (j=0;j<ClasssntData.length;j++)
                {
                    if (ClasssntData.length>0)
                    {
                        if(ClasssntData[j][1]==sntData[i].otherid)
                        {
                            if(ClasssntData[j][0]==sntData[i].thisid)
                            {
                                ClasssntData[j][2]=ClasssntData[j][2]+1;
                                ClasssntData[j][3]=ClasssntData[j][3]+sntData[i].dura;

                                sntflag=true;
                                break;
                            }
                                
                           
                            
                        }
                    }
                }

                if (!sntflag)
                {
                    ClasssntData.push([sntData[i].thisid,sntData[i].otherid,1,sntData[i].dura]);
                    sntflag=true;
                }
            }
            }
            // console.log(ClasssntData)
            var ForceData={"nodes":[],"links":[]};
            var name=[];
            ForceData.nodes.push({"name":sntData[0].thisid,"group":1});
            var nameagain=false;
            

            for (i=0;i<ClasssntData.length;i++)
            {
                // console.log(ForceData)
                for (ii=0;ii<ForceData.nodes.length;ii++)
                {
                    if(ForceData.nodes[ii].name==ClasssntData[i][1])
                    {
                        nameagain=true;
                        break;
                    }
                }
                if(!nameagain){
                    if (ClasssntData[i][1]==sntData[0].thisid||ClasssntData[i][0]==sntData[0].thisid)
                    {
                        ForceData.nodes.push({"name":ClasssntData[i][1],"group":2});
                    }
                    else
                    {
                        ForceData.nodes.push({"name":ClasssntData[i][1],"group":3});
                    }
                    name.push(ClasssntData[i][1]);
                }
                nameagain=false;
            }
            for (i=0;i<ClasssntData.length;i++)
            {
                // console.log(ForceData)
                for (ii=0;ii<ForceData.nodes.length;ii++)
                {
                    if(ForceData.nodes[ii].name==ClasssntData[i][0])
                    {
                        nameagain=true;
                        break;
                    }
                }
                if(!nameagain){
                    if (ClasssntData[i][1]==sntData[0].thisid||ClasssntData[i][0]==sntData[0].thisid)
                    {
                        ForceData.nodes.push({"name":ClasssntData[i][0],"group":2});
                    }
                    else
                    {
                        ForceData.nodes.push({"name":ClasssntData[i][0],"group":3});
                    }
                    name.push(ClasssntData[i][0]);
                }
                nameagain=false;
            }
            //console.log(name)
            for (i=0;i<ClasssntData.length;i++)
            {
                for (j=0;j<ForceData.nodes.length;j++)
                {
                    if (ForceData.nodes[j].name==ClasssntData[i][0])
                    {
                        for (ii=0;ii<ForceData.nodes.length;ii++)
                        {
                            if (ForceData.nodes[ii].name==ClasssntData[i][1])
                            {
                                ForceData.links.push({"source":j,"target":(ii),"value":ClasssntData[i][2]});
                            }
                        }
                    }
                    
                }
            }
            var ForceDataOne=ClasssntData.length;
            ForceDirected(ForceData,chartdiv,253,255,0,0);

}

