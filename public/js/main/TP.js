
function year_board(){
               var yearset = [yearbegin, yearbegin+1, yearbegin+2, yearbegin+3, yearbegin+4, yearbegin+5, yearbegin+6, yearbegin+7, yearbegin+8, yearbegin+9, yearbegin+10, yearbegin+11]
               //if(typeof(innercircledown) != "undeifned"){innercircledown.remove()}
               if(typeof(svgyear) != "undefined"){ svgyear.remove() }
               if(typeof(svgmonth) != "undefined"){ svgmonth.remove() }
               if(typeof(svgday) != "undefined"){ svgday.remove() }
               if(typeof(svgweek) != "undefined"){ svgweek.remove() }
               if(typeof(svgdate) != "undefined"){ svgdate.remove() }
               if(typeof(svgtime) != "undefined"){ svgtime.remove() }
               if(typeof(divtime) != "undefined"){ divtime.remove() }
               svgyear = bigcircle.append("svg")
                              .attr("position","absolute")
                              .attr("x",0)
                              .attr("y",0)
                              .attr("width",310)
                              .attr("height",350)
               innercircledown = bigcircle.append("div")//内下框
                              .attr("id","innercircledown")
                              .style("position","absolute")
                              .style("top","30px")
                              .style("left","2px")
                              .style("width","244px")
                              .style("height","25px")
                              .style("background-color","#d9d9d9")
                              .style("border","1px solid #828282")
                              .style("border-radius","5px");
               rectsyear = svgyear.selectAll("rect")
                              .data(yearset)
                              .enter()
                              .append("rect")
                              .attr("class","rect") 
                              .attr("width",55)
                              .attr("height",40)
                              .attr("position","absolute")
                              .attr("x",function(d){
                                   var x = 8 + ((d-yearbegin)%4)*60;
                                   return x
                              })
                              .attr("y",function(d){
                                   var x = 65+ Math.floor((d-yearbegin)/4)*45;
                                   return x
                              })
                              .attr("fill",function(d, i){
                                   if(ifyearchosen[i] == 1){ return "white" }
                                   else{ return "#f2f2f2" }
                              })
                              .attr("stroke",function(d, i){
                                   if(ifyearchosen[i] == 1){ return "#8f8f8f" }
                                   else{ return "#d3d3d3" }
                              })
                              .on("mouseover",function(d, i){
                                   if(ifyearchosen[i] == 0){
                                        d3.select(this)
                                             .attr("stroke","#8f8f8f")
                                   }
                              })
                              .on("mouseout",function(d, i){
                                   if(ifyearchosen[i] == 0){
                                       d3.select(this)
                                             .attr("stroke","#d3d3d3")
                                   }
                              })
                              .on("click",function(d, i){
                                   ifyearchosen[i] = 1- ifyearchosen[i];
                                   if(ifyearchosen[i] == 1){
                                        d3.select(this)
                                             .attr("fill","white")
                                             .attr("stroke","#8f8f8f")
                                   }
                                   else{
                                        d3.select(this)
                                             .attr("fill","#f2f2f2")
                                             .attr("stroke","d3d3d3")
                                   }
                              }) 
               textsyear = svgyear.selectAll("text")
                              .data(yearset)
                              .enter()
                              .append("text")
                              .attr("x",function(d){
                                   var x = 16+ ((d-yearbegin)%4)*60;
                                   return x
                              })
                              .attr("y",function(d){
                                   var x = 92 + Math.floor((d-yearbegin)/4)*45;
                                   return x
                              })
                              //.attr("text-align","middle")
                              .style("font-size","18px") 
                              .style("font-weight","bold")
                              .text(function(d){ return d })
                              .style("fill","#696969") 
                              .style("pointer-events","none")
                              .style("cursor","default")
               leftboard = innercircledown.append("div")
                              .style("position","absolute")
                              .style("top","2px")
                              .style("left","2px")
                              .style("width","20px")
                              .style("height","19px")
                              //.style("background-color","red")
                              .style("border","1px solid #b7b7b7")
                              .style("border-radius","5px")
                              .style("background-image","url(/statis/tp/left.png)")
                              .on("mouseover",function(){
                                             leftboard.style("border","1px solid #828282")
                              })
                              .on("mouseout",function(){
                                             leftboard.style("border","1px solid #b7b7b7")
                              })
                              .on("click",function(){
                                   yearbegin = yearbegin - 12;
                                   yearset = [yearbegin, yearbegin+1, yearbegin+2, yearbegin+3, yearbegin+4, yearbegin+5, yearbegin+6, yearbegin+7, yearbegin+8, yearbegin+9, yearbegin+10, yearbegin+11];
                                   rectsyear.remove()
                                   rectsyear = svgyear.selectAll("rect")
                                                  .data(yearset)
                                                  .enter()
                                                  .append("rect")
                                                  .attr("class","rect") 
                                                  .attr("width",55)
                                                  .attr("height",40)
                                                  .attr("position","absolute")
                                                  .attr("x",function(d){
                                                       var x = 8 + ((d-yearbegin)%4)*60;
                                                       return x
                                                  })
                                                  .attr("y",function(d){
                                                       var x = 65+ Math.floor((d-yearbegin)/4)*45;
                                                       return x
                                                  })
                                                  .attr("fill",function(d, i){
                                                       if(ifyearchosen[i] == 1){ return "white" }
                                                       else{ return "#f2f2f2" }
                                                  })
                                                  .attr("stroke",function(d, i){
                                                       if(ifyearchosen[i] == 1){ return "#8f8f8f" }
                                                       else{ return "#d3d3d3" }
                                                  })
                                                  .on("mouseover",function(d, i){
                                                       if(ifyearchosen[i] == 0){
                                                            d3.select(this)
                                                                 .attr("stroke","#8f8f8f")
                                                       }
                                                  })
                                                  .on("mouseout",function(d, i){
                                                       if(ifyearchosen[i] == 0){
                                                           d3.select(this)
                                                                 .attr("stroke","#d3d3d3")
                                                       }
                                                  })
                                                  .on("click",function(d, i){
                                                       ifyearchosen[i] = 1- ifyearchosen[i];
                                                       if(ifyearchosen[i] == 1){
                                                            d3.select(this)
                                                                 .attr("fill","white")
                                                                 .attr("stroke","#8f8f8f")
                                                       }
                                                       else{
                                                            d3.select(this)
                                                                 .attr("fill","#f2f2f2")
                                                                 .attr("stroke","d3d3d3")
                                                       }
                                                  }) 
                                   textsyear.remove()
                                   textsyear = svgyear.selectAll("text")
                                                  .data(yearset)
                                                  .enter()
                                                  .append("text")
                                                  .attr("x",function(d){
                                                       var x = 16+ ((d-yearbegin)%4)*60;
                                                       return x
                                                  })
                                                  .attr("y",function(d){
                                                       var x = 92 + Math.floor((d-yearbegin)/4)*45;
                                                       return x
                                                  })
                                                  //.attr("text-align","middle")
                                                  .style("font-size","18px") 
                                                  .style("font-weight","bold")
                                                  .text(function(d){ return d })
                                                  .style("fill","#696969") 
                                                  .style("pointer-events","none")
                                                  .style("cursor","default")
                              })
               rightboard = innercircledown.append("div")
                              .style("position","absolute")
                              .style("top","2px")
                              .style("right","2px")
                              .style("width","20px")
                              .style("height","19px")
                              //.style("background-color","red")
                              .style("border","1px solid #b7b7b7")
                              .style("border-radius","5px")
                              .style("background-image","url(/statis/tp/right.png)")
                              .on("mouseover",function(){
                                             rightboard.style("border","1px solid #828282")
                              })
                              .on("mouseout",function(){
                                             rightboard.style("border","1px solid #b7b7b7")
                              })
                              .on("click",function(){
                                             yearbegin = yearbegin + 12;
                                             yearset = [yearbegin, yearbegin+1, yearbegin+2, yearbegin+3, yearbegin+4, yearbegin+5, yearbegin+6, yearbegin+7, yearbegin+8, yearbegin+9, yearbegin+10, yearbegin+11];
                                             rectsyear.remove()
                                             rectsyear = svgyear.selectAll("rect")
                                                            .data(yearset)
                                                            .enter()
                                                            .append("rect")
                                                            .attr("class","rect") 
                                                            .attr("width",55)
                                                            .attr("height",40)
                                                            .attr("position","absolute")
                                                            .attr("x",function(d){
                                                                 var x = 8 + ((d-yearbegin)%4)*60;
                                                                 return x
                                                            })
                                                            .attr("y",function(d){
                                                                 var x = 65+ Math.floor((d-yearbegin)/4)*45;
                                                                 return x
                                                            })
                                                            .attr("fill",function(d, i){
                                                                 if(ifyearchosen[i] == 1){ return "white" }
                                                                 else{ return "#f2f2f2" }
                                                            })
                                                            .attr("stroke",function(d, i){
                                                                 if(ifyearchosen[i] == 1){ return "#8f8f8f" }
                                                                 else{ return "#d3d3d3" }
                                                            })
                                                            .on("mouseover",function(d, i){
                                                                 if(ifyearchosen[i] == 0){
                                                                      d3.select(this)
                                                                           .attr("stroke","#8f8f8f")
                                                                 }
                                                            })
                                                            .on("mouseout",function(d, i){
                                                                 if(ifyearchosen[i] == 0){
                                                                     d3.select(this)
                                                                           .attr("stroke","#d3d3d3")
                                                                 }
                                                            })
                                                            .on("click",function(d, i){
                                                                 ifyearchosen[i] = 1- ifyearchosen[i];
                                                                 if(ifyearchosen[i] == 1){
                                                                      d3.select(this)
                                                                           .attr("fill","white")
                                                                           .attr("stroke","#8f8f8f")
                                                                 }
                                                                 else{
                                                                      d3.select(this)
                                                                           .attr("fill","#f2f2f2")
                                                                           .attr("stroke","d3d3d3")
                                                                 }
                                                            }) 
                                             textsyear.remove()
                                             textsyear = svgyear.selectAll("text")
                                                            .data(yearset)
                                                            .enter()
                                                            .append("text")
                                                            .attr("x",function(d){
                                                                 var x = 16+ ((d-yearbegin)%4)*60;
                                                                 return x
                                                            })
                                                            .attr("y",function(d){
                                                                 var x = 92 + Math.floor((d-yearbegin)/4)*45;
                                                                 return x
                                                            })
                                                            //.attr("text-align","middle")
                                                            .style("font-size","18px") 
                                                            .style("font-weight","bold")
                                                            .text(function(d){ return d })
                                                            .style("fill","#696969") 
                                                            .style("pointer-events","none")
                                                            .style("cursor","default")
                              })
  
               }

