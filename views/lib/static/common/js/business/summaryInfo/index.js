/**
右侧信息面板
edit by pengyi since 2016-06-28
**/

;define(function (require, exports, module) {

    // 兼容jquery0.7,需要手动判断是否为IE
    $.browser = { msie: false };

    var preAlarmTime = null; //上一条报警的时间
    function SumaryInfo(options) {
        var me = this;
        this.options =
        {
            DataUrl: options.url,
            code: options.code,
        };
        //加载数据
        loadData(me);
        //间隔加载数据
        window.setInterval(function () {
            loadData(me);
        }, 10000);
        return this;
    }

    //加载数据
    function loadData(me) {
        $.ajax({
            type: 'POST',
            url: me.options.DataUrl,
            data: { code: me.options.code },
            success: function (data) {
                var data = JSON.parse(data);
                var SafeDay = JSON.parse(data.data.SafeDay);
                var AlarmInfo = JSON.parse(data.data.AlarmInfo);
                var ACount = JSON.parse(data.data.ACount);
                var SCount = JSON.parse(data.data.SCount);
                var MeterData = JSON.parse(data.data.MeterData);
                updateSafeDay(SafeDay);
                updateAlarmInfo(AlarmInfo, me);
                updateACount(ACount);
                updateSCount(SCount);
                updateMeterData(MeterData);
            }
        });
    }

    // 更新安全天数
    function updateSafeDay(SafeDay) {
        $("#S_SafeDay").text(SafeDay[0].SafeDay);
    }

    // 更新报警信息
    function updateAlarmInfo(AlarmInfo, me) {
        if (AlarmInfo.length != 0) {
            if (AlarmInfo[0].Time != preAlarmTime) {
                $("#AlarmPRList").empty().append('<span class="alarminfospan">'
                    + AlarmInfo[0].Time
                    + '&nbsp;&nbsp;&nbsp;&nbsp;'
                    + AlarmInfo[0].AlarmInfo
                    + '&nbsp;&nbsp;&nbsp;&nbsp;</span>');

                if (typeof (ManagementCode) != "undefined" && ManagementCode != null) {
                } else {
                    var isNotify = AlarmInfo[0].AlarmInfo.indexOf("提示") == -1 ? false : true;
                    if (isNotify) {
                        $("#notifyAudio")[0].play();
                    } else {
                        $("#alarmAudio")[0].play();
                    }
                    var dom = $('<a style="color:green;cursor:pointer;" href="javascript:void(0)" >确认</a>');
                    dom.on('click', function () {
                        $("#AlarmPRList").empty();

                    });
                    $("#AlarmPRList").append(dom);
                    $("#AlarmPRList").parent().height($("#AlarmPRList").height());
                }
                preAlarmTime = AlarmInfo[0].Time;
            }
        } else {
            $("#AlarmPRList").empty();
            $("#AlarmPRList").parent().height(20);
        }
    }


    // 更新四个数：告警、已接单、处理中、已完成
    function updateACount(ACount) {
        $("#A_AlarmCount").text(ACount[0].AlarmCount);
        $("#A_Confirm").text(ACount[0].Confirm);
        $("#A_Scene").text(ACount[0].Scene);
        $("#A_Completion").text(ACount[0].Completion);
    }

    //更新六个数：总数、维修、运行、停止、保养、巡检
    function updateSCount(SCount) {
        $("#S_Sum").text(SCount[0].Sum);
        $("#S_Run").text(SCount[0].Run);
        $("#S_Stop").text(SCount[0].Stop);
        $("#S_Repair").text(SCount[0].Repair);
        $("#S_Patrol").text(SCount[0].Patrol);
        $("#S_Maintain").text(SCount[0].Maintain);
    }

    //获取数据整数部分和小数部分
    var getIntOrDecimal = function (data, part) {
        if (part == "i")
            return parseInt(data);
        else if (part == "d") {
            var intPart = parseInt(data)
            return parseInt((data - intPart) * 10);
        }
    }

    // 设置圆盘仪表指针
    function setMeter(meterparams) {
        var svgdoc = document.getElementById(meterparams.EmbedId).getSVGDocument();
        var pointer = svgdoc.getElementById(meterparams.PointerId);
        pointer.style['-webkit-transform'] = 'rotate(' + meterparams.Degrees + 'deg)';
        pointer.setAttribute('transform-origin', meterparams.Angle);
    }

    // 更新三个仪表数据：电能消耗、设备完好率、人员空闲率
    function updateMeterData(MeterData) {
        var Energy = MeterData[0].Energy;
        var Perfect = MeterData[0].Perfect;
        var Free = MeterData[0].Free;
        var Pdegree = parseFloat(Perfect);
        // 旋转角度矫正
        if (Pdegree < 40) {
            Pdegree = Pdegree * 2.45;
        } else {
            if (Pdegree >= 40 && Pdegree < 60) {
                Pdegree = Pdegree * 2.3;
            } else {
                Pdegree = Pdegree * 2.2;
            }
        }

        var Fdegree = parseFloat(Free);
        // 旋转角度矫正
        if (Fdegree < 40) {
            Fdegree = -34.7 + Fdegree * 2.42;
        } else {
            if (Fdegree >= 40 && Fdegree < 60) {
                Fdegree = -34.7 + Fdegree * 2.1;
            } else {
                Fdegree = -34.7 + Fdegree * 2.05;
            }
        }
        Pdegree = parseInt(10 * Pdegree) / 10;
        Fdegree = parseInt(10 * Fdegree) / 10;
        /*--能耗--*/
        $("#MI_Energy").text(getIntOrDecimal(Energy, 'i'));
        /*--完好率--*/
        $("#MI_Perfect").text(getIntOrDecimal(Perfect, 'i'));
        $("#MD_Perfect").text('.' + getIntOrDecimal(Perfect, 'd') + '%');
        setMeter({ EmbedId: 'deviceGoodRate', PointerId: 'polygon55', Degrees: Pdegree, Angle: '0% 90%' });
        /*--空闲率--*/
        $("#MI_Free").text(getIntOrDecimal(Free, 'i'));
        $("#MD_Free").text('.' + getIntOrDecimal(Free, 'd') + '%');
        setMeter({ EmbedId: 'userFreeRate', PointerId: 'polygon3050', Degrees: Fdegree, Angle: '95% 95%' });
    }

    module.exports = SumaryInfo;
});