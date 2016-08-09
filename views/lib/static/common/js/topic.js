
$.extend({
    groupTopic: function (param) {
        var body = $('body');
        var sumary_info = $('.sumary-info');
        var global_nav = $('.global-nav');
        var addListener = function () {
            $('#classic_topic').click(function () {
                var cookieParam = $.cookie('topic');
                if (cookieParam != 'classic_topic' || $.RGBToHex(sumary_info.css('background-color')) == '#F8F8F8') {
                    //window.location.reload(true);
                    if ($('.bw_topic').length != 0) {
                        $('.bw_topic').remove();
                        $.cookie('topic', "classic_topic", { expires: 30 });
                        $.imageExchange();
                        navBw_topic();
                        tableBw_topic();
                        lineTopic();
                        listStatick();
                        $('[fill=white]').attr('fill', '#1F1F1F');
                        if (typeof (ManagementName) != 'undefined' && ManagementName != null) {
                            seajs.use("navMap", function (NavObj) {
                                NavObj();
                            })
                        }  
                    }
                }
            })

            $("#bw_topic").click(function () {
                var cookieParam = $.cookie('topic');
                if (cookieParam != 'bw_topic' || $.RGBToHex(sumary_info.css('background-color')) == '#222323') {
                    //window.location.reload(true);
                    if ($('.bw_topic').length == 0) {
                        $.cookie('topic', "bw_topic", { expires: 30 });
                        $('head').append(' <link href="bw_topic.css" class="bw_topic" rel="stylesheet" />');
                        $.imageExchange();
                        navBw_topic();
                        tableBw_topic();
                        lineTopic();
                        listStatick();
                        $('[fill=#1F1F1F]').attr('fill', 'white');
                        if (typeof(ManagementName)!='undefined'&&ManagementName!=null) {
                            seajs.use("navMap", function (NavObj) {
                                NavObj();
                            })
                        }
                    } 
                }
            });
        }

        var addBw_topic = function () {
            
            /*if (param == 'projectTopic') {
                window.location.reload(true);
            } else if (param == 'list') {
                $('.menu > ul > li > span').css('background', '#085562');
                $('.menu > ul > li > span a').css('color', '#E1DD18');
                $('.menu > ul > li > ul span').css('background-color', '#374C99');
                $('.menu > ul > li > ul span a').css('color', '#E98E2B');
            } else if (param == 'nav') {
                //$('.nav-cell').css('background', '#f0f9ff');
                $('.triangle-right').css('border-bottom', ' 32px solid #f0f9ff');
                $('.triangle-left').css('border-bottom', ' 32px solid #f0f9ff');
            } else if (param == 'area') {
                $('.area-nav li div').css({ 'background-color': '#e8f4ff', 'color': '#64a1bc' });
                $('.area-nav li div').mouseover(function () {
                    $(this).css({ 'background-color': '#1e90ff', 'color': 'white' });
                });
                $('.area-nav li div').mouseout(function () {
                    $(this).css({ 'background-color': '#e8f4ff', 'color': '#64a1bc' });
                });
            } else if (param == 'realtimeMonitor') {
                $('.parent_li').css({ 'background': '#e8f4ff', 'color': '#64a1bc' });
                $('.easy-tree > ul > li > span').css({ 'background-color': '#1e90ff', 'color': 'white' });
                $('.easy-tree > ul > li > span  a ').css("cssText", "color: white !important" );
                $('.easy-tree li > span > a').css('color', '#64a1bc');
            }
            //$('.triangle-left').css('cssText', 'border-bottom: 32px solid #eee !important');
            */
        }

        var listTopic = function () {
            var cookieParam = $.cookie('topic');
            if (cookieParam == null ||cookieParam == "classic_topic") { return }
            else if (cookieParam == "bw_topic") { addBw_topic(); }
        }

        if (param == 'change') {
            addListener()
        } else if (param == 'list' || param == 'nav' || param == 'area'||param=='realtimeMonitor') { listTopic(); }
    }  
});

