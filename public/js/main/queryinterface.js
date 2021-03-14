/**
 * Created by hzs on 2015/7/2.
 */

//dragflag


var thiscasecount=0;
var thiscase=1;
var mousex, mousey;
var nodedrag = {boolean:false};
var nownode=null;
var nodesvgmove={boolean:false};


var operationstack=[];

var isdrag_new_condition=false,
    isabledrag_new_condition=false;
var activenode;

var nodelist=Nodelist.createNew();
var recolist=Recolist.createNew()

d3.select("#queryviewsvg").on("mousedown",function(){
    nodesvgmove = {boolean:true, mousex:d3.event.x, mousey:d3.event.y};
    d3.select("#queryviewsvg").style("cursor","move")
})

d3.select("body")
    .on("mousemove",function(){
        if(nodedrag.boolean){
            d3.select("#nodediv"+nownode).style("left",d3.event.x - nodedrag.mousex + "px");
            d3.select("#nodediv"+nownode).style("top",d3.event.y - nodedrag.mousey + "px");
            if(!nodelist.getlistiditem("node"+nownode).showdetail){
                d3.select("#node_cricle"+nownode).style("left", (d3.event.x - nodedrag.mousex) + "px");
                d3.select("#node_cricle"+nownode).style("top", (d3.event.y - nodedrag.mousey) + "px");
            }
            linepaint();
        }
        if(nodesvgmove.boolean){
            for(var i=0;i<nodelist.getlist().length;i++){

                var count=nodelist.getlist()[i].id.split("node")[1]
                d3.select("#nodediv"+count).style("left",
                    (d3.select("#nodediv"+count).attr("x") - nodesvgmove.mousex+d3.event.x) + "px");
                d3.select("#nodediv"+count).style("top",
                    (d3.select("#nodediv"+count).attr("y")  - nodesvgmove.mousey+d3.event.y) + "px");
                if(!nodelist.getlistiditem("node"+count).showdetail){
                    d3.select("#node_cricle"+count).style("left", (
                        d3.select("#node_cricle"+count).attr("x") - nodesvgmove.mousex+d3.event.x) + "px");
                    d3.select("#node_cricle"+count).style("top", (
                        d3.select("#node_cricle"+count).attr("y") - nodesvgmove.mousey+d3.event.y) + "px");
                }
            }
            linepaint();
        }
    })
    .on("mouseup",function(){
        if(nodedrag.boolean){
            nodedrag.boolean=false;
            d3.select("#nodediv"+nownode).attr("x",d3.event.x - nodedrag.mousex);
            d3.select("#nodediv"+nownode).attr("y",d3.event.y - nodedrag.mousey);
            if(!nodelist.getlistiditem("node"+nownode).showdetail){
                d3.select("#node_cricle"+nownode).attr("x", (d3.event.x - nodedrag.mousex));
                d3.select("#node_cricle"+nownode).attr("y", (d3.event.y - nodedrag.mousey));
            }
        }

        if(nodesvgmove.boolean){
            for(var i=0;i<nodelist.getlist().length;i++){
                var count=nodelist.getlist()[i].id.split("node")[1]
                d3.select("#nodediv"+count).attr("x",
                    (d3.select("#nodediv"+count).attr("x") - nodesvgmove.mousex+d3.event.x));
                d3.select("#nodediv"+count).attr("y",
                    (d3.select("#nodediv"+count).attr("y")  - nodesvgmove.mousey+d3.event.y) );
                if(!nodelist.getlistiditem("node"+count).showdetail){
                    d3.select("#node_cricle"+count).attr("x", (
                        d3.select("#node_cricle"+count).attr("x") - nodesvgmove.mousex+d3.event.x) );
                    d3.select("#node_cricle"+count).attr("y", (
                        d3.select("#node_cricle"+count).attr("y") - nodesvgmove.mousey+d3.event.y) );
                }
            }
            nodesvgmove.boolean=false;
            d3.select("#queryviewsvg").style("cursor","default")
        }

    })