function month_board(){
               monthset = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
               if(typeof(innercircledown) != "undeifned"){innercircledown.remove()}
               if(typeof(svgyear) != "undefined"){ svgyear.remove() }
               if(typeof(svgmonth) != "undefined"){ svgmonth.remove() }
               if(typeof(svgday) != "undefined"){ svgday.remove() }
               if(typeof(svgweek) != "undefined"){ svgweek.remove() }
               if(typeof(svgdate) != "undefined"){ svgdate.remove() }
               if(typeof(svgtime) != "undefined"){ svgtime.remove() }
               if(typeof(divtime) != "undefined"){ divtime.remove() }
               svgmonth = bigcircle.append("svg")
                              .attr("position","absolute")
                              .attr("x",0)
                              .attr("y",0)
                              .attr("width",310)
                              .attr("height",350) 
               rectsmonth = svgmonth.selectAll("rect")
                              .data(monthset)
                              .enter()
                              .append("rect")
                              .attr("class","rect") 
                              .attr("width",55)
                              .attr("height",40)
                              .attr("position","absolute")
                              .attr("x",function(d, i){
                                   var x = 8 + (i%4)*60;
                                   return x
                              })
                              .attr("y",function(d, i){
                                   var x = 65+ Math.floor(i/4)*45;
                                   return x
                              })
                              .attr("fill",function(d, i){
                                   if(ifmonthchosen[i] == 1){ return "white" }
                                   else{ return "#f2f2f2" }
                              })
                              .attr("stroke",function(d, i){
                                   if(ifmonthchosen[i] == 1){ return "#8f8f8f" }
                                   else{ return "#d3d3d3" }
                              })
                              .on("mouseover",function(d, i){
                                   if(ifyearchosen[i] == 0){
                                        d3.select(this)
                                             .attr("stroke","#8f8f8f")
                                   }
                              })
                              .on("mouseout",function(d, i){
                                   if(ifmonthchosen[i] == 0){
                                       d3.select(this)
                                             .attr("stroke","#d3d3d3")
                                   }
                              })
                              .on("click",function(d, i){
                                   ifmonthchosen[i] = 1- ifmonthchosen[i];
                                   if(ifmonthchosen[i] == 1){
                                        d3.select(this)
                                             .attr("fill","white")
                                             .attr("stroke","#8f8f8f")
                                   }
                                   else{
                                        d3.select(this)
                                             .attr("fill","#f2f2f2")
                                             .attr("stroke","d3d3d3")
                                   }
                              }) 
               textsmonth = svgmonth.selectAll("text")
                              .data(monthset)
                              .enter()
                              .append("text")
                              .attr("x",function(d, i){
                                   var x = 18+ (i%4)*60;
                                   return x
                              })
                              .attr("y",function(d, i){
                                   var x = 92 + Math.floor(i/4)*45;
                                   return x
                              })
                              //.attr("text-align","middle")
                              .style("font-size","18px") 
                              .style("font-weight","bold")
                              .text(function(d){ return d })
                              .style("fill","#696969") 
                              .style("pointer-events","none")
                              .style("cursor","default")                                              
               }

