/**
 * Created by Administrator on 2016/3/16.
 */
var selectnodeconditioncount=-1;
function addconditionlist_time(conditionlist,condition,i,id){
    var thisitem=conditionlist.append("div")
        .attr("class","condition_conditionitem") 
        .attr("id","node"+id+"condition"+i)
        .attr("count",i)
        .on("mousedown",function(){
                    if(d3.select("#"+id).attr("operation")!="false"){
                        console.log(d3.select(this).style("background-color"))

                        if(d3.select(this).style("background-color")!="rgb(198, 239, 220)"){
                            d3.select(this).style("background-color","rgb(198,239,220)")
                            var exist=false;
                            for(var k=0;k<operationstack.length;k++){
                                if(operationstack[k]==d3.select(this).attr("count"))
                                    exist=true;
                            }
                            if(!exist)
                                operationstack.push(d3.select(this).attr("count"))
                        }else{
                            d3.select(this).style("background-color","rgb(255,255,255)")
                            var temp=[];
                            for(var k=0;k<operationstack.length;k++){
                                if(operationstack[k]!=d3.select(this).attr("count"))
                                    temp.push(operationstack[k]);
                            }
                            operationstack=temp;
                        }
                    }
        })


    thisitem.append("div")
        .text(condition.data[0])
        .style("display","inline-block")
        .style("position","relative")
        .style("width","65px")
        .style("top","5px")
        .style("font-size","11px")
    ;
    thisitem.append("div")
        .text("~")
        .style("cursor","default")
        .style("display","inline-block")
        .style("position","relative")
        .style("font-size","8px")
        .style("left","20px")
    ;
    thisitem.append("div")
        .text(condition.data[1])
        .style("display","inline-block")
        .style("position","relative")
        .style("top","5px")
        .style("width","65px")
        .style("font-size","11px").style("left","40px")
    ;
    if(condition.data[2]!=null){
        for(var m=1;m<condition.data[2];m++){
            thisitem.append("div")
                .text(condition.data[m*2+1])
                .style("display","inline-block")
                .style("position","absolute")
                .style("width","85px")
                .style("top","5px")
                .style("right","165px")
                .style("font-size","11px")
            ;
        }
    }
    thisitem.append("img")
        .attr("src", "image/trash.svg")
        .style("position","absolute")
        .style("top","0px")
        .style("cursor","pointer")
        .attr("height", "46px")
        .attr("width", "40px")
        .style("right","0")
        .attr("count",i)
        .on("mousedown",function(){
            var tempnode=nodelist.getlistiditem(id);
            var thislist=tempnode.getcondition();
            var newlist=[];
            for(var i=0;i<thislist.length;i++){
                if(i!=d3.select(this).attr("count")){
                    newlist.push(thislist[i])
                }
            }
            tempnode.changecondition(newlist);
            nodelist.changelistiditem(id,tempnode)
            show_conditionlist(id);
        })
}

