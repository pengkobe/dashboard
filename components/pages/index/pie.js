function init(height, data, theme) {
    if (!data) {
        data = {
            title: '分项日能耗',
            pieDataArr:
                [['主机', 45.0],
                ['冷冻泵', 26.8],
                ['冷却塔', 18.5],
                ['冷却泵', 8.5]],
        };
    }

    $('#container3').highcharts({
        chart: {
            height: height,
            backgroundColor: '#fff',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: data.title,
            style: {
                color: '#333'
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            x: 0,
            y: 0,
            verticalAlign: 'top',
            floating: true,
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                size: 120,
                dataLabels: {
                    enabled: false,
                    color: '#000000',
                    connectorColor: '#000000',
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            type: 'pie',
            showInLegend: true,
            name: '占比',
            data: data.pieDataArr
        }]
    });
}

module.exports = init;