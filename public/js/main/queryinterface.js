/**
 * Created by hzs on 2015/7/2.
 */

//dragflag


var thiscasecount=0;
var thiscase=1;
var mousex, mousey;
var nodedrag = {boolean:false};
var nownode=null;
var nodesvgmove={boolean:false};


var operationstack=[];

var isdrag_new_condition=false,
    isabledrag_new_condition=false;
var activenode;

var nodelist=Nodelist.createNew();
var recolist=Recolist.createNew()

d3.select("#queryviewsvg").on("mousedown",function(){
    nodesvgmove = {boolean:true, mousex:d3.event.x, mousey:d3.event.y};
    d3.select("#queryviewsvg").style("cursor","move")
})

d3.select("body")
    .on("mousemove",function(){
        if(nodedrag.boolean){
            d3.select("#nodediv"+nownode).style("left",d3.event.x - nodedrag.mousex + "px");
            d3.select("#nodediv"+nownode).style("top",d3.event.y - nodedrag.mousey + "px");
            if(!nodelist.getlistiditem("node"+nownode).showdetail){
                d3.select("#node_cricle"+nownode).style("left", (d3.event.x - nodedrag.mousex) + "px");
                d3.select("#node_cricle"+nownode).style("top", (d3.event.y - nodedrag.mousey) + "px");
            }
            linepaint();
        }
        if(nodesvgmove.boolean){
            for(var i=0;i<nodelist.getlist().length;i++){

                var count=nodelist.getlist()[i].id.split("node")[1]
                d3.select("#nodediv"+count).style("left",
                    (d3.select("#nodediv"+count).attr("x") - nodesvgmove.mousex+d3.event.x) + "px");
                d3.select("#nodediv"+count).style("top",
                    (d3.select("#nodediv"+count).attr("y")  - nodesvgmove.mousey+d3.event.y) + "px");
                if(!nodelist.getlistiditem("node"+count).showdetail){
                    d3.select("#node_cricle"+count).style("left", (
                        d3.select("#node_cricle"+count).attr("x") - nodesvgmove.mousex+d3.event.x) + "px");
                    d3.select("#node_cricle"+count).style("top", (
                        d3.select("#node_cricle"+count).attr("y") - nodesvgmove.mousey+d3.event.y) + "px");
                }
            }
            linepaint();
        }
    })
    .on("mouseup",function(){
        if(nodedrag.boolean){
            nodedrag.boolean=false;
            d3.select("#nodediv"+nownode).attr("x",d3.event.x - nodedrag.mousex);
            d3.select("#nodediv"+nownode).attr("y",d3.event.y - nodedrag.mousey);
            if(!nodelist.getlistiditem("node"+nownode).showdetail){
                d3.select("#node_cricle"+nownode).attr("x", (d3.event.x - nodedrag.mousex));
                d3.select("#node_cricle"+nownode).attr("y", (d3.event.y - nodedrag.mousey));
            }
        }

        if(nodesvgmove.boolean){
            for(var i=0;i<nodelist.getlist().length;i++){
                var count=nodelist.getlist()[i].id.split("node")[1]
                d3.select("#nodediv"+count).attr("x",
                    (d3.select("#nodediv"+count).attr("x") - nodesvgmove.mousex+d3.event.x));
                d3.select("#nodediv"+count).attr("y",
                    (d3.select("#nodediv"+count).attr("y")  - nodesvgmove.mousey+d3.event.y) );
                if(!nodelist.getlistiditem("node"+count).showdetail){
                    d3.select("#node_cricle"+count).attr("x", (
                        d3.select("#node_cricle"+count).attr("x") - nodesvgmove.mousex+d3.event.x) );
                    d3.select("#node_cricle"+count).attr("y", (
                        d3.select("#node_cricle"+count).attr("y") - nodesvgmove.mousey+d3.event.y) );
                }
            }
            nodesvgmove.boolean=false;
            d3.select("#queryviewsvg").style("cursor","default")
        }

    })


function linepaint(){

    var pointlist=nodelist.getfather_and_son();
    d3.select("#queryviewsvg").selectAll("path").remove();
    d3.select("#queryviewsvg").selectAll('polygon').remove();
    for(var i= 0;i<pointlist.length;i++){

        if(nodelist.getlistiditem("node"+pointlist[i].father).islive
            &&nodelist.getlistiditem("node"+pointlist[i].son).islive){
            //compute x y
            if(nodelist.getlistiditem("node"+pointlist[i].father).showdetail){
                var fatherx =(d3.select("#nodediv" + pointlist[i].father).style("left").split("px")[0] - 1 + 286),
                    fathery =(d3.select("#nodediv" + pointlist[i].father).style("top").split("px")[0] - 1 + 43);
            }else{
                var fatherx =(d3.select("#nodediv" + pointlist[i].father).style("left").split("px")[0] - 1 + 185),
                    fathery =(d3.select("#nodediv" + pointlist[i].father).style("top").split("px")[0] - 1 + 23);
            }
            if(nodelist.getlistiditem("node"+pointlist[i].son).showdetail) {
                var sonx =(d3.select("#nodediv" + pointlist[i].son).style("left").split("px")[0]-10),
                    sony =(d3.select("#nodediv" + pointlist[i].son).style("top").split("px")[0] - 1 + 43);
            }else{
                var sonx =(d3.select("#nodediv" + pointlist[i].son).style("left").split("px")[0]-10),
                    sony =(d3.select("#nodediv" + pointlist[i].son).style("top").split("px")[0] - 1 + 23);
            }
            var fathersonx=fatherx-sonx;
            var fathersony=fathery-sony;
            if(fathersonx<0)
                fathersonx=0-fathersonx;
            if(fathersony<0)
                fathersony=0-fathersony;
            //console.log(nodelist.getlistiditem("node"+pointlist[i].father).getnodetype());//the type of father node
            //console.log(nodelist.getlistiditem("node"+pointlist[i].son).getnodetype());//the type of son node
            //paint line
            var fatherType = nodelist.getlistiditem("node"+pointlist[i].father).getnodetype();
            var sonType = nodelist.getlistiditem("node"+pointlist[i].son).getnodetype();

            if(fatherType == 'condition'&& sonType == 'data'){
                d3.select("#queryviewsvg").append('path')
                    .attr('style', 'stroke:#858585; fill:none; stroke-width:2;')
                    .attr("d", "M" +
                        fatherx + "," + fathery
                        + " C" + (sonx - fathersonx / 3) + "," + fathery
                        + " " + (fatherx+ fathersonx / 3) + "," + sony
                        + " " + sonx + "," + sony);
            } else {
                d3.select("#queryviewsvg").append('path')
                    .attr('style', 'stroke:#858585; fill:none; stroke-width:2; stroke-dasharray:8 8')
                    .attr("d", "M" +
                        fatherx + "," + fathery
                        + " C" + (sonx - fathersonx / 3) + "," + fathery
                        + " " + (fatherx+ fathersonx / 3) + "," + sony
                        + " " + sonx + "," + sony);
            }
            d3.select("#queryviewsvg").append('polygon')
                .attr('style', 'stroke:#858585;fill:#858585;')
                .attr('points',
                    (sonx+10) + "," + sony
                    + " " + sonx + "," + (sony-5)
                    + " " + sonx + "," + (sony+5));
        }

    }
}



