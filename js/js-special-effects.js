/**
 * 获取随机#******颜色
 * @returns {string}
 */
function getRandomColor() {
    var c = '#';
    var cArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    for (var i = 0; i < 6; i++) {
        var cIndex = Math.round(Math.random() * 15);
        c += cArray[cIndex];
    }
    return c;
}

/**
 * 产生随机整数，包含下限值，包括上限值
 * @param {Number} lower 下限
 * @param {Number} upper 上限
 * @return {Number} 返回在下限到上限之间的一个随机整数
 */
function random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

/**
 * 获取随机rgb   0,0,0
 * @returns {string}
 */
function getRandomRGB() {
    // 随机生成 rgb 值，每个颜色值在 0 - 255 之间
    var r = random(0, 256),
        g = random(0, 256),
        b = random(0, 256);
    // 连接字符串的结果
    var result = r + "," + g + "," + b;
    // 返回结果
    return result;
}

var a_idx = 0;
/**
 * 鼠标点击提示特效
 */
jQuery(document).ready(function ($) {
    $("body").click(function (e) {
        var a = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善");
        var $i = $("<span />").text(a[a_idx]);

        a_idx = (a_idx + 1) % a.length;
        var x = e.pageX,
            y = e.pageY;
        $i.css({
            "z-index": 999999999999999999999999999999999999999999999999999999999999999999999,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "color": getRandomColor() //"#ff6651"
        });
        $("body").append($i);
        $i.animate({
                "top": y - 180,
                "opacity": 0
            },
            1500,
            function () {
                $i.remove();
            });
    });
});

/**
 * 线性鼠标动画
 */
// !function(){function n(n,e,t){return n.getAttribute(e)||t}function e(n){return document.getElementsByTagName(n)}function t(){var t=e("script"),o=t.length,i=t[o-1];return{l:o,z:n(i,"zIndex",-1),o:n(i,"opacity",1),c:n(i,"color",getRandomRGB()),n:n(i,"count",99)}}function o(){a=m.width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,c=m.height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}function i(){r.clearRect(0,0,a,c);var n,e,t,o,m,l;s.forEach(function(i,x){for(i.x+=i.xa,i.y+=i.ya,i.xa*=i.x>a||i.x<0?-1:1,i.ya*=i.y>c||i.y<0?-1:1,r.fillRect(i.x-.5,i.y-.5,1,1),e=x+1;e<u.length;e++)n=u[e],null!==n.x&&null!==n.y&&(o=i.x-n.x,m=i.y-n.y,l=o*o+m*m,l<n.max&&(n===y&&l>=n.max/2&&(i.x-=.03*o,i.y-=.03*m),t=(n.max-l)/n.max,r.beginPath(),r.lineWidth=t/2,r.strokeStyle="rgba("+d.c+","+(t+.2)+")",r.moveTo(i.x,i.y),r.lineTo(n.x,n.y),r.stroke()))}),x(i)}var a,c,u,m=document.createElement("canvas"),d=t(),l="c_n"+d.l,r=m.getContext("2d"),x=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(n){window.setTimeout(n,1e3/45)},w=Math.random,y={x:null,y:null,max:2e4};m.id=l,m.style.cssText="position:fixed;top:0;left:0;z-index:"+d.z+";opacity:"+d.o,e("body")[0].appendChild(m),o(),window.onresize=o,window.onmousemove=function(n){n=n||window.event,y.x=n.clientX,y.y=n.clientY},window.onmouseout=function(){y.x=null,y.y=null};for(var s=[],f=0;d.n>f;f++){var h=w()*a,g=w()*c,v=2*w()-1,p=2*w()-1;s.push({x:h,y:g,xa:v,ya:p,max:6e3})}u=s.concat([y]),setTimeout(function(){i()},100)}();

//  window.setInterval('$("#dateTime").text(TimeClockJS.dateFormat("full"))', 1000); //启动计时器，1秒执行一次



