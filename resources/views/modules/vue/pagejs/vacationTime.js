$(document).ready(function() {

    $("#id_almanac").almanac({
      /**
       * 画日历之后调用函数
       */
      afterDrawCld: function(year, month){
        var mon = month+1;
        var mounth = year+"-0"+mon;
        localStorage.setItem('mouth', mounth);
        $(".dates-bd li").each(function(){
          if($(this).attr("data-month") == mon){
            var solor = $(this).attr("data-solor");
            var month = $(this).attr("data-month");
            var year = $(this).attr("data-year");
            if(solor == undefined){
              return
            }
            if(solor.length == 1){
              solor = 0+solor
            }
            if(month.length == 1){
              month = 0+month
            }
            $(this).attr("date",year+"-"+month+"-"+solor+" "+"00:00:00");
          }else{
          }
        });
        getTime();
        function getTime(){
          $.ajax({  
            type : "get",  
            dataType: "json", 
            data:{
              "token": token,
              "mounth": mounth,
            } ,
            url : ""+baseURL+"sys/basedata/calendar/list",  
            success : function(json) {  
              if(json.status == 200){
                $(".dates-bd li").each(function(){
                  $(this).attr("date-ids","")
                  var time = $(this).attr("date");
                  json.body.forEach(v=>{
                    if(v.calDate == time){
                      console.log(v.calDate+time)
                      $(this).attr("date-ids",v.id)
                      if(v.type == 1){
                        $(this).addClass("blue");
                      }
                      if(v.type == 2){
                        $(this).addClass("red");
                      }
                      if(v.type == 3){
                        $(this).addClass("red");
                      }
                    }
                  })
                })
              }
           }  
        }); 
        }
      },
      /**
       * 双击某一天的事件
       */
      dbClickDay: function(elem){
        var times = [];
        var obj = {};
        var _this = $(elem);
        var time = _this.attr("date");
        var month = _this.attr("data-year") +"-"+ _this.attr("data-month");
        obj.calDate = time;
        obj.type = 1;
        obj.id = Number(_this.attr("date-ids"));
        // times.push(obj);
        console.log(obj);
        // console.log('阳历：' + _this.attr('data-year') + '年' + _this.attr('data-month') + '月' + _this.attr('data-solor'));
      $.ajax({  
              type : "post",  
              contentType: "application/json", 
              headers: {"token": token},
              data:JSON.stringify(obj),
              url : ""+baseURL+"sys/basedata/calendar/update",  
              success : function(json) {  
              if(json.status == 200){
              alert(json.body.msg)
              $.ajax({  
                    type : "get",  
                    dataType: "json", 
                    data:{
                      "token": token,
                      "mounth": month,
                    } ,
                    url : ""+baseURL+"sys/basedata/calendar/list",  
                    success : function(json) {  
                      if(json.status == 200){
                        $(".dates-bd li").each(function(){
                          var time = $(this).attr("date");
                          json.body.forEach(v=>{
                            if(v.calDate == time){
                              $(this).attr("date-ids",v.id)
                              if(v.type == 1){
                                $(this).removeClass("red");
                                $(this).addClass("blue");
                                $(this).removeClass("green");
                              }
                              if(v.type == 2){
                                $(this).removeClass("blue");
                                $(this).addClass("red");
                                $(this).removeClass("green");
                              }
                              if(v.type == 3){
                                $(this).removeClass("blue");
                                $(this).addClass("red");
                                $(this).removeClass("green");
                              }
                            }
                          })
                        })
                      }
                  }  
                });
              }
              if(json.status == 400){
              alert(json.body.msg)
              location.reload() 
              }
            }
        });
      },
      /**
       * 单击某一天的事件
       */
      
      clickDay: function(elem){
        var _this = $(elem);
        if(_this.attr('data-year') == undefined){
          return
        }else{
          _this.toggleClass("green");
        }
        console.log(_this.attr('data-year'))
         console.log('阳历：' + _this.attr('data-year') + '年' + _this.attr('data-month') + '月' + _this.attr('data-solor'));
      }
    });
  
    $("#time1").click(function(){
      var timelist = [];
      $(".dates-bd li").each(function(){
        if($(this).hasClass("green")){
          var obj = {};
          obj.calDate = $(this).attr("date");
          obj.id = Number($(this).attr("date-ids"));
          obj.type = 1;
          timelist.push(obj);
              }
      })  
      $.ajax({  
              type : "post",  
              contentType: "application/json", 
              headers: {"token": token},
              data:JSON.stringify(timelist),
              url : ""+baseURL+"sys/basedata/calendar/save",  
              success : function(json) {  
              if(json.status == 200){
                var month = localStorage.getItem("mouth");
              alert(json.body.msg)
              $.ajax({  
            type : "get",  
            dataType: "json", 
            data:{
              "token": token,
              "mounth": month,
            } ,
            url : ""+baseURL+"sys/basedata/calendar/list",  
            success : function(json) {  
              if(json.status == 200){
                $(".dates-bd li").each(function(){
                  var time = $(this).attr("date");
                  json.body.forEach(v=>{
                    if(v.calDate == time){
                      $(this).attr("date-ids",v.id)
                      if(v.type == 1){
                        $(this).removeClass("red");
                        $(this).addClass("blue");
                        $(this).removeClass("green");
                      }
                      if(v.type == 2){
                        $(this).removeClass("blue");
                        $(this).addClass("red");
                        $(this).removeClass("green");
                      }
                      if(v.type == 3){
                        $(this).removeClass("blue");
                        $(this).addClass("red");
                        $(this).removeClass("green");
                      }
                    }
                  })
                })
              }
           }  
        }); 
              }
              if(json.status == 400){
              alert(json.body.msg)
              }
            }
        });
    })
    $("#time3").click(function(){
      var timelist = [];
      $(".dates-bd li").each(function(){
        if($(this).hasClass("green")){
          var obj = {};
          obj.calDate = $(this).attr("date");
          obj.id = Number($(this).attr("date-ids"));
          obj.type = 2;
          timelist.push(obj);
              }
      })  
      $.ajax({  
              type : "post",  
              contentType: "application/json", 
              headers: {"token": token},
              data:JSON.stringify({'sysCalendarList':timelist}),
              url : ""+baseURL+"sys/basedata/calendar/updateBatch",  
              success : function(json) {  
              if(json.status == 200){
                var month = localStorage.getItem("mouth");
              alert(json.body.msg)
              $.ajax({  
            type : "get",  
            dataType: "json", 
            data:{
              "token": token,
              "mounth": month,
            } ,
            url : ""+baseURL+"sys/basedata/calendar/list",  
            success : function(json) {  
              if(json.status == 200){
                $(".dates-bd li").each(function(){
                  var time = $(this).attr("date");
                  json.body.forEach(v=>{
                    if(v.calDate == time){
                      $(this).attr("date-ids",v.id)
                      if(v.type == 1){
                        $(this).addClass("red");
                      }
                      if(v.type == 2){
                        $(this).addClass("blue");
                      }
                      if(v.type == 3){
                        $(this).addClass("white");
                      }
                    }
                  })
                })
              }
           }  
        }); 
              }
              if(json.status == 400){
              alert(json.body.msg)
              }
            }
        });
    })
  
    $("#time2").click(function(){
      var timelists = [];
      $(".dates-bd li").each(function(){
        if($(this).hasClass("green")){
          var obj = {};
          obj.calDate = $(this).attr("date");
          obj.id = Number($(this).attr("date-ids"));
          obj.type = 2;
          timelists.push(obj);
              }
      })  
      $.ajax({  
              type : "post",  
              contentType: "application/json", 
              headers: {"token": token},
              data:JSON.stringify(timelists),
              url : ""+baseURL+"sys/basedata/calendar/save",  
              success : function(json) {  
              if(json.status == 200){
                var month = localStorage.getItem("mouth");
              alert(json.body.msg)
              $.ajax({  
            type : "get",  
            dataType: "json", 
            data:{
              "token": token,
              "mounth": month,
            } ,
            url : ""+baseURL+"sys/basedata/calendar/list",  
            success : function(json) {  
              if(json.status == 200){
                $(".dates-bd li").each(function(){
                  var time = $(this).attr("date");
                  json.body.forEach(v=>{
                    if(v.calDate == time){
                      $(this).attr("date-ids",v.id)
                      if(v.type == 1){
                        $(this).removeClass("red");
                        $(this).addClass("blue");
                        $(this).removeClass("green");
                      }
                      if(v.type == 2){
                        $(this).removeClass("blue");
                        $(this).addClass("red");
                        $(this).removeClass("green");
                      }
                      if(v.type == 3){
                        $(this).removeClass("blue");
                        $(this).addClass("red");
                        $(this).removeClass("green");
                      }
                    }
                  })
                })
              }
           }  
        }); 
              }
              if(json.status == 400){
              alert(json.body.msg)
              }
            }
        });
    })
  
    $("#time4").click(function(){
      var timelist = [];
      $(".dates-bd li").each(function(){
        if($(this).hasClass("green")){
          var obj = {};
          obj.calDate = $(this).attr("date");
          obj.id = Number($(this).attr("date-ids"));
          obj.type = 1;
          timelist.push(obj);
              }
      })  
      $.ajax({  
              type : "post",  
              contentType: "application/json", 
              headers: {"token": token},
              data:JSON.stringify({'sysCalendarList':timelist}),
              url : ""+baseURL+"sys/basedata/calendar/updateBatch",  
              success : function(json) {  
              if(json.status == 200){
                var month = localStorage.getItem("mouth");
              alert(json.body.msg)
              $.ajax({  
            type : "get",  
            dataType: "json", 
            data:{
              "token": token,
              "mounth": month,
            } ,
            url : ""+baseURL+"sys/basedata/calendar/list",  
            success : function(json) {  
              if(json.status == 200){
                $(".dates-bd li").each(function(){
                  var time = $(this).attr("date");
                  json.body.forEach(v=>{
                    if(v.calDate == time){
                      $(this).attr("date-ids",v.id)
                      if(v.type == 1){
                        $(this).addClass("red");
                      }
                      if(v.type == 2){
                        $(this).addClass("blue");
                      }
                      if(v.type == 3){
                        $(this).addClass("white");
                      }
                    }
                  })
                })
              }
           }  
        }); 
              }
              if(json.status == 400){
              alert(json.body.msg)
              }
            }
        });
    })
  });