function day_board(){
               if(typeof(innercircledown) != "undeifned"){innercircledown.remove()}
               if(typeof(svgyear) != "undefined"){ svgyear.remove() }
               if(typeof(svgmonth) != "undefined"){ svgmonth.remove() }
               if(typeof(svgday) != "undefined"){ svgday.remove() }
               if(typeof(svgweek) != "undefined"){ svgweek.remove() }
               if(typeof(svgdate) != "undefined"){ svgdate.remove() }
               if(typeof(svgtime) != "undefined"){ svgtime.remove() }
               if(typeof(divtime) != "undefined"){ divtime.remove() }
               svgday = bigcircle.append("svg")
                              .attr("position","absolute")
                              .attr("x",0)
                              .attr("y",0)
                              .attr("width",310)
                              .attr("height",55) 
               Datediv = svgday.append("rect")//日期
                              .attr("position","absolute")
                              .attr("x",25)
                              .attr("y",33)
                              .attr("rx",3)
                              .attr("ry",2)
                              .attr("width",45)
                              .attr("height",20)
                              .attr("fill","#e8e8e8")
                              .attr("text-align","center")
                              .attr("stroke-width", 1)
                              .attr("stroke", "#D3D3D3")
                              .on("mouseover",function(){
                                   Datediv.attr("stroke", "#8f8f8f")
                                   textdate.style("fill","black")
                              })
                              .on("mouseout",function(){
                                   if(date == 0){
                                        Datediv.attr("stroke", "#d3d3d3")
                                        textdate.style("fill","#8e8e8e")
                                   }
                              })
                              .on("click",function(){
                                   date = 1
                                   week = 0
                                   Datediv.attr("stroke", "#8f8f8f")
                                   textdate.style("fill","black")
                                   Weekdiv.attr("stroke", "#d3d3d3")
                                   textweek.style("fill","#8e8e8e")
                                   date_board();
                              })
               date_board();
               textdate = svgday
                              .append("text")
                              .attr("x",32)
                              .attr("y",47)
                              .style("font-size","15px") 
                              .style("text-align","center")
                              .text("Date")
                              .style("font-weight","bold")
                              .style("fill","#8e8e8e")
                              .style("pointer-events","none")
               Datediv.attr("stroke", "#8f8f8f")
               textdate.style("fill","black")
               Weekdiv = svgday.append("rect")//星期
                              .attr("position","absolute")
                              .attr("x",170)
                              .attr("y",33)
                             .attr("rx",3)
                              .attr("ry",2)
                              .attr("width",45)
                              .attr("height",20)
                              .attr("fill","#e8e8e8")
                              .attr("text-align","center")
                              .attr("stroke-width", 1)
                              .attr("stroke", "#D3D3D3")
                              .on("mouseover",function(){
                                   Weekdiv.attr("stroke", "#8f8f8f")
                                   textweek.style("fill","black")
                              })
                              .on("mouseout",function(){
                                   if(week == 0){
                                        Weekdiv.attr("stroke", "#d3d3d3")
                                        textweek.style("fill","#8e8e8e")
                                   }
                              })
                              .on("click",function(){
                                   date = 0
                                   week = 1
                                   Weekdiv.attr("stroke", "#8f8f8f")
                                   textweek.style("fill","black")
                                   Datediv.attr("stroke", "#d3d3d3")
                                   textdate.style("fill","#8e8e8e")
                                   week_board();
                              }) 
               textweek = svgday
                              .append("text")
                              .attr("x",177)
                              .attr("y",47)
                              .style("font-size","15px") 
                              .text("Week")
                              .style("font-weight","bold")
                              .style("fill","#8e8e8e")
                              .style("pointer-events","none")                                                                                   
               }
 
