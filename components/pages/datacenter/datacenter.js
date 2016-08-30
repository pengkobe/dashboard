'use strict';

var dashchart = require("./modules/dashchart.js");

module.exports = {
    render: function (dom) {
        $.ajax({
            url: 'http://120.24.54.92:8082/Action.ashx?Name=HYD.E3.Business.GroupSumaryInfoBLL.GetDataCenterDisplay',
            data: {},
            type: 'POST',
            dataType: "json",
            success: function (data) {
                var params = JSON.parse(data.data.Data)[0];
                loaddata(params);
            }
        });
        setInterval(function () {
            $.ajax({
                url: 'http://120.24.54.92:8082/Action.ashx?Name=HYD.E3.Business.GroupSumaryInfoBLL.GetDataCenterDisplay',
                data: {},
                type: 'POST',
                dataType: "json",
                success: function (data) {
                    var params = JSON.parse(data.data.Data)[0];
                    loaddata(params);
                }
            });
        }, 10000)

        function loaddata(params) {
            // 分项数据总览
            var datablock = [
                {
                    name: "项目", value: params.project_total, unit: '个',
                    data1: { name: "正常", value: params.project_normal, unit: '个' },
                    data2: { name: "故障", value: params.project_alarm, unit: '个',red:true }
                },
                {
                    name: "建筑面积", value: params.building_area, unit: '万m²',
                    data1: { name: "空调面积", value: params.airC_area, unit: '万m²' }
                },
                {
                    name: "运维人员", value: params.op_staff, unit: '人', data1: { name: "工作", value: params.op_staff_work, unit: '人' },
                    data2: { name: "空闲", value: params.op_staff_free, unit: '人' }
                },
                {
                    name: "告警", value: params.alarmnum, unit: '个',
                    data1: { name: "已处理", value: params.alarm_handled, unit: '个' },
                    data2: { name: "未处理", value: params.alarm_not_handled, unit: '个' }
                },
                {
                    name: "用户数", value: params.usernum, unit: '人', data1: { name: "在线", value: params.usernum_online, unit: '人' },
                    data2: { name: "不在线", value: params.usernum_offline, unit: '人' }
                },
                {
                    name: "流量", value: params.network_flow, unit: 'GB', data1: { name: "上传", value: params.network_upload, unit: 'GB' },
                    data2: { name: "下载", value: params.network_download, unit: 'GB' }
                },
                // {
                //     name: "负荷", value: 100, unit: 'KW', data1: { name: "负荷率", value: 100, unit: '%' },
                //     data2: { name: "设备完好率", value: 100, unit: '%' }
                // },
            ];


            var c_subdata = {
                device_running: params.device_running,
                device_stop: params.device_stop,
                device_broken: params.device_broken,
                energy:parseFloat(params.energy).toFixed(1),
                unit_engergy: params.unit_engergy,
                airC_engergy: params.airC_engergy
            };

            // 行业应用
            var industryblock = [
                { src: __uri('./img/industry/zhuzhai.png'), name: '住宅' },
                { src: __uri('./img/industry/chuyun.png'), name: '储运' },
                { src: __uri('./img/industry/yiyuan.png'), name: '医院' },
                { src: __uri('./img/industry/shangxie.png'), name: '商写' },
                { src: __uri('./img/industry/gongye.png'), name: '工业' },
                { src: __uri('./img/industry/zhenfudalou.png'), name: '政府大楼' },
                { src: __uri('./img/industry/jichang.png'), name: '机场' },
                { src: __uri('./img/industry/chuanbo.png'), name: '船舶' },
                { src: __uri('./img/industry/guidaojiaotong.png'), name: '轨道运输' },
                { src: __uri('./img/industry/jiudian.png'), name: '酒店' },
                  { src: __uri('./img/industry/other.png'), name: '其它' },
            ];

            // 设备类型应用
            var devicetypeblock = [
                { src: __uri('./img/devicetype/gongpeidian.png'), name: '供配电' },
                { src: __uri('./img/devicetype/tingchechang.png'), name: '停车场' },
                { src: __uri('./img/devicetype/futi.png'), name: '扶梯' },
                { src: __uri('./img/devicetype/xiaofang.png'), name: '消防' },
                { src: __uri('./img/devicetype/zhaoming.png'), name: '照明' },
                { src: __uri('./img/devicetype/zhiti.png'), name: '直梯' },
                { src: __uri('./img/devicetype/kongtiao.png'), name: '空调' },
                { src: __uri('./img/devicetype/jipaishui.png'), name: '给排水' },
                { src: __uri('./img/devicetype/shipinanfang.png'), name: '视频安防' },
                { src: __uri('./img/devicetype/tongpaifeng.png'), name: '通排风' },
                { src: __uri('./img/devicetype/menjin.png'), name: '门禁' },
                  { src: __uri('./img/industry/other.png'), name: '其它' },
            ];

            var tpl = __inline('datacenter.handlebars');
            var data = {
                c_subdata: c_subdata,
                datablock: datablock,
                industryblock: industryblock,
                devicetypeblock: devicetypeblock,
                earth: __uri('./img/earth.png'),
            }
            dom.innerHTML = tpl(data);

            // 大圈数据显示
            var dtotal = params.devicenum * params.device_good_rate / 100;
            var subcolor = false;
            if (params.device_good_rate < 98) {
                subcolor = true;
            }
            // 完好率低于98%；
            // 故障树标红
            // 负载率大于80%标红
            var left = new dashchart({
                domId: "left_dash",
                subred: subcolor,
                label: "设备总数", value: dtotal, total: params.devicenum, unit: "个",
                sublabel: "完好率", subvalue: params.device_good_rate, subunit: "%"
            });
            var ttotal = params.device_load * params.device_load_rate / 100;
            if (params.device_load_rate > 80) {
                subcolor = true;
            } else {
                subcolor = false;
            }
            var right = new dashchart({
                domId: "right_dash",
                subred: subcolor,
                label: "当前负荷", value: ttotal, total: params.device_load, unit: "kw",
                sublabel: "负载率", subvalue: params.device_load_rate, subunit: "%"
            });
        }
    }
};


