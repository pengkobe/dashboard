
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day 
        "h+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds() //millisecond 
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}


$.fn.extend({

    datepickerbase: function () {
        $(this).datepicker({
            dateFormat: 'yy-MM-dd',
            minDate: '-1y',
            maxDate: '+2y',
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            monthNamesShort: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],   //月份名称简称，用于选择月份时显示
            dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],   //日期名称简称
            changeMonth: true,       //可以选择月份
            changeYear: true,       //可以选择年份
            firstDay: 1,          //0为已周日作为一周开始，1为周一作为一周开始，默认是0
            isRTL: false,       //是否从右到左排列
            onSelect: function (dataText, obj) {
                var selectedYear = obj.selectedYear;
                var selectedMonth = obj.selectedMonth;
                var selectedDay = obj.selectedDay;
                var str = selectedYear + '-' + (selectedMonth + 1) + '-' + selectedDay;
                $(this).val(str);
            }
        }).datepicker('widget').wrap('<div class="ll-skin-siena"/>');
        //默认时间为今日
        var a = new Date().format("yyyy-MM-dd");
        $(this).val(a);
    }
});