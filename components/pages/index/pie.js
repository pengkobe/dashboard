function init(height) {
    $('#container3').highcharts({
        chart: {
            height: height,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: '分项日能耗'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
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
            name: 'Browser share',
            data: [
                ['主机', 45.0],
                ['冷冻泵', 26.8],
                ['冷却塔', 18.5],
                ['冷却泵', 8.5],
                // {
                //     name: 'Chrome',
                //     y: 12.8,
                //     sliced: true,
                //     selected: true
                // },
            ]
        }]
    });

}

module.exports = init;