function query(count) {
    var thisnode=nodelist.getlistiditem("node"+count);

    if(thisnode.type=="blog")
        queryblog(count);

    if(thisnode.type=="car")
         querycar(count);

    if(thisnode.type=="people")
        querypeople(count);

    if(thisnode.type=="estate")
        queryestate(count);

    if(thisnode.type=="point_of_interest")
        querypoi(count);

    if(thisnode.type=="social_network")
        querysocialnetwork(count)

    /*******************************
     *   query weather
     *******************************/
    if(thisnode.type=="weather") {
            qm.getWeather(
                "2014-01-01",(nodelist.getlistlength() - 1),
                function(data){
                    data_node_newnode("estate",[d3.select("#nodediv"+count).style("left").split("px")[0]-1+400,
                        d3.select("#nodediv"+count).style("top").split("px")[0]])
                    var tempnode = nodelist.getlistindexof(nodelist.getlistlength() - 1);
                    tempnode.setdatalist(data);
                    nodelist.changelistiditem(nodelist.getlistlength() - 1, tempnode)

                    lastnode = d3.select("#node" + (nodelist.getlistlength() - 1))
                    show_data_nodetip(lastnode,"record");
                    nodelist.getlistiditem("node" + count).showdetail=false;
                    hide_condition_nodedetail(d3.select("#node" + count));

                    nodelist.pushfather_and_son({
                        father: count,
                        son: nodelist.getlist().length - 1
                    })
                    linepaint();
                    log("query wheather from node"+count)
                }
            );
    }

//    query_mcts_test();
    QueryDb.getrecommend()

}