function date_board(){
               ndate=1
               nweek=0
               for(i=0;i<ifweekchosen.length;i++){ ifweekchosen[i] = 0}
               dateset = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
               yearchosen = new Array()
               if(ifmonthchosen[1] == 1){
                    for(i=0;i<ifyearchosen.length;i++){
                    if(ifyearchosen[i] == 1){yearchosen.push(i)}
                    }
                    for(i=0;i<yearchosen.length;i++){
                         if((yearchosen[i])%4 != 0){
                              dateset = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
                         }
                         else if((yearchosen[i])%100 == 0 && (yearchosen[i])%400 != 0){
                              dateset = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
                         }
                         else{
                              if(dateset.length>=29){
                                   dateset = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
                              }
                         }
                    }
               }
               else if(ifmonthchosen[3] == 1 || ifmonthchosen[5] == 1 || ifmonthchosen[8] == 1 || ifmonthchosen[10] == 1){
                    if(dateset.length>=30){
                         dateset = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29.30]
                    }
               }
               if(typeof(svgweek) != "undefined"){ svgweek.remove() }
               if(typeof(svgdate) != "undefined"){ svgdate.remove() }
               svgdate = bigcircle.append("svg")
                              .attr("position","relative")
                              .attr("x",0)
                              .attr("y","10px")
                              .attr("width",250)
                              .attr("height",280)
               rectsdate = svgdate.selectAll("rect")
                              .data(dateset)
                              .enter()
                              .append("rect")
                              .attr("class","rect")
                              .attr("width",32)
                              .attr("height",20)
                              .attr("stroke-width",1)
                              .attr("stroke","#d3d3d3")
                              .attr("position","absolute")
                              .attr("x",function(d, i){
                                   var x = 3+ (i%7)*35;
                                   return x
                              })
                              .attr("y",function(d, i){
                                   var x = 5+Math.floor(i/7)*25 ;
                                   return x
                              })
                              .attr("fill",function(d, i){
                                   if(ifdatechosen[i] == 1){ return "white" }
                                   else{ return "#f2f2f2" }
                              })
                              .attr("stroke",function(d, i){
                                   if(ifdatechosen[i] == 1){ return "#8f8f8f" }
                                   else{ return "#d3d3d3" }
                              })
                              .on("mouseover",function(d, i){
                                   if(ifdatechosen[i] == 0){
                                        d3.select(this)
                                             .attr("stroke","#8f8f8f")
                                   }
                              })
                              .on("mouseout",function(d, i){
                                   if(ifdatechosen[i] == 0){
                                       d3.select(this)
                                             //.transition()
                                             //.duration(500)
                                             .attr("stroke","#d3d3d3")
                                   }
                              })
                              .on("click",function(d, i){
                                   ifdatechosen[i] = 1- ifdatechosen[i];
                                   if(ifdatechosen[i] == 1){
                                        d3.select(this)
                                             .attr("fill","white")
                                             .attr("stroke","#8f8f8f")
                                   }
                                   else{
                                        d3.select(this)
                                             .attr("fill","#f2f2f2")
                                             .attr("stroke","d3d3d3")
                                   }
                              }) 
               textsdate = svgdate.selectAll("text")
                              .data(dateset)
                              .enter()
                              .append("text")
                              .attr("x",function(d, i){
                                   var x = 15+ (i%7)*35;// + (1-Math.floor(i/10))*2;
                                   return x
                              })
                              .attr("y",function(d, i){
                                   var x = 20 + Math.floor(i/7)*25;
                                   return x
                              })
                              .style("font-size","14px") 
                              .style("font-weight","500")
                              .text(function(d){ return d })
                              .style("fill","#696969") 
                              .style("pointer-events","none")
               }

