
var asdfsadfasfsasfdfs=["460005775035048","460008782551520"]

function show_sntanalysis(node){
    show_social_networklist(node)
    d3.select("#sourcedivlistsocial" + node.attr("id")).remove();

    var nodesocailana=d3.select("#nodediv"+ node.attr("id").split("node")[1]).append("div")
            .attr("id","sourcedivlistsocial"+node.attr("id"))
            .style("background","rgb(249,250,251)")
            .style("position","absolute")
            .style("left","267px")
            .style("top","5px")
            .style("height","400px")
            .style("width","1000px")
        nodesocailana.append("div")
            .style("background","rgb(229,229,229)")
            .style("position","absolute")
            .style("text-align","center")
            .text("social network")
            .style("left","0px")
            .style("z-index","1")
            .style("top","0px")
            .style("height","22px")
            .style("width","1000px")
            .style("padding","6px 0 6px 0")
        nodesocailana.append("div")
            .style("position","absolute")
            .style("right","30px")
            .style("z-index","1")
            .style("top","9px")
            .style("height","19px")
            .style("cursor","pointer")
            .style("width","19px")
            .style("background","url(image/delete.svg) no-repeat")
            .on("click",function(){
                d3.select("#sourcedivlistsocial" + node.attr("id")).remove();
            })

         nodesocailana.append("div")
            .attr("id","yinlitu"+node.attr("id"))
            .style("position","absolute")
            .style("left","0px")
            .style("top","0px")
            .style("height","400px")
            .style("width","1000px")

    var data=nodelist.getlistiditem(node.attr("id")).getdatalist();
        
        console.log(data)
            var ForceData={"nodes":[],"links":[]};

        for(var datagroup=0;datagroup<data.length&&datagroup<200;datagroup++){
            var sntData=data[datagroup];
            if(sntData.length>0){
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
            }
        }

            
            // ForceDirected(ForceData,sntchart,width,height-30,0,30);
            
            var force = d3.layout.force()
                          .charge(-10)
                          .linkDistance(10)
                          .size([600, 500])
                  .nodes(ForceData.nodes)
                  .links(ForceData.links)
                  .start();

            var sntnode=[],sntlink=[],nodesnumber=0;
            for(var i=0;i<ForceData.nodes.length;i++){
                //color
                var thiscolor;
                if(ForceData.nodes[i].group==1)
                                    thiscolor= "#FF7F0E"; 
                if(ForceData.nodes[i].group==2)
                                    thiscolor= "#1F77B4";                
                if(ForceData.nodes[i].group==3) 
                                    thiscolor= "#AEC7E8"; 

                //nodedata
                if(ForceData.nodes[i].group!=3){
                    sntnode.push({x:ForceData.nodes[i].x,
                        y:ForceData.nodes[i].y,     
                        id:nodesnumber,
                        symbolSize: 10,
                        // ForceData.nodes[i].weight,
                        fullname:ForceData.nodes[i].name,
                        name: ForceData.nodes[i].name.substring(
                            ForceData.nodes[i].name.length-4,ForceData.nodes[i].name.length),
                        itemStyle: {
                            normal: {
                                    color: thiscolor
                                }
                        }
                    })
                    nodesnumber++;
                }
            }

            for(var i=0;i<ForceData.links.length;i++){
                var sourceid,targetid;

                if(ForceData.links[i].source.group!=3
                    &&ForceData.links[i].target.group!=3){
                    for(var m=0;m<sntnode.length;m++){
                        if(ForceData.links[i].source.name==sntnode[m].fullname){
                            sourceid=sntnode[m].id;
                        }if(ForceData.links[i].target.name==sntnode[m].fullname){
                            targetid=sntnode[m].id;
                        }
                    }
                    sntlink.push({
                        source:sourceid,
                        target:targetid,
                    })
                }
            }
        var chartid="yinlitu" + node.attr("id");
        console.log(chartid)

        console.log(d3.select("#"+chartid))
        console.log(document.getElementById(chartid))
        var myChart = echarts.init(document.getElementById(chartid));
            option = {
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                series : [
                    {
                        type: 'graph',
                        layout: 'force',
                        // progressiveThreshold: 700,
                        data: sntnode,
                        edges: sntlink,
                        label: {
                            emphasis: {
                                position: 'right',
                                show: true
                            }
                        },
                        roam: true,
                        focusNodeAdjacency: true,
                        lineStyle: {
                            normal: {
                                width: 0.5,
                                curveness: 0.3,
                                opacity: 0.7
                            }
                        },
                        force: {
                            repulsion: 800,
                            edgeLength: 100
                        }
                    }
                ]
            }
            myChart.setOption(option);

}