function query_mcts_test(){
    // here to mcts

    recolist=Recolist.createNew();
    d3.selectAll(".reconodediv").remove();
    data=[
        {
            id:0,
            father:[0,1],
            type:"blog",
            condition:[{type: "what", data: ["key word","丢失"]}],
            resultnum:7,
            result:[{"time":"2014-01-14 00:50","name":"红唇","content":"1月14日凌晨00：49从松台广场到杏花路百花苑丢失一个手机白色的苹果五代掉在出租车上，一下车就知道手机掉在出租车上，马上打了两个电话没接，后来直接关机，希望出租车司机好心还给我，里面有珍贵照片，如司机归还，一定酬谢。 我在:|杏花路百花苑","road":"杏花路百花苑","lng":120.6462979,"lat":28.00516276},{"time":"2014-01-14 23:57","name":"supertence","content":"#让红包飞# |让红包飞 我在:|市府路","road":"市府路","lng":120.68988,"lat":27.990719},{"time":"2014-01-14 23:57","name":"江原是沉思","content":"听着广播，越来越清醒 我在:|温州南枢纽","road":"温州南枢纽","lng":120.696688,"lat":27.926874},{"time":"2014-01-14 23:55","name":"世上只有一个这样的尹舒婷","content":"唉，最近没有一天是睡好的。 我在:|园区西路","road":"园区西路","lng":120.698287,"lat":27.923755},{"time":"2014-01-14 23:55","name":"潘紫涵kiki","content":"当爱已成往事 我在:|丰源路","road":"丰源路","lng":120.711732,"lat":27.999961},{"time":"2014-01-14 23:55","name":"龙行天下409","content":"这个点宝贝还是了无睡意.当妈的也只能奉陪到底 我在:|鞋料八街","road":"鞋料八街","lng":120.628792,"lat":28.012809},{"time":"2014-01-14 23:54","name":"Cherie雪梨_","content":"丽水第一部超级有意义的微电影，不妨去看看。小伙伴们转起来请关注@老白谈天 @丽水百事通 @那个风一样的女子 @BigBig猩猩is德清 @兰--jun 禁锢在时间里的人|禁锢在时间... 我在:|梧三路","road":"梧三路","lng":120.685918,"lat":27.951645},{"time":"2014-01-14 23:54","name":"三亚湾底的房子","content":"麻将，放炮，玩一把，赌，人那。 我在:|前岸路","road":"前岸路","lng":120.656173,"lat":27.950263},{"time":"2014-01-14 23:53","name":"果粒粒粒橙努力学习新技能","content":"呵呵呵，速涂。渣渣真是没立场做这种事情！本来可帅一只喵了，能被我黑出翔#渣手学画# 我在:|灰桥路","road":"灰桥路","lng":120.681328,"lat":28.018625},{"time":"2014-01-14 23:53","name":"l心不在嫣l","content":"儿子也回娘家了好冷清啊 我在:|黎明东路","road":"黎明东路","lng":120.692947,"lat":28.009245},{"time":"2014-01-14 23:52","name":"小潘子_TM实体店","content":"永远不要低估一个女生和你同甘共苦的决心。但也别忘记，一个女生最怕的，是在你身上看不到希望。。 我在:|民航路","road":"民航路","lng":120.676437,"lat":28.008358},{"time":"2014-01-14 23:52","name":"-向斯帖","content":"赞赞赞！帅惨，今天就不想换衣服拍美照了，下次穿出门在拍美美的！@missmo中国 我在:|金丝桥路","road":"金丝桥路","lng":120.671509,"lat":28.000805},{"time":"2014-01-14 23:50","name":"耍流氓2姑娘","content":"有勇气放下骄傲去雕一块朽木，却找不到一个坚持下去的理由… 我在:|双塔路","road":"双塔路","lng":120.608833,"lat":28.051222},{"time":"2014-01-14 23:47","name":"廖礼强","content":"#让红包飞#睡不着。发包啦 |让红包飞 我在:|文丰路","road":"文丰路","lng":120.728783,"lat":27.973982},{"time":"2014-01-14 23:47","name":"ZZzzyzyzzy","content":"睡不着 我在:|华中巷","road":"华中巷","lng":120.683357,"lat":27.990032},{"time":"2014-01-14 23:47","name":"苦累T_T灿炼","content":"今天，想到一个很搞笑的故事， 我在:|嵇师南路","road":"嵇师南路","lng":120.583754,"lat":28.021146},{"time":"2014-01-14 23:47","name":"一只特立独行的奇龙","content":"orz“合胃口的人，你为什么还不和我say hi ” 我在:|G15沈海高...","road":"G15沈海高速","lng":120.69721,"lat":27.925569},{"time":"2014-01-14 23:46","name":"张小盈_Nawata","content":"中大奖的都是过来拉仇恨的！我羡慕妒忌恨！！ 我在:|锦绣路","road":"锦绣路","lng":120.6686665498,"lat":27.9993684978},{"time":"2014-01-14 23:46","name":"3零末末_28926","content":"大罗山山顶的雪，终于来了冬天的一场欣喜 我在:|小南路","road":"小南路","lng":120.6581974849,"lat":28.0067619394},{"time":"2014-01-14 23:45","name":"顺时针的记忆2不2","content":"神盾局特工的女主Skye好美腻啊，完全冲着她去的呀 我在:|中心东路","road":"中心东路","lng":120.7054701061,"lat":27.922563697},{"time":"2014-01-14 23:43","name":"Murphy土豆你个马铃薯","content":"都没复习 只能预祝考神祝我马到成功了 我在:|机场大道","road":"机场大道","lng":120.714959,"lat":27.993205},{"time":"2014-01-14 23:41","name":"Long-Vicky","content":"好电影能引发思考。。。。。幻想必须超越现实，因为在你到手的那一刹那你没办法也不会再想要它。为了继续存在，欲望的客体必须永远无法达成。你要的不是&quot;它&quot;本身，而是对&quot;它&quot;的幻想。欲望与疯狂幻想相辅相成。 我在:|仓桥街","road":"仓桥街","lng":120.655243,"lat":28.01811},{"time":"2014-01-14 23:38","name":"small681","content":"明明那么点事，却告诉别人，真是鸡婆很 我在:|上伊路","road":"上伊路","lng":120.5776488788,"lat":28.0415764545},{"time":"2014-01-14 23:36","name":"辰辰的成长日记","content":"爸爸在前面走，宝宝在后面追，叫着:“臭狗熊，给我站住，我是光头强！” 我在:|蔡庵路","road":"蔡庵路","lng":120.574896,"lat":28.024156},{"time":"2014-01-14 23:36","name":"刺猬的新娘","content":"#让红包飞# |让红包飞 我在:|春晖路","road":"春晖路","lng":120.67933,"lat":27.992428},{"time":"2014-01-14 23:36","name":"莫羽汐家的樱子","content":"一天没有下床，下楼，准备继续这么颓废下去。 我在:|双龙路","road":"双龙路","lng":120.680487,"lat":27.987493},{"time":"2014-01-14 23:34","name":"shy且听风吟","content":"你既有所求，便拿天真来换！ 我在:|花柳塘","road":"花柳塘","lng":120.667665,"lat":28.011245},{"time":"2014-01-14 23:34","name":"潘蜀爱萝莉","content":"今日22:00桥头商二街附近丢失，身体除了头部以外就是熊猫🐼的身板模样！有消息联系：15700050925 我在:|小南路","road":"小南路","lng":120.657494,"lat":28.006065},{"time":"2014-01-14 23:33","name":"辛尔创意小人国新城店IC四班","content":"活动课后孩子们会把自己产生的垃圾扔到垃圾桶里。他们一点点捡起来扔进垃圾桶，她们自己也感到快乐。本图来自辛尔创意小人国新城店IC四班@NIC辛尔创意小人国 我在:|春晖路","road":"春晖路","lng":120.682483,"lat":27.98668},{"time":"2014-01-14 23:32","name":"陈几句小朋友的围脖","content":"D447，晴，宝宝还是睡不好，好累。白天上班还可以，不是很忙。但是心情不好，和大姨吵架了。诸事不顺，唉。宝宝最近很喜欢走，但是一定要手牵着。妈妈是不是应该把注意力转移到自己身上，会改变现状，会开心点，心里的刺好像拔不掉。惊闻同事甲状腺癌，默哀！ 我在:|望江西路","road":"望江西路","lng":120.636106,"lat":28.022342},{"time":"2014-01-14 23:32","name":"Ace靈_吃下这颗敦南药","content":"啊啊啊啊啊wwwwww回家后就收到了！！！超喜欢第二面和页码君！！！各位大大幸苦你们了！大感谢！！@ayakomina @安頗_2014繼續懶散 @果壇就算正常也懶得填坑的蹞希桑 @FuDDDDD 我在:|环城东路","road":"环城东路","lng":120.664757,"lat":28.01914},{"time":"2014-01-14 23:31","name":"小小小-小葫芦","content":"哈喽哈喽～这是放空的金鱼～晚安 我在:|东明路","road":"东明路","lng":120.670669,"lat":28.01799},{"time":"2014-01-14 23:31","name":"RunningFAT胡渣渣","content":"SEIZE THE DAY 我在:|海事路","road":"海事路","lng":120.690419,"lat":28.019685},{"time":"2014-01-14 23:31","name":"蓓蕾代购批发","content":"俏十岁面膜到货！ 我在:|城西街","road":"城西街","lng":120.653694,"lat":28.015245},{"time":"2014-01-14 23:30","name":"辛尔创意小人国新城店IC四班","content":"在游乐区里。孩子们每天都会给我带来新的变化。孩子会拿着海绵圆柱体当鼓敲打唱儿歌。她们互相交流玩乐。本图来自辛尔创意小人国新城店IC四班@NIC辛尔创意小人国 我在:|车站大道","road":"车站大道","lng":120.684564,"lat":27.987242},{"time":"2014-01-14 23:29","name":"华勤机电设备有限公司","content":"#让红包飞# |让红包飞 我在:|金川路","road":"金川路","lng":120.681263,"lat":27.972201},{"time":"2014-01-14 23:27","name":"怀念LonelyGod但不想吃的默默","content":"突然特别的想独立，特别的想的开，要是当初就能这么想，应该会少难过许多！ 我在:|振瓯路","road":"振瓯路","lng":120.636414,"lat":28.005124},{"time":"2014-01-14 23:27","name":"涂小米93","content":"好累啊，已经是第二天的晚班了，经理欺骗了我，说好的中班呢！！ 我在:|创新路","road":"创新路","lng":120.654297,"lat":28.039008},{"time":"2014-01-14 23:25","name":"打铁店de老板娘","content":"人生就像蒲公英，看似自由，却身不由己。 我在:|虞师里","road":"虞师里","lng":120.660316,"lat":28.007359},{"time":"2014-01-14 23:23","name":"天才老Lee","content":"记在温09土木人年底第一次聚会。 我在:|温州大道","road":"温州大道","lng":120.750694,"lat":27.969219},{"time":"2014-01-14 23:21","name":"Z冬敏很无聊","content":"#让红包飞#好 |让红包飞 我在:|翠微大道","road":"翠微大道","lng":120.614849,"lat":27.984495},{"time":"2014-01-14 23:21","name":"JINSHUYAN_","content":"wishes。 我在:|望江西路","road":"望江西路","lng":120.631821,"lat":28.020079},{"time":"2014-01-14 23:21","name":"蓓蕾代购批发","content":"蜗牛身体乳到货 我在:|三官殿巷","road":"三官殿巷","lng":120.65509,"lat":28.019306},{"time":"2014-01-14 23:21","name":"passwdwz","content":"#让红包飞# |让红包飞 我在:|划龙桥路","road":"划龙桥路","lng":120.67331,"lat":27.989674},{"time":"2014-01-14 23:21","name":"你不是W小姐","content":"只是,只是连最后的最后都可以没有了,只是想坚持到过年而已,我也在倒计时呀… 我在:|雁荡西路","road":"雁荡西路","lng":120.714759,"lat":27.987411},{"time":"2014-01-14 23:20","name":"蓓蕾代购批发","content":"韩国THE FACE SHOP睫毛膏到货！1号拉长、2号浓密，建议先涂2号，再使用1号效果更佳。 我在:|打绳巷","road":"打绳巷","lng":120.65638,"lat":28.023544},{"time":"2014-01-14 23:19","name":"我有一双小短腿","content":"突然发现，老了 我在:|工业路","road":"工业路","lng":120.593756,"lat":27.957434},{"time":"2014-01-14 23:18","name":"王小-珠","content":"一失足成千古恨啊！烦恼一万个 我在:|三牌坊","road":"三牌坊","lng":120.650879,"lat":28.010244},{"time":"2014-01-14 23:17","name":"西爱欧意一欧洲日用品","content":"马来西亚咖啡，完美比例，黄金品味。 我在:|大南路","road":"大南路","lng":120.665932,"lat":28.005217},{"time":"2014-01-14 23:16","name":"寒鸦尽杀","content":"今天晚上特意带二姐@小东西喜欢羊屎蛋蛋 去吃了蛋糕，盆栽奶茶里面的薄荷叶非常解腻@悠享家 我在:|茶院寺路","road":"茶院寺路","lng":120.668685,"lat":28.000623},{"time":"2014-01-14 23:15","name":"琴殇---日月","content":"每早我在阳台上目送远去的那个人儿似乎越来越陌生。 一四年八月十九日是他成年的日子，他将是有完全民事行为能力的人，他要为自己的行为负责。但愿他能把握人生，不后悔自己的选择！ 我在:|东门商业步...","road":"东门商业步行街","lng":120.669296,"lat":28.020838},{"time":"2014-01-14 23:14","name":"-向斯帖","content":"第一双秀！各种袜子都能陪太赞了！@missmo中国 我在:|金丝桥路","road":"金丝桥路","lng":120.671532,"lat":28.00086},{"time":"2014-01-14 23:14","name":"说_多了都是泪","content":"为什么i love damon，但是不喜欢 kalus;可是我不爱stanfen，but i like elijah 我在:|花柳塘","road":"花柳塘","lng":120.664305,"lat":28.010317},{"time":"2014-01-14 23:13","name":"刘良军-良君网商","content":"传统行业的问题从来就不是你不够专业，而是你对自己的行业了如指掌，却对消费者的转变漠不关心！ 我在:|飞霞南路","road":"飞霞南路","lng":120.66848,"lat":28.010624},{"time":"2014-01-14 23:13","name":"昔许莫","content":"# 038  工作车上装了个低音炮，走在马路上特带劲。下午在那做事，几个老头发梨发糖发烟给我们吃。待遇好好 我在:|金竹路","road":"金竹路","lng":120.676879,"lat":27.92889},{"time":"2014-01-14 23:13","name":"淡定1068","content":"女人不止我一个，但是我只有一个，你不用那么勉强自己接受，相信我们不会再遇见！所以大可放心！放弃一棵树还有一大片的森林在你眼前！ 我在:|划龙桥路","road":"划龙桥路","lng":120.674345,"lat":27.990912},{"time":"2014-01-14 23:13","name":"丫丫de暧","content":"人真得很可笑，别人理你的时候，你不理别人；等到你想理别人时，那人却不愿理你了 我在:|东龙路","road":"东龙路","lng":120.664701,"lat":27.983767},{"time":"2014-01-14 23:12","name":"胡潇予xiaoxiao","content":"今天知道我忍了多少句妈勒戈壁！多少句你妹的！多少句特么！多少句麻痹吗？孩子眼睛看坏了，都我错啊？我不知道说了她多少次不许看，给了多少限制。还有极品客户，衣服尺寸给你自己量了，说合适！合适你妹啊！让你别买了，偏要！收到说我提供尺码不正确，特么还叫我出运费退 我在:|陡门头","road":"陡门头","lng":120.664505,"lat":28.022985},{"time":"2014-01-14 23:12","name":"刘良军-良君网商","content":"  我的朋友圈里，有这么一些人，他们是卖衣服或鞋子，每天只会发布产品的图片，频繁刷频，让人很厌烦。第一、感觉你的产品是假货;第二、没有感情，没有互动，第三，不知背后卖东西的人是个怎么样的人，很难让别人产生信任。 我在:|飞霞桥路","road":"飞霞桥路","lng":120.667145,"lat":28.013083},{"time":"2014-01-14 23:11","name":"给力乐的微博","content":"看C罗拿金球奖激动那样 咱一不小心就三连冠了 我在:|百里西路","road":"百里西路","lng":120.64624,"lat":28.020406},{"time":"2014-01-14 23:11","name":"Jack_____康","content":"晚上开车最喜欢那些闪下灯就会让路的司机了。晚安 我在:|吴桥路","road":"吴桥路","lng":120.65792,"lat":28.00177},{"time":"2014-01-14 23:09","name":"淡定1068","content":"心存愧疚至此！从你今天的话语中透露着对我很多的不满！和很多的抱怨！不能接受这样的我！每个人都有缺点！而我的缺点在你眼里是这么的特别！你又何苦为难自己呢？&quot;女人不止我一个&quot;这句话在你心里应该很早就想说出来了！今天终于说出来了，我想对你说： 我在:|划龙桥路","road":"划龙桥路","lng":120.674475,"lat":27.991057},{"time":"2014-01-14 23:09","name":"沈大爷其实很低调","content":"#让红包飞# |让红包飞 我在:|车站大道","road":"车站大道","lng":120.681959,"lat":28.014269},{"time":"2014-01-14 23:08","name":"DTT-噔噔","content":"今晚这两妞请我吃饭 谢谢咯 亲爱的@forever-GF @吴静Ww  我在:|兴墅路","road":"兴墅路","lng":120.673721,"lat":28.005714},{"time":"2014-01-14 23:07","name":"菲菲就是菲菲的菲菲","content":"晚安 姐妹们 我在:|东明路","road":"东明路","lng":120.671312,"lat":28.017914},{"time":"2014-01-14 23:06","name":"狮子座的忙碌","content":"真不知道最近怎么了，累了？对不起你了 我在:|锦绣路","road":"锦绣路","lng":120.678078,"lat":28.00038},{"time":"2014-01-14 23:06","name":"颙哥很忙","content":"火锅走起，胖胖这吃货，老板娘都认识他了。老板娘说我像学生晴天娃娃是小礼物哦~ 我在:|学院东路","road":"学院东路","lng":120.721846,"lat":28.004631},{"time":"2014-01-14 23:06","name":"嘿嘿一包包兮","content":"回家~回家~@阿武控 @Double姑娘 @Gameover果壳 @褶子大人- @……… 我在:|G15沈海高...","road":"G15沈海高速","lng":120.696767,"lat":27.925332},{"time":"2014-01-14 23:04","name":"阿丢不想丢了阿呆","content":"天上的星星流泪 我在:|鲍州路","road":"鲍州路","lng":120.71324,"lat":28.007089},{"time":"2014-01-14 23:04","name":"张秀兰Lan","content":"其实我不喜欢哭，哭过之后好累。。。。。 我在:|车站大道","road":"车站大道","lng":120.684092,"lat":27.992213},{"time":"2014-01-14 23:04","name":"缘兮仔","content":"#一生朋友#三个基友凑成三贱客，可以无敌了吧@-绿青苔 |一生朋友 我在:|洪福巷","road":"洪福巷","lng":120.691999,"lat":28.012941},{"time":"2014-01-14 23:04","name":"主月儿","content":"这个点洗衣服，挂出去晒月光 我在:|老殿后路","road":"老殿后路","lng":120.684524,"lat":27.962726},{"time":"2014-01-14 23:02","name":"吾风飞扬","content":"今天踢球还真有点冷。。。 我在:|荷花路","road":"荷花路","lng":120.664673,"lat":28.006443},{"time":"2014-01-14 23:01","name":"朕乃帝皇","content":"　　雅木学长。： 你知道什么时候最难熬吗, 从学校过度到社会的时候, 看到喜欢的人和异性甜蜜的时候, 身边没人相信你的时候, 一个人难过需要亲朋好友陪伴却不在身边的时候 ,看到家人朋友有困难自己无能为力的时候, 迫不得已对最重要的人撒谎的时候…… 我在:|正岙巷四十...","road":"正岙巷四十弄","lng":120.571596,"lat":28.035883},{"time":"2014-01-14 23:00","name":"我有多帅你知道吗","content":"打开微博本来想说 什么 ，想想 还是算了。。。 我在:|清江路","road":"清江路","lng":120.718678,"lat":27.986363},{"time":"2014-01-14 22:59","name":"小白菜就是大凝子","content":"心空空的 可能离开家太久了 我在:|机场大道","road":"机场大道","lng":120.714439,"lat":27.993106},{"time":"2014-01-14 22:58","name":"七月WLX","content":"最近感觉压力好大，工作方面遇到了很大的困难，可是自己却不知道要怎么去解决。最近只看见别人的成长和取得的优异成绩，可是自己却止步不前，或是说根本就没有进步。没有方向好迷茫 我在:|朝阳路","road":"朝阳路","lng":120.722096,"lat":28.006191},{"time":"2014-01-14 22:57","name":"完整的年代","content":"当你现在有机会学习各种知识和经验时，一定要珍惜。靠混日子是混不了一辈子的。许多过程和经验都是不能省略的。 我在:|东垟西路","road":"东垟西路","lng":120.674988,"lat":27.969223},{"time":"2014-01-14 22:56","name":"I-am-徐大人","content":"莫名其妙。。为什么我就没长着一副让人心疼的样子呢!总是我的错。 我在:|龙霞南路","road":"龙霞南路","lng":120.675277,"lat":27.961206},{"time":"2014-01-14 22:56","name":"C_M龙","content":"#魅族手机让红包飞# |魅族手机让... 我在:|黎明东路","road":"黎明东路","lng":120.689246,"lat":28.01111},{"time":"2014-01-14 22:56","name":"飞羽星星","content":"快乐起来！ 我在:|宽带路","road":"宽带路","lng":120.652954,"lat":27.991571},{"time":"2014-01-14 22:55","name":"陈杰4G","content":"离开学校快7年了，好想回首过去的时光，现在快24岁了，又是一个本命年，不知道明年运去好不好！运去！ 我在:|柠檬路","road":"柠檬路","lng":120.655438,"lat":27.967549},{"time":"2014-01-14 22:55","name":"tianshibb","content":"鼠标，蛋糕，航哥生快。 我在:|汇源路","road":"汇源路","lng":120.710609,"lat":28.001596},{"time":"2014-01-14 22:54","name":"一只倔强的瓶子","content":"这可以音控的会亮的T，400多号人一起穿起来，好霸气！我喜欢 我在:|新安江路","road":"新安江路","lng":120.737793,"lat":27.981939},{"time":"2014-01-14 22:53","name":"艺名麻凡","content":"未来的你，晚安！全世界，晚安！好运过去了，就是开始霉运了！ 我在:|学院西路","road":"学院西路","lng":120.672691,"lat":28.006929},{"time":"2014-01-14 22:53","name":"温州朱秀薇","content":"一个合格团队的员工需要具备三个条件:自主性，思考性，协作性。 我在:|划龙桥路","road":"划龙桥路","lng":120.683502,"lat":27.991014},{"time":"2014-01-14 22:53","name":"慧之梦8","content":"嘴唇内喝水都好痛，看来之后要吃清淡的，伤不起啊。。。 我在:|南堡路","road":"南堡路","lng":120.650665,"lat":27.955351},{"time":"2014-01-14 22:52","name":"爱玩的萱寶","content":"微博的信息少了，看的心思也少了，不知道怎么了。 我在:|天窗巷","road":"天窗巷","lng":120.647647,"lat":28.01538},{"time":"2014-01-14 22:52","name":"Me燕亲亲","content":"向来缘浅，奈何情深。 我在:|塘东路","road":"塘东路","lng":120.674836,"lat":27.981337},{"time":"2014-01-14 22:51","name":"不懂爵士的艾玛","content":"跟90后学卖萌 我在:|望江东路","road":"望江东路","lng":120.659691,"lat":28.023527},{"time":"2014-01-14 22:51","name":"青争青争酱","content":"LIKE 我在:|人民西路","road":"人民西路","lng":120.652817,"lat":28.008728},{"time":"2014-01-14 22:51","name":"充气静816","content":"两个人跑出来吃过桥米线了可是半夜车被别人堵住了。我说你上楼拿另一辆成车的钥匙。他来一句。不要大晚上了你一个人在楼下。你和我一起上去。嘿嘿我开心的问：你是怕我被人拐走吗？说完嘿嘿的笑了。他冷冷的说：正常点。 我在:|车站大道","road":"车站大道","lng":120.685715,"lat":27.983389},{"time":"2014-01-14 22:51","name":"echo-652","content":"坚持到现在 就是不想承认自己选错 可是越相处越糟 或许真的不适合吧 我在:|划龙桥路","road":"划龙桥路","lng":120.67112,"lat":27.989746},{"time":"2014-01-14 22:50","name":"LTT李婷婷婷婷","content":"晒单晒单～还是熟悉的老味道 我在:|六虹桥路","road":"六虹桥路","lng":120.650352,"lat":27.987106},{"time":"2014-01-14 22:50","name":"旮旯哩的新家","content":"天天被妈妈问生意如何，有点要爆发的感觉，哎，少关心点是我唯一的心愿，真的不想老被她担心，唠叨，其实一个人真的挺好，自由惯了，由着我不好吗？ 我在:|马鞍池西路","road":"马鞍池西路","lng":120.651154,"lat":28.001751},{"time":"2014-01-14 22:50","name":"乐享饰成","content":"小木马项链316L钛钢，不褪色不过敏。接受预定 我在:|雪山路","road":"雪山路","lng":120.635292,"lat":28.000505},{"time":"2014-01-14 22:50","name":"琴殇---日月","content":"忙活了一天，累得跟狗一样。心，似乎更累，更糟糕。 曾经以为苦口婆心得规劝，他应当有所听从；曾经以为含辛茹苦得付出，他应当有所领悟；曾经以为毫无保留得给予，他应当有所感恩，错，错，错！即使再伟大的母爱，在一只苹果4s面前，简直弱爆了。我，完败了! 我在:|东门商业步...","road":"东门商业步行街","lng":120.669296,"lat":28.020838},{"time":"2014-01-14 22:49","name":"黛西不要变呆西","content":"晚安以及早安！ 我在:|三垟大道","road":"三垟大道","lng":120.715759,"lat":27.971306},{"time":"2014-01-14 22:49","name":"YYY-Q_Q","content":"真好听我什么时候才能等到你呢 我在:|西山东路","road":"西山东路","lng":120.631269,"lat":27.992637},{"time":"2014-01-14 22:48","name":"坚持到底4907","content":"每个中国人都应抵制日货从小事做起，团结就是力量！ 我在:|正岙巷四十...","road":"正岙巷四十弄","lng":120.570618,"lat":28.036935},{"time":"2014-01-14 22:48","name":"叫我MelonZ","content":"看得晕，如果文字像人的话，看来他的那段生活过得相当纠结。我应该不会去自动买这书 我在:|黎明东路","road":"黎明东路","lng":120.693094,"lat":28.009338},{"time":"2014-01-14 22:47","name":"锅包肉-怪宝","content":"半夜，来点儿锅贴，手工制作，纯健康油炸，有口水了没 我在:|雪山路","road":"雪山路","lng":120.634811,"lat":27.9988},{"time":"2014-01-14 22:47","name":"有没有人曾告诉你D","content":"手关节酸，脚关节酸、、、、老的一塌糊涂了、、、 我在:|伯温路","road":"伯温路","lng":120.694321,"lat":27.916088},{"time":"2014-01-14 22:46","name":"Mr-meloo","content":"tiamooooo 我在:|富春江路","road":"富春江路","lng":120.737014,"lat":27.981863},{"time":"2014-01-14 22:45","name":"来世我们还是一起","content":"　　2、孩子生下来以后，我们抱走。以后不再联系。除非意外情况，我们期望孩子的生母不要再出现，让孩子永远是我们亲生的。 我在:|老殿后路","road":"老殿后路","lng":120.687004,"lat":27.963102},{"time":"2014-01-14 22:44","name":"蜜蜜也有秘密","content":"有些话，有些事，对现在而言，已经失去了它原本的意义！再说多，在做多，只会让人觉的多此一举，对吗？ 我在:|黎明东路","road":"黎明东路","lng":120.697739,"lat":28.009445},{"time":"2014-01-14 22:43","name":"活着只为坚强","content":"对不起……是我的错……是我辜负了你…… 我在:|沙门路","road":"沙门路","lng":120.648053,"lat":27.964064},{"time":"2014-01-14 22:43","name":"聪盈","content":"明天早上5点多起床 太恐怖了 我在:|望江东路","road":"望江东路","lng":120.646355,"lat":28.024483},{"time":"2014-01-14 22:43","name":"丝柠橙瓣逆流","content":"温州之旅，平淡中的开心 我在:|县前头","road":"县前头","lng":120.661288,"lat":28.015803},{"time":"2014-01-14 22:41","name":"roundround","content":"乔不在身边第一天。反而没有了睡意。宝贝。你睡了吗。麻麻想你。不知道你是不是也一样想麻麻。 我在:|振瓯路","road":"振瓯路","lng":120.6365592929,"lat":28.0076054949},{"time":"2014-01-14 22:39","name":"LL自始自终","content":"新年礼物就选你了 我在:|府前街","road":"府前街","lng":120.656876,"lat":28.016121},{"time":"2014-01-14 22:39","name":"Camille128","content":"突然听到这首歌又重新下载了[挖鼻屎] 我在:|汤家桥路","road":"汤家桥路","lng":120.71527,"lat":28.00111},{"time":"2014-01-14 22:34","name":"CYY喜欢小朋友","content":"fighting，Mr Y...... 我在:|温州南枢纽","road":"温州南枢纽","lng":120.69783,"lat":27.92759},{"time":"2014-01-14 22:32","name":"黄先森的文艺世界","content":"再也不相信爱情了…… 我在:|花苑路","road":"花苑路","lng":120.63581,"lat":28.000637},{"time":"2014-01-14 22:32","name":"芥菜种-陈磊-LC","content":"深夜发甜品，报复全社会 我在:|南浦路","road":"南浦路","lng":120.676628,"lat":27.994965}]
        },
        {
            id:1,
            father:[1],
            type:"car",
            condition:[{type:"where",data: [27.9762107716664, 120.59864044189453, 28.0207723855426, 120.69168090820311, "region"]}],
            resultnum:5,
            result:[{"carNo":"浙C05132.LOG-0","points":[{"longitude":120.642326355,"latitude":28.0106506348,"time":"2014-01-01 00:00:11"},{"longitude":120.6402282715,"latitude":28.0094795227,"time":"2014-01-01 00:00:41"},{"longitude":120.6379165649,"latitude":28.0080509186,"time":"2014-01-01 00:01:11"},{"longitude":120.6359024048,"latitude":28.0069694519,"time":"2014-01-01 00:01:41"},{"longitude":120.6359024048,"latitude":28.0069694519,"time":"2014-01-01 00:02:11"},{"longitude":120.6359024048,"latitude":28.0069694519,"time":"2014-01-01 00:02:41"},{"longitude":120.6351318359,"latitude":28.0049190521,"time":"2014-01-01 00:03:11"},{"longitude":120.6371994019,"latitude":28.0018501282,"time":"2014-01-01 00:03:41"},{"longitude":120.637298584,"latitude":27.9984703064,"time":"2014-01-01 00:04:11"},{"longitude":120.6358184814,"latitude":27.997379303,"time":"2014-01-01 00:04:41"}]},{"carNo":"浙C05132.LOG-1","points":[{"longitude":120.6373977661,"latitude":27.99766922,"time":"2014-01-01 00:07:11"},{"longitude":120.6375274658,"latitude":27.9998493195,"time":"2014-01-01 00:07:41"},{"longitude":120.636680603,"latitude":28.0027999878,"time":"2014-01-01 00:08:11"},{"longitude":120.636680603,"latitude":28.0027999878,"time":"2014-01-01 00:08:11"},{"longitude":120.6359176636,"latitude":28.0039997101,"time":"2014-01-01 00:08:31"},{"longitude":120.6359176636,"latitude":28.0039997101,"time":"2014-01-01 00:08:42"},{"longitude":120.6374816895,"latitude":28.0009002686,"time":"2014-01-01 00:09:12"},{"longitude":120.6372299194,"latitude":27.998249054,"time":"2014-01-01 00:09:42"},{"longitude":120.6350479126,"latitude":27.9972496033,"time":"2014-01-01 00:10:12"}]},{"carNo":"浙CT0043.LOG-0","points":[{"longitude":120.6257781982,"latitude":28.0096492767,"time":"2014-01-01 00:07:51"},{"longitude":120.6302032471,"latitude":28.0085201263,"time":"2014-01-01 00:08:21"},{"longitude":120.6337738037,"latitude":28.0076007843,"time":"2014-01-01 00:08:51"},{"longitude":120.63671875,"latitude":28.0060806274,"time":"2014-01-01 00:09:21"},{"longitude":120.6392211914,"latitude":28.0036792755,"time":"2014-01-01 00:09:51"},{"longitude":120.6392211914,"latitude":28.0036792755,"time":"2014-01-01 00:10:21"},{"longitude":120.6404266357,"latitude":28.0041694641,"time":"2014-01-01 00:10:51"},{"longitude":120.6417999268,"latitude":28.0049495697,"time":"2014-01-01 00:11:21"},{"longitude":120.6439819336,"latitude":28.0061302185,"time":"2014-01-01 00:11:51"},{"longitude":120.6446685791,"latitude":28.0065307617,"time":"2014-01-01 00:12:21"},{"longitude":120.6446685791,"latitude":28.0065307617,"time":"2014-01-01 00:12:24"},{"longitude":120.6446685791,"latitude":28.0065307617,"time":"2014-01-01 00:12:44"},{"longitude":120.6446685791,"latitude":28.0065307617,"time":"2014-01-01 00:13:04"},{"longitude":120.6445007324,"latitude":28.0074996948,"time":"2014-01-01 00:13:24"},{"longitude":120.6436309814,"latitude":28.0089206696,"time":"2014-01-01 00:13:44"},{"longitude":120.643371582,"latitude":28.0095500946,"time":"2014-01-01 00:14:04"},{"longitude":120.643119812,"latitude":28.0109291077,"time":"2014-01-01 00:14:24"},{"longitude":120.6454467773,"latitude":28.0114307404,"time":"2014-01-01 00:14:44"},{"longitude":120.6458511353,"latitude":28.0115203857,"time":"2014-01-01 00:15:04"},{"longitude":120.6458511353,"latitude":28.0115203857,"time":"2014-01-01 00:15:14"},{"longitude":120.6428833008,"latitude":28.0114498138,"time":"2014-01-01 00:15:44"},{"longitude":120.6405334473,"latitude":28.0132808685,"time":"2014-01-01 00:16:14"},{"longitude":120.638168335,"latitude":28.0152206421,"time":"2014-01-01 00:16:44"},{"longitude":120.6365737915,"latitude":28.0171298981,"time":"2014-01-01 00:17:14"},{"longitude":120.6363296509,"latitude":28.0202293396,"time":"2014-01-01 00:17:44"},{"longitude":120.6359786987,"latitude":28.0233802795,"time":"2014-01-01 00:18:14"},{"longitude":120.6359786987,"latitude":28.0233802795,"time":"2014-01-01 00:18:44"},{"longitude":120.6359786987,"latitude":28.0233802795,"time":"2014-01-01 00:19:14"},{"longitude":120.6372299194,"latitude":28.0252799988,"time":"2014-01-01 00:19:44"}]},{"carNo":"浙CT0048.LOG-0","points":[{"longitude":120.6750793457,"latitude":27.9970703125,"time":"2014-01-01 00:00:00"}]},{"carNo":"浙CT0048.LOG-1","points":[{"longitude":120.6729812622,"latitude":27.9977302551,"time":"2014-01-01 00:00:40"},{"longitude":120.6720275879,"latitude":27.9978294373,"time":"2014-01-01 00:01:00"},{"longitude":120.6714324951,"latitude":27.9981708527,"time":"2014-01-01 00:01:20"},{"longitude":120.6706466675,"latitude":28.0002708435,"time":"2014-01-01 00:01:40"},{"longitude":120.6700973511,"latitude":28.0018692017,"time":"2014-01-01 00:02:00"},{"longitude":120.6699295044,"latitude":28.0025291443,"time":"2014-01-01 00:02:20"},{"longitude":120.6699295044,"latitude":28.0025291443,"time":"2014-01-01 00:02:40"},{"longitude":120.6699295044,"latitude":28.0025291443,"time":"2014-01-01 00:03:00"},{"longitude":120.6698989868,"latitude":28.003370285,"time":"2014-01-01 00:03:20"},{"longitude":120.6699295044,"latitude":28.0034294128,"time":"2014-01-01 00:03:36"},{"longitude":120.6692810059,"latitude":28.0028800964,"time":"2014-01-01 00:04:06"},{"longitude":120.6651229858,"latitude":28.0027809143,"time":"2014-01-01 00:04:36"},{"longitude":120.6610717773,"latitude":28.0023498535,"time":"2014-01-01 00:05:06"},{"longitude":120.6565170288,"latitude":28.0018501282,"time":"2014-01-01 00:05:36"},{"longitude":120.6536712646,"latitude":28.001619339,"time":"2014-01-01 00:06:06"},{"longitude":120.6492996216,"latitude":28.0011291504,"time":"2014-01-01 00:06:36"},{"longitude":120.6455688477,"latitude":28.0002994537,"time":"2014-01-01 00:07:06"},{"longitude":120.6415786743,"latitude":28.0004005432,"time":"2014-01-01 00:07:36"},{"longitude":120.6410217285,"latitude":28.0011692047,"time":"2014-01-01 00:08:06"},{"longitude":120.6408996582,"latitude":28.001449585,"time":"2014-01-01 00:08:36"},{"longitude":120.638633728,"latitude":28.0044498444,"time":"2014-01-01 00:09:06"},{"longitude":120.6353683472,"latitude":28.0068206787,"time":"2014-01-01 00:09:36"},{"longitude":120.6315765381,"latitude":28.0084495544,"time":"2014-01-01 00:10:06"},{"longitude":120.6264266968,"latitude":28.0096302032,"time":"2014-01-01 00:10:36"},{"longitude":120.6263809204,"latitude":28.0096492767,"time":"2014-01-01 00:11:06"},{"longitude":120.6263809204,"latitude":28.0096492767,"time":"2014-01-01 00:11:36"},{"longitude":120.6260223389,"latitude":28.0098495483,"time":"2014-01-01 00:12:06"}]}]
        },
        {
            id:2,
            father:[0],
            type:"people",
            condition:[{type:"+",data:[{type:"time",data:["2014-1-01 00:00", "2014-1-01 00:00"]},{type:"where",data: [28.01652921631991, 120.64567565917967, 28.0207723855426, 120.65425872802733, "region"]}]}],
            resultnum:0,
            result:[]
        }
    ]

    data.forEach(o=>{
        condition_reconode_newnode(o);
        recolist.pushfather_and_son({
            father:o.father,
            son:o.id
        })
    })

    console.log(nodelist,recolist);
}