function week_board(){
               nweek=1
               ndate=0
               for(i=0;i<ifdatechosen.length;i++){ ifdatechosen[i] = 0}
               var weekset = ["Sun","Mon","Tues","Wes","Thur","Fri","Sat"]
               if(typeof(svgweek) != "undefined"){ svgweek.remove() }
               if(typeof(svgdate) != "undefined"){ svgdate.remove() }
               svgweek = bigcircle.append("svg")
                              .attr("position","absolute")
                              .attr("x",0)
                              .attr("y",0)
                              .attr("width",310)
                              .attr("height",280)
               rectsweek = svgweek.selectAll("rect")
                              .data(weekset)
                              .enter()
                              .append("rect")
                              .attr("class","rect") 
                              .attr("width",55)
                              .attr("height",40)
                              .attr("stroke-width",1)
                              .attr("stroke","#d3d3d3")
                              .attr("position","absolute")
                              .attr("x",function(d, i){
                                   var x = 8 + (i%4)*60;
                                   return x
                              })
                              .attr("y",function(d, i){
                                   var x = 5 + Math.floor(i/4)*45;
                                   return x
                              })
                              .attr("fill",function(d, i){
                                   if(ifweekchosen[i] == 1){ return "white" }
                                   else{ return "#f2f2f2" }
                              })
                              .attr("stroke",function(d, i){
                                   if(ifweekchosen[i] == 1){ return "#8f8f8f" }
                                   else{ return "#d3d3d3" }
                              })
                              .on("mouseover",function(d, i){
                                   if(ifweekchosen[i] == 0){
                                        d3.select(this)
                                             .attr("stroke","#8f8f8f")
                                   }
                              })
                              .on("mouseout",function(d, i){
                                   if(ifweekchosen[i] == 0){
                                       d3.select(this)
                                             .attr("stroke","#d3d3d3")
                                   }
                              })
                              .on("click",function(d, i){
                                   ifweekchosen[i] = 1- ifweekchosen[i];
                                   if(ifweekchosen[i] == 1){
                                        d3.select(this)
                                             .attr("fill","white")
                                             .attr("stroke","#8f8f8f")
                                   }
                                   else{
                                        d3.select(this)
                                             .attr("fill","#f2f2f2")
                                             .attr("stroke","d3d3d3")
                                   }
                              }) 
               textsweek = svgweek.selectAll("text")
                              .data(weekset)
                              .enter()
                              .append("text")
                              .attr("x",function(d, i){
                                   var x = 21+ (i%4)*60;
                                   return x
                              })
                              .attr("y",function(d, i){
                                   var x = 30 + Math.floor(i/4)*45;
                                   return x
                              })
                              .style("font-size","18px") 
                              .style("font-weight","bold")
                              .text(function(d){ return d })
                              .style("fill","#696969") 
                              .style("pointer-events","none")
               }

