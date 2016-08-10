function init(height) {
    var chart;
    var height=$("#container1").height();
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container1', 
            height:height,         //放置图表的容器  
            plotBackgroundColor: null,
            plotBorderWidth: null,
            zoomType: 'xy' //支持图表放大缩小的范围  
        },
        title: {
            text: '电能逐时能耗趋势'
        },
        subtitle: {
            text: '短信发送数与成功率'
        },
        xAxis: [{
            categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            labels: {
                rotation: -45, //字体倾斜  
                align: 'right',
                style: { font: 'normal 13px 宋体' }
            }
        }],
        yAxis: [{ // Primary yAxis  
            title: {
                text: '成功率 (%)',
                style: {
                    color: '#89A54E'
                }
            },
            labels: {
                format: '{value} 条',//格式化Y轴刻度  
                style: {
                    color: '#89A54E'
                }
            }
            ,
            max: 100
        }, { // Secondary yAxis  
                title: {
                    text: '发送数 (条)',
                    style: {
                        color: '#4572A7'
                    }
                },
                labels: {
                    format: '{value} %',
                    style: {
                        color: '#4572A7'
                    }
                },
                opposite: true
            }],
        tooltip: {
            shared: true, //公用一个提示框  
            formatter: function () {
                return this.x + "<br>"
                    + "<span style='color:#4572A7'>发送数：" + this.points[0].y + " 条</span><br>"
                    + "<span style='color:#89A54E'>成功率：" + this.points[1].y + " %</span>"
                    ;
            }
        },
        //图例样式设置  
        legend: {
            layout: 'vertical',
            align: 'right',
            x: 0,
            y: 0,
            verticalAlign: 'top',
           
            floating: true,
          //  backgroundColor: '#FFFFFF'
        },
        series: [{
            name: '发送数',
            color: '#4572A7',
            type: 'column',
            yAxis: 1,
            data: [50, 70, 100, 120, 145, 176, 135],
            tooltip: {
                formatter: function () {
                    return this.y + "条";
                }
            }

        },{
            name: '发送数',
            color: '#4572A7',
            type: 'column',
            yAxis: 1,
            data: [70, 90, 110, 120, 165, 176, 175],
            tooltip: {
                formatter: function () {
                    return this.y + "条";
                }
            }
        }, {
                name: '成功率',
                color: '#89A54E',
                type: 'spline',
                yAxis: 0,
                data: [80, 22.5, 45, 90, 99, 35, 45],
                tooltip: {
                    valueSuffix: ' %'
                }
            }]
    });

// setTimeout(function () {
//            chart.reflow();
//  }, 2000);
}

module.exports = init;