$.extend({
    projectTopic: function (param) {

        var addBw_topic = function () {
            if (param == 'table') {
                /*$('.dataTables_wrapper').css('background-color', '#fff');
                $('table').css('background-color', 'white');
                $('.DTTT_button_mine').css('background', 'red').css('color','white');
                $('#search').css('background-color', 'red');
                $('#dataquery select').css('background', '#EBC8C8');
                $('.menu div').css('background-color', '#2196F3');
                $("#dataquery > .menu ul").css('background', '#EBC8C8');*/
                $('tr.odd').css('cssText', 'background-color:white !important');
                $('tr.even').css('cssText', 'background-color:#efefef !important');
                /*$('.trigger_button').css({ 'background-color': 'red', 'color': 'white', 'border-color': 'red' });
                $('#query_search').css({'background-color': 'red','color':'white'});*/
            } /*else if (param == 'realtimeMonitor_data') {
                $('.device-room-bar').css('background', 'linear-gradient(#F0F2F4, #6A8F9D)');
                $('.device-row').css('background-color', '#fff');
               
            } else if (param == 'realtimeMonitor_menu') {
                $('.system-block').css({ 'background': 'rgb(142,186,198)' });
            } */else if (param = 'highcharts') {
                //$('div.cycle-block[flag=0]').css('background', 'rgb(200,200,244)');
                return 'white'
            }
        }
        
        var cookieParam = $.cookie('topic');
        if ($('.bw_topic').length == 0) { return "#1F1F1F" }
        else if ($('.bw_topic').length != 0) { return addBw_topic(); }
    }
})

$.extend ({
    RGBToHex:function(rgb) {
    var regexp = /[0-9]{0,3}/g;
    var re = rgb.match(regexp);//利用正则表达式去掉多余的部分，将rgb中的数字提取
    var hexColor = "#"; var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    for (var i = 0; i < re.length; i++) {
        var r = null, c = re[i], l = c;
        var hexAr = [];
        while (c > 16) {
            r = c % 16;
            c = (c / 16) >> 0;
            hexAr.push(hex[r]);
        } hexAr.push(hex[c]);
        if (l < 16 && l != "") {
            hexAr.push(0)
        }
        hexColor += hexAr.reverse().join('');
    }
    //alert(hexColor)  
    return hexColor;
}
})

//右侧栏线条
function lineTopic() {
    var cookieParam = $.cookie('topic');
    if (cookieParam == 'bw_topic') {
        $($('.sumary-info').children('div')[3]).css('background-color', '#d8d8d8');
        /*$('.sumary-info').children('div').each(function () {
            var i = $.RGBToHex($(this).css('background'));
            var j = $.RGBToHex($(this).css('border-color'));
            if ($.RGBToHex($(this).css('background')) == '#000000' || $.RGBToHex($(this).css('border-color')) == '#000000') {
                $(this).css({ 'background': '#d8d8d8', 'border-color': '#d8d8d8' });
            }
        })*/
    } else {
        $($('.sumary-info').children('div')[3]).css('background-color', 'black');
    }
}

//二级导航栏
function navBw_topic() {
    var cookieParam = $.cookie('topic');
    if (typeof (ProjectCode) != "undefined" && ProjectCode != null)
        var navCookie = $.cookie('navBar_prj_url');
    else var navCookie = $.cookie('navBar_group_url');

    var navDefault = $('[url=' + navCookie + ']');
    if (navCookie == null) {
       var navDefault = $('div.nav-cell[default]');
    }
    var navDefaultColor = navDefault.css('background-color');
    if (cookieParam == 'bw_topic') {
        navDefault.css('background-color', "white");
        navDefault.css('color', "#3a99d8");
        $('div.nav-cell').css('border', 'none');
        navDefault.css('border-top', '3px solid #2e99e7');
        navDefault.siblings('div.nav-cell').css('background', '#2e99e7').css({ "color": "white ", 'border-top': 'none' });
    } else { navDefault.css('background-color', "black"); navDefault.siblings('div.nav-cell').css('background', '#272728').css("color", "#7c7c7e "); navDefault.css('color', "white"); $('div.nav-cell').css({'border-color': 'black','border-top':'none'}); }
}

//实时数据左侧数据栈接口控制列表

function listStatick() {
    if ($('.bw_topic').length != 0) {
        $('[statickClicked]').css({ "color": "white", 'background': '#2e99e7' });
        $('[statickClicked]').siblings().css({ "color": "#7a7a7e", 'background': '#EFF3F5', 'border-color': '#CCCCCC' });
    } else {
        $('[statickClicked]').css({ "color": "white", 'background': '#555' });
        $('[statickClicked]').siblings().css({ "color": "#7a7a7e", 'background': '#222', 'border-color': 'black' });
    }
}

//表格行
function tableBw_topic() {
    var cookieParam = $.cookie('topic');
    if (cookieParam == 'bw_topic') {
        $('tr.odd').css('cssText', 'background-color:white !important');
        $('tr.even').css('cssText', 'background-color:#ccc !important');
    } else {
        $('tr.odd').css('cssText', 'background-color:#222 !important');
        $('tr.even').css('cssText', 'background-color:#272728 !important');
    }
}


