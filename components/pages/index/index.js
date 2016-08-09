'use strict';

module.exports = {
    getHTML: function () {
        var tpl = __inline('index.handlebars');
        return tpl({});
    }
};