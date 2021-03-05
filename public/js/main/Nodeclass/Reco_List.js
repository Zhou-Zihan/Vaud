var Recolist={
    createNew:function(){
        var recolist={};

        //list
        recolist.list=[];
        recolist.pushitem=function(item){
            recolist.list.push(item);
        }
        recolist.getlist=function(){
            return recolist.list;
        }

        recolist.getlistindexof=function(x){
            return recolist.list[x];
        }

        recolist.getlistiditem=function(id){
            for(var i=0;i<recolist.list.length;i++){
                if(recolist.list[i].id==id){
                    return recolist.list[i];
                }
            }
            return null;
        }

        recolist.deleteitem=function(count){
            //TODO
            // d3.select("#nodediv"+count).remove();
            for(var i=0;i<recolist.list.length;i++){
                if(recolist.list[i].id=="node"+count){
                    recolist.list[i].islive=false;
                }
            }
        }

        recolist.changelistiditem=function(id,node){
            for(var i=0;i<recolist.list.length;i++){
                if(recolist.list[i].id==id){
                    recolist.list[i]=node;
                }
            }
        }
        recolist.getlistlength=function(){
            return recolist.list.length;
        }

        //father_and_son
        //father--many son--one
        recolist.father_and_son=[];
        recolist.pushfather_and_son=function(item){
            recolist.father_and_son.push(item);
        }
        recolist.getfather_and_son=function(){
            return recolist.father_and_son;
        }

        recolist.results=[];
        recolist.pushresult=function(item){
            recolist.results.push(item);
        }
        recolist.getresult=function(id){
            return recolist.results[id];
        }


        return recolist;
    }
}

