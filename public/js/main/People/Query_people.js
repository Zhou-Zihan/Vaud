/**
 * Created by Administrator on 2016/3/23.
 */
function querypeople_old(count){
    /*******************************
     *   load data
     *******************************/
    var thisnode = nodelist.getlistiditem("node" + count);
    var which = thisnode.getwhichlist();
    var when = thisnode.gettimelist();
    var where = thisnode.getwherelist();
    var what = thisnode.getwhatlist();
    if (when.length == 0) {
        when = [['2014-1-14 00:00', '2014-1-14 23:55']]
    }
    if (where.length == 0) {
        where = [[27.0, 119.649, 29.01343, 121.00]]
    }
    var condition=thisnode.getcondition();
    
   
    if (condition.length>0){
        if(condition[0].type=="+"){
            /*   case   1*/
            if(thiscase==1&&thiscasecount==0){
                thiscasecount++;
                    // var thiscondition=condition[0].data;
                    // var which=[],when=[],where=[],what=[];

                    // for(var i=0;i<thiscondition.length;i++){
                    //         if(thiscondition[i].type=="what"){
                    //                 what.push(thiscondition[i].data);
                    //         } 
                    //         if(thiscondition[i].type=="where"){
                    //                 where.push(thiscondition[i].data);
                    //         }
                    //         if(thiscondition[i].type=="which"){
                    //                 which.push(thiscondition[i].data);
                    //         } 
                    //         if(thiscondition[i].type=="time"){
                    //                 when.push(thiscondition[i].data);
                    //         } 
                    // }
                    // data_node_newnode("people",[d3.select("#nodediv"+count).style("left").split("px")[0]-1+400,
                    //     d3.select("#nodediv"+count).style("top").split("px")[0]])
                    // var tempnode = nodelist.getlistindexof(nodelist.getlistlength() - 1);
                    // var data=[{ID:460022584127733}]
                    // tempnode.setdatalist(data);
                    // nodelist.changelistiditem(nodelist.getlistlength() - 1, tempnode)

                    // lastnode = d3.select("#node" + (nodelist.getlistlength() - 1))
                    // show_data_nodetip(lastnode,"record");
                    // nodelist.getlistiditem("node" + count).showdetail=false;
                    // hide_condition_nodedetail(d3.select("#node" + count));

                    // nodelist.pushfather_and_son({
                    //     father: count,
                    //     son: nodelist.getlist().length - 1
                    // })
                    // linepaint();
                    // log("query people from node"+count)
                    qm.getMultiWhoTraj(
                    ["460022584127733"],1000,
                    function (data) {
                        console.log(data);
                        data_node_newnode("people",[d3.select("#nodediv"+count).style("left").split("px")[0]-1+400,
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
                        log("query people from node"+count)
                    });
            }else{
                var thiscondition=condition[0].data;
                            var which=[],when=[],where=[],what=[];

                            for(var i=0;i<thiscondition.length;i++){
                                    if(thiscondition[i].type=="what"){
                                            what.push(thiscondition[i].data);
                                    } 
                                    if(thiscondition[i].type=="where"){
                                            where.push(thiscondition[i].data);
                                    }
                                    if(thiscondition[i].type=="which"){
                                            which.push(thiscondition[i].data);
                                    } 
                                    if(thiscondition[i].type=="time"){
                                            when.push(thiscondition[i].data);
                                    } 
                            }
                if(thiscase==3){
                    when=[['2014-1-14 02:00', '2014-1-14 02:10']]
                }
                 qm.getWhichByMulti(
                where,
                when,
                1,
                'union',count,
                function(data) {
                    console.log(data.length)
                     var which=[];
                        for(var num=0;num<data.length;num++){
                           which.push(data[num].ID)
                        }
                        if(which.length!=0){
                            qm.getMultiWhoTraj(
                                which,1000,
                                function (data) {
                                    data_node_newnode("people",[d3.select("#nodediv"+count).style("left").split("px")[0]-1+400,
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
                                    log("query people from node"+count)
                                }
                            );
                        }
                }
            )
            }
        }
         if(condition[0].type=="where"){
            qm.getWhichByMulti(
                [condition[0].data],
                 [['2014-1-14 00:00', '2014-1-14 23:55']],
                1,
                'union',count,
                function(data) {
                    console.log(nodelist.getlistlength() - 1);
                    data_node_newnode("people",[d3.select("#nodediv"+count).style("left").split("px")[0]-1+400,
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
                    log("query people from node"+count)
                }
            )
         }
          if(condition[0].type=="which"){
            var which=[];
            for(var i=0;i<condition.length;i++){
                    if(condition[i].type=="which"){
                            which.push(condition[i].data)
                    } 
            }
            if(which.length!=0){
                qm.getMultiWhoTraj(
                    which,1000,
                    function (data) {
                        console.log(data);
                        data_node_newnode("people",[d3.select("#nodediv"+count).style("left").split("px")[0]-1+400,
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
                        log("query people from node"+count)
                    }
                );
            }
          }
    }else{

        qm.getMultiWhoTraj(
                    ["460022584127733"],1000,
                    function (data) {
                        console.log(data);
                        data_node_newnode("people",[d3.select("#nodediv"+count).style("left").split("px")[0]-1+400,
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
                        log("query people from node"+count)
                    }
        );
    }
      
}

function querypeople(count){
    // debugger
    var thisnode = nodelist.getlistiditem("node" + count);
    var condition=thisnode.getcondition();
    var sqlobject={
        time:["00:00:00", "23:59:59"],
        geo:[130, 110, 30, 20]
    };
    if(condition.length>0){
        for(var i=0;i<condition.length;i++){
            var thiscondition=condition[i];
            if(thiscondition.type=="which"){

            }
            if(thiscondition.type=="what"){

            }
            if(thiscondition.type=="where"){
                sqlobject.geo=[thiscondition.data[3],thiscondition.data[1],thiscondition.data[2],thiscondition.data[0]]
            }
            if(thiscondition.type=="time"){
                sqlobject.time=[thiscondition.data[0].split(" ")[1]+":00",thiscondition.data[1].split(" ")[1]+":00"]
            }
            if(thiscondition.type=="speed"){

            }
            if(thiscondition.type=="+"){
                for(var ii=0;ii<thiscondition.data.length;ii++){
                    if(thiscondition.data[ii].type=="where"){
                        sqlobject.geo=[thiscondition.data[ii].data[3],thiscondition.data[ii].data[1],thiscondition.data[ii].data[2],thiscondition.data[ii].data[0]]
                    }
                    if(thiscondition.data[ii].type=="time"){
                        sqlobject.time=[thiscondition.data[ii].data[0].split(" ")[1]+":00",thiscondition.data[ii].data[1].split(" ")[1]+":00"];
                    }
                }
            }
        }
    }
    console.log(sqlobject)
    QueryDb.getPeople(
        sqlobject,
        function(data){
            console.log(data)
            
            let temppeople = new Map();
            data.forEach(o=>{
                if(!temppeople.has(o.id))
                    temppeople.set(o.id,{ID:o.id,pInfo:[]});
                o.points.forEach(point=>{
                    point.time = new Date(point.time);
                    temppeople.get(o.id).pInfo.push(point);
                })
            })
            temppeople = [...temppeople.values()]
            console.log(temppeople)

            data_node_newnode("people",[d3.select("#nodediv"+count).style("left").split("px")[0]-1+400,
                                        d3.select("#nodediv"+count).style("top").split("px")[0]])
            var tempnode = nodelist.getlistindexof(nodelist.getlistlength() - 1);
            tempnode.setdatalist(temppeople);
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
            log("query people from node"+count)
        }
    )
    return sqlobject;
}