//图片
$.extend({
    imageExchange: function (param, obj) {
        obj = obj;
        var cookieParam = $.cookie('topic');
        var monitorPageImgs = $('.imgdiv img');
        var realtimeMonitorImgs = $('.system-icon img');
        var monitorPageContentImgs = $('.parames-img img');
        if (typeof (ProjectCode) != "undefined" && ProjectCode != null)
            var navCookie = $.cookie('navBar_prj_url');
        else var navCookie = $.cookie('navBar_group_url');

        if ($('.bw_topic').length != 0) {
            $('.brand').children('img').attr('src', 'Images/project_logo1.png');
            $('.topic_switch').attr('src', 'Images/topic.png');
            $('#userAccountInfo').children('img').attr('src', 'Images/user1.png');
            $('footer').children('img').attr('src', 'Images/nxt2.png');

            //地图周边xiao图片
            $('.datablock-icon img').each(function (index, elem) {
                var arroundSrc = '';
                var arroundSrc = $(this).attr('src');
                $(this).attr('src', 'Images' + arroundSrc.substring(arroundSrc.indexOf('/'), arroundSrc.indexOf('.')) + 'bw_topic.png');
            })

            if (param == 'monitorPage' || navCookie == 'monitorPage') {
                /*for (var i = 0; i < obj.length; i++) {
                    $(monitorPageImgs[i]).attr('src', 'Images/newPic/' + obj[i].SystemName + 'bw.png');
                }*/

                var imgSrc = $(monitorPageImgs[0]).attr('src');
                var arr = ['供配电系统', '给排水系统', '智能化系统', '电梯系统', '暖通系统'];
                if (typeof (imgSrc) != 'undefined') {
                    if (imgSrc.indexOf('bw_group') == -1) {
                        for (var i = 0; i < monitorPageImgs.length; i++) {
                            $(monitorPageImgs[i]).attr('src', 'Images/newPic/' + arr[i] + 'bw_group.png');
                        }
                    }
                }

                $(monitorPageContentImgs[0]).attr('src', 'Images/newPic/bw_group/设备.svg');
                for (var j = 1; j < monitorPageContentImgs.length; j++) {
                    var imgContentSrc = $(monitorPageContentImgs[j]).attr('src');
                    $(monitorPageContentImgs[j]).attr('src', 'Images/newPic/bw_group/' + imgContentSrc.substring(13, imgContentSrc.indexOf('.')) + '.svg');
                }

            }
            if (param == 'realtimeMonitor' || navCookie == 'realtimeMonitor') {
                /*for (var i = 0; i < obj.length; i++) {
                    $(monitorPageImgs[i]).attr('src', 'Images/newPic/' + obj[i].SystemName + 'bw.png');
                }*/
                for (var i = 0; i < realtimeMonitorImgs.length; i++) {
                    var imgSrc = $(realtimeMonitorImgs[i]).attr('src');
                    if (typeof (imgSrc) != 'undefined') {
                        if (imgSrc.indexOf('bw_prj') == -1) {
                            if ($(realtimeMonitorImgs[i]).parents('.beClicked').length != 0) {
                                var nowSrc = imgSrc.substring(0, 14) + 'bw_prj/'+imgSrc.substring(14, imgSrc.indexOf('.')) + '蓝.png';
                                $(realtimeMonitorImgs[i]).attr('src', nowSrc);
                            } else {
                                var nowSrc = imgSrc.substring(0, 14) +'bw_prj/'+ imgSrc.substring(14, imgSrc.indexOf('.')) + '.png';
                                $(realtimeMonitorImgs[i]).attr('src', nowSrc);
                            }
                        }
                    }
                }

                //展开功能图片
                $('img[title=展开]').attr('src', 'Images/full_screen_bw_topic.svg');

                $('.device-li-icon img').each(function () {
                    var imgSrc = $(this).attr('src');
                    var imgLocation = imgSrc.substring(14, 16);
                    var imgLocation2 = imgSrc.substring(14, 18);
                    var nowSrc;
                    if (imgLocation == '灰色') {
                        var nowSrc = imgSrc.substring(0, 14) + "淡色" + imgSrc.substring(16);
                    } else if (imgLocation == '绿色') {
                        var nowSrc = imgSrc.substring(0, 14) + "蓝色" + imgSrc.substring(16);
                    } else if (imgLocation2 == '通讯中断') {
                        var nowSrc = imgSrc.substring(0, 14) + "清新中断" + imgSrc.substring(18);
                    }
                    $(this).attr('src' ,nowSrc);
                })
            }
        } else if ($('.bw_topic').length == 0) {
            $('.brand').children('img').attr('src', 'Images/project_logo.png');
            $('.topic_switch').attr('src', 'Images/topic1.png');
            $('#userAccountInfo').children('img').attr('src', 'Images/user.png');
            $('footer').children('img').attr('src', 'Images/nxt.png');

            //地图周边xiao图片
            $('.datablock-icon img').each(function (index, elem) {
                var arroundSrc = '';
                var arroundSrc = $(this).attr('src');
                if (arroundSrc.indexOf('b') != -1) {
                    $(this).attr('src', 'Images' + arroundSrc.substring(arroundSrc.indexOf('/'), arroundSrc.indexOf('b')) + '.png');
                }
            })

            if (param == 'monitorPage' || navCookie == 'monitorPage') {
                /*for (var i = 0; i < obj.length; i++) {
                    $(monitorPageImgs[i]).attr('src', 'Images/newPic/' + obj[i].SystemName + '.png');
                }*/
                var imgSrc = $(monitorPageImgs[0]).attr('src');
                var arr = ['供配电系统', '给排水系统', '智能化系统', '电梯系统', '暖通系统'];
                if (typeof (imgSrc) != 'undefined') {
                    if (imgSrc.indexOf('bw_group') != -1) {
                        for (var i = 0; i < monitorPageImgs.length; i++) {
                            $(monitorPageImgs[i]).attr('src', 'Images/newPic/' + arr[i] + '.png');
                        }
                    }
                }

                $(monitorPageContentImgs[0]).attr('src', 'Images/设备.png');
                for (var j = 1; j < monitorPageContentImgs.length; j++) {
                    var imgContentSrc = $(monitorPageContentImgs[j]).attr('src');
                    if (imgContentSrc.indexOf('bw_group') != -1) {
                        $(monitorPageContentImgs[j]).attr('src', 'Images/group/' + imgContentSrc.substring(23, imgContentSrc.indexOf('.')) + '.png');
                    }
                }
            }
            if (param == 'realtimeMonitor' || navCookie == 'realtimeMonitor') {
                /*for (var i = 0; i < obj.length; i++) {
                    $(monitorPageImgs[i]).attr('src', 'Images/newPic/' + obj[i].SystemName + 'bw.png');
                }*/
                for (var i = 0; i < realtimeMonitorImgs.length; i++) {
                    var imgSrc = $(realtimeMonitorImgs[i]).attr('src');
                    if (typeof (imgSrc) != 'undefined') {
                        if (imgSrc.indexOf('bw_prj') != -1) {
                            if ($(realtimeMonitorImgs[i]).parents('.beClicked').length != 0) {
                                var nowSrc = imgSrc.substring(0, 14) + imgSrc.substring(21, imgSrc.indexOf('.')-1) + '.png';
                                $(realtimeMonitorImgs[i]).attr('src', nowSrc);
                            } else {
                                var nowSrc = imgSrc.substring(0, 14) + imgSrc.substring(21, imgSrc.indexOf('.')) + '.png';
                                $(realtimeMonitorImgs[i]).attr('src', nowSrc);
                            }
                        }
                    }
                }

                $('img[title=展开]').attr('src', 'Images/full_screen.png');

                $('.device-li-icon img').each(function () {
                    var imgSrc = $(this).attr('src');
                    var imgLocation = imgSrc.substring(14, 16);
                    var imgLocation2 = imgSrc.substring(14, 18);
                    var nowSrc;
                    if (imgLocation == '淡色') {
                        var nowSrc = imgSrc.substring(0, 14) + "灰色" + imgSrc.substring(16);
                    } else if (imgLocation == '蓝色') {
                        var nowSrc = imgSrc.substring(0, 14) + "绿色" + imgSrc.substring(16);
                    } else if (imgLocation2 == '清新中断') {
                        var nowSrc = imgSrc.substring(0, 14) + "通讯中断" + imgSrc.substring(18);
                    }
                    $(this).attr('src', nowSrc);
                })
            }
        }
    }
    })

var cookieParam = $.cookie('topic');
if (cookieParam == "bw_topic") {
    /*$('body').css("cssText", "background-color:#fff !important");
    $('.sumary-info').css({ "background-color": "white", 'border-left': '#95c2db 1px solid' });
    $('.global-nav').css({ 'background': '#1e90ff', 'color': 'white' });
    $($('.sumary-info').children('div')[3]).css('background-color', '#95c2db');
    $($('.sumary-info').children('div')[7]).css('background-color', '#95c2db');
    $('.device-status').next().next().css('background-color', '#95c2db');
    $('#rightHideButton').css('background', 'rgb(199, 199, 215)');
    $('#leftHideButton').css('background', 'rgb(199, 199, 215)');
    $('footer').css({ 'background': '#1e90ff', 'color': 'white' });
    */

    //加css link
    lineTopic();
    if ($('.bw_topic').length == 0) {
        $('head').append(' <link href="bw_topic.css" class="bw_topic" rel="stylesheet" />');
    }
}

$.imageExchange();

