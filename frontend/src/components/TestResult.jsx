import CylinderGraph from "./CylinderGraph";
import PieChart from "./PieChart";

import { useFetchTestReport } from "../utils/useFetchTestReport";
import ExecutionTimeGraph from "../Graphs/ExecutionTimeGraph";
import SpeedoMeterTotal from "../Graphs/SpeedoMeterTotal";
import SpeedoMeterAvg from "../Graphs/SpeedoMeterAvg";

function TestResult({ sidebarToggle }) {
  const { data } = useFetchTestReport();

  return (
    <section
      className={`transition-all duration-300 ${
        sidebarToggle ? "ml-0" : "ml-64"
      }`}
    >
      <div className="ml-12 mr-8">
        <div className="flex justify-between">
          <div
            className="mt-8 border shadow px-4 py-6 flex-1 mr-4"
            style={{ backgroundColor: "#b6e7e9" }}
          >
            <h2 className="text-xl mb-4">Project Name/Class Name</h2>
            <p className="text-2xl">
              {data?.body?.project_name}/{data?.body?.class_name}
            </p>
          </div>
          <div
            className="mt-8 border shadow px-4 py-6 flex-1 mr-4"
            style={{ backgroundColor: "#b6e7e9" }}
          >
            <h2 className="text-xl mb-4">Total Test Cases</h2>
            <p className="text-2xl">{data?.body?.total_test_cases}</p>
          </div>
          <div
            className="mt-8 border shadow px-4 py-6 flex-1 mr-4"
            style={{ backgroundColor: "#c0ebc0" }}
          >
            <h2 className="text-xl mb-4">Test passed</h2>
            <p className="text-2xl" style={{ color: "green" }}>
              {data?.body?.total_passed}
            </p>
          </div>
          <div
            className="mt-8 border shadow px-4 py-6 flex-1 mr-4"
            style={{ backgroundColor: "#efc7c7" }}
          >
            <h2 className="text-xl mb-4">Test Failed</h2>
            <p className="text-2xl" style={{ color: "red" }}>
              {data?.body?.total_failed}
            </p>
          </div>
          <div
            className="mt-8 border shadow px-4 py-6 flex-1 mr-4"
            style={{ backgroundColor: "#efc7c7" }}
          >
            <h2 className="text-xl mb-4">Test Skipped </h2>
            <p className="text-2xl" style={{ color: "red" }}>
              {data?.body?.total_skipped}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-[33%,33%,33%] justify-between my-12 ">
          <div style={{ paddingTop: "44px", border: "1px solid" }}>
            <CylinderGraph data={data} />
          </div>
          <div
            className="chart-container"
            style={{ paddingTop: "44px", border: "1px solid" }}
          >
            {/* <ReportPieChart data={data} /> */}
            Fail test data came here..
          </div>
          <div
            className="chart-container"
            style={{ paddingTop: "44px", border: "1px solid" }}
          >
            <ExecutionTimeGraph data={data} />
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
    </section>
  );
}
export default TestResult;
