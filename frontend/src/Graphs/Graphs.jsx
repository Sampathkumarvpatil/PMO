import React from "react";
//import logo from './Images/Infogen-labs-logo-.png';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Highcharts3D from "highcharts/highcharts-3d";
//import Sprints from '../Sprint-Pages/sprints';
import { useLocation } from "react-router-dom";

// Apply the 3D module
Highcharts3D(Highcharts);

const ChartComponent = () => {
  const location = useLocation();
  const plannedTasks = location.state?.plannedTasks || 0;
  console.log("pt", plannedTasks);
  const highestValue = Math.max(plannedTasks);
  //const selectedSprint = location.state?.selectedSprint || 'Sprint';
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
      text: "Planned Tasks",
    },
    plotOptions: {
      series: {
        depth: 25,
        colorByPoint: true,
        dataLabels: {
          enabled: true,
          color: "black",
          format: "{point.name}:{point.y:.2f}",
        },
      },
    },
    series: [
      {
        data: [
          {
            y: plannedTasks,
            name: "Planned Tasks",
            color: {
              radialGradient: { cx: 0.5, cy: 0.5, r: 0.5 },
              stops: [
                [0, "rgba(255,255,255,0.5)"],
                [1, "rgba(0,255,0,0.5)"],
              ],
            },
          },
        ],
        name: "Planned Tasks",
        showInLegend: false,
      },
    ],
    yAxis: {
      min: 0,
      max: highestValue + 10,
      title: {
        text: "",
        style: {
          color: "Black",
        },
      },
      gridLineColor: "black",
      gridLineWidth: 1,
    },
    xAxis: {
      labels: {
        enabled: false,
      },
      gridLineColor: "black",
      gridLineWidth: 1,
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
    <div className="border-2 border-black">
      <div className="h-[100%]">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
      {/* <h1 style={{marginRight:'400px',marginBottom:'10px'}}>KPI's of:{selectedSprint}</h1> */}
      {/* <div>
                <button>sprients page</button>
            </div> */}
    </div>
  );
};

export default ChartComponent;
