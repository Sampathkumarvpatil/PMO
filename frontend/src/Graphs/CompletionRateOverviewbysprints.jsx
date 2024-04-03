import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';
import accessibility from 'highcharts/modules/accessibility';
import { useLocation } from 'react-router-dom';

// Initialize the modules
highchartsMore(Highcharts);
exporting(Highcharts);
exportData(Highcharts);
accessibility(Highcharts);

const CompletionRateOverviewbysprintsComponent = ({sidebarToggle}) => {
    const location = useLocation();
    const { selectedSprints } = location.state || { selectedSprints: [] };

    const colors = ['#EFF473', '#33B5FF', '#FFC300', '#73EBF4', '#77F473', '#B873F4'];

    const processedSprints = selectedSprints.map(sprint => ({
        ...sprint,
        plannedTasks: Number(sprint.plannedTasks),
        tasksCompleted: Number(sprint.tasksCompleted),
        completionRate: sprint.plannedTasks ? (Number(sprint.tasksCompleted) / Number(sprint.plannedTasks) * 100).toFixed(2) : 0,
    }));

    const chartOptions = {
        chart: {
            type: 'column',
            backgroundColor: 'rgb(254, 251, 254)',
        },
        title: {
            text: 'Completion Rate Overview by Sprints'
        },
        xAxis: {
            categories: processedSprints.map(sprint => sprint.id),
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Completion Rate (%)'
            },
            labels: {
                format: '{value} %'
            }
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{y} %',
                }
            }
        },
        series: [{
            name: 'Completion Rate',
            data: processedSprints.map((sprint, index) => ({
                name: sprint.id,
                y: parseFloat(sprint.completionRate),
                color: colors[index % colors.length], // Assign a color from the array
            })),
            type: 'column'
        }, {
            name: 'Trend',
            data: processedSprints.map(sprint => parseFloat(sprint.completionRate)),
            type: 'spline',
            marker: {
                enabled: true
            },
            zIndex: 1 
        }],
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        exporting: {
            buttons: {
                contextButton: {
                    menuItems: [
                        'downloadPNG',
                        'downloadJPEG',
                        'downloadPDF',
                        'downloadSVG'
                    ]
                }
            }
        },
    };

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
        </div>
    );
};

export default CompletionRateOverviewbysprintsComponent;
