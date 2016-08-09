; define(function (require, exports, module) {

    require("accordionMenu");

    // 生成单个图
    function GenerateSingleChart(data, baseUrl, moduleName) {
        var datalen = data.length;
        var htmlStr = '';
        for (var i = 0; i < datalen; i++) {
            var d = data[i];
            if (d.level == 1) {
                htmlStr += '<ul><li url="' + d.url + '">' + d.itemName;
                htmlStr += getItemRecursively(data, d.itemCode);
                htmlStr += '</li></ul>';
            }
        }

        $('#' + moduleName + ' > .menu').empty();
        $('#' + moduleName + ' > .menu').append(htmlStr);

        $('#' + moduleName + ' > .menu').AccordionMenu({
            addable: false,
            editable: false,
            deletable: false,
            selectFunc: function (url) {
                if(url==undefined || url=="" || url=="null" ){
                    return;
                }

                var filename = url;
                url = baseUrl + url;
              
                if (url == "") { return; }
                // 页头
                $('#' + moduleName + '  .page-name').text(name);
                // 1
                url = url + ".html?d=" + new Date();

                var $content = $('#' + moduleName + '  .page-content');
                $content.html("正在加载...");

                $.ajax({
                    type: "get",
                    url: url,
                    beforeSend: function (XMLHttpRequest) { },
                    success: function (data, textStatus) {
                        $content.html(data);
                        seajs.use(filename, function (fun) {
                            fun();
                        });
                    },
                    complete: function (XMLHttpRequest, textStatus) { },
                    error: function () { $content.html("请求出错!"); }
                });
            }
        });
    }

    function getItemRecursively(data, itemCode) {
        var retStr = '';
        var aa = "";
        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            if (d.pCode == itemCode) {
                aa = '<ul>';
                retStr += '<li url="' + d.url+ '">' + d.itemName;
                retStr += getItemRecursively(data, d.itemCode);
                retStr += '</li>';
            }
        }
        if (aa != '') {
            retStr = aa + retStr;
            retStr = retStr + '</ul>'
        }
        return retStr;
    }

    function loadData(baseUrl, moduleName,id) {
        $.ajax({
            type: 'post',
            dataType: "json",
            url: 'Action.ashx?Name=HYD.E3.Business.RoleFunctionBLL.GetGroupFunction',
            data: { FunctionID: id },
            success: function (data) {
                //var data = [
                //    { level: 1, itemCode: 1, itemName: '1xxx', pCode: 0 },
                //    { level: 2, itemCode: 2, itemName: '2xxx', pCode: 1 },
                //    { level: 3, itemCode: 3, itemName: '3xxx', pCode: 2 },

                //    { level: 1, itemCode: 4, itemName: '4xxx', pCode: 0 },
                //    { level: 2, itemCode: 5, itemName: '5xxx', pCode: 4 },
                //    { level: 3, itemCode: 6, itemName: '6xxx', pCode: 5 }
                //];
                var data = data.data; 
                //[
                //   { level: 1, itemCode: 1, itemName: '用户管理', pCode: 0,url:'userinfo' },
                //   { level: 1, itemCode: 2, itemName: '角色管理', pCode: 0, url: 'role' },
                //   { level: 1, itemCode: 3, itemName: '管理部信息', pCode: 0, url: 'management' },
                //]
                GenerateSingleChart(data, baseUrl, moduleName);
            }
        });
    }
   
    module.exports = loadData;
});








