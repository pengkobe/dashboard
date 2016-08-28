'use strict';

var dashchart = require("./modules/dashchart.js");

module.exports = {
    render: function (dom) {

        var datablock = [
            { name: "项目", value: 100, unit: '个', data1: { name: "正常", value: 100, unit: '个' },
            data2: { name: "故障", value: 100, unit: '个' } },
            { name: "建筑面积", value: 100, unit: '公顷', data1: { name: "空调面积", value: 100, unit: '公顷' } },
            { name: "运维人员", value: 100, unit: '人', data1: { name: "工作", value: 100, unit: '人' },
            data2: { name: "空闲", value: 100, unit: '人' } },
            { name: "告警", value: 100, unit: '个', data1: { name: "已处理", value: 100, unit: '个' },
            data2: { name: "未处理", value: 100, unit: '个' } },
            { name: "用户数", value: 100, unit: '人', data1: { name: "在线", value: 100, unit: '人' },
            data2: { name: "不在线", value: 100, unit: '人' } },
            { name: "流量", value: 100, unit: 'MB', data1: { name: "上传", value: 100, unit: 'MB' },
            data2: { name: "下载", value: 100, unit: 'MB' } },
            { name: "负荷", value: 100, unit: '%', data1: { name: "负荷率", value: 100, unit: '%' },
            data2: { name: "设备完好率", value: 100, unit: '%' } },
        ];

        var industryblock =[
            {src:__uri('./img/industry/zhuzhai.png'), name:'住宅'},
            {src:__uri('./img/industry/chuyun.png'), name:'储运'},
            {src:__uri('./img/industry/yiyuan.png'), name:'医院'},
            {src:__uri('./img/industry/shangxie.png'), name:'商写'},
            {src:__uri('./img/industry/gongye.png'), name:'工业'},
            {src:__uri('./img/industry/zhenfudalou.png'), name:'政府大楼'},
            {src:__uri('./img/industry/jichang.png'), name:'机场'},
            {src:__uri('./img/industry/chuanbo.png'), name:'船舶'},
            {src:__uri('./img/industry/guidaojiaotong.png'), name:'轨道运输'},
            {src:__uri('./img/industry/jiudian.png'), name:'酒店'},
        ];

        var devicetypeblock =[
            {src:__uri('./img/devicetype/gongpeidian.png'), name:'供配电'},
            {src:__uri('./img/devicetype/tingchechang.png'), name:'停车场'},
            {src:__uri('./img/devicetype/futi.png'), name:'扶梯'},
            {src:__uri('./img/devicetype/xiaofang.png'), name:'消防'},
            {src:__uri('./img/devicetype/zhaoming.png'), name:'照明'},
            {src:__uri('./img/devicetype/zhiti.png'), name:'直梯'},
            {src:__uri('./img/devicetype/kongtiao.png'), name:'空调'},
            {src:__uri('./img/devicetype/jipaishui.png'), name:'给排水'},
            {src:__uri('./img/devicetype/shipinanfang.png'), name:'视频安防'},
            {src:__uri('./img/devicetype/tongpaifeng.png'), name:'通排风'},
            {src:__uri('./img/devicetype/menjin.png'), name:'门禁'},
        ];


        var tpl = __inline('datacenter.handlebars');
        var data = {
            datablock:datablock,
            industryblock:industryblock,
            devicetypeblock:devicetypeblock,
            earth: __uri('./img/earth.png'),
            // 行业
            住宅: __uri('./img/industry/zhuzhai.png'),
            //设备类型
            供配电: __uri('./img/devicetype/gongpeidian.png'),
        }
        dom.innerHTML = tpl(data);
        var left = new dashchart({ domId: "left_dash",label:"设备", value:12000,total:17986,unit:"个"});
        var right = new dashchart({ domId: "right_dash",label:"负荷", value:121012,total:578761,unit:"kw" });
        //  $(".index-circle1").css("transform-origin","0 0").css();
    }
};