function linepaint(){

    var pointlist=nodelist.getfather_and_son();
    d3.select("#queryviewsvg").selectAll("path").remove();
    d3.select("#queryviewsvg").selectAll('polygon').remove();
    for(var i= 0;i<pointlist.length;i++){

        if(nodelist.getlistiditem("node"+pointlist[i].father).islive
            &&nodelist.getlistiditem("node"+pointlist[i].son).islive){
            //compute x y
            if(nodelist.getlistiditem("node"+pointlist[i].father).showdetail){
                var fatherx =(d3.select("#nodediv" + pointlist[i].father).style("left").split("px")[0] - 1 + 286),
                    fathery =(d3.select("#nodediv" + pointlist[i].father).style("top").split("px")[0] - 1 + 43);
            }else{
                var fatherx =(d3.select("#nodediv" + pointlist[i].father).style("left").split("px")[0] - 1 + 185),
                    fathery =(d3.select("#nodediv" + pointlist[i].father).style("top").split("px")[0] - 1 + 23);
            }
            if(nodelist.getlistiditem("node"+pointlist[i].son).showdetail) {
                var sonx =(d3.select("#nodediv" + pointlist[i].son).style("left").split("px")[0]-10),
                    sony =(d3.select("#nodediv" + pointlist[i].son).style("top").split("px")[0] - 1 + 43);
            }else{
                var sonx =(d3.select("#nodediv" + pointlist[i].son).style("left").split("px")[0]-10),
                    sony =(d3.select("#nodediv" + pointlist[i].son).style("top").split("px")[0] - 1 + 23);
            }
            var fathersonx=fatherx-sonx;
            var fathersony=fathery-sony;
            if(fathersonx<0)
                fathersonx=0-fathersonx;
            if(fathersony<0)
                fathersony=0-fathersony;
            //console.log(nodelist.getlistiditem("node"+pointlist[i].father).getnodetype());//the type of father node
            //console.log(nodelist.getlistiditem("node"+pointlist[i].son).getnodetype());//the type of son node
            //paint line
            var fatherType = nodelist.getlistiditem("node"+pointlist[i].father).getnodetype();
            var sonType = nodelist.getlistiditem("node"+pointlist[i].son).getnodetype();

            if(fatherType == 'condition'&& sonType == 'data'){
                d3.select("#queryviewsvg").append('path')
                    .attr('style', 'stroke:#858585; fill:none; stroke-width:2;')
                    .attr("d", "M" +
                        fatherx + "," + fathery
                        + " C" + (sonx - fathersonx / 3) + "," + fathery
                        + " " + (fatherx+ fathersonx / 3) + "," + sony
                        + " " + sonx + "," + sony);
            } else {
                d3.select("#queryviewsvg").append('path')
                    .attr('style', 'stroke:#858585; fill:none; stroke-width:2; stroke-dasharray:8 8')
                    .attr("d", "M" +
                        fatherx + "," + fathery
                        + " C" + (sonx - fathersonx / 3) + "," + fathery
                        + " " + (fatherx+ fathersonx / 3) + "," + sony
                        + " " + sonx + "," + sony);
            }
            d3.select("#queryviewsvg").append('polygon')
                .attr('style', 'stroke:#858585;fill:#858585;')
                .attr('points',
                    (sonx+10) + "," + sony
                    + " " + sonx + "," + (sony-5)
                    + " " + sonx + "," + (sony+5));
        }

    }
}



