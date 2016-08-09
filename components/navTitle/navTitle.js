'use strict';

module.exports = {
    render: function (dom) {
        var tpl = __inline('navTitle.handlebars');

        var data = {
            logo: __uri('./img/project_logo1.png'),
            title: '海亿达',
            systemName: "机电设施运营平台",
            headImg:__uri('./img/user1.png'),
            changeThem:__uri('./img/topic.png')
        };
        dom.innerHTML = tpl(data);
    }
};