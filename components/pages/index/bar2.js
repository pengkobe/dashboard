function init(height,data,theme) {
    var chart;
    // 模拟数据
    if (!data) {
        data = {
            categories: ['1#主机', '2#主机', '3#主机', '4#主机', '5#主机', '6#主机',
                '7#主机', '8#主机', '9#主机', '10#主机', '11#主机'],
            title: '重点设备日能耗',
            energyArr: [50, 70, 100, 120, 145, 176, 135, 115, 125, 35, 105],
            runtimeArr: [80, 22.5, 45, 90, 99, 35, 45, 25, 35, 23, 40]
        };
    }

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container2',         
            height: height,
            backgroundColor: '#fff',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            zoomType: 'xy'
        },
        title: {
            text: data.title,
            style: {
                color: '#333'
            }
        },
        subtitle: {
            text: ''
        },
        xAxis: [{
            categories: data.categories,
            labels: {
                rotation: 45, 
                align: 'left',
                style: { font: 'normal 13px 宋体' }
            }
        }],
        yAxis: [{
            // 能耗
            title: {
                text: '能耗',
                style: {
                    color: '#444'
                }
            },
            labels: {
                format: '{value} kWh',//格式化Y轴刻度  
                style: {
                    color: '#777'
                }
            }
            ,
            max: 100
        }, {
                // 运行时间
                title: {
                    text: '运行时间',
                    style: {
                        color: '#444'
                    }
                },
                labels: {
                    format: '{value} h',
                    style: {
                        color: '#777'
                    }
                },
                opposite: true
            }],
        tooltip: {
            shared: true,
            formatter: function () {
                return this.x + "<br>"
                    + "<span style='color:#4572A7'>能耗" + this.points[0].y + " kWh</span><br>"
                    + "<span style='color:#89A54E'>运行时间" + this.points[1].y + " h</span>"
                    ;
            }
        },
        plotOptions: {
            column: {
                pointWidth: 12
            },
            series: {
                marker: {
                    fillColor: '#EEEE00',
                }
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'right',
            x: 0,
            y: 0,
            verticalAlign: 'top',
            floating: true,
        },
        series: [{
            name: '能耗',
            color: '#458B00',
            type: 'column',
            yAxis: 1,
            data: data.energyArr,
            tooltip: {
                formatter: function () {
                    return this.y + "kWh";
                }
            }
        }, {
                name: '运行时间',
                color: '#7FFFD4',
                type: 'spline',
                yAxis: 0,
                lineWidth: 1,
                data: data.runtimeArr,
                tooltip: {
                    valueSuffix: ' h'
                }
            }]
    });
}

module.exports = init;