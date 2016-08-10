'use strict';

module.exports = {
    render: function (dom) {
        var tpl = __inline('index.handlebars');
        var data = {
            leftimg: __uri('./img/Left.png'),
            rightimg: __uri('./img/Right.png'),
        }
        dom.innerHTML = tpl(data);

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