function time_board(){
               if(typeof(innercircledown) != "undeifned"){innercircledown.remove()}
               if(typeof(svgyear) != "undefined"){ svgyear.remove() }
               if(typeof(svgmonth) != "undefined"){ svgmonth.remove() }
               if(typeof(svgday) != "undefined"){ svgday.remove() }
               if(typeof(svgweek) != "undefined"){ svgweek.remove() }
               if(typeof(svgdate) != "undefined"){ svgdate.remove() }
               if(typeof(svgtime) != "undefined"){ svgtime.remove() }
               if(typeof(divtime) != "undefined"){ divtime.remove() }
               svgtime = bigcircle.append("svg")
                              .attr("position","absolute")
                              .attr("x",0)
                              .attr("y",0)
                              .attr("width",310)
                              .attr("height",350) 
               divtime = bigcircle.append("div")
                              .style("position","absolute")
                              .style("top","60px")
                              .style("left","0px")
                              .style("width","250px")
                              .style("height","180px")
                              //.style("border","1px solid #d3d3d3")
                              //.style("border-radius","2px")
               begintimehour = divtime.append("input")
                              .style("position","absolute")
                              .style("top","5px")
                              .style("left","30px")
                              .style("width","90px")
                              .style("height","20px")
                              .style("border","1px solid #d3d3d3")
                              .style("border-radius","2px")
                              .attr("value",beginhour)
                              .on("click",function(){
                                   if(beginhour == 0){
                                        d3.select(this).attr("value","")
                                   }
                              })
                              .on("change",function(){
                                   beginhour = d3.select(this).node().value;
                              })  
               begintimemin = divtime.append("input")
                              .style("position","absolute")
                              .style("top","5px")
                              .style("left","150px")
                              .style("width","90px")
                              .style("height","20px")
                              .style("border","1px solid #d3d3d3")
                              .style("border-radius","2px")
                              .attr("value",beginmin)
                              .on("click",function(){
                                   if(beginmin == 0){
                                        d3.select(this).attr("value","")
                                   }
                              })
                              .on("change",function(){
                                   beginmin = d3.select(this).node().value;
                              })
               endtimehour = divtime.append("input")
                              .style("position","absolute")
                              .style("top","75px")
                              .style("left","30px")
                              .style("width","90px")
                              .style("height","20px")
                              .style("border","1px solid #d3d3d3")
                              .style("border-radius","2px")
                              .attr("value",endhour)
                              .on("click",function(){
                                   if(endhour == 0){
                                        d3.select(this).attr("value","")
                                   }
                              })
                              .on("change",function(){
                                   endhour = d3.select(this).node().value;
                              })
               endtimehour = divtime.append("input")
                              .style("position","absolute")
                              .style("top","75px")
                              .style("left","150px")
                              .style("width","90px")
                              .style("height","20px")
                              .style("border","1px solid #d3d3d3")
                              .style("border-radius","2px")
                              .attr("value",endmin)
                              .on("click",function(){
                                   if(endmin == 0){
                                        d3.select(this).attr("value","")
                                   }
                              })
                              .on("change",function(){
                                   endmin = d3.select(this).node().value;
                              })
                
               textbegintime = svgtime.append("text")   
                                             .attr("x",10)
                                             .attr("y",50)
                                             .style("font-size","15px") 
                                             .style("font-weight","bold")
                                             .text("BeginTime")
                                             .style("color","#0099CC") 
               textbegintimehour = svgtime.append("text")   
                                             .attr("x",10)
                                             .attr("y",80)
                                             .style("font-size","15px") 
                                             //.text("h:"+ beginhour)
                                             .text("h:")
                                             .style("color","#0099CC")
               textbegintimemin = svgtime.append("text")   
                                             .attr("x",130)
                                             .attr("y",80)
                                             .style("font-size","15px") 
                                             //.text("m:"+ beginmin)
                                             .text("m:")
                                             .style("color","#0099CC")
               textendtime = svgtime.append("text")   
                                             .attr("x",10)
                                             .attr("y",120)
                                             .style("font-size","15px") 
                                             .style("font-weight","bold")
                                             .text("EndTime")
                                             .style("color","#0099CC") 
               textendtimehour = svgtime.append("text")   
                                             .attr("x",10)
                                             .attr("y",150)
                                             .style("font-size","15px") 
                                             //.text("h:"+ endhour)
                                             .text("h:")
                                             .style("color","#0099CC")
               textendtimemin = svgtime.append("text")   
                                             .attr("x",130)
                                             .attr("y",150)
                                             .style("font-size","15px") 
                                             //.text("m:"+ endmin)
                                             .text("m:")
                                             .style("color","#0099CC")
               }

