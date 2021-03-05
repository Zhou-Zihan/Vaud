$(document).ready(function(){
    let data=[],data0={},data1={}
    data0.title='title'
    data0.xName='xName'
    data0.yName='yName'
    data0.type='line'
    data0.xArr=[1,3,5,7,9]
    data0.yArr=[2,4,6,8,10]
    data.push(data0)
    data.push(data0)
    data.push(data0)
    data.push(data0)
    data1.title='title'
    data1.xName='xName'
    data1.yName='yName'
    data1.type='bar'
    data1.xArr=[1,3,5,7,9]
    data1.yArr=[2,4,6,8,10]
    data.push(data1)
    data.push(data1)
    data.push(data1)
    data.push(data1)
    //  大面板 和 小面板
    let height=500,p_width=400,p_height=400
    //  自适应的间隔
    let z_margin=50

    add('home')
    function add(x){
        let name=$('#'+x)
        //   清空
        name.children().each((x,y)=>{
            y.remove()
        })
        //  添加每个小面板，宽度最大，高度给定
        name.append(`<div id="${x}_panel" style="overflow:scroll; height:${height}px;width:100%;">`)
        let panel=$(`#${x}_panel`)
        data.forEach((data,index)=>{
            //  外面套了一层自适应给定间隔换行
            panel.append(`<div float:left style="margin-right:${z_margin}px;display:inline-block";><div id="home_panel_id_${index}" style="height:${p_height}px;width:${p_width}px"></div></div>`)
            myChart = echarts.init(document.getElementById('home_panel_id_'+index))
            //  其实只要把series里面的type改一下就好了，但不知道这两个图会不会有不同的其他操作地方，所以写了两个
            if(data.type=='line'){
                option = {
                    title : {
                        text: data.title
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data: [data.title]
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            name : data.xName,
                            type : 'category',
                            data : data.xArr
                        }
                    ],
                    yAxis : [
                        {
                            name : data.yName,
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name: data.title,
                            type:'line',
                            data: data.yArr,
                        }
                    ]
                };
            }
            if(data.type=='bar'){
                option = {
                    title : {
                        text: data.title
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data: [data.title]
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            name : data.xName,
                            type : 'category',
                            data : data.xArr
                        }
                    ],
                    yAxis : [
                        {
                            name : data.yName,
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name: data.title,
                            type:'bar',
                            data: data.yArr,
                        }
                    ]
                };


            }
            myChart.setOption(option)

        })


    }
})
