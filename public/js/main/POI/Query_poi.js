/**
 * Created by Administrator on 2016/3/23.
 */

/**
 * Created by Administrator on 2016/3/23.
 */

 //not used
function querypoi_old(count) {
    /*******************************
     *   load data
     *******************************/
    var thisnode = nodelist.getlistiditem("node" + count);
    var condition=thisnode.getcondition();

    var sqlstring="where ";
        if(condition.length>0){
            for(var i =0;i<condition.length;i++){
                if(i!=0){
                    sqlstring+=" or "
                }
                var thiscondition=condition[i];
                if(thiscondition.type=="which"){
                    sqlstring +=  "(name like "+"'%"+thiscondition.data+"%')";
                }
                if(thiscondition.type=="where"){
                    if(thiscondition.data[4]=="region"){
                       sqlstring +=  "((latitude between '"+thiscondition.data[0]+"' and '"+thiscondition.data[2]+"') and (longitude between '"
                                                +thiscondition.data[1]+"' and '"+thiscondition.data[3]+"'))"
                    }
                }
                if(thiscondition.type=="time"){
                }
                if(thiscondition.type=="what"){
                   // if(thiscondition.data[0]=="key word"){
                   //      sqlstring +=  "(contect like "+"'%"+thiscondition.data[1]+"%')";
                   //  }
                }
            }
        }
        if (sqlstring=="where ")
           sqlstring +=  "(1=1) limit 1000";
        
    console.log(condition,sqlstring)
    
    QueryDb.getPoi(
        sqlstring,
        function(data){
            console.log(data)
            data_node_newnode("point_of_interest",[d3.select("#nodediv"+count).style("left").split("px")[0]-1+400,
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
            log("query poi from node"+count)
        });
}

function querypoi(count){
    var thisnode = nodelist.getlistiditem("node" + count);
    var condition=thisnode.getcondition();
    var sqlobject={}
    if(condition.length>0){
        sqlobject = poi_handlecondition(sqlobject, condition);        
    }
    console.log("query_poi condition:",sqlobject);

    QueryDb.getPoi(
        sqlobject,
        function(data){
            console.log("query_poi result",data)
            poi_handleresult(data, count);
           
        }
    )

    return sqlobject;
}

function poi_union_geo(geo1, geo2){
    return [Math.max(geo1[0], geo2[0]), Math.min(geo1[1], geo2[1]),
            Math.max(geo1[2], geo2[2]), Math.min(geo1[3], geo2[3])]
}

function poi_intersection_geo(geo1, geo2){
    return [Math.min(geo1[0], geo2[0]), Math.max(geo1[1], geo2[1]),
            Math.min(geo1[2], geo2[2]), Math.max(geo1[3], geo2[3])]
}

function poi_handlecondition(sqlobject, condition){
    // debugger
    for(var i=0;i<condition.length;i++){
        var thiscondition=condition[i];
        if(thiscondition.type=="where"){
            // if(sqlobject.geo==null){
                sqlobject.geo=[thiscondition.data[3],thiscondition.data[1],thiscondition.data[2],thiscondition.data[0]]
            // }else{
            //     var tempgeo=[thiscondition.data[3],thiscondition.data[1],thiscondition.data[2],thiscondition.data[0]]
            //     sqlobject.geo=poi_union_geo(sqlobject.geo,tempgeo);
            // }
        }
        if(thiscondition.type=="which"){
            sqlobject.keyword=thiscondition.data;
        }
        if(thiscondition.type=="+"){
            var temp_sqlobject={}
            for(var ii=0;ii<thiscondition.data.length;ii++){
                if(thiscondition.data[ii].type=="where"){
                    if(temp_sqlobject.geo==null){
                        temp_sqlobject.geo=[thiscondition.data[ii].data[3],thiscondition.data[ii].data[1],thiscondition.data[ii].data[2],thiscondition.data[ii].data[0]]
                    }else{
                        var tempgeo=[thiscondition.data[ii].data[3],thiscondition.data[ii].data[1],thiscondition.data[ii].data[2],thiscondition.data[ii].data[0]]
                        temp_sqlobject.geo=poi_intersection_geo(temp_sqlobject.geo,tempgeo)
                    }
                }
                if(thiscondition.data[ii].type=="which"){
                    temp_sqlobject.keyword=thiscondition.data[ii].data;
                }
            }
            if(sqlobject.geo==null)
                sqlobject=temp_sqlobject;
            else
                sqlobject.geo=poi_intersection_geo(temp_sqlobject.geo,sqlobject.geo);
        }
    }
    return sqlobject;
}

function poi_handleresult(data, count){
    data_node_newnode("point_of_interest",[d3.select("#nodediv"+count).style("left").split("px")[0]-1+400,
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
    log("query poi from node"+count)
}