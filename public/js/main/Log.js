/**
 * Created by Administrator on 2016/3/1.
 */

var lognum=1;
var backstepnum=-1;

var logdata=[];
var situationdata=[];
function log(text){

    if(backstepnum!=-1){
        var lost=logdata.length-backstepnum
        for(var i=0;i<lost;i++){
            logdata.pop();
            situationdata.pop();
        }
        var templist=[]
        if(situationdata.length>0){
            for(var i=0;i<nodelist.getlist().length;i++){
                for(var m=0;m<situationdata[situationdata.length-1].situation.length;m++) {
                    if (nodelist.getlist()[i].id == situationdata[situationdata.length-1].situation[m].id){
                        templist.push(nodelist.getlist()[i]);
                    }
                }
            }
        }
        for(var m=0;m<templist.length;m++) {
            d3.select("#nodediv"+templist.id.split("node")[1]).remove();
        }
        lognum=backstepnum*1+1;
        backstepnum=-1;
    }

    logdata.push({num:lognum,text:text})
    var situation=[];
    for(var i=0;i<nodelist.getlistlength();i++){
        situation.push(
            {   node:{
                id:nodelist.getlist()[i].id,
                showdetail:nodelist.getlist()[i].showdetail,
                islive:nodelist.getlist()[i].islive,
                condition:nodelist.getlist()[i].getcondition(),
                type:nodelist.getlist()[i].gettype(),
                x:d3.select("#nodediv"+nodelist.getlist()[i].id.split("node")[1]).style("left"),
                y:d3.select("#nodediv"+nodelist.getlist()[i].id.split("node")[1]).style("top"),
                name:d3.select("#nodenamenode" + nodelist.getlist()[i].id.split("node")[1])[0][0].textContent
            }
            })
    }
    situationdata.push({num:lognum,situation:situation,line:nodelist.getfather_and_son()});
    lognum++
    refreshlogdiv();
}


function backtostep(num){
    backstepnum=num;
    for(var i=0;i<situationdata.length;i++){
        if(situationdata[i].num==num){
            redostep(situationdata[i].situation,situationdata[i].line)
        }
    }
    refreshlogdiv()
}
function redostep(situation,line){
    for(var i=0;i<nodelist.getlist().length;i++) {
        nodelist.getlist()[i].islive=false;
    }
    for(var i=0;i<situation.length;i++){
        for(var m=0;m<nodelist.getlist().length;m++) {
            if (situation[i].node.id == nodelist.getlist()[m].id) {
                nodelist.getlist()[m].showdetail=situation[i].node.showdetail;
                nodelist.getlist()[m].islive=situation[i].node.islive;
                nodelist.getlist()[m].condition=situation[i].node.condition;
                nodelist.getlist()[m].type=situation[i].node.type;
                d3.select("#nodediv"+nodelist.getlist()[m].id.split("node")[1]).attr("cx")
                d3.select("#nodediv"+nodelist.getlist()[m].id.split("node")[1]).attr("cy")
                d3.select("#nodediv"+nodelist.getlist()[m].id.split("node")[1]).style("left",situation[i].node.x);
                d3.select("#nodediv"+nodelist.getlist()[m].id.split("node")[1]).style("top",situation[i].node.y);
                d3.select("#nodenamenode"+  nodelist.getlist()[m].id.split("node")[1]).text(situation[i].node.name)
            }
        }
    }
    for(var i=0;i<nodelist.getlist().length;i++) {
        if(nodelist.getlist()[i].getnodetype()=="condition")
            paint_conditionnode(d3.select("#"+nodelist.getlist()[i].id));
        else{
            paint_datanode(d3.select("#"+nodelist.getlist()[i].id));
        }
    }
    nodelist.father_and_son=line;
    linepaint();

}
function addlogdiv(){
    if((d3.select("#querylog")[0][0]==null)){
        d3.select("#leftmenu").append("div")
            .attr("id","querylog").style("opacity","0")
        d3.select("#querylog").append("div")
            .attr("class","logtip")
            .text("The action list")

        d3.select("#querylog").transition()
                    .ease("linear")
                    .duration(300)
                    .delay(0)
                    .style("opacity","1") 
    }else{
        d3.select("#querylog").remove();
    }
}
function refreshlogdiv(){
    d3.select("#querylog").selectAll(".logattr").remove()
    for(var i=0;i<logdata.length;i++){
        var attr=d3.select("#querylog").append("div").attr("class","logattr")
            .attr("num",(i+1))
            .on("mousedown",function(){
                backtostep(d3.select(this).attr("num"));
            })
        attr.append("div").attr("class","lognum")
            .text(logdata[i].num)
        attr.append("div").attr("class","logtext")
            .text(logdata[i].text)
        if(logdata[i].num>backstepnum&&backstepnum!=-1){
            attr.attr("class","logattr logattr_undo")
        }
    }

}


d3.select("#log")
    .on("click", function () {
        d3.selectAll(".mouse_on_tag").remove();
        addlogdiv();
        refreshlogdiv();
    })
    .on("mousemove", function () {
        if(d3.select("#querylog")[0][0]==null&&
                d3.select("#log").select(".mouse_on_tag")[0][0]==undefined) {
            d3.select("#log").append("div")
                .attr("class", "mouse_on_tag").style("opacity","0")
                .text("The action List").style("width","150px")
                .append("svg")
                .attr("class", "mouse_on_tag_xiaosanjiao")
                .append('polygon')
                .attr('style', 'fill:rgb(48,48,48);')
                .attr('points', '0,20 6,15 8,25')


            d3.select("#log").select(".mouse_on_tag").transition()
                    .ease("linear")
                    .duration(300)
                    .delay(0)
                    .style("opacity","1") 
        }
    })
    .on("mouseout", function () {
        d3.select("#log").selectAll(".mouse_on_tag").remove();
    })

d3.select("#log").append("img").style("pointer-events","none")
    .attr("src","image/query_history.svg")
    .style("position","absolute")
    .style("height","40px")
    .style("width","40px")


