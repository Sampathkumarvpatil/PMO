import React from "react";
import ChartComponent from "../Graphs/Graphs";
import GaugeChartComponent from "../Graphs/Gauge";
import FunnelChartComponent from "../Graphs/funnel";
import SpeedometerChartComponent from "../Graphs/Speedoneeter";
import CylinderChartComponent from "../Graphs/Cylinder";
import ColumnChartComponent from "../Graphs/Column";
import { useNavigate } from "react-router-dom";
import { Pyramid } from "../Graphs/Pyramid";

function Chart({ sidebarToggle }) {
  const navigate = useNavigate();
  return (
    <div className="p-2">
      <div
        className={`transition-all duration-300 ${
          sidebarToggle ? "ml-0" : "ml-64"
        } flex flex-wrap grid grid-cols-3 overflow-hidden`}
      >
        <ChartComponent className="col-span-3 md:col-span-1" />
        <Pyramid className="col-span-3 md:col-span-1" />
        <FunnelChartComponent className="col-span-3 md:col-span-1" />
        <SpeedometerChartComponent className="col-span-3 md:col-span-1" />
        <CylinderChartComponent className="col-span-3 md:col-span-1" />
        <ColumnChartComponent className="col-span-3 md:col-span-1" />
      </div>
      <div className="flex items-center justify-center m-4 p4">
        <button className="animated-button2" onClick={() => navigate("/KPI's")}>
          <svg
            viewBox="0 0 24 24"
            class="arr-2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.8284 10.9999L14.1924 5.63589L12.7782 4.22168L5 11.9999L12.7782 19.778L14.1924 18.3638L8.8284 12.9999H21V10.9999H8.8284Z"></path>
          </svg>
          <span class="text">Back</span>
          <span class="circle"></span>
          <svg
            viewBox="0 0 24 24"
            class="arr-1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.8284 10.9999L14.1924 5.63589L12.7782 4.22168L5 11.9999L12.7782 19.778L14.1924 18.3638L8.8284 12.9999H21V10.9999H8.8284Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Chart;
