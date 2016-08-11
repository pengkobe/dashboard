'use strict';


module.exports = {
    render: function (dom) {
        var tpl = __inline('index.handlebars');
        var data = {
            leftimg: __uri('./img/Left.png'),
            rightimg: __uri('./img/Right.png'),
            switch: __uri('./img/switch.png'),
            switch0: __uri('./img/switch0.png'),
            switch1: __uri('./img/switch1.png'),
            switch2: __uri('./img/switch2.png'),
        }
        dom.innerHTML = tpl(data);

        // Tab页切换
        var currentTab = null;
        $(".timespan-tab-cycle-block").on('click', function (e) {
            var that = $(this);
            that.addClass("active");
            that.siblings().removeClass("active");
        });

        // 图标菜单点击事件
        $(".sumary-title-menu").on('click', function (e) {

        });

        setTimeout(function () {
            // 修正高度不固定引起的布局混乱
            var height1 = $("#container1").height();
            var height2 = $("#container2").height();
            var height3 = $("#container3").height();

            var bar1 = require("./bar1.js");
            bar1(height1);
            var bar2 = require("./bar2.js");
            bar2(height2);
            var pie = require("./pie.js");
            pie(height3);
        }, 20);
    }
};

