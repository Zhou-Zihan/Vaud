/**
 * Created by Administrator on 2016/3/23.
 */

//not used
function querycar_old(count){
    /*******************************
     *   load data
     *******************************/
    var thisnode = nodelist.getlistiditem("node" + count);
    var condition=thisnode.getcondition();
    let flagwhere=false;
    var sqlstring="";
        if(condition.length>0){
            sqlstring += "where";
            for(var i =0;i<condition.length;i++){
                if(i!=0){
                    sqlstring+=" or "
                }
                var thiscondition=condition[i];
                if(thiscondition.type=="which"){
                    sqlstring +=  "(Taxi_name = '"+thiscondition.data+"')";
                }
                if(thiscondition.type=="what"){
                   if(thiscondition.data[0]=="speed"){
                        sqlstring +=  "(speed between '"+thiscondition.data[1].split("~")[0]+"'' and '"+thiscondition.data[1].split("~")[1]+"'')";
                    }
                }
                if(thiscondition.type=="where"){
                        // select ** from A where A.id in (select id from B where ****)
                        thissqlstring = "where (date='20140114') and ( ((minlo between '"+thiscondition.data[1]+"' and '"+thiscondition.data[3]
                        +"')and (minla between '"+thiscondition.data[0]+"' and '"+thiscondition.data[2]+"'))"+"or"
                        +"((minlo between '"+thiscondition.data[1]+"' and '"+thiscondition.data[3]
                        +"')and (maxla between '"+thiscondition.data[0]+"' and '"+thiscondition.data[2]+"'))"+"or"
                        +"((maxlo between '"+thiscondition.data[1]+"' and '"+thiscondition.data[3]
                        +"')and (minla between '"+thiscondition.data[0]+"' and '"+thiscondition.data[2]+"'))"+"or"
                        +"((maxlo between '"+thiscondition.data[1]+"' and '"+thiscondition.data[3]
                        +"')and (maxla between '"+thiscondition.data[0]+"' and '"+thiscondition.data[2]+"')) )"

                        QueryDb.getcarbygeoindex(
                            thissqlstring,
                            null,
                            function(data){
                                console.log(data);
                                // sqlstring += " (Taxi_name in ("
                                // data.forEach((o,i)=>{
                                //     if(i<50)
                                //         sqlstring += "'"+o.Taxi_name+"',"
                                // })
                                // sqlstring += "'0'))"


                                // 2013-12-31T16:00:18.000Z
                                let tempcar = new Map();
                                data.forEach(o=>{
                                    // o.time=new Date(o.time)
                                    // if(tempcar.has(o.Taxi_name))
                                    //     tempcar.get(o.Taxi_name).texiInfo.push(o)
                                    // else{
                                    //     tempcar.set(o.Taxi_name,{ID:o.Taxi_name,texiInfo:[o]})
                                    // }
                                    var Taxi_name = o.carNo.replace(/([.][^.]+)$/,"");
                                    if(!tempcar.has(Taxi_name))
                                        tempcar.set(Taxi_name,{ID:Taxi_name,texiInfo:[]});
                                    o.points.forEach(point=>{
                                        point.time = new Date(point.time);
                                        tempcar.get(Taxi_name).texiInfo.push(point);
                                    })
                                })
                                console.log(tempcar)
                                data_node_newnode("car", [d3.select("#nodediv" + count).style("left").split("px")[0] - 1 + 400,
                                d3.select("#nodediv" + count).style("top").split("px")[0]])
                                var tempnode = nodelist.getlistindexof(nodelist.getlistlength() - 1);
                                tempnode.setdatalist(tempcar);
                                nodelist.changelistiditem(nodelist.getlistlength() - 1, tempnode)

                                lastnode = d3.select("#node" + (nodelist.getlistlength() - 1))
                                show_data_nodetip(lastnode, "record");
                                nodelist.getlistiditem("node" + count).showdetail = false;
                                hide_condition_nodedetail(d3.select("#node" + count));

                                nodelist.pushfather_and_son({
                                    father: count,
                                    son: nodelist.getlist().length - 1
                                })
                                linepaint();
                                log("Search taxis from " + d3.select("#nodenamenode"+count)[0][0].outerText)

                                flagwhere=true;
                            })
                }
                if(thiscondition.type=="time"){
                    sqlstring +=  "(time between '"+thiscondition.data[0]+"' and '"+thiscondition.data[1]+"')"
                }
                if(thiscondition.type=="+"){
                      if(thiscondition.data[0].type=="+"){
                          sqlstring= "where (Taxi_name='T0230' or 'T1168') and (time between '2014-01-14 00:00' and '2014-01-14 24:00') "
                      }

                    for(var i=0;i<thiscondition.data.length;i++){
                        if(i!=0)
                            sqlstring+=" and "
                        if(i==0)
                            sqlstring+="("
                            console.log(thiscondition.data)
                        if(thiscondition.data[i].type=="where"){
                                // select ** from A where A.id in (select id from B where ****)
                                thissqlstring = "where  (date='20140114') and ( ((minlo between '"+thiscondition.data[i].data[1]+"' and '"+thiscondition.data[i].data[3]
                                +"')and (minla between '"+thiscondition.data[i].data[0]+"' and '"+thiscondition.data[i].data[2]+"'))"+"or"
                                +"((minlo between '"+thiscondition.data[i].data[1]+"' and '"+thiscondition.data[i].data[3]
                                +"')and (maxla between '"+thiscondition.data[i].data[0]+"' and '"+thiscondition.data[i].data[2]+"'))"+"or"
                                +"((maxlo between '"+thiscondition.data[i].data[1]+"' and '"+thiscondition.data[i].data[3]
                                +"')and (minla between '"+thiscondition.data[i].data[0]+"' and '"+thiscondition.data[i].data[2]+"'))"+"or"
                                +"((maxlo between '"+thiscondition.data[i].data[1]+"' and '"+thiscondition.data[i].data[3]
                                +"')and (maxla between '"+thiscondition.data[i].data[0]+"' and '"+thiscondition.data[i].data[2]+"')) )"

                                thiscondition.data.forEach(o=>{
                                    if(o.type=="time"){
                                        timeString =  "where (time between '"+o.data[0]+"' and '"+o.data[1]+"')"
                                    }
                                })
                                console.log(timeString)
                                QueryDb.getcarbygeoindex(
                                    thissqlstring,
                                    timeString,
                                    function(data){
                                        
                                        // sqlstring +=" (Taxi_name in ("
                                        // data.forEach((o,i)=>{
                                        //     if(i<50)
                                        //         sqlstring += "'"+o.Taxi_name+"',"
                                        // })
                                        // sqlstring += "'0'))"

                                         let tempcar = new Map();
                                            data.forEach(o=>{
                                                // o.time=new Date(o.time)
                                                // if(tempcar.has(o.Taxi_name))
                                                //     tempcar.get(o.Taxi_name).texiInfo.push(o)
                                                // else{
                                                //     tempcar.set(o.Taxi_name,{ID:o.Taxi_name,texiInfo:[o]})
                                                // }
                                                var Taxi_name = o.carNo.replace(/([.][^.]+)$/,"");
                                                if(!tempcar.has(Taxi_name))
                                                    tempcar.set(Taxi_name,{ID:Taxi_name,texiInfo:[]});
                                                o.points.forEach(point=>{
                                                    point.time = new Date(point.time);
                                                    tempcar.get(Taxi_name).texiInfo.push(point);
                                                })
                                            })
                                            console.log(tempcar)
                                            data_node_newnode("car", [d3.select("#nodediv" + count).style("left").split("px")[0] - 1 + 400,
                                            d3.select("#nodediv" + count).style("top").split("px")[0]])
                                            var tempnode = nodelist.getlistindexof(nodelist.getlistlength() - 1);
                                            tempnode.setdatalist(tempcar);
                                            nodelist.changelistiditem(nodelist.getlistlength() - 1, tempnode)

                                            lastnode = d3.select("#node" + (nodelist.getlistlength() - 1))
                                            show_data_nodetip(lastnode, "record");
                                            nodelist.getlistiditem("node" + count).showdetail = false;
                                            hide_condition_nodedetail(d3.select("#node" + count));

                                            nodelist.pushfather_and_son({
                                                father: count,
                                                son: nodelist.getlist().length - 1
                                            })
                                            linepaint();
                                            log("Search taxis from " + d3.select("#nodenamenode"+count)[0][0].outerText)


                                    })
                                flagwhere=true;
                        }
                        if(thiscondition.data[i].type=="time"){
                            // timeString =  "where (time between '"+thiscondition.data[i].data[0]+"' and '"+thiscondition.data[i].data[1]+"')"
                        }
                        if(thiscondition.data[i].type=="speed"){
                            sqlstring +=  "(speed between '"+thiscondition.data[i].data[1].split("~")[0]+"'' and '"+thiscondition.data[i].data[1].split("~")[1]+"'')";
                        }

                        if(i==thiscondition.data.length-1)
                            sqlstring+=")";
                    }
                }
            }
        }else{
            sqlstring += " limit 1000";

        }
    if(!flagwhere)
    querycarnormal(sqlstring,count);
}

