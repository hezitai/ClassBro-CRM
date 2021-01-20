$(document).ready(function () {
    $("#back").click(function () {
        window.history.go(-1);
    })
    moment.locale("en");
    var now = moment();
    var events
    function events() {
        getUrlStr =  function(name) {
    　　var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    　　var r = window.location.search.substr(1).match(reg);
    　　if(r != null) return unescape(r[2]);
    　　return null;
    };
    var id = getUrlStr ("id"); 
        var startTime = "2018-01-01 00:00:00";
        var endTime = "2019-12-31 23:59:59";
        $.ajax({
            url: ""+baseURL+"/sys/oper/queryClassTableByTeacherId",
            dataType: "json",
            type: "get",
            async: false,
            data: {
                startTime: startTime,
                endTime: endTime,
                token: token,
                teacherId:id,
            },
            success: function (json) {
                events = json.body;
            }
        });
    }
    events()

    /**
     * Init the calendar
     */
    var calendar = $("#calendar")
        .Calendar({
            locale: "en",
            weekday: {
                timeline: {
                    intervalMinutes: 30,
                    fromHour: 9
                }
            },
            events: events
        })
        .init();
        // events.forEach(element => {
        // $(".calendar-events-day ul li").each(function(){
        // 		$(this).css("background",element.userColor);
        // 		$(this).attr("data-color",element.userColor);
        // 	});
        // })

    /**
     * Listening for events
     */

    // $("#calendar").on("Calendar.init", function (
    // 	event,
    // 	instance,
    // 	before,
    // 	current,
    // 	after
    // ) {
    // 	console.log("event : Calendar.init");
    // 	console.log(instance);
    // 	console.log(before);
    // 	console.log(current);
    // 	console.log(after);
    // });
    // $("#calendar").on("Calendar.daynote-mouseenter", function (
    // 	event,
    // 	instance,
    // 	elem
    // ) {
    // 	console.log("event : Calendar.daynote-mouseenter");
    // 	console.log(instance);
    // 	console.log(elem);
    // });
    // $("#calendar").on("Calendar.daynote-mouseleave", function (
    // 	event,
    // 	instance,
    // 	elem
    // ) {
    // 	console.log("event : Calendar.daynote-mouseleave");
    // 	console.log(instance);
    // 	console.log(elem);
    // });
    // $("#calendar").on("Calendar.event-mouseenter", function (
    // 	event,
    // 	instance,
    // 	elem
    // ) {
    // 	console.log("event : Calendar.event-mouseenter");
    // 	console.log(instance);
    // 	console.log(elem);
    // });
    // $("#calendar").on("Calendar.event-mouseleave", function (
    // 	event,
    // 	instance,
    // 	elem
    // ) {
    // 	console.log("event : Calendar.event-mouseleave");
    // 	console.log(instance);
    // 	console.log(elem);
    // });
    $("#calendar").on("Calendar.daynote-click", function (
        event,
        instance,
        elem,
        evt
    ) {
        console.log("event : Calendar.daynote-click");
        console.log(instance);
        console.log(elem);
        console.log(evt);
    });
    $("#calendar").on("Calendar.event-click", function (
        event,
        instance,
        elem,
        evt
    ) {
        console.log("event : Calendar.event-click");
        console.log(instance);
        console.log(elem);
        console.log(evt);
    });
});