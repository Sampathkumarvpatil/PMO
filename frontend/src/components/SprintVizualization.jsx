import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";

import "./vizualization.css";
const SprintVizualization = ({ showGraph, setShowGraph }) => {
  // const [graphGenerated, setGraphGenerated] = useState(false);
  useEffect(() => {
    generateGraph();
  }, [showGraph]);

  const generateGraph = () => {
    // const mainCompanyData =
    //   JSON.parse(localStorage.getItem("mainCompanyData")) || [];
    let devNames = [];
    let totalHoursPerDevData = [];
    let overallTotalHour = 0;

    const selectedProjectName = localStorage.getItem("selectedProjectName");
    const selectedSprintName = localStorage.getItem("selectedSprintName");

    // const selectedProject = mainCompanyData.find(
    //   (project) => project.projectName === selectedProjectName
    // );

    // if (selectedProject) {
    //   const selectedSprint = selectedProject.sprints.find(
    //     (sprint) => sprint.sprintName === selectedSprintName
    //   );
    //   if (selectedSprint && selectedSprint.allocations) {
    //     // Check if allocations is defined
    //     selectedSprint.allocations.forEach((allocation) => {
    //       devNames.push(allocation.name);
    //       totalHoursPerDevData.push(allocation.sumTotalWorkingHours);
    //     });

    //     overallTotalHour = parseInt(selectedSprint.final_hrs) || 0;
    //   }
    // }

    // devNames = [...new Set(devNames)];

    // const totalHoursPerDev = JSON.parse(localStorage.getItem("TotalHoursPerDev")) || [];

    let currentSprint = localStorage.getItem("currentSprint");

    if (currentSprint) {
      currentSprint = JSON.parse(currentSprint);
      currentSprint?.allocations?.forEach((allocation) => {
        devNames.push(allocation?.name);
        totalHoursPerDevData.push(allocation?.sumTotalWorkingHours);
      });
    }
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
        series: {
          borderRadius: "30%",
        },
        column: {
          dataLabels: {
            enabled: true,
            format: "{point.y} hours",
          },
        },
        line: {
          dataLabels: {
            enabled: true,
            format: "{point.y} hours", // Display total hours on each line point
          },
        },
      },
      series: [
        {
          type: "column",
          name: "Hours",
          data: totalHoursPerDevData,
        },
        {
          type: "line",
          step: "center",
          name: "Average",
          data: totalHoursPerDevData,
          color: Highcharts.getOptions().colors[7],
          marker: {
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[2],
            fillColor: "white",
          },
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
          center: [50, 15],
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

  return (
    <figure class="highcharts-figure">
      <div id="container"></div>
    </figure>
  );
};

export default SprintVizualization;