function done_exe(id){
               console.log(id)
               d3.select("#"+id+"Timepicker").attr("value","")
               TPtext = d3.select("#"+id+"Timepicker").attr("value")
               //d3.select("#Timepicker").attr("value",TPtext+beginhour+":"+beginmin+"~"+endhour+":"+endmin+"; ")
               yearchosen = new Array()
               monthchosen = new Array()
               datechosen = new Array()
               weekchosen = new Array()
               if(beginhour <= 9){ beginhour = "0" + beginhour }
               if(beginmin <= 9){ beginmin = "0" + beginmin }
               if(endhour <= 9){ endhour = "0" + endhour }
               if(endmin <= 9){ endmin = "0" + endmin }
               for(i=0;i<ifyearchosen.length;i++){
                    if(ifyearchosen[i] == 1){yearchosen.push(i)}
               }
               if(yearchosen.length==0){ javascript:alert("Year is not chosen!")}
               for(i=0;i<ifmonthchosen.length;i++){
                    if(ifmonthchosen[i] == 1){monthchosen.push(i)}
               }
               if(yearchosen.length!=0 && monthchosen.length==0){ javascript:alert("Month is not chosen!")}
               if(ndate == 1){
                    for(i=0;i<ifdatechosen.length;i++){
                         if(ifdatechosen[i] == 1){datechosen.push(i)}
                    }
                    if(yearchosen.length!=0 && monthchosen.length!=0 && datechosen.length==0){ javascript:alert("Date is not chosen!")} 
                    for(i=0;i<yearchosen.length;i++){
                         for(j=0;j<monthchosen.length;j++){
                              for(k=0;k<datechosen.length;k++){
                                   TPtext = d3.select("#"+id+"Timepicker").attr("value")
                                   if(monthchosen[j]<9){
                                        if(datechosen[k]>9){
                                             d3.select("#"+id+"Timepicker").attr("value",TPtext+"2014"+"-0"+(monthchosen[j]+1)+"-"+(datechosen[k]+1)+" "+beginhour+":"+beginmin+"~"+endhour+":"+endmin+"; ")
                                        }
                                        else{
                                             d3.select("#"+id+"Timepicker").attr("value",TPtext+"2014"+"-0"+(monthchosen[j]+1)+"-0"+(datechosen[k]+1)+" "+beginhour+":"+beginmin+"~"+endhour+":"+endmin+"; ")
                                        }
                                   }
                                   else{
                                        if (datechosen[k]<9) {
                                             d3.select("#"+id+"Timepicker").attr("value",TPtext+"2014"+"-"+(monthchosen[j]+1)+"-0"+(datechosen[k]+1)+" "+beginhour+":"+beginmin+"~"+endhour+":"+endmin+"; ")
                                        }
                                        else{
                                             d3.select("#"+id+"Timepicker").attr("value",TPtext+"2014"+"-"+(monthchosen[j]+1)+"-"+(datechosen[k]+1)+" "+beginhour+":"+beginmin+"~"+endhour+":"+endmin+"; ")
                                        }
                                   }
                              }
                         }
                    }
               }
               if(nweek == 1){
                    for(i=0;i<ifweekchosen.length;i++){
                         if(ifweekchosen[i] == 1){weekchosen.push(i)}
                    }
                    if(weekchosen.length==0){ javascript:alert("Weekday is not chosen!")} 
                    for(i=0;i<yearchosen.length;i++){
                         for(j=0;j<monthchosen.length;j++){
                              for(k=0;k<weekchosen.length;k++){
                                   switch(weekchosen[k]){
                                        case 0:
                                             week = d3.time.sundays(new Date(2014,monthchosen[j],1), new Date(yearchosen[i],monthchosen[j]+1,0));
                                             break;
                                        case 1:
                                             week = d3.time.mondays(new Date(2014,monthchosen[j],1), new Date(yearchosen[i],monthchosen[j]+1,0));
                                             break;
                                        case 2:
                                             week = d3.time.tuesdays(new Date(2014,monthchosen[j],1), new Date(yearchosen[i],monthchosen[j]+1,0));
                                             break;
                                        case 3:
                                             week = d3.time.wednesdays(new Date(2014,monthchosen[j],1), new Date(yearchosen[i],monthchosen[j]+1,0));
                                             break;
                                        case 4:
                                             week = d3.time.thursdays(new Date(2014,monthchosen[j],1), new Date(yearchosen[i],monthchosen[j]+1,0));
                                             break;
                                        case 5:
                                             week = d3.time.fridays(new Date(2014,monthchosen[j],1), new Date(yearchosen[i],monthchosen[j]+1,0));
                                             break;
                                        case 6:
                                             week = d3.time.saturdays(new Date(2014,monthchosen[j],1), new Date(yearchosen[i],monthchosen[j]+1,0));
                                             break;
                                   }
                                   YMDtime = d3.time.format("%Y-%m-%d") 
                                   for(n=0;n<week.length;n++){
                                        TPtext = d3.select("#"+id+"Timepicker").attr("value")
                                        week[n]=YMDtime(week[n])
                                        d3.select("#"+id+"Timepicker").attr("value",TPtext+week[n]+" "+beginhour+":"+beginmin+"~"+endhour+":"+endmin+"; ")
                                   }
                              }
                         }
                    }
               }
               bigcircle.remove()
               }