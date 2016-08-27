/**
 * MIT License
 * @author kobepeng <http://yipeng.info>
 * @datetime 2016-1-16 10:24:42
 * based on Raphael.js
 */
;
// exports to global

module.exports = dashChart;

// charts Component
function dashChart(opts) {
    var self = this;
    this.defaultOpts = {
        domId: "dash_chart",
        defaultAngle: 0,
        label: '设备',
        value: '783331',
        unit: '个',
        total: '1000000',
        // svg size
        width: 280,
        height: 280,
        //data group
        dataArray: [{ startAngle: 0, endAngle: 90, color: '#15E9FF' },
            { startAngle: 90, endAngle: 240, color: '#15E9FF' },
            { startAngle: 240, endAngle: 290, color: '#15E9FF' },
            { startAngle: 290, endAngle: 360, color: '#15E9FF' }
        ],
        // data range
        range: { start: 0, end: 100 },
        // cicle style
        startAngle: 30,
        endAngle: 330,
    };
    this.opts = extend({}, [this.defaultOpts, opts]);
    this.init();
};

// init, bind event
dashChart.prototype.init = function () {
    var option = this.opts;
    var _self = this;
    // 属性转换
    option.range.start = 30 + (option.range.start / option.total * 300);
    option.range.end = 30 + (option.range.end / option.total * 300);

    // initial
    var r = Raphael(option.domId, option.width, option.height);

    // 灰圈
    r.circle(option.width / 2, option.height / 2 , option.height / 2 - 10).attr({
        "fill-opacity": 0,
        "stroke-width": 1,
        stroke: "#777"
    });

    // 内 灰色满圈
    r.circle(option.width / 2, option.height / 2 , option.height / 2 - 50).attr({
        "fill-opacity": 0,
        "stroke-width": 1,
        stroke: "#777"
    });

    _self.addCustomerAttribute(r, "#15E9FF");
    var radius = option.height / 2 - 50;
    // outer cicle
    r.path().attr({
        stroke: "#15E9FF",
        "stroke-width": 2
    }).attr({
        arc: [ option.value,  option.total, radius]
    }).attr({ transform: 'R0' });


    // the pointer
    var circleColor = '#15E9FF';
    option.value == '' ? 0 : option.value;
    var position = 360-option.value / option.total * 360;
    var y_position = option.height - 25;
    var dataArrLength = option.dataArray.length;
    // 小球指针颜色
    for (var i = 0; i < dataArrLength; i++) {
        var dataModel = option.dataArray[i];
        if (dataModel.startAngle < position && dataModel.endAngle > position) {
            circleColor = dataModel.color;
        }
    }
    var range = option.range;
    //if (position > range.start && position < range.end) {
    y_position = radius - 40;
   // }
    // 画小球指针圆边框
    r.circle(option.width / 2, y_position, 3).attr({
        fill: circleColor,
        "fill-opacity": 0,
        "stroke-width": 2,
        stroke: "#15E9FF",
        transform: "r" + position + " " + option.width / 2 + " " + option.height / 2
    });

    _self.drawText(r, circleColor);
}

// add customer attribute to Raphael
dashChart.prototype.addCustomerAttribute = function (r, color) {
    var option = this.opts;
    r.customAttributes.arc = function (value, total, R) {
        var alpha = 360 / total * value,
            a = (alpha-270) * Math.PI / 180,
            x = option.width / 2 + R * Math.cos(a),
            y = option.height / 2 - R * Math.sin(a),
            path;
        if (total == value) {
            // path = [
            //     ["M", option.width / 2, option.height / 2 - R],
            //     ["A", R, R, 0, 1, 1, option.width / 2, option.height / 2-R]
            // ];
        } else {
            // x轴半径 y轴半径 x轴旋转 大角还是小角 顺时针(1)/逆时针(0)旋转 终点x 终点y
            path = [
                ["M", option.width / 2, option.height / 2 - R],
                ["A", R, R, 0, +(alpha > 180), 0, x, y]
            ];
        }
        return { path: path, stroke: color };
    };
};

dashChart.prototype.drawText = function (r, circleColor) {
    var option = this.opts;
    r.text(option.width / 2, option.height/2 + 32, option.label).attr({
        font: "18px 微软雅黑, Arial",
        fill: "#387A84",
        "text-anchor": "middle"
    });
    r.text(option.width / 2 + 75, option.height/2, option.unit).attr({
        font: "12px 微软雅黑, Arial",
        fill: "#387A84",
        "text-anchor": "middle"
    });
    r.text(option.width / 2, option.height / 2, parseFloat(option.value).toFixed(0)).attr({
            font: "36px Fontin-Sans, Arial",
            fill: circleColor,
            "text-anchor": "middle"
        });
};


// js event register
function addEventListener(evt, fn) {
    window.addEventListener ? this.addEventListener(evt, fn, false) : (window.attachEvent) ? this.attachEvent('on' + evt, fn) : this['on' + evt] = fn;
}

// combine properties
function extend(des, src) {
    if (src instanceof Array) {
        for (var i = 0, len = src.length; i < len; i++)
            extend(des, src[i]);
    }
    for (var i in src) {
        des[i] = src[i];
    }
    return des;
}

