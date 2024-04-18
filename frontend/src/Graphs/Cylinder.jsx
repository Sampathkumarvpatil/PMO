import React from "react";
//import logo from './Images/Infogen-labs-logo-.png';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Highcharts3D from "highcharts/highcharts-3d";
import funnel3d from "highcharts/modules/funnel3d";
import HighchartsCylinder from "highcharts/modules/cylinder";
//import './funnel.css'
import { useLocation } from "react-router-dom";

// Apply the 3D module
Highcharts3D(Highcharts);
// Initialize the funnel3D module
funnel3d(Highcharts);
HighchartsCylinder(Highcharts);

const CylinderChartComponent = () => {
  const location = useLocation();
  const { workEfficiencyRatio, plannedWorkHours, workHoursUsed } =
    location.state || {
      workEfficiencyRatio: 0,
      plannedWorkHours: 0,
      workHoursUsed: 0,
    };
  const highestValue = Math.max(plannedWorkHours, workHoursUsed);

  const chartOptions = {
    chart: {
      type: "cylinder",
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 5,
        depth: 50,
        viewDistance: 25,
      },
      width: 400,
      height: 340,
      backgroundColor: "rgb(254, 251, 254)",
      borderColor: "black", // Add this line
      borderWidth: 0, // Add this line
    },
    title: {
      text: "Work efficiency Ratio",
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
    title: {
      text: `Work Efficiency Ratio: ${workEfficiencyRatio.toFixed(3)}%`,
    },
    series: [
      {
        name: "Work efficiency Ratio",
        data: [
          {
            name: "Planned Work hours",
            y: plannedWorkHours,
            color: "rgba(255, 99, 132, 0.5)",
            dataLabels: {
              enabled: true,
              inside: true,
              verticalAlign: "top",
              formatter: function () {
                return `Planned Work hours: ${this.y.toFixed(3)}`;
              },
              color: "black",
            },
          },
          {
            name: "Work Hours used",
            y: workHoursUsed,
            workEfficiencyRatio,
            color: "rgba(54, 162, 235, 0.5)",
            dataLabels: {
              enabled: true,
              inside: true,
              verticalAlign: "top",
              formatter: function () {
                return `Work Hours used:${this.y.toFixed(3)}`;
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

export default CylinderChartComponent;
