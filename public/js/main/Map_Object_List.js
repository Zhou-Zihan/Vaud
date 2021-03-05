/**
 * Created by Administrator on 2016/2/23.
 */

var drag_map_object_listdiv=false;


function add_map_object_listdiv(){

    d3.select("#sceneviewfold").append("div")
        .attr("class","map_object_listdiv")
        .attr("id","map_objectlistdiv")
        .style("overflow","auto")

    var list_tip=d3.select("#map_objectlistdiv").append("div")
        .attr("class","map_objectlist_drag")
        .on("mousedown",function(){
            d3.select("body").append("svg")
                .attr("id","interactiondiv")
                .on("mouseup",function(){
                    d3.select(this).remove();
                })
                .on("mousemove",function(){
                    d3.select("#map_objectlistdiv")
                        .style("left",(d3.event.x-150)+"px")
                        .style("top",(d3.event.y-10)+"px")
                })
        })


    /**********************************************************/
    // var list_bottom=d3.select("#map_objectlistdiv")
    //     .append("div")
    //     .attr("class","map_objectlist_bottom")


    // list_bottom.append("div")
    //     .attr("class","map_objectlist_objtype")
    //     .append("img")
    //     .attr("src","image/map_objlist_blog_disabled.svg")
    //     .attr("width","40px")
    //     .attr("height","40px")
    //     .on("mousedown",function(){
    //     })

    // list_bottom.append("div")
    //     .attr("class","map_objectlist_objtype")
    //     .attr("style","margin-left: 1px")
    //     .append("img")
    //     .attr("src","image/map_objlist_car_disabled.svg")
    //     .attr("width","40px")
    //     .attr("height","40px")

    // list_bottom.append("div")
    //     .attr("class","map_objectlist_objtype")
    //     .attr("style","margin-left: 1px")
    //     .append("img")
    //     .attr("src","image/map_objlist_people_disabled.svg")
    //     .attr("width","40px")
    //     .attr("height","40px")

    // list_bottom.append("div")
    //     .attr("class","map_objectlist_objtype")
    //    .attr("style","margin-left: 1px")
    //     .append("img")
    //     .attr("src","image/map_objlist_blog_disabled.svg")
    //     .attr("width","40px")
    //     .attr("height","40px")

    // list_bottom.append("div")
    //     .attr("class","map_objectlist_objtype")
    //     .attr("style","margin-left: 1px")
    //     .append("img")
    //     .attr("src","image/map_objlist_poi_disabled.svg")
    //     .attr("width","40px")
    //     .attr("height","40px")

    // list_bottom.append("div")
    //     .attr("class","map_objectlist_objtype")
    //     .attr("style","margin-left: 1px")
    //     .append("img")
    //     .attr("src","image/map_objlist_estate_disabled.svg")
    //     .attr("width","40px")
    //     .attr("height","40px")


    /*********************************************************/

    list_tip.append("div")
        .text("Scene List")
        .style("position","relative")
        .style("line-height","40px")
        .style("font-size","16px")
        .style("text-align","center")

}

function delete_map_object_listdiv(){
    d3.select("#map_objectlistdiv").remove();
}


function add_map_objectlist_object(obj){
    if(obj.type=="car")
        showobjectlist_car(obj);

    if(obj.type=="carlist")
        showobjectlist_carlist(obj);

    if(obj.type=="people")
        showobjectlist_people(obj);

    if(obj.type=="peoplelist")
        showobjectlist_peoplelist(obj);

    if(obj.type=="blog")
        showobjectlist_blog(obj);

    if(obj.type=="bloglist")
        showobjectlist_bloglist(obj);

    if(obj.type=="social_network")
        showobjectlist_social_network(obj);
    if(obj.type=="social_networklist")
        showobjectlist_social_networklist(obj);

    if(obj.type=="poi")
        showobjectlist_poi(obj);

    if(obj.type=="poilist")
        showobjectlist_poilist(obj);

    if(obj.type=="estate")
        showobjectlist_estate(obj);
    if(obj.type=="estatelist")
        showobjectlist_estatelist(obj);
}
