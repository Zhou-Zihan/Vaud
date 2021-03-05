/**
* Created by hzs on 2015/7/2.
*/
var data=[
{name:"aaa",cont:"adsfasdfasd",time:"aaaaa",position:"aaaa"},
{},
{}
]

/**********************************
add map
    http://{s}.tile.osm.org/{z}/{x}/{y}.png
    http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png
 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
 **********************************/
var map = L.map('sceneview').setView([28,120.7], 12);
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
//heatmap tip
var heatmapalive=true;
d3.select("#sceneviewfold").append("input")
        .attr("type", "checkbox")
        .style("width","16px").style("height","16px")
        .style("bottom", "10px")
        .style("position", "absolute")
        .style("left", "16px")
        .attr("checked",true)
        .on("click",function(){
            if(d3.select(this)[0][0].checked){
                heatmapalive=true;
            }else{
                heatmapalive=false;
            }
            heatmapalive_detection()
        })
d3.select("#sceneviewfold").append("div").text("Heatmap")
        .style("cursor", "default")
        .style("width","16px").style("height","16px")
        .style("bottom", "6px")
        .style("position", "absolute")
        .style("left", "47px")
        .style("line-height", "20px")
        .style("height", "25px")
        .style("font-weight", "lighter")
        .style("font-size", "12px")
        .style("color", "#222")


d3.select("#sceneviewfold")
        .append("div").attr("id","mapobj_heatmap_slider")
        .style("position","absolute")
        .style("height","8px")
        .style("width","200px")
        .style("left","109px")
        .style("bottom", "14px")

var mapheatmap_value=10;
$("#mapobj_heatmap_slider").slider()
        .on( "slide", function( event, ui ) {
            mapheatmap_value=ui.value
            Heatmap_Object.setOptions({radius: 10,max: objectheat_latlon.length/50000*ui.value})
        })                 
        .slider( "option", "min", 1 )
        .slider( "option", "max", 200 )
        .slider( "option", "step", 1 )
        .slider( "value", 10 )   

        
var Heatmap_information_panel=L.heatLayer([]).addTo(map);
var Heatmap_Object=L.heatLayer([]).addTo(map);

var objectheat_latlon=[];

function heatmapalive_detection(){
    if(!heatmapalive){
        Heatmap_Object.setLatLngs([])   
    }else{
        Heatmap_Object.setLatLngs(objectheat_latlon)   
    }
}


d3.select("#sceneview").select(".leaflet-control-attribution").remove();

/**********************************
 MiniMap
 Plugin magic goes here! Note that you
 cannot use the same layer object again,
 as that will confuse the two map controls
 **********************************/
var osm2 = new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {minZoom: 0, maxZoom: 13 });
var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true ,position: 'topleft' }).addTo(map);


/**********************************
 *  heat map
 **********************************/
// var latlngs2=[];
// var heat = L.heatLayer(latlngs2,{radius: 10,max: 5}).addTo(map);
// function setHeatmap(latlngs) {heat.setLatLngs(latlngs);}


/**********************************
 *  map size
 **********************************/
//TODO:change queryrecommand height -- mousedown
var sceneviewfold_width=d3.select("#sceneviewfold").style("width");
var sceneviewfold_height=d3.select("#sceneviewfold").style("height");
var svg=d3.select("body").append("svg")
    .style("background-color","rgb(180,180,180)")
    .attr("id","mapsize")
    .style("position","absolute")
    .style("width",sceneviewfold_width)
    .style("height",2)
    .style("left",0)
    .style("top",sceneviewfold_height)
    .style("cursor","n-resize");
