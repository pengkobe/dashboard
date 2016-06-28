'use strict';

module.exports = {
    render: function (dom) {
        var tpl = __inline('navTitle.handlebars');

        var data = {
            logo: __uri('project_logo1.png'),
            title: '海亿达',
            systemName: "机电设施运营平台",
            userName: "super"
        };

        dom.innerHTML = tpl(data);
    }
};