'use strict';

var dashchart = require("./modules/dashchart.js");

module.exports = {
    render: function (dom) {

        var datablock = [
            { name: "项目", value: 1, unit: '个', data1: { name: "正常", value: 1, unit: '个' }, data2: { name: "故障", value: 1, unit: '个' } },
            { name: "建筑面积", value: 1, unit: '公顷', data1: { name: "空调面积", value: 1, unit: '公顷' } },
            { name: "用户数", value: 1, unit: '人', data1: { name: "在线", value: 1, unit: '人' }, data2: { name: "不在线", value: 1, unit: '人' } },
            { name: "项目", value: 1, unit: '个', data1: { name: "正常", value: 1, unit: '个' }, data2: { name: "故障", value: 1, unit: '个' } },
            { name: "运维人员", value: 1, unit: '人', data1: { name: "正常", value: 1, unit: '人' }, data2: { name: "故障", value: 1, unit: '人' } },
            { name: "流量", value: 1, unit: 'MB', data1: { name: "正常", value: 1, unit: 'MB' }, data2: { name: "故障", value: 1, unit: 'MB' } },
            { name: "负荷", value: 1, unit: '%', data1: { name: "正常", value: 1, unit: '%' }, data2: { name: "故障", value: 1, unit: '%' } },
        ];


        var tpl = __inline('datacenter.handlebars');
        var data = {
            datablock:datablock,

            earth: __uri('./img/earth.png'),

            // 行业
            住宅: __uri('./img/industry/zhuzhai.png'),

            //设备类型
            供配电: __uri('./img/devicetype/gongpeidian.png'),
        }

        dom.innerHTML = tpl(data);
        var left = new dashchart({ domId: "left_dash" });
        var right = new dashchart({ domId: "right_dash" });
        //  $(".index-circle1").css("transform-origin","0 0").css();
    }
};

