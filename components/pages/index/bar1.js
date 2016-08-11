module.exports = init;

function init(height, data, theme) {
    var chart;
    // 模拟数据
    if (!data) {
        data = {
            categories: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24'],
            title: '电能逐时能耗趋势',
            maxArr: [7500, 7500, 7500, 7500, 7500, 7500, 7500, 7500, 7500, 7500, 7500, 7500, 7500],
            energyArr: [6000, 5680, 4440, 3220, 1115, 5516, 6615, 5680, 4440, 3220, 1115, 5516, 6615],
            tempArr: [12, 13, 25, 10, 19, 15, 5, 13, 25, 10, 19, 15, 5]
        };
    }
    // 主题配置
    var themeConfig = {
        backgroundColor: '#fff',
    };
    if (theme == "black") {
    }

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container1',
            height: height,
            backgroundColor: '#fff',
            plotBackgroundColor: '#fff',
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
                rotation: 0,
                align: 'right',
                style: { font: 'normal 13px 宋体' }
            }
        }],
        yAxis: [{
            //能耗
            title: {
                text: '能耗',
                style: { color: '#444' }
            },
            labels: {
                format: '{value} kWh',
                style: { color: '#777' }
            },
            max: 7500
        }, {
                // 温度
                title: {
                    text: '温度 ( ℃)',
                    style: {
                        color: '#444'
                    }
                },
                labels: {
                    format: '{value} ℃',
                    style: {
                        color: '#777'
                    }
                },
                opposite: true,
                max: 30
            }],
        plotOptions: {
            column: {
                grouping: false,
                shadow: false,
                borderWidth: 0,
                pointWidth: 8
            },
            series: {
                marker: {
                    enabled: false,
                }
            }
        },
        tooltip: {
            shared: true,
            formatter: function () {
                return this.x + "<br>"
                    + "<span style='color:#4572A7'>能耗：" + this.points[0].y + " kWh</span><br>"
                    + "<span style='color:#89A54E'>温度：" + this.points[1].y + " ℃</span>";
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
            yAxis: 0,
            name: '能耗(上限)',
            color: 'rgba(108, 166, 205,.2)',
            type: 'column',
            data: data.maxArr,
            tooltip: {
                formatter: function () {
                    return this.y + "kWh";
                }
            }
        }, {
                yAxis: 0,
                name: '能耗',
                color: '#4682B4',
                type: 'column',
                data: data.energyArr,
                tooltip: {
                    formatter: function () {
                        return this.y + "kWh";
                    }
                }
            },
            {
                yAxis: 1,
                name: '温度',
                color: '#FF0000',
                type: 'spline',
                lineWidth: 1,
                data: data.tempArr,
                tooltip: {
                    valueSuffix: ' ℃'
                }
            }]
    });
}