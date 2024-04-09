import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useLocation } from 'react-router-dom';
// import logo from './Images/Infogen-labs-logo-.png';

const WorkEfficiencyRatiochartcomponent = ({sidebarToggle}) => {
    const location = useLocation();
    console.log('loc',location)
    const { selectedSprints, startSprint, endSprint } = location.state || { selectedSprints: [], startSprint: '', endSprint: '' };
    const chartOptions = {
        chart: {
            type: 'column',
            backgroundColor: 'rgb(254, 251, 254)',
        },
        title: {
            text: 'Work Hours and Efficiency Ratio by Sprints'
        },
        xAxis: {
            categories: selectedSprints.map(sprint => sprint.id),
        },
        yAxis: [{
            title: {
                text: 'Work Hours'
            }
        }, {
            title: {
                text: 'Efficiency Ratio (%)'
            },
            opposite: true,
            labels: {
                format: '{value} %'
            }
        }],
        series: [{
            name: 'Planned Work Hours',
            data: selectedSprints.map(sprint => sprint.plannedWorkHours),
            type: 'column'
        }, {
            name: 'Work Hours Used',
            data: selectedSprints.map(sprint => sprint.workHoursUsed),
            type: 'column'
        }, {
            name: 'Work Efficiency Ratio',
            data: selectedSprints.map(sprint => ({
                y: parseFloat((sprint.workHoursUsed / sprint.plannedWorkHours * 100).toFixed(2)), // Ensure values are formatted as percentages
                color: '#00FF00'
            })),
            type: 'line',
            yAxis: 1,
            dataLabels: {
                enabled: true,
                format: '{y} %'
            }
        }],
        credits: {
            enabled: false
        },
        exporting: {
            buttons: {
                contextButton: {
                    menuItems: [
                        'printChart',
                        'separator',
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
            {/* <header className="sprint-header">
           
                <h1 style={{
                    marginRight: '400px',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #22c1c3, #fdbb2d)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}
                >
                    KPI's of {startSprint} : {endSprint}</h1>
            </header> */}
            <div >
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                />
            </div>
        </div>
    );
};

export default WorkEfficiencyRatiochartcomponent;
