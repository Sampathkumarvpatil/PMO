import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const SprintVizualization = ({ sidebarToggle }) => {
  useEffect(() => {
    generateGraph();
  }, []);

  const generateGraph = () => {
    const mainCompanyData = JSON.parse(localStorage.getItem("mainCompanyData")) || [];
    let devNames = [];
    let overallTotalHour = 0;
  
    const selectedProjectName = localStorage.getItem("selectedProjectName");
    const selectedSprintName = localStorage.getItem("selectedSprintName");
  
    const selectedProject = mainCompanyData.find(project => project.projectName === selectedProjectName);
  
    if (selectedProject) {
      const selectedSprint = selectedProject.sprints.find(sprint => sprint.sprintName === selectedSprintName);
      if (selectedSprint) {
        selectedSprint.allocations.forEach(allocation => {
          devNames.push(allocation.name);
        });
        overallTotalHour = parseInt(localStorage.getItem("finalHours")) || 0;
      }
    }
  
    devNames = [...new Set(devNames)];
    console.log(devNames);
  
    const totalHoursPerDev = JSON.parse(localStorage.getItem("TotalHoursPerDev")) || [];
  
  
    const options = {
        credits: {
          enabled: false,
        },
        title: {
          text: "Workload Distribution Visualization",
          align: "left",
        },
        xAxis: {
          categories: devNames,
        },
        yAxis: {
          title: {
            text: "Total Hours",
          },
        },
        tooltip: {
          enabled: true,
          valueSuffix: " hours",
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true,
              format: "{point.y} hours",
            },
          },
        },
        series: [
          {
            type: "column",
            name: "Hours",
            data: totalHoursPerDev.map(dev => dev.totalHours),
          },
          {
            type: "pie",
            name: "Grand Total",
            data: [
              {
                name: "Employees Data",
                y: overallTotalHour,
                color: Highcharts.getOptions().colors[5],
                dataLabels: {
                  enabled: true,
                  distance: -50,
                  format: "{point.y} hr",
                  style: {
                    fontSize: "10px",
                  },
                },
              },
            ],
            center: [650, 15],
            size: 100,
            innerSize: "70%",
            showInLegend: false,
            dataLabels: {
              enabled: false,
            },
          },
        ],
      };
  
      // Render Highcharts chart
      Highcharts.chart("container", options);
    };
  
    return <div id="container" className={` ${sidebarToggle ? "ml-0" : "ml-64"} transition-all duration-300 `}></div>;
  };

export default SprintVizualization;
