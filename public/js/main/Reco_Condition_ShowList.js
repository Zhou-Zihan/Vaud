function show_reco_conditionlist(id){
    var tempnode=recolist.getlistindexof(id);
    var conditions=tempnode.getcondition();

    d3.select("#recoconditionlist"+id).remove();

    var conditionlist = d3.select("#reconodediv"+id)
        .append("div")
        .attr("id","recoconditionlist"+id)
        .attr("class","recoconditionlist")

    for(var i=0;i<conditions.length;i++){
        if(conditions[i].type=="+"){
            addrecoconditionlist_inter(conditionlist,conditions[i],i,id)
        }

        if(conditions[i].type=="time"){
            addrecoconditionlist_time(conditionlist,conditions[i],i,id)
        }

        if(conditions[i].type=="where"){
            addrecoconditionlist_where(conditionlist,conditions[i],i,id)
        }

        if(conditions[i].type=="which"){
            addrecoconditionlist_which(conditionlist,conditions[i],i,id)
        }
        if(conditions[i].type=="what"){
            addrecoconditionlist_what(conditionlist,conditions[i],i,id)
        }

    }
}

function addrecoconditionlist_inter(conditionlist,conditions,i,id){
    var thisitem=conditionlist.append("div")
        .attr("id","recoconditionlist_item"+i)
        .attr("count",i)
        .style("position","relative")
        .style("padding","5px 0 5px 35px")
        .style("border-bottom","1px solid #ddd")
    
    thisitem.append("div").style("position","absolute")
        .style("width","226px")
        .style("font-size","14px").style("padding","8px 0 9px 0")
        .text(function(){
            var name=""
                if(conditions.data[0].type=="time"){
                        name=name+"When "
                    }if(conditions.data[0].type=="where"){
                       name=name+"Where "
                    }if(conditions.data[0].type=="which"){
                       name=name+"Which "
                    }if(conditions.data[0].type=="what"){
                        name=name+"What "
                    }if(conditions.data[0].type=="+"){
                        name=name+"Intersection "
                    }
            for(var i=1;i<conditions.data.length;i++){
                if(conditions.data[i].type=="time"){
                        name=name+"+ When "
                    }if(conditions.data[i].type=="where"){
                       name=name+"+ Where "
                    }if(conditions.data[i].type=="which"){
                       name=name+"+ Which "
                    }if(conditions.data[i].type=="what"){
                        name=name+"+ What "
                    }if(conditions.data[i].type=="+"){
                        name=name+"+ Intersection "
                    }
            }
            return name;
        })
        .style("position","relative")
    
    thisitem.append("img")
        .attr("src", "image/unfold.svg")
        .style("height","30px")
        .style("width","30px")
        .style("position","absolute")
        .style("left",0).style("top","8px")
        .style("cursor","pointer")
        .attr("count",i)
        .attr("show",false)
        .on("mousedown",function(){
            console.log(d3.select(this).attr("show"))
            if(d3.select(this).attr("show")=="false"){
                d3.select(this).attr("show",true)
                var thisconditiondiv=d3.select("#recoconditionlist_item"+d3.select(this).attr("count"))
                   
                for(var l=0;l<conditions.data.length;l++){
                    if(conditions.data[l].type=="time"){
                        addrecoconditionlist_time(thisconditiondiv, conditions.data[l],d3.select(this).attr("count")+l,id)
                    }

                    if(conditions.data[l].type=="where"){
                        addrecoconditionlist_where(thisconditiondiv, conditions.data[l],d3.select(this).attr("count")+l,id)
                    }

                    if(conditions.data[l].type=="which"){
                        addrecoconditionlist_which(thisconditiondiv, conditions.data[l], d3.select(this).attr("count")+l,id)
                    }
                    if(conditions.data[l].type=="what"){
                        addrecoconditionlist_what(thisconditiondiv, conditions.data[l], d3.select(this).attr("count")+l,id)
                    }
                    if(conditions.data[l].type=="+"){
                        addrecoconditionlist_inter(thisconditiondiv, conditions.data[l],d3.select(this).attr("count")+l,id)
                    }
                }
            }else{
                d3.select(this).attr("show","false")
                show_reco_conditionlist(id)
            }
        })
    
}

