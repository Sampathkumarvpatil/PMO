import React from "react";
import ExtraTaskbysprintsChartComponent from "../Graphs/ExtraTaskbysprintsChartComponent";
import WorkEfficiencyRatiochartcomponent from "../Graphs/WorkEfficiencyRatiochart";
import CompletionRateOverviewbysprintsComponent from "../Graphs/CompletionRateOverviewbysprints";
import WordCloudForKpi from "../Graphs/WordCloudForKpi";
import { useNavigate } from "react-router-dom";
import SprientsColumnChartComponent from "../Graphs/Sprientscolunchart";
import Problemdetcationratesprintchart from "../Graphs/Problemdetectionratesprints";

function MultipleGraph({ sidebarToggle }) {
  const navigate = useNavigate();
  return (
    <div className="p-4">
      <div
        className={`transition-all duration-300 ${
          sidebarToggle ? "ml-0" : "ml-64"
        } flex flex-wrap grid grid-cols-3 h-screen overflow-hidden`}
      >
        <SprientsColumnChartComponent sidebarToggle={sidebarToggle} />
        <ExtraTaskbysprintsChartComponent sidebarToggle={sidebarToggle} />
        <WorkEfficiencyRatiochartcomponent sidebarToggle={sidebarToggle} />
        <CompletionRateOverviewbysprintsComponent
          sidebarToggle={sidebarToggle}
        />
        <Problemdetcationratesprintchart sidebarToggle={sidebarToggle} />
        <WordCloudForKpi />
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

export default MultipleGraph;
