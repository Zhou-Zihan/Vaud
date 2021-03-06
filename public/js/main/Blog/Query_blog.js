/**
 * Created by Administrator on 2016/3/23.
 */
/**
 * Created by Administrator on 2016/3/23.
 */

//not used
function queryblog_old(count) {
    /*******************************
     *   load data
     *******************************/
    var thisnode = nodelist.getlistiditem("node" + count);
    var condition=thisnode.getcondition();
    console.log(condition)

    var sqlstring="";
    if(condition.length==0)
         sqlstring += " limit 1000";
    else{
        sqlstring += " where ";

        condition.forEach((o,i)=>{
            if(i!=0)
                sqlstring+=" or "
            if(o.type=="which")
                sqlstring +=  "(userid = "+"'"+o.data+"')";
            if(o.type=="what"){
               if(o.data[0]=="key word"){
                    sqlstring +=  "(contect like "+"'%"+o.data[1]+"%')";
                }
            }
            if(o.type=="where"){
                if(o.data[4]=="region"){
                   sqlstring +=  "((latitude between '"+o.data[0]+"' and '"+o.data[2]+"') and (longitude between '"
                                            +o.data[1]+"' and '"+o.data[3]+"'))"
                }
            }
            if(o.type=="time"){
                sqlstring +=  "(date between '"+o.data[0]+"' and '"+o.data[1]+"')"
            }
            if(o.type=="+"){
                    for(var i=0;i<o.data.length;i++){
                        if(i!=0)
                            sqlstring+=" and "
                        if(i==0)
                            sqlstring+="("
                            console.log(o.data)
                        if(o.data[i].type=="where"){
                            if(o.data[i].data[4]=="region"){
                               sqlstring +=  "((latitude between '"+o.data[i].data[0]+"' and '"+o.data[i].data[2]+"') and (longitude between '"
                                                        +o.data[i].data[1]+"' and '"+o.data[i].data[3]+"'))"
                            }
                        }
                        if(o.data[i].type=="time"){
                            sqlstring +=  "(date between '"+o.data[i].data[0]+"' and '"+o.data[i].data[1]+"')"
                        }
                         if(o.data[i].type=="what"){
                               if(o.data[i].data[0]=="key word"){
                                    sqlstring +=  "(contect like "+"'%"+o.data[i].data[1]+"%')";
                                }
                            }
                        if(i==o.data.length-1)
                            sqlstring+=")";
                    }
                }
        })
    }
    console.log(sqlstring)

    var when = thisnode.gettimelist();
    if (when.length == 0) {
        when = [['2014-1-14 00:00', '2014-1-14 23:55']]
    }

    QueryDb.getWeibo(
            sqlstring,
            function(data){
                data.forEach(o=>{
                    o.date=new Date(o.date)
                })

                data_node_newnode("blog"
                    ,[d3.select("#nodediv"+count).style("left").split("px")[0]-1+400,
                        d3.select("#nodediv"+count).style("top").split("px")[0]]
                )
                var tempnode=nodelist.getlistindexof(nodelist.getlistlength()-1);
                tempnode.setdatalist(data);
                nodelist.changelistiditem(nodelist.getlistlength()-1,tempnode)

                //show_detail
                lastnode=d3.select("#node" + (nodelist.getlistlength()-1))
                show_data_nodetip(lastnode,"record");
                nodelist.getlistiditem("node" + count).showdetail=false;
                hide_condition_nodedetail(d3.select("#node" + count));

                //draw line
                nodelist.pushfather_and_son({
                    father: count,
                    son: nodelist.getlist().length - 1
                })
                linepaint();

                log("Search blogs from " + d3.select("#nodenamenode"+count)[0][0].outerText)
            });
}

function queryblog(count){
    var thisnode = nodelist.getlistiditem("node" + count);
    var condition=thisnode.getcondition();
    var sqlobject={};

    if(condition.length>0){
        for(var i=0;i<condition.length;i++){
            var thiscondition=condition[i];
            if(thiscondition.type=="which"){

            }
            if(thiscondition.type=="what"){
                sqlobject.keyword=thiscondition.data[1];
            }
            if(thiscondition.type=="where"){
                sqlobject.geo=[thiscondition.data[3],thiscondition.data[1],thiscondition.data[2],thiscondition.data[0]]
            }
            if(thiscondition.type=="time"){
                sqlobject.time=thiscondition.data
            }
            if(thiscondition.type=="+"){
                for(var ii=0;ii<thiscondition.data.length;ii++){
                    if(thiscondition.type=="where"){
                        sqlobject.geo=[thiscondition.data[ii].data[3],thiscondition.data[ii].data[1],thiscondition.data[ii].data[2],thiscondition.data[ii].data[0]]
                    }
                    if(thiscondition.type=="time"){
                        sqlobject.time=thiscondition.data[ii].data;
                    }
                    if(thiscondition.type=="what"){
                        sqlobject.keyword=thiscondition.data[ii].data[1];
                    }
                }
            }
        }
    }

    console.log(condition, sqlobject);

    QueryDb.getWeibo(
        sqlobject,
        function(data){
            data.forEach(o=>{
                o.time=new Date(o.time)
            })

            data_node_newnode("blog"
                ,[d3.select("#nodediv"+count).style("left").split("px")[0]-1+400,
                    d3.select("#nodediv"+count).style("top").split("px")[0]]
            )
            var tempnode=nodelist.getlistindexof(nodelist.getlistlength()-1);
            tempnode.setdatalist(data);
            nodelist.changelistiditem(nodelist.getlistlength()-1,tempnode)

            //show_detail
            lastnode=d3.select("#node" + (nodelist.getlistlength()-1))
            show_data_nodetip(lastnode,"record");
            nodelist.getlistiditem("node" + count).showdetail=false;
            hide_condition_nodedetail(d3.select("#node" + count));

            //draw line
            nodelist.pushfather_and_son({
                father: count,
                son: nodelist.getlist().length - 1
            })
            linepaint();

            log("Search blogs from " + d3.select("#nodenamenode"+count)[0][0].outerText)
        }
    )

    return sqlobject;
}