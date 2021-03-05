/**
 * Created by Administrator on 2015/11/2.
 */

var Node={
    createNew:function(){
        var node={};
        node.islive=true;
        node.isquery=false;
        node.showdetail=true;
        node.id=null;
        node.nodetype;
        node.type;
        node.source="";
        //id
        node.setid=function(id){
            node.id=id;
        }
        node.getid=function(){
            return node.id;
        }

        //type
        node.settype=function(type){
            node.type=type;
        }
        node.gettype=function(){
            return node.type;
        }
        node.setnodetype=function(type){
            node.nodetype=type;
        }
        node.getnodetype=function(){
            return node.nodetype;
        }

        //condition
        node.condition=[];
        node.getcondition=function(){
            return node.condition;
        }
        node.changecondition=function(item){
            node.condition=item;;
        }

        //time
        node.pushtimelistitem=function(item){
            node.condition.push({type:"time",data:item});
        }
        node.gettimelist=function(){
            var timelist=[];
            for(var i=0;i<node.condition.length;i++){
                if(node.condition[i].type=="time"){
                    timelist.push(node.condition[i].data)
                }
            }
            return timelist;
        }
        node.changetimelist=function(item){
            var templist=[];
            for(var i=0;i<node.condition.length;i++){
                if(node.condition[i].type!="time"){
                    templist.push({type:node.condition[i].type,data:node.condition[i].data})
                }
            }
            for(var i=0;i<item.length;i++){
                templist.push({type:"time",data:item[i]});
            }
            node.condition=templist;
        }
        //where
        node.pushwherelistitem=function(item){
            node.condition.push({type:"where",data:item});
        }
        node.getwherelist=function(){
            var templist=[];
            for(var i=0;i<node.condition.length;i++){
                if(node.condition[i].type=="where"){
                    templist.push(node.condition[i].data)
                }
            }
            return templist;
        }
        node.changewherelist=function(item){
            var templist=[];
            for(var i=0;i<node.condition.length;i++){
                if(node.condition[i].type!="where"){
                    templist.push({type:node.condition[i].type,data:node.condition[i].data})
                }
            }
            for(var i=0;i<item.length;i++){
                templist.push({type:"where",data:item[i]});
            }
            node.condition=templist;
        }
        //which
        node.pushwhichlistitem=function(item){
            for(var i=0;i<node.condition.length;i++){
                if(node.condition[i].type=="which"){
                    if(item==node.condition[i].data){
                        return;
                    }
                }
            }
            node.condition.push({type:"which",data:item});
        }

        node.getwhichlist=function(){
            var templist=[];
            for(var i=0;i<node.condition.length;i++){
                if(node.condition[i].type=="which"){
                    templist.push(node.condition[i].data)
                }
            }
            return templist;
        }
        node.changewhichlist=function(item){
            var templist=[];
            for(var i=0;i<node.condition.length;i++){
                if(node.condition[i].type!="which"){
                    templist.push({type:node.condition[i].type,data:node.condition[i].data})
                }
            }
            for(var i=0;i<item.length;i++){
                templist.push({type:"which",data:item[i]});
            }
            node.condition=templist;
        }
        //what
        node.pushwhatlistitem=function(item){
            node.condition.push({type:"what",data:item});
        }
        node.getwhatlist=function(){
            var templist=[];
            for(var i=0;i<node.condition.length;i++){
                if(node.condition[i].type=="what"){
                    templist.push(node.condition[i].data)
                }
            }
            return templist;
        }
        node.changewhatlist=function(item){
            var templist=[];
            for(var i=0;i<node.condition.length;i++){
                if(node.condition[i].type!="what"){
                    templist.push({type:node.condition[i].type,data:node.condition[i].data})
                }
            }
            for(var i=0;i<item.length;i++){
                templist.push({type:"what",data:item[i]});
            }
            node.condition=templist;
        }



        //data

        //car
        node.datalist;
        node.setdatalist=function(datalist){
            node.datalist=datalist;
        }
        node.pushdata=function(item){
            node.datalist.push(item);
        }
        node.getdatalist=function() {
            return node.datalist;
        }
        return node;
    }
}