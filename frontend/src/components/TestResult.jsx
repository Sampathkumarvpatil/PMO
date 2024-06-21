import CylinderGraph from "./CylinderGraph";
import PieChart from "./PieChart";

import SpeedoMeterTotal from "../Graphs/SpeedoMeterTotal";
import SpeedoMeterAvg from "../Graphs/SpeedoMeterAvg";
import ItemChart from "../Graphs/ItemChart";
import WordCloud from "../Graphs/WordCloud";
import { useEffect, useState } from "react";
import HeatMap from "../Graphs/HeatMap";

function TestResult({ reportData, projectName, class_name }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (reportData) {
      setData(reportData);
    }
  }, [reportData]);

  if (!data) {
    return <h2>Loading graphs.....</h2>;
  } else
    return (
      // <section
      //   className={`transition-all duration-300 ${
      //     sidebarToggle ? "ml-0" : "ml-64"
      //   }`}
      // >
      <div className="">
        <div className="flex justify-between">
          <div
            className="mt-8 border shadow px-4 py-3 flex-1 mr-4 rounded-lg transform hover:scale-105 transition-transform duration-300"
            style={{ backgroundColor: "rgb(208 234 235)" }}
          >
            <div className="flex flex-row">
              <h2 className="text-base mb-2">
                Project Name: {data?.body?.project_name ?? projectName}
              </h2>
            </div>
            <div className="flex flex-row">
              <h2 className="text-base mb-2">
                Class Name:{" "}
                {data?.body?.class_name ?? class_name ?? "all_classes"}
              </h2>
            </div>
          </div>
          <div
            className="mt-8 border shadow px-4 py-3 flex-1 mr-4 rounded-lg transform hover:scale-105 transition-transform duration-300"
            style={{ backgroundColor: "rgb(216 216 242)" }}
          >
            <h2 className="text-base mb-2">Total Test Cases</h2>
            <p className="text-base">{data?.body?.total_test_cases}</p>
          </div>
          <div
            className="mt-8 border shadow px-4 py-3 flex-1 mr-4 rounded-lg transform hover:scale-105 transition-transform duration-300"
            style={{ backgroundColor: "rgb(232 255 232)" }}
          >
            <h2 className="text-base mb-2">Test passed</h2>
            <p className="text-base" style={{ color: "green" }}>
              {data?.body?.total_passed ?? 0}
            </p>
          </div>
          <div
            className="mt-8 border shadow px-4 py-3 flex-1 mr-4 rounded-lg transform hover:scale-105 transition-transform duration-300"
            style={{ backgroundColor: "rgb(243 230 230)" }}
          >
            <h2 className="text-base mb-2">Test Failed</h2>
            <p className="text-base" style={{ color: "red" }}>
              {data?.body?.total_failed ?? 0}
            </p>
          </div>
          <div
            className="mt-8 border shadow px-4 py-3 flex-1 mr-4 rounded-lg transform hover:scale-105 transition-transform duration-300"
            style={{ backgroundColor: "rgb(251 255 228)" }}
          >
            <h2 className="text-base mb-2">Test Skipped </h2>
            <p className="text-base" style={{ color: "red" }}>
              {data?.body?.total_skipped ?? 0}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-[49%,49%] justify-between my-6 ">
          <div
            className="chart-container"
            style={{ paddingTop: "44px", border: "1px solid" }}
          >
            <CylinderGraph data={data} />
          </div>
          <div
            className="chart-container"
            style={{ paddingTop: "44px", border: "1px solid" }}
          >
            <HeatMap data={data} />
          </div>
          <div
            className="chart-container"
            style={{
              paddingTop: "44px",
              border: "1px solid",
              marginTop: "30px",
            }}
          >
            <ItemChart data={data} />
          </div>
          <div
            className="chart-container"
            style={{
              paddingTop: "44px",
              border: "1px solid",
              marginTop: "30px",
            }}
          >
            <PieChart data={data} />
          </div>
          <div
            className="chart-container"
            style={{
              paddingTop: "44px",
              border: "1px solid",
              marginTop: "30px",
            }}
          >
            <SpeedoMeterTotal data={data} />
          </div>
          <div
            className="chart-container"
            style={{
              paddingTop: "44px",
              border: "1px solid",
              marginTop: "30px",
            }}
          >
            {/* <BarGraph data={data} /> */}
            <SpeedoMeterAvg data={data} />
          </div>
        </div>
      </div>
    );
}
export default TestResult;
