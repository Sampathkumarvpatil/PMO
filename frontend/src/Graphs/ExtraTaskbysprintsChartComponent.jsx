import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useLocation } from "react-router-dom";
import highchartsMore from "highcharts/highcharts-more";

// Initialize the module
highchartsMore(Highcharts);

const ExtraTaskbysprintsChartComponent = ({ sidebarToggle }) => {
  const location = useLocation();
  const { selectedSprints } = location.state || { selectedSprints: [] };

  const highestValue =
    Math.max(
      ...selectedSprints.map(
        (sprint) => Object.values(sprint)[0].extraTasksAdded
      )
    ) + 10;

  const chartOptions = {
    chart: {
      type: "columnpyramid",
      backgroundColor: "rgb(254, 251, 254)",
    },
    title: {
      text: "Extra Tasks by Sprints",
    },
    plotOptions: {
      series: {
        depth: 25,
        borderColor: "transparent",
        dataLabels: {
          enabled: true,
          format: "{point.extraTaskRatio} %",
          inside: true,
          style: {
            color: "#000000",
          },
        },
      },
    },
    series: [
      {
        name: "Extra Tasks Added",
        data: selectedSprints.map((sprint) => ({
          name: Object.keys(sprint)[0],
          y: Object.values(sprint)[0].extraTasksAdded,
          extraTaskRatio: (
            (Object.values(sprint)[0].extraTasksAdded /
              Object.values(sprint)[0].plannedTasks) *
            100
          ).toFixed(3),
          color: {
            radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
            stops: [
              [0, "rgba(144, 238, 144, 0.8)"], // Light green
              [1, "rgba(0, 128, 0, 0.8)"], // Dark green
            ],
          },
        })),
      },
    ],
    yAxis: {
      min: 0,
      max: highestValue,
      title: {
        text: "Extra Tasks Added (%)",
      },
    },
    xAxis: {
      categories: selectedSprints.map((sprint) => Object.keys(sprint)[0]),
      labels: {
        enabled: true,
      },
      title: {
        text: "Sprint Number",
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    exporting: {
      buttons: {
        contextButton: {
          menuItems: [
            "printChart",
            "separator",
            "downloadPNG",
            "downloadJPEG",
            "downloadPDF",
            "downloadSVG",
          ],
        },
      },
    },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default ExtraTaskbysprintsChartComponent;