function query(count, isfrom_reco_result) {
    var thisnode=nodelist.getlistiditem("node"+count);
    var sqlobject;

    if(typeof isfrom_reco_result !== 'undefined'){
        if(thisnode.type=="blog")
            blog_handleresult(isfrom_reco_result, count)

        if(thisnode.type=="car")
            car_handleresult(isfrom_reco_result, count)

        if(thisnode.type=="people")
            people_handleresult(isfrom_reco_result, count)

        if(thisnode.type=="point_of_interest")
            poi_handleresult(isfrom_reco_result, count)
    }
    else{
        if(thisnode.type=="blog")
            sqlobject=queryblog(count);

        if(thisnode.type=="car")
            sqlobject=querycar(count);

        if(thisnode.type=="people")
            sqlobject=querypeople(count);

        if(thisnode.type=="estate")
            queryestate(count);

        if(thisnode.type=="point_of_interest")
            sqlobject=querypoi(count);

        if(thisnode.type=="social_network")
            querysocialnetwork(count)

        /*******************************
         *   query weather
         *******************************/
        if(thisnode.type=="weather") {
                qm.getWeather(
                    "2014-01-01",(nodelist.getlistlength() - 1),
                    function(data){
                        data_node_newnode("estate",[d3.select("#nodediv"+count).style("left").split("px")[0]-1+400,
                            d3.select("#nodediv"+count).style("top").split("px")[0]])
                        var tempnode = nodelist.getlistindexof(nodelist.getlistlength() - 1);
                        tempnode.setdatalist(data);
                        nodelist.changelistiditem(nodelist.getlistlength() - 1, tempnode)

                        lastnode = d3.select("#node" + (nodelist.getlistlength() - 1))
                        show_data_nodetip(lastnode,"record");
                        nodelist.getlistiditem("node" + count).showdetail=false;
                        hide_condition_nodedetail(d3.select("#node" + count));

                        nodelist.pushfather_and_son({
                            father: count,
                            son: nodelist.getlist().length - 1
                        })
                        linepaint();
                        log("query wheather from node"+count)
                    }
                );
        }

    }
    
    query_recommend(count,sqlobject)
}

function query_recommend(count,sqlobject){
    var queryobject={}

    var thisnode = nodelist.getlistiditem("node" + count)
    var has_father=-1
    if(thisnode.recoid!=-1){
        queryobject.behavior="selectRecommend"
    }
    else{
        var father_and_son = nodelist.getfather_and_son()
        for(var i=0;i<father_and_son.length;i++){
            if(father_and_son[i].son==count){
                has_father=father_and_son[i].father
                break
            }
        }
        for(var i=0;i<father_and_son.length;i++){
            if(father_and_son[i].son==has_father){
                has_father=father_and_son[i].father
                var fathernode=nodelist.getlistiditem("node"+has_father)
                has_father=fathernode.recoid
                break
            }
        }
        if(has_father==-1){
            queryobject.behavior="rootQuery"
        }else{
            queryobject.behavior="childQuery"
        }
    }
    
    if(queryobject.behavior=="selectRecommend"){
        queryobject.id=thisnode.recoid;
    }
    if(queryobject.behavior=="rootQuery"){
        queryobject.source=thisnode.type;
        queryobject.sqlobject=sqlobject;
    }
    if(queryobject.behavior=="childQuery"){
        queryobject.source=thisnode.type;
        queryobject.father=has_father;
        queryobject.dataid=thisnode.fromexist_id;
        if(thisnode.type=="car"){
            queryobject.dataid += ".LOG"
        }
        queryobject.sqlobject=sqlobject;
    }

    console.log(queryobject)

    QueryDb.getrecommend(
        queryobject,
        function(data){
            console.log(data)
            // debugger
            
            recolist=Recolist.createNew();
            d3.selectAll(".reconodediv").remove();

            //data.id 
            if(queryobject.behavior!="selectRecommend"){
                thisnode.recoid=data.id;
            }

            //data.recommendrecomm
            for(var i=0;i<data.recommend.length;i++){
                var o=data.recommend[i];
                //idx
                o.idx=i;
                //condition
                o.condition=[];
                var temp_condition=[];
                if(o.sqlobject.geo != undefined){
                    temp_condition.push({type:"where",data:[o.sqlobject.geo[3], o.sqlobject.geo[1], o.sqlobject.geo[2], o.sqlobject.geo[0],'region']})
                }
                if(o.sqlobject.time != undefined){
                    temp_condition.push({type:"time",data:["2014-1-01 "+o.sqlobject.time[0].substr(0,5),"2014-1-01 "+o.sqlobject.time[1].substr(0,5)]})
                }
                if(temp_condition.length==1){
                    o.condition=temp_condition;
                }else if(temp_condition.length==2){
                    o.condition.push({type:"+", data:temp_condition});
                }
                recolist.pushfather_and_son({
                    father:o.father,
                    son:o.idx
                })
                condition_reconode_newnode(o);
            }
            for(var i=0;i<data.recommend.length;i++){   
                query_result(data.recommend[i], thisnode.type);
            }

            console.log(nodelist, recolist);            
        }
    )
}

