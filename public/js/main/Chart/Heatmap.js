/**
 * Created by Administrator on 2016/3/23.
 */
function  show_heatmap(node){
    d3.select(("#sourcedivlist" + node.attr("id"))).selectAll("svg").remove();
    d3.select(("#sourcedivlist" + node.attr("id"))).selectAll("div").remove();
    /*******************
     *  load data
     *******************/
    var datatype=nodelist.getlistiditem(node.attr("id")).gettype();
    var data = nodelist.getlistiditem(node.attr("id")).getdatalist();
    var latlngs=[],left=180,right=0,top=0,bottom=90;
    var rendingmax;
    if (data != null) {
        switch(datatype) {
            case "car":
                data.forEach(i =>{
                    for (var m = 0; m < i.texiInfo.length; m++) {
                        if(top<i.texiInfo[m].latitude)
                            top=i.texiInfo[m].latitude;
                        if(bottom>i.texiInfo[m].latitude)
                            bottom=i.texiInfo[m].latitude;
                        if(left>i.texiInfo[m].longitude)
                            left=i.texiInfo[m].longitude;
                        if(right<i.texiInfo[m].longitude)
                            right=i.texiInfo[m].longitude;
                        latlngs.push(L.latLng(i.texiInfo[m].latitude,i.texiInfo[m].longitude))
                    }
                })
                rendingmax=13
                break;
            case "blog":
                for (var i = 0; i < data.length; i++) {
                        if(top<data[i].lat)
                            top=data[i].lat;
                        if(bottom>data[i].lat)
                            bottom=data[i].lat;
                        if(left>data[i].lon)
                            left=data[i].lon;
                        if(right<data[i].lon)
                            right=data[i].lon;
                    latlngs.push(L.latLng(data[i].lat,data[i].lon))
                }
                rendingmax=0.2
                break;
            case "point_of_interest":
                for (var i = 0; i < data.length; i++) {
                    if(top<data[i].latitude)
                            top=data[i].latitude;
                        if(bottom>data[i].latitude)
                            bottom=data[i].latitude;
                        if(left>data[i].longitude)
                            left=data[i].longitude;
                        if(right<data[i].longitude)
                            right=data[i].longitude;
                    latlngs.push(L.latLng(data[i].latitude,data[i].longitude))
                }console.log(latlngs)
                rendingmax=0.00002
                break;
        }
    }  
    /********************
     *  draw heat map
     ********************/
    var thismap_div=d3.select(("#sourcedivlist" + node.attr("id")))
        .append("div")
        .attr("id","datanode_heatmap"+node.attr("id"))
        .style("position","relative")
        .style("height","292px")
        .style("width","265px")
    var map = L.map("datanode_heatmap"+node.attr("id"))
        .setView([(top-bottom)/2+bottom,(right-left)/2+left ], 13);
    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(map);
    thismap_div.selectAll(".leaflet-control-container").remove()
    L.heatLayer(latlngs,{radius: 10,max: latlngs.length/50000*mapheatmap_value}).addTo(map);
}