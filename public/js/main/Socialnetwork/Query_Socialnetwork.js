/**
 * Created by Administrator on 2016/3/23.
 */
function querysocialnetwork(count) {
    /*******************************
     *   load data
     *******************************/
    var thisnode = nodelist.getlistiditem("node" + count);
    var condition=thisnode.getcondition();
    
    if (condition.length>0){
        if(condition[0].type=="which"){
            var data=[];
            var which=[];
            for(var i=0;i<condition.length;i++){
                which.push(condition[i].data)
            }
            var which=condition[0].data;
            for(var i=1;i<condition.length;i++){
                which=which+","+condition[i].data
            }
            qm.getPhoneConnectionExpand(
                which,1,1,
                function(data){
                    console.log(data)
                    data_node_newnode("social_network",[d3.select("#nodediv"+count).style("left").split("px")[0]-1+400,
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
                    log("query social network from node"+count)
            })

                // qm.getPhoneConnection(
                // condition[0].data,1,
                // function(data){
                // }
                // );
        }
    }else{
        qm.getPhoneConnectionExpand(
        "460005775035048,460008782551520",2,1,
        function(data){
               // console.log(data)
                    data_node_newnode("social_network",[d3.select("#nodediv"+count).style("left").split("px")[0]-1+400,
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
                    log("query social network from node"+count)
            // qm.getPhoneConnection(
            //     '460008603658912',1,
            //     function(data){
            //     }
            // );}
        })
    }

}