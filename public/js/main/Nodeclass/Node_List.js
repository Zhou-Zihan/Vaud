/**
 * Created by Administrator on 2015/11/2.
 */


var Nodelist={
    createNew:function(){
        var nodelist={};

        //list
        nodelist.list=[];
        nodelist.pushitem=function(item){
            nodelist.list.push(item);
        }
        nodelist.getlist=function(){
            return nodelist.list;
        }

        nodelist.getlistindexof=function(x){
            return nodelist.list[x];
        }

        nodelist.getlistiditem=function(id){
            for(var i=0;i<nodelist.list.length;i++){
                if(nodelist.list[i].id==id){
                    return nodelist.list[i];
                }
            }
            return null;
        }

        nodelist.deleteitem=function(count){
            d3.select("#nodediv"+count).remove();
            for(var i=0;i<nodelist.list.length;i++){
                if(nodelist.list[i].id=="node"+count){
                    nodelist.list[i].islive=false;
                }
            }
        }

        nodelist.changelistiditem=function(id,node){
            for(var i=0;i<nodelist.list.length;i++){
                if(nodelist.list[i].id==id){
                    nodelist.list[i]=node;
                }
            }
        }
        nodelist.getlistlength=function(){
            return nodelist.list.length;
        }

        //father_and_son
        nodelist.father_and_son=[];
        nodelist.pushfather_and_son=function(item){
            nodelist.father_and_son.push(item);
        }
        nodelist.getfather_and_son=function(){
            return nodelist.father_and_son;
        }

        return nodelist;
    }
}