function addrecoconditionlist_time(conditionlist,condition,i,id){   
    var thisitem = conditionlist.append("div")
        .attr("class","recocondition_conditionitem")
        .attr("id","reconode"+id+"condition"+i)
        .attr("count",i)
    
    thisitem.append("div")
        .text(condition.data[0])
        .style("display","inline-block")
        .style("position","relative")
        .style("width","65px")
        .style("top","5px")
        .style("font-size","11px");

    thisitem.append("div")
        .text("~")
        .style("cursor","default")
        .style("display","inline-block")
        .style("position","relative")
        .style("font-size","8px")
        .style("left","20px");

    thisitem.append("div")
        .text(condition.data[1])
        .style("display","inline-block")
        .style("position","relative")
        .style("top","5px")
        .style("width","65px")
        .style("font-size","11px").style("left","40px");
}

function addrecoconditionlist_where(conditionlist,condition,idx,id){
    var thisitem=conditionlist.append("div")
        .attr("id","reco"+id+"thisitem"+idx)
        .attr("count",idx)
        .style("padding","16px 0 15px 35px")
        .style("height","14px")
        .attr("class","recocondition_conditionitem")
        .text(function(){
            if(condition.data[4]!=null)
                return "Region "
            else
                return "Location"
        })
        .style("font-size","12px")

    thisitem.append("img")
        .attr("src", "image/unfold.svg")
        .style("position","absolute")
        .style("top","10px")
        .style("cursor","pointer")
        .attr("height", "30px")
        .attr("width", "30px")
        .style("left","0")
        .attr("count",idx)
        .on("mousedown",function(){
            console.log(d3.select("#reco"+id+"thisitem"+idx));
            if(d3.select("#reco"+id+"thisitem"+idx).style("height")=="14px"){
                d3.select("#reco"+id+"thisitem"+idx).style("height","114px")

                var whereitem=condition.data;
                var thismap_div=d3.select("#reco"+id+"thisitem"+idx)
                    .append("div")
                    .attr("id","reco"+id+"map_condition"+idx)
                    .style("position","absolute")
                    .style("left",0)
                    .style("top","50px")
                    .style("left","15px")
                    .style("height","100px")
                    .style("width","200px")
                var map1 = L.map("reco"+id+"map_condition"+idx)
                    .setView([whereitem[2],whereitem[1]], 12);
                L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(map1);
                thismap_div.select(".leaflet-control-container").remove()

                var latLngs1=[];
                latLngs1.push(L.latLng(whereitem[0], whereitem[1]))
                latLngs1.push(L.latLng(whereitem[0], whereitem[3]))
                latLngs1.push(L.latLng(whereitem[2], whereitem[3]))
                latLngs1.push(L.latLng(whereitem[2], whereitem[1]))
                L.polygon(latLngs1, {color: "#f06eaa"}).addTo(map1)
                if(whereitem[4]!=null){
                    for(var i=1;i<whereitem[4];i++){
                        var latLngs2=[];
                        latLngs2.push(L.latLng(whereitem[0+i*4+1], whereitem[1+i*4+1]))
                        latLngs2.push(L.latLng(whereitem[0+i*4+1], whereitem[3+i*4+1]))
                        latLngs2.push(L.latLng(whereitem[2+i*4+1], whereitem[3+i*4+1]))
                        latLngs2.push(L.latLng(whereitem[2+i*4+1], whereitem[1+i*4+1]))
                        L.polygon(latLngs2, {color: "#f06eaa"}).addTo(map1)
                    }
                }

            }else{
                d3.select("#reco"+id+"thisitem"+idx).style("height","14px");
                d3.select("#reco"+id+"thisitem"+idx)
                    .select("#reco"+id+"map_condition"+d3.select(this).attr("count")).remove();
            }
        })
}

function addrecoconditionlist_which(conditionlist,condition,i,id){
    var thisitem=conditionlist.append("div")
        .attr("class","recocondition_conditionitem")
        .attr("count",i)
    
    thisitem.append("div")
        .text("ID = "+condition.data)
        .style("display","inline-block")
        .style("position","absolute")
        .style("width","180px")
        .style("top","13px")
        .style("font-size","13px")
}

function addrecoconditionlist_what(conditionlist,condition,i,id){
    var thisitem=conditionlist.append("div")
        .attr("class","recocondition_conditionitem") 
        .attr("count",i)
    
    thisitem.append("div")
        .text(function(){
            if(condition.data[0]=="speed")
                return "Speed"+" = "+condition.data[1]+" km/h"
            else
                return condition.data[0]+" = "+condition.data[1]
        })
        .style("display","inline-block")
        .style("position","absolute")
        .style("width","180px")
        .style("top","13px")
        .style("font-size","13px")
}