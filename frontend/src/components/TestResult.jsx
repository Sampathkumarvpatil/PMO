import CylinderGraph from "./CylinderGraph";
import PieChart from "./PieChart";
import { useFetchTestReport } from "../utils/useFetchTestReport";
import ExecutionTimeGraph from "../Graphs/ExecutionTimeGraph";
import SpeedoMeterTotal from "../Graphs/SpeedoMeterTotal";
import SpeedoMeterAvg from "../Graphs/SpeedoMeterAvg";
import ItemChart from "../Graphs/ItemChart";
import WordCloud from "../Graphs/WordCloud";

function TestResult({ sidebarToggle }) {
  const { data } = useFetchTestReport();

  return (
    // <section
    //   className={`transition-all duration-300 ${
    //     sidebarToggle ? "ml-0" : "ml-64"
    //   }`}
    // >
    <div className="">
      <div className="flex justify-between">
        <div
          className="mt-8 border shadow px-4 py-3 flex-1 mr-4 rounded-lg"
          style={{ backgroundColor: "#b6e7e9" }}
        >
          <div className="flex flex-row">
            <h2 className="text-base mb-2">Project Name:</h2>
            <p className="text-sm" style={{marginTop:'3px'}}>
              {data?.body?.project_name}
            </p>
          </div>
          <div className="flex flex-row">
            <h2 className="text-base mb-2">Class Name:</h2>
            <p className="text-sm" style={{marginTop:'2px'}}>
              {data?.body?.class_name}
            </p>
          </div>
        </div>
        <div
          className="mt-8 border shadow px-4 py-3 flex-1 mr-4 rounded-lg"
          style={{ backgroundColor: "#b6e7e9" }}
        >
          <h2 className="text-base mb-2">Total Test Cases</h2>
          <p className="text-base">{data?.body?.total_test_cases}</p>
        </div>
        <div
          className="mt-8 border shadow px-4 py-3 flex-1 mr-4 rounded-lg"
          style={{ backgroundColor: "#c0ebc0" }}
        >
          <h2 className="text-base mb-2">Test passed</h2>
          <p className="text-base" style={{ color: "green" }}>
            {data?.body?.total_passed}
          </p>
        </div>
        <div
          className="mt-8 border shadow px-4 py-3 flex-1 mr-4 rounded-lg"
          style={{ backgroundColor: "#efc7c7" }}
        >
          <h2 className="text-base mb-2">Test Failed</h2>
          <p className="text-base" style={{ color: "red" }}>
            {data?.body?.total_failed}
          </p>
        </div>
        <div
          className="mt-8 border shadow px-4 py-3 flex-1 mr-4 rounded-lg"
          style={{ backgroundColor: "#e9f5a9" }}
        >
          <h2 className="text-base mb-2">Test Skipped </h2>
          <p className="text-base" style={{ color: "red" }}>
            {data?.body?.total_skipped}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-[49%,49%] justify-between my-6 ">
        <div style={{ paddingTop: "44px", border: "1px solid" }}>
          <CylinderGraph data={data} />
        </div>
        <div
          className="chart-container"
          style={{ paddingTop: "44px", border: "1px solid" }}
        >
          <ItemChart data={data} />
        </div>
        <div
          className="chart-container"
          style={{ paddingTop: "44px", border: "1px solid", marginTop: "30px" }}
        >
          <WordCloud data={data} />
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
