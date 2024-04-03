import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useLocation } from 'react-router-dom';

const Problemdetectionratesprintchart = ({sidebarToggle}) => {
    const location = useLocation();
    const { selectedSprints } = location.state || { selectedSprints: [] };

    const chartOptions = {
        chart: {
            type: 'bar',
            backgroundColor: 'rgb(254, 251, 254)',
        },
        title: {
            text: 'Problem Detection Rates Across Sprints'
        },
        xAxis: {
            categories: selectedSprints.map(sprint => sprint.id),
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Detection Ratio (%)'
            }
        },
        series: [{
            name: 'In-Sprint Defect Ratio',
            data: selectedSprints.map(sprint => ({
                y: parseFloat((sprint.inSprintDefects / sprint.tasksCompleted * 100).toFixed(3)),
                color: '#FF5733'
            })),
            dataLabels: {
                enabled: true,
                format: '{y} %'
            },
        }, {
            name: 'Post-Sprint Defect Ratio',
            data: selectedSprints.map(sprint => ({
                y: parseFloat((sprint.postSprintDefects / sprint.tasksCompleted * 100).toFixed(3)),
                color: '#33B5FF'
            })),
            dataLabels: {
                enabled: true,
                format: '{y} %'
            },
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
        <div >
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
        </div>
    );
};

export default Problemdetectionratesprintchart;
