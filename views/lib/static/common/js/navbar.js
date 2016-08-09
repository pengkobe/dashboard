;define(function (require, exports, module) {

    function NavBar(obj, dataArr, clickCallback) {
        var html = ' <div class="triangle-left"></div>';


        html += ' <div class="nav-cell" default url="' + dataArr[0].url +
            '" style="background-color: #1F1F1F">' + dataArr[0].itemName + '</div>';

        var i = 1;
        var len = dataArr.length;

        for (i; i < len; i++) {
            if (i == (len - 1)) {
                html += ' <div class="nav-cell" style="border-right:solid #111 1px" id="' + dataArr[i].itemCode + '" url="' + dataArr[i].url + '" >' + dataArr[i].itemName + '</div>';
            } else {
                html += ' <div class="nav-cell" id="' + dataArr[i].itemCode + '" url="' + dataArr[i].url + '" >' + dataArr[i].itemName + '</div>';
            }
        }

        html += '<div class="triangle-right"></div>';

        obj.append(html);
        obj.on('click', '.nav-cell', function () {
            var cookieParam = $.cookie('topic');
            var color = $('.global-nav').css('background-color');
            if ($('.bw_topic').length != 0) {
                this.style.backgroundColor = "white";
                this.style.color = "#3a99d8";
                $('div.nav-cell').css('border', 'none');
                $(this).css('border-top', '3px solid #2e99e7');
                $(this).siblings('div.nav-cell').css('background', '#2e99e7').css({ "color": "white ", 'border-top': 'none' });      
            } else {
                this.style.backgroundColor = "black"; $(this).siblings('div.nav-cell').css('background', '#272728').css("color", "#7c7c7e "); this.style.color = "white";
            }
           
            var url = $(this).attr('url');

            var id = $(this).attr('id');

            //设定缓存时间为20分钟
            var expdate = new Date();
            expdate.setTime(expdate.getTime() + (20 * 60 * 1000));
            //判断当前页面是集团页还是项目页
            //以下设置COOKIES时间为20分钟,自己随便设置该时间..
            if (typeof (ProjectCode) != "undefined" && ProjectCode != null)
                SetCookie("navBar_prj_url", url, expdate, "/", null, false);
            else SetCookie("navBar_group_url", url, expdate, "/", null, false);
            seajs.use(url, function (o) {
                if (typeof o == 'function') {
                    o(id);
                    clickCallback(url);
                }
            });
            
        });

        var str = "";
        if (typeof (ProjectCode) != "undefined" && ProjectCode != null)
            str = GetCookie("navBar_prj_url");
        else str = GetCookie("navBar_group_url");
        if (str == null || str == "") {
            // 触发默认
            //$('.nav-cell[default]').trigger('click');
            if (typeof (ProjectCode) != "undefined" &&ProjectCode != null)
                $('.nav-cell[url="realtimeMonitor"]').trigger('click');
            else
                $('.nav-cell[url="navMap"]').trigger('click');
        }
        else {
            //触发上次访问
            $('.nav-cell[url="' + str + '"]').trigger('click');
        }
        
    }

    module.exports = NavBar;
});