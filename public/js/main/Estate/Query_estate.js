/**
 * Created by Administrator on 2016/3/23.
 */
function queryestate(count){
    /*******************************
     *   load data
     *******************************/
    var thisnode=nodelist.getlistiditem("node"+count);
    var condition=thisnode.getcondition();
   
    if (condition.length>0){
        //query where+value
            if(condition[0].type=="+"){
                var thiscondition=condition[0].data;
                var value;
                var where;
                for(var i=0;i<thiscondition.length;i++){
                    if(thiscondition[i].type=="what"){
                            value=thiscondition[i].data;
                    } 
                    if(thiscondition[i].type=="where"){
                            where=thiscondition[i].data;
                    }
                }
                console.log(value[1].split("~")[0]*1)
                console.log(value[1].split("~")[0]*1)
                console.log([where])
                qm.getValueByMulti(
                        value[1].split("~")[0]*1,
                        value[1].split("~")[1]*1,
                        [where],1,
                       1,
                       function(data){
                         console.log(data);
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
                            log("query estate from node"+count)
                       }
                );

            }


            //query value
            if(condition[0].type=="what"){
                if(condition[0].data[0]=="value"){
                    qm.getValueByPrice(
                        condition[0].data[1].split("~")[0]*1,
                        condition[0].data[1].split("~")[1]*1,
                        1,
                        function(data){
                            console.log(data);
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
                            log("query estate from node"+count)
                        }
                    );
                }
            }

            //query where
        if(condition[0].type=="where"){
            qm.getValue(
                [condition[0].data],
                1,(nodelist.getlistlength() - 1),
                function(data){
                    console.log(data)
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
                    log("query estate from node"+count)
                }
            );
        }
    }
   
   else{
        // query all
        qm.getValue(
                [[27.0, 119.649, 29.01343, 121.00]],
                1,(nodelist.getlistlength() - 1),
                function(data){
                    console.log(data)
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
                    log("query estate from node"+count)
                }
            );
   }

}