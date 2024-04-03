import React from 'react';
//import logo from './Images/Infogen-labs-logo-.png';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts3D from 'highcharts/highcharts-3d';
import funnel3d from 'highcharts/modules/funnel3d';
import HighchartsCylinder from 'highcharts/modules/cylinder';
//import './funnel.css'
import { useLocation } from 'react-router-dom';

// Apply the 3D module
Highcharts3D(Highcharts);
// Initialize the funnel3D module
funnel3d(Highcharts);
HighchartsCylinder(Highcharts);

const FunnelChartComponent = () => {
    const location = useLocation();

    const { completionRate, plannedTasks, tasksCompleted } = location.state || { completionRate: 0, plannedTasks: 0, tasksCompleted: 0 };
    const formattedCompletionRate = Number(completionRate.toFixed(3));
    const formattedTasksCompleted = Number(tasksCompleted.toFixed(3));
    const formattedPlannedTasks = Number(plannedTasks.toFixed(3));

    const selectedSprint = location.state?.selectedSprint || 'Sprint';


    const chartOptions = {
        chart: {
            type: 'funnel3d',
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 5,
                depth: 50,
                viewDistance: 25
            },
            width: 410,
            height: 280,
            backgroundColor: 'rgb(254, 251, 254)',
            borderColor: 'black', // Add this line
            borderWidth: 5, // Add this line
        },
        title: {
            text: 'Completion Rate Overview  '
        },
        plotOptions: {
            funnel3d: {
                depth: 50,
                center: ['50%', '50%'],
                width: '80%',
                showInLegend: false,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b> ({point.y:,.0f})',
                    allowOverlap: true,
                    y: 10,
                    x: -100,
                }
            }
        },
        series: [{
            name: 'Completion Rate',
            data: [
                {
                    name: 'Completion Rate',
                    y: formattedCompletionRate,
                    color: 'rgba(255, 99, 132, 0.5)',
                    tooltip: {
                        valueSuffix: '%'
                    },
                    dataLabels: {
                        format: '{point.name}: {point.y}%'
                    }
                },
                {
                    name: 'Tasks Completed',
                    y: formattedTasksCompleted,
                    color: 'rgba(54, 162, 235, 0.5)',
                    dataLabels: {
                        format: '{point.name}: {point.y}'
                    }
                },
                {
                    name: 'Planned Tasks',
                    y: formattedPlannedTasks,
                    color: 'rgba(255, 206, 86, 0.5)',
                    dataLabels: {
                        format: '{point.name}: {point.y}'
                    }
                }
            ],
            showInLegend: false
        }],
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'Percentage (%)'
            }
        },
        xAxis: {
            labels: {
                enabled: false
            }
        },
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
        <div >
            {/* <header className="sprint-header">
                <img src={logo} alt="Logo" className="sprint-logo" />
            </header> */}
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
            <h3 style={{
                marginLeft: '500px',
                marginTop: '0px',
                fontFamily: 'Arial, sans-serif',
                fontSize: '24px',
                fontWeight: 'bold',
                //   borderBottom: '2px solid #333',
                //   paddingBottom: '10px',
                width: 'fit-content',
                background: 'linear-gradient(to right, #22c1c3, #fdbb2d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
            }}>
                KPI's of: {selectedSprint}
            </h3>


        </div>
    );
};

export default FunnelChartComponent;