function addconditionlist_where(conditionlist,condition,i,id){
    var thisitem=conditionlist.append("div")
        .attr("id",id+"thisitem"+i)
        .attr("count",i)
        .style("padding","16px 0 15px 35px")
        .style("height","14px")
        .attr("class","condition_conditionitem")
        .on("mousedown",function(){
                    if(d3.select("#"+id).attr("operation")!="false"){
                        console.log(d3.select(this).style("background-color"))

                        if(d3.select(this).style("background-color")!="rgb(198, 239, 220)"){
                            d3.select(this).style("background-color","rgb(198,239,220)")
                                .style("border-top","1px solid rgb(21,193,156)")
                                .style("border-bottom","1px solid rgb(21,193,156)")
                            var exist=false;
                            for(var k=0;k<operationstack.length;k++){
                                if(operationstack[k]==d3.select(this).attr("count"))
                                    exist=true;
                            }
                            if(!exist)
                                operationstack.push(d3.select(this).attr("count"))
                        }else{
                            d3.select(this).style("background-color","rgb(255,255,255)")
                                .style("border","0").style("width","279px")

                            var temp=[];
                            for(var k=0;k<operationstack.length;k++){
                                if(operationstack[k]!=d3.select(this).attr("count"))
                                    temp.push(operationstack[k]);
                            }
                            operationstack=temp;
                        }
                    }
                })
        .text(function(){
            console.log(condition.data[4])
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
        .attr("count",i)
        .on("mousedown",function(){
            if(d3.select("#"+id+"thisitem"+d3.select(this).attr("count")).style("height")=="14px"){
                d3.select("#"+id+"thisitem"+d3.select(this).attr("count")).style("height","114px")

                var whereitem=condition.data;
                var thismap_div=d3.select("#"+id+"thisitem"+d3.select(this).attr("count"))
                    .append("div")
                    .attr("id",id+"map_condition"+d3.select(this).attr("count"))
                    .style("position","absolute")
                    .style("left",0)
                    .style("top","50px")

                    .style("height","100px")
                    .style("width","280px")
                var map1 = L.map(id+"map_condition"+d3.select(this).attr("count"))
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
                d3.select("#"+id+"thisitem"+d3.select(this).attr("count")).style("height","14px");
                d3.select("#"+id+"thisitem"+d3.select(this).attr("count"))
                    .select("#"+id+"map_condition"+d3.select(this).attr("count")).remove();
            }
        })

    thisitem.append("img")
        .attr("src", "image/trash.svg")
        .style("position","absolute")
        .style("top","0px")
        .style("cursor","pointer")
        .attr("height", "46px")
        .attr("width", "40px")
        .style("right","0")
        .attr("count",i)
        .on("mousedown",function(){
            var tempnode=nodelist.getlistiditem(id);
            var thislist=tempnode.getcondition();
            var newlist=[];
            for(var i=0;i<thislist.length;i++){
                if(i!=d3.select(this).attr("count")){
                    newlist.push(thislist[i])
                }
            }
            tempnode.changecondition(newlist);
            nodelist.changelistiditem(id,tempnode)
            show_conditionlist(id);
        })
}

function addconditionlist_which(conditionlist,condition,i,id){
    var thisitem=conditionlist.append("div")
        .attr("class","condition_conditionitem")
        .attr("count",i)
        .on("mousedown",function(){
                    if(d3.select("#"+id).attr("operation")!="false"){
                        console.log(d3.select(this).style("background-color"))

                        if(d3.select(this).style("background-color")!="rgb(198, 239, 220)"){
                            d3.select(this).style("background-color","rgb(198,239,220)")
                                .style("border-top","1px solid rgb(21,193,156)")
                                .style("border-bottom","1px solid rgb(21,193,156)")
                            var exist=false;
                            for(var k=0;k<operationstack.length;k++){
                                if(operationstack[k]==d3.select(this).attr("count"))
                                    exist=true;
                            }
                            if(!exist)
                                operationstack.push(d3.select(this).attr("count"))
                        }else{
                            d3.select(this).style("background-color","rgb(255,255,255)")
                                .style("border","0").style("width","279px")

                            var temp=[];
                            for(var k=0;k<operationstack.length;k++){
                                if(operationstack[k]!=d3.select(this).attr("count"))
                                    temp.push(operationstack[k]);
                            }
                            operationstack=temp;
                        }
                    }
                })
    thisitem.append("div")
        .text("ID = "+condition.data)
        .style("display","inline-block")
        .style("position","absolute")
        .style("width","180px")
        .style("top","13px")
        .style("font-size","13px")
    ;

   thisitem.append("img")
        .attr("src", "image/trash.svg")
        .style("position","absolute")
        .style("top","0px")
        .style("cursor","pointer")
        .attr("height", "46px")
        .attr("width", "40px")
        .style("right","0")
        .attr("count",i)
        .on("mousedown",function(){
            var tempnode=nodelist.getlistiditem(id);
            var thislist=tempnode.getcondition();
            var newlist=[];
            for(var i=0;i<thislist.length;i++){
                if(i!=d3.select(this).attr("count")){
                    newlist.push(thislist[i])
                }
            }
            tempnode.changecondition(newlist);
            nodelist.changelistiditem(id,tempnode)
            show_conditionlist(id);
        })
}

function addconditionlist_what(conditionlist,condition,i,id){
    var thisitem=conditionlist.append("div")
        .attr("class","condition_conditionitem") .attr("count",i)
        .on("mousedown",function(){
                    if(d3.select("#"+id).attr("operation")!="false"){
                        console.log(d3.select(this).style("background-color"))

                        if(d3.select(this).style("background-color")!="rgb(198, 239, 220)"){
                            d3.select(this).style("background-color","rgb(198,239,220)")
                                .style("border-top","1px solid rgb(21,193,156)")
                                .style("border-bottom","1px solid rgb(21,193,156)")
                            var exist=false;
                            for(var k=0;k<operationstack.length;k++){
                                if(operationstack[k]==d3.select(this).attr("count"))
                                    exist=true;
                            }
                            if(!exist)
                                operationstack.push(d3.select(this).attr("count"))
                        }else{
                            d3.select(this).style("background-color","rgb(255,255,255)")
                                .style("border","0").style("width","279px")

                            var temp=[];
                            for(var k=0;k<operationstack.length;k++){
                                if(operationstack[k]!=d3.select(this).attr("count"))
                                    temp.push(operationstack[k]);
                            }
                            operationstack=temp;
                        }
                    }
                })
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
    ;

   

   thisitem.append("img")
        .attr("src", "image/trash.svg")
        .style("position","absolute")
        .style("top","0px")
        .style("cursor","pointer")
        .attr("height", "46px")
        .attr("width", "40px")
        .style("right","0")
        .attr("count",i)
        .on("mousedown",function(){
            var tempnode=nodelist.getlistiditem(id);
            var thislist=tempnode.getcondition();
            var newlist=[];
            for(var i=0;i<thislist.length;i++){
                if(i!=d3.select(this).attr("count")){
                    newlist.push(thislist[i])
                }
            }
            tempnode.changecondition(newlist);
            nodelist.changelistiditem(id,tempnode)
            show_conditionlist(id);
        })
}

function addconditionlist_inter(conditionlist,conditions,i,id){
        var thisitem=conditionlist.append("div")
                .attr("id","conditionlist_item"+i)
                .attr("count",i)
                .style("position","relative")
               .style("padding","5px 0 5px 35px")
               .style("border-bottom","1px solid #ddd")
               .on("mousedown",function(){
                    if(d3.select("#"+id).attr("operation")!="false"){
                        console.log(d3.select(this).style("background-color"))

                        if(d3.select(this).style("background-color")!="rgb(198, 239, 220)"){
                            d3.select(this).style("background-color","rgb(198,239,220)")
                            var exist=false;
                            for(var k=0;k<operationstack.length;k++){
                                if(operationstack[k]==d3.select(this).attr("count"))
                                    exist=true;
                            }
                            if(!exist)
                                operationstack.push(d3.select(this).attr("count"))
                        }else{
                            d3.select(this).style("background-color","rgb(255,255,255)")
                            var temp=[];
                            for(var k=0;k<operationstack.length;k++){
                                if(operationstack[k]!=d3.select(this).attr("count"))
                                    temp.push(operationstack[k]);
                            }
                            operationstack=temp;
                        }
                    }
                })

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
                    console.log(!d3.select(this).attr("show"))
                    if(d3.select(this).attr("show")=="false"){
                        d3.select(this).attr("show",true)
                        var thisconditiondiv=d3.select("#conditionlist_item"+d3.select(this).attr("count"))
                           
                        for(var l=0;l<conditions.data.length;l++){
                            if(conditions.data[l].type=="time"){
                                addconditionlist_time(thisconditiondiv, conditions.data[l],
                                d3.select(this).attr("count")+l,id)
                            }

                            if(conditions.data[l].type=="where"){
                                addconditionlist_where(thisconditiondiv, conditions.data[l],
                                    d3.select(this).attr("count")+l,id)
                            }

                            if(conditions.data[l].type=="which"){
                                addconditionlist_which(thisconditiondiv, conditions.data[l],
                                   d3.select(this).attr("count")+l,id)
                            }
                            if(conditions.data[l].type=="what"){
                                addconditionlist_what(thisconditiondiv, conditions.data[l],
                                    d3.select(this).attr("count")+l,id)
                            }
                            if(conditions.data[l].type=="+"){
                                addconditionlist_inter(thisconditiondiv, conditions.data[l],
                                    d3.select(this).attr("count")+l,id)
                            }
                        }
                    }else{
                        d3.select(this).attr("show","false")
                        show_conditionlist(id)
                    }
                    })
        thisitem.append("img")
        .attr("src", "image/trash.svg")
        .style("position","absolute")
        .style("top","0px")
        .style("cursor","pointer")
        .attr("height", "46px")
        .attr("width", "40px")
        .style("right","0")
        .attr("count",i)
        .on("mousedown",function(){
            var tempnode=nodelist.getlistiditem(id);
            var thislist=tempnode.getcondition();
            var newlist=[];
            for(var i=0;i<thislist.length;i++){
                if(i!=d3.select(this).attr("count")){
                    newlist.push(thislist[i])
                }
            }
            tempnode.changecondition(newlist);
            nodelist.changelistiditem(id,tempnode)
            show_conditionlist(id);
        })




}