var TimeClockJS = (function () {
    /**
     * 日期时间的格式化方法
     * Datetime format method
     *
     * @param   {String}   [format=""]  日期时间的格式，类似PHP的格式
     * @returns {String}   datefmt      返回格式化后的日期时间字符串
     */
    var dateFormat = function (format) {
        format = format || "";

        var addZero = function (d) {
            return (d < 10) ? "0" + d : d;
        };

        var date = new Date();
        var year = date.getFullYear();
        var year2 = year.toString().slice(2, 4);
        var month = addZero(date.getMonth() + 1);
        var day = addZero(date.getDate());
        var weekDay = date.getDay();
        var hour = addZero(date.getHours());
        var min = addZero(date.getMinutes());
        var second = addZero(date.getSeconds());
        var ms = addZero(date.getMilliseconds());
        var datefmt = "";

        var ymd = year2 + "-" + month + "-" + day;
        var fymd = year + "-" + month + "-" + day;
        var hms = hour + ":" + min + ":" + second;

        switch (format) {
            case "UNIX Time" :
                datefmt = date.getTime();
                break;

            case "UTC" :
                datefmt = date.toUTCString();
                break;

            case "yy" :
                datefmt = year2;
                break;

            case "year" :
            case "yyyy" :
                datefmt = year;
                break;

            case "month" :
            case "mm" :
                datefmt = month;
                break;

            case "cn-week-day" :
            case "cn-wd" :
                var cnWeekDays = ["日", "一", "二", "三", "四", "五", "六"];
                datefmt = "星期" + cnWeekDays[weekDay];
                break;

            case "week-day" :
            case "wd" :
                var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                datefmt = weekDays[weekDay];
                break;

            case "day" :
            case "dd" :
                datefmt = day;
                break;

            case "hour" :
            case "hh" :
                datefmt = hour;
                break;

            case "min" :
            case "ii" :
                datefmt = min;
                break;

            case "second" :
            case "ss" :
                datefmt = second;
                break;

            case "ms" :
                datefmt = ms;
                break;

            case "yy-mm-dd" :
                datefmt = ymd;
                break;

            case "yyyy-mm-dd" :
                datefmt = fymd;
                break;

            case "yyyy-mm-dd h:i:s ms" :
            case "full + ms" :
                datefmt = fymd + " " + hms + " " + ms;
                break;

            case "full" :
                var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                datefmt = fymd + " " + hms + " " + weekDays[weekDay];
                break;
            case "cn-full":
                var cnWeekDays = ["日", "一", "二", "三", "四", "五", "六"];
                datefmt = "星期" + cnWeekDays[weekDay];
                datefmt = fymd + " " + hms + " " + datefmt;
                break;
            case "yyyy-mm-dd h:i:s" :
            default:
                datefmt = fymd + " " + hms;
                break;
        }

        return datefmt;
    };

    return {
        dateFormat: dateFormat
    };
})();

//  页面添加 <span id="htmer_time" style="color: red;"></span>
jQuery(document).ready(function ($) {
//<!-- 计算网站运行时间 -->
        function secondToDate(second) {
            if (!second) {
               return 0;
            }
       
        var time = new Array(0, 0, 0, 0, 0);
       
        if (second >= 365 * 24 * 3600) {
            time[0] = parseInt(second / (365 * 24 * 3600));
            second %= 365 * 24 * 3600;
        }  
       
        if (second >= 24 * 3600) {
            time[1] = parseInt(second / (24 * 3600));
            second %= 24 * 3600;
        }
       
        if (second >= 3600) {
            time[2] = parseInt(second / 3600);
            second %= 3600;
        }
       
        if (second >= 60) {
            time[3] = parseInt(second / 60);
            second %= 60;
        }
       
        if (second > 0) {
            time[4] = second;
        }
           return time;
       }
       
     //  <!-- 动态显示网站运行时间 -->
           function setTime() {
               var create_time = Math.round(new Date(Date.UTC(2018, 05, 05, 0, 0, 0)).getTime() / 1000);
               var timestamp = Math.round((new Date().getTime() + 8 * 60 * 60 * 1000) / 1000);
               currentTime = secondToDate((timestamp - create_time));
               currentTimeHtml = '本站已安全运行' + currentTime[0] + '年' + currentTime[1] + '天' + currentTime[2] + '时' + currentTime[3] + '分' + currentTime[4] + '秒';
               document.getElementById("htmer_time").innerHTML = currentTimeHtml;
           }
           setInterval(setTime, 1000);
    });