svg.on("mousedown",function(){
    var mapsize_mousey=d3.event.y;
    d3.select("body").append("svg")
        .attr("id","mapsize_assist")
        .style("position","absolute")
        .style("width",2000+"px")
        .style("height",2000+"px")
        .style("z-index","10000000").style("cursor","n-resize")
        .on("mousemove",function(){
            d3.select("#sceneviewfold").style("height",(d3.event.y-(mapsize_mousey-parseFloat(sceneviewfold_height)))+"px");
            d3.select("#mapsize").style("top",d3.select("#sceneviewfold").style("height"));
            d3.select("#leftmenu").style("top",d3.select("#sceneviewfold").style("height"));
            //d3.select("#leftmenu").style("height",(895-parseFloat(d3.select("#sceneviewfold").style("height")))+"px")
        })
        .on("mouseup",function(){
            d3.select("#sceneviewfold").style("height",(d3.event.y-(mapsize_mousey-parseFloat(sceneviewfold_height)))+"px");
            d3.select("#mapsize").style("top",d3.select("#sceneviewfold").style("height"));
            sceneviewfold_height=d3.select("#sceneviewfold").style("height");
            d3.select("#leftmenu").style("top",d3.select("#sceneviewfold").style("height"));
            //d3.select("#leftmenu").style("height",(895-parseFloat(d3.select("#sceneviewfold").style("height")))+"px")
            d3.select(this).remove()
        });
})



/**********************************
 *  map hide
 **********************************/
//d3.select("#sceneviewbutton").on("mousedown",function(){
//  if(d3.select("#sceneview").style("display")!="none"){
//    d3.select("#sceneview").style("display","none")
//    d3.select("#sceneviewbutton").select("img")
//        .attr("src","image/2.png");
//      $("#mapobjectsvg").hide();
//  }else{
//    d3.select("#sceneview").style("display","block")
//    d3.select("#sceneviewbutton").select("img")
//        .attr("src","image/1.png")
//      $("#mapobjectsvg").show();
//  }
//}).append("img")
//    .attr("src","image/1.png")
//    .style("position","absolute")
//    .style("height","100%")
//    .style("top","0")
//    .style("left","0%")







//var geo=new Array();// rectangle polygon circle
//
//var featureGroup = L.featureGroup().addTo(map);
//var drawControl = new L.Control.Draw({
//    edit: {
//        featureGroup: featureGroup
//    }
//}).addTo(map);
//
//map.on('draw:created', function(e) {
//    featureGroup.addLayer(e.layer);
//    if(e.layerType=="rectangle")
//    {
//        featureGroup.removeLayer(geo[1]);
//        geo[1]=featureGroup.getLayerId(e.layer);
//    }
//    else if(e.layerType=="polygon")
//    {
//        featureGroup.removeLayer(geo[2]);
//        geo[2]=featureGroup.getLayerId(e.layer);
//    }
//    else if(e.layerType=="circle")
//    {
//        featureGroup.removeLayer(geo[3]);
//        geo[3]=featureGroup.getLayerId(e.layer);
//    }
//});





//var latlngs=[[28.000000,120.700000,1],[27.916573,120.762897,2]];
//polyline.setLatLngs(path);

//  Keep popup live
//L.Map = L.Map.extend({
//  openPopup: function(popup) {
//    //        this.closePopup();  // just comment this
//    this._popup = popup;
//
//    return this.addLayer(popup).fire('popupopen', {
//      popup: this._popup
//    });
//  }
//});

//mark point
//var greenIcon = L.icon({
//  iconUrl: 'js/map/images/leaf-green.png',
//  shadowUrl: 'js/map/images/leaf-shadow.png',
//
//  iconSize:     [38, 95], // size of the icon
//  shadowSize:   [50, 64], // size of the shadow
//  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
//  shadowAnchor: [4, 62],  // the same for the shadow
//  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
//});
// map.on('click',function(e){
//   //console.log(e);
//   marker = new L.marker(e.latlng, {draggable:'true',icon: greenIcon})
// .bindPopup('<div style="/* width: 300px; */ /* height: 300px; */ /* position: absolute; */ top: 275px; stroke: rgb(0, 0, 0);background-color: rgb(240, 248, 255);"><button id="button" onclick="newnode()">newnode</button></div>');
//   map.addLayer(marker);
// });