function linepaint_for_reco(id){
    var pointlist=recolist.getfather_and_son();
    for(var i= 0;i<pointlist.length;i++){
        if(pointlist[i].son==id){
            for(f in pointlist[i].father){
                if(nodelist.getlistindexof(pointlist[i].father[f]).islive){
                    if(nodelist.getlistindexof(pointlist[i].father[f]).showdetail){
                        var fatherx =(d3.select("#nodediv" + pointlist[i].father[f]).style("left").split("px")[0] - 1 + 286),
                            fathery =(d3.select("#nodediv" + pointlist[i].father[f]).style("top").split("px")[0] - 1 + 43);
                    }else{
                        var fatherx =(d3.select("#nodediv" + pointlist[i].father[f]).style("left").split("px")[0] - 1 + 185),
                            fathery =(d3.select("#nodediv" + pointlist[i].father[f]).style("top").split("px")[0] - 1 + 23);
                    }

                    sonx=document.getElementById("reconodediv"+id).offsetLeft-5;
                    sony=document.getElementById("reconodediv"+id).offsetTop+15;

                    var fathersonx=fatherx-sonx;
                    var fathersony=fathery-sony;
                    if(fathersonx<0)
                        fathersonx=0-fathersonx;
                    if(fathersony<0)
                        fathersony=0-fathersony;

                    d3.select("#queryviewsvg").append('path')
                        .attr("id","reco_path")
                        .attr('style', 'stroke:#858585; fill:none; stroke-width:2; stroke-dasharray:8 8')
                        .attr("d", "M" +
                            fatherx + "," + fathery
                            + " C" + (sonx - fathersonx / 3) + "," + fathery
                            + " " + (fatherx+ fathersonx / 3) + "," + sony
                            + " " + sonx + "," + sony);
                    d3.select("#queryviewsvg").append('polygon')
                        .attr("id","reco_polygon")
                        .attr('style', 'stroke:#858585;fill:#858585;')
                        .attr('points',
                            (sonx+10) + "," + sony
                            + " " + sonx + "," + (sony-5)
                            + " " + sonx + "," + (sony+5));
                }
            }
        }
    }
}

function regularwhen(when){
    if(when.length==15){

       var newwhen=when.split(" ")[0].split("-")[0]+"-"+"0"+
           when.split(" ")[0].split("-")[1]+"-"
           +when.split(" ")[0].split("-")[2]+
           " "+when.split(" ")[1]
        return newwhen;
    }
}