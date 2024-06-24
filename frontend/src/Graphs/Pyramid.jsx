import React, { useEffect } from "react";
import "./Pyramid.css";
import Highcharts from "highcharts";
import Highcharts3D from "highcharts/highcharts-3d";
import Funnel from "highcharts/modules/funnel";
import Pyramid3D from "highcharts/modules/pyramid3d"; // Add this line
import { useLocation } from "react-router-dom";

Highcharts3D(Highcharts);
Funnel(Highcharts);
Pyramid3D(Highcharts); // Add this line

export const Pyramid = () => {
  const location = useLocation();
  const {
    extraTasksAdded = 0,
    plannedTasks,
    extraTasksRate,
    tasksCompleted,
  } = location.state || {};
  const formattedPlannedTasks = Number(tasksCompleted.toFixed(3));
  const formattedExtraTasksAdded = Number(extraTasksAdded.toFixed(3));
  const formattedExtraTasksRate = Number(extraTasksRate.toFixed(3));

  useEffect(() => {
    Highcharts.chart("pyramid", {
      chart: {
        type: "pyramid3d",
        options3d: {
          enabled: true,
          alpha: -10,
          depth: 250,
          viewDistance: 25,
        },
        width: 410,
        height: 340,
        backgroundColor: "rgb(254, 251, 254)",
        borderColor: "black", // Add this line
        borderWidth: 0, // Add this line
      },
      title: {
        text: "Task Completed",
        style: {
          fontSize: "24px",
        },
      },

      plotOptions: {
        series: {
          depth: 25,
          colorByPoint: true,
          dataLabels: {
            enabled: true,
            color: "#000000",
            inside: false,
            style: {
              textOutline: "none",
            },
            y: -10,
            x: -100,
          },
        },
      },
      series: [
        {
          name: "Tasks",
          data: [
            {
              name: "Completed Tasks",
              y: formattedPlannedTasks,
              color: "rgba(54, 162, 235, 0.7)",
              dataLabels: {
                format: "<b>{point.name}</b>: {point.y}",
              },
            },
            {
              name: "Extra Tasks Added",
              y: formattedExtraTasksAdded,
              color: "rgba(255, 99, 132, 0.7)",
              dataLabels: {
                format: "<b>{point.name}</b>: {point.y}",
              },
            },
            {
              name: "Extra Tasks Rate",
              y: formattedExtraTasksRate,
              color: "rgba(255, 206, 86, 0.7)",
              dataLabels: {
                format: "<b>{point.name}</b>: {point.y}%",
              },
            },
          ],
          showInLegend: false,
        },
      ],
      credits: {
        enabled: false,
      },
      yAxis: {
        min: 0,
        max: Math.max(plannedTasks, extraTasksAdded, extraTasksRate) + 10,

        title: {
          text: "",
        },
      },
    });
  }, []);

  return (
    <figure className="highcharts-figure !mt-0">
      <div id="pyramid"></div>
    </figure>
  );
};
