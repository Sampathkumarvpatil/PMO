import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts3D from 'highcharts/highcharts-3d';
import pyramid3d from 'highcharts/modules/pyramid3d';
import { useLocation } from 'react-router-dom';


Highcharts3D(Highcharts);
pyramid3d(Highcharts);

const GaugeChartComponent = () => {
    const location = useLocation();
    const { extraTasksAdded = 0, plannedTasks, extraTasksRate,tasksCompleted } = location.state || {};
    const formattedPlannedTasks = Number(tasksCompleted.toFixed(3));
    const formattedExtraTasksAdded = Number(extraTasksAdded.toFixed(3));
    const formattedExtraTasksRate = Number(extraTasksRate.toFixed(3));
    console.log(plannedTasks)


    const chartOptions = {
        chart: {
            type: 'pyramid3d',
            options3d: {
                enabled: true,
                alpha: -10,
                depth: 250,
                viewDistance: 25
            },
            width: 383,
            height: 340,
            backgroundColor: 'rgb(254, 251, 254)',
            borderColor: 'black', // Add this line
            borderWidth: 5, // Add this line
        },
        title: {
            text: 'Task Completed',
            style: {
                fontSize: '24px'
            }
        },
        plotOptions: {
            series: {
                depth: 25,
                colorByPoint: true,
                dataLabels: {
                    enabled: true,
                    color: '#000000', 
                    inside: false, 
                    style: {
                        textOutline: 'none' 
                    },
                    y:-10,
                    x:-100,
                }
            }
        },
        series: [{
            name: 'Tasks',
            data: [
                {
                    name: 'Planned Tasks',
                    y: formattedPlannedTasks,
                    color: 'rgba(54, 162, 235, 0.7)',
                    dataLabels: {
                        format: '<b>{point.name}</b>: {point.y}'
                    }
                },
                {
                    name: 'Extra Tasks Added',
                    y: formattedExtraTasksAdded,
                    color: 'rgba(255, 99, 132, 0.7)',
                    dataLabels: {
                        format: '<b>{point.name}</b>: {point.y}'
                    }
                },
                {
                    name: 'Extra Tasks Rate',
                    y: formattedExtraTasksRate,
                    color: 'rgba(255, 206, 86, 0.7)',
                    dataLabels: {
                        format: '<b>{point.name}</b>: {point.y}%'
                    },
                    
                }
            ],
            showInLegend: false
        }],
        yAxis: {
            min: 0,
    max: Math.max(plannedTasks, extraTasksAdded, extraTasksRate) + 10,
   
            title: {
                text: ''
            }
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
    console.log({ extraTasksAdded, plannedTasks, extraTasksRate });


    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
        </div>
    );
};

export default GaugeChartComponent;
