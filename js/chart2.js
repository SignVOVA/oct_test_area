$(function () {

    var colors = Highcharts.getOptions().colors,
        categories = ['Area A', 'Area B', 'Area C', 'Area FA', 'Area X'],
        data = [{
            y: 30,
            color: colors[0],
            drilldown: {
                name: 'Area A Locations',
                categories: ['Location A', 'Location B', 'Location C'],
                data: [10, 10, 10],
                color: colors[0]
            }
        }, {
            y: 10,
            color: colors[1],
            drilldown: {
                name: 'Area B Locations',
                categories: ['Location D'],
                data: [10],
                color: colors[1]
            }
        }, {
            y: 20,
            color: colors[2],
            drilldown: {
                name: 'Area C Locations',
                categories: ['Location F', 'Location H'],
                data: [10, 10],
                color: colors[2]
            }
        }, {
            y: 20,
            color: colors[3],
            drilldown: {
                name: 'Area FA Locations',
                categories: ['Location E', 'Location G'],
                data: [10, 10],
                color: colors[3]
            }
        }, {
            y: 20,
            color: colors[4],
            drilldown: {
                name: 'Area X Locations',
                categories: ['Location I', 'Location J'],
                data: [10, 10],
                color: colors[4]
            }
        }],
        areasData = [],
        locationsData = [],
        i,
        j,
        dataLen = data.length,
        drillDataLen,
        brightness;


    // Build the data arrays
    for (i = 0; i < dataLen; i += 1) {

        // add area data
        areasData.push({
            name: categories[i],
            y: data[i].y,
            color: data[i].color
        });

        // add location data
        drillDataLen = data[i].drilldown.data.length;
        for (j = 0; j < drillDataLen; j += 1) {
            brightness = 0.2 - (j / drillDataLen) / 5;
            locationsData.push({
                name: data[i].drilldown.categories[j],
                y: data[i].drilldown.data[j],
                color: Highcharts.Color(data[i].color).brighten(brightness).get()
            });
        }
    }

    // Create the chart
    $('#container2').highcharts({
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Total Percentage of Areas and Locations'
        },
        yAxis: {
            title: {
                text: 'Total percent of places'
            }
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '50%']
            }
        },
        tooltip: {
            valueSuffix: '%'
        },
        series: [{
            name: 'Areas',
            data: areasData,
            size: '60%',
            dataLabels: {
                formatter: function () {
                    return this.y > 5 ? this.point.name : null;
                },
                color: 'white',
                distance: -30
            }
        }, {
            name: 'Locations',
            data: locationsData,
            size: '80%',
            innerSize: '60%',
            dataLabels: {
                formatter: function () {
                    // display only if larger than 1
                    return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%'  : null;
                }
            }
        }]
    });

});