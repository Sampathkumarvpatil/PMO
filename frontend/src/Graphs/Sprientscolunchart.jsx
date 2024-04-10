import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useLocation } from "react-router-dom";

const SprintsColumnChartComponent = ({ sidebarToggle }) => {
  const location = useLocation();
  const { selectedSprints } = location.state || { selectedSprints: [] };
  const colors = [
    "#FF5733",
    "#33B5FF",
    "#FFC300",
    "#DAF7A6",
    "#C70039",
    "#581845",
  ];

  const chartOptions = {
    chart: {
      type: "column",
      backgroundColor: "rgb(254, 251, 254)",
    },
    title: {
      text: "Planned Tasks by Sprints",
    },
    plotOptions: {
      series: {
        borderRadius: 5,
        dataLabels: {
          enabled: true,
          format: "{y}",
        },
      },
    },
    series: [
      {
        name: "Planned Tasks",
        data: selectedSprints.map((sprint, index) => ({
          name: Object.keys(sprint)[0],
          y: Object.values(sprint)[0]?.plannedTasks,
          color: colors[index % colors.length],
        })),
      },
    ],
    yAxis: {
      min: 0,
      title: {
        text: "Planned Tasks",
      },
    },
    xAxis: {
      categories: selectedSprints.map((sprint) => Object.keys(sprint)[0]),
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

export default SprintsColumnChartComponent;