function linepaint_for_reco(id){
    // debugger
    var pointlist=recolist.getfather_and_son();
    for(var i= 0;i<pointlist.length;i++){
        if(pointlist[i].son==id){            
            //f:recoid -> id
            var ff=find_node_son(pointlist[i].father);            

            if(nodelist.getlistiditem("node"+ff).islive){
                if(nodelist.getlistiditem("node"+ff).showdetail){
                    var fatherx =(d3.select("#nodediv" + ff).style("left").split("px")[0] - 1 + 286),
                        fathery =(d3.select("#nodediv" + ff).style("top").split("px")[0] - 1 + 43);
                }else{
                    var fatherx =(d3.select("#nodediv" + ff).style("left").split("px")[0] - 1 + 185),
                        fathery =(d3.select("#nodediv" + ff).style("top").split("px")[0] - 1 + 23);
                }

                sonx=document.getElementById("reconodediv"+id).offsetLeft-5;
                sony=document.getElementById("reconodediv"+id).offsetTop+15;

                var fathersonx=fatherx-sonx;
                var fathersony=fathery-sony;
                if(fathersonx<0)
                    fathersonx=0-fathersonx;
                if(fathersony<0)
                    fathersony=0-fathersony;

                d3.select("#queryviewsvg").append('path')
                    .attr("id","reco_path")
                    .attr('style', 'stroke:#858585; fill:none; stroke-width:2; stroke-dasharray:8 8')
                    .attr("d", "M" +
                        fatherx + "," + fathery
                        + " C" + (sonx - fathersonx / 3) + "," + fathery
                        + " " + (fatherx+ fathersonx / 3) + "," + sony
                        + " " + sonx + "," + sony);
                d3.select("#queryviewsvg").append('polygon')
                    .attr("id","reco_polygon")
                    .attr('style', 'stroke:#858585;fill:#858585;')
                    .attr('points',
                        (sonx+10) + "," + sony
                        + " " + sonx + "," + (sony-5)
                        + " " + sonx + "," + (sony+5));
            }
            
        }
    }
}

function find_node_son(recoid){
    var count;
    for(var i=0;i<nodelist.list.length;i++){
        var node=nodelist.list[i];
        if(node.recoid==recoid){
            count=node.id.substr(4);
        }
    }
    var pointlist=nodelist.getfather_and_son();
    for(var i= 0;i<pointlist.length;i++){
        if(pointlist[i].father==count){
            return pointlist[i].son
        }
    }
}

function regularwhen(when){
    if(when.length==15){

       var newwhen=when.split(" ")[0].split("-")[0]+"-"+"0"+
           when.split(" ")[0].split("-")[1]+"-"
           +when.split(" ")[0].split("-")[2]+
           " "+when.split(" ")[1]
        return newwhen;
    }
}

function query_result(node,idtype){
    const match = {"people": 0, "car": 1, "blog": 2, "point_of_interest": 3};

    var sqlobject={
        targetSource: match[node.source],
        originSource: match[idtype],
        id: node.dataid,
        mode: node.mode
    };
    console.log(sqlobject);

    QueryDb.getByDataId(
        sqlobject,
        function(data){
            // debugger
            console.log(data)
            recolist.results[node.idx]={
                num:data.length,
                data:data
            }
            d3.select(".reco_num"+node.idx).text(data.length);
        }
    )    
}