function querycar(count){
    var thisnode = nodelist.getlistiditem("node" + count);
    var condition=thisnode.getcondition();
    let flagwhere=false;
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
    querycarnormal(sqlobject,count);
    
    return sqlobject;
}

function querycarnormal(sqlobject,count){
    console.log(sqlobject)
    QueryDb.getcar(
            sqlobject,
            function(data){
                console.log(data)

                // 2013-12-31T16:00:18.000Z
                let tempcar = new Map();
                data.forEach(o=>{
                    // o.time=new Date(o.time)
                    // if(tempcar.has(o.Taxi_name))
                    //     tempcar.get(o.Taxi_name).texiInfo.push(o)
                    // else{
                    //     tempcar.set(o.Taxi_name,{ID:o.Taxi_name,texiInfo:[o]})
                    // }
                    var Taxi_name = o.carNo.replace(/([.][^.]+)$/,"");
                    if(!tempcar.has(Taxi_name))
                        tempcar.set(Taxi_name,{ID:Taxi_name,texiInfo:[]});
                    o.points.forEach(point=>{
                        point.time = new Date(point.time);
                        tempcar.get(Taxi_name).texiInfo.push(point);
                    })
                })
                tempcar = [...tempcar.values()]
                console.log(tempcar)


                data_node_newnode("car", [d3.select("#nodediv" + count).style("left").split("px")[0] - 1 + 400,
                    d3.select("#nodediv" + count).style("top").split("px")[0]])
                var tempnode = nodelist.getlistindexof(nodelist.getlistlength() - 1);
                tempnode.setdatalist(tempcar);
                // tempnode.timearea=["2014-1-01 "+sqlobject.time[0].substr(0,5), "2014-1-01 "+sqlobject.time[1].substr(0,5)];
                nodelist.changelistiditem(nodelist.getlistlength() - 1, tempnode)

                lastnode = d3.select("#node" + (nodelist.getlistlength() - 1))
                show_data_nodetip(lastnode, "record");
                nodelist.getlistiditem("node" + count).showdetail = false;
                hide_condition_nodedetail(d3.select("#node" + count));

                nodelist.pushfather_and_son({
                    father: count,
                    son: nodelist.getlist().length - 1
                })
                linepaint();
                log("Search taxis from " + d3.select("#nodenamenode"+count)[0][0].outerText)
          });
}