import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Highcharts3D from "highcharts/highcharts-3d";
import funnel3d from "highcharts/modules/funnel3d";
import { useLocation } from "react-router-dom";

// Apply the 3D module
Highcharts3D(Highcharts);
// Initialize the funnel3D module
funnel3d(Highcharts);

const ColumnChartComponent = () => {
  const location = useLocation();
  const { inSprintDefectsRatio, postSprintDefectsRatio } = location.state || {
    inSprintDefectsRatio: 0,
    postSprintDefectsRatio: 0,
  };
  const highestValue = Math.max(inSprintDefectsRatio, postSprintDefectsRatio);
  console.log(location.state);
  const chartOptions = {
    chart: {
      type: "column",
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 5,
        depth: 50,
        viewDistance: 25,
      },
      width: 410,
      height: 340,
      backgroundColor: "rgb(254, 251, 254)",
      borderColor: "black", // Add this line
      borderWidth: 0, // Add this line
    },
    title: {
      text: "Problem Detection Rates",
    },
    plotOptions: {
      funnel3d: {
        depth: 50,
        center: ["50%", "50%"],
        width: "80%",
        showInLegend: false,
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b> ({point.y:,.0f}%)",
          allowOverlap: true,
          y: 10,
        },
      },
    },
    series: [
      {
        name: "Problem Detection Rates",
        data: [
          {
            name: "In Sprint Defects Ratio",
            y: inSprintDefectsRatio,
            color: "rgba(255, 99, 132, 0.5)",
            dataLabels: {
              enabled: true,
              inside: true,
              verticalAlign: "top",
              formatter: function () {
                return `In Sprint Defects Ratio: ${this.y.toFixed(3)}`;
              },
              color: "black",
            },
          },
          {
            name: "Post Sprint Defects Ratio",
            y: postSprintDefectsRatio,
            color: "rgba(54, 162, 235, 0.5)",
            dataLabels: {
              enabled: true,
              inside: true,
              verticalAlign: "top",
              formatter: function () {
                return `Post Sprint Defects Ratio: ${this.y.toFixed(3)}`;
              },
              color: "black",
            },
          },
        ],
        showInLegend: false,
      },
    ],

    yAxis: {
      min: 0,
      max: highestValue + 10,
      title: {
        text: "Percentage (%)",
      },
    },
    xAxis: {
      labels: {
        enabled: false,
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
            "downloadPNG",
            "downloadJPEG",
            "downloadPDF",
            "downloadSVG",
            {
              text: "View data table",
              onclick: function () {
                this.viewData();
              },
            },
          ],
        },
      },
    },
  };

  return (
    <div className="border-2 border-black flex justify-center">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default ColumnChartComponent;
