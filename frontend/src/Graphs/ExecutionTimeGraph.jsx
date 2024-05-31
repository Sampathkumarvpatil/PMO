import { useEffect } from "react";
import Highcharts, { color } from "highcharts";
import "./ExecutionTimeGraph.css";
import Timeline from "highcharts/modules/timeline";
Timeline(Highcharts);
function ExecutionTimeGraph({ data }) {
  useEffect(() => {
    if (data) {
      const categories = [
        data?.body?.passed_results?.map((res) => {
          return {
            method_name: res?.method_name,
            execution_time: res?.execution_time,
            status: res?.status,
          };
        }),
        data?.body?.failed_results?.map((res) => {
          return {
            method_name: res?.method_name,
            execution_time: res?.execution_time,
            status: res?.status,
          };
        }),

        data?.body?.skipped_results?.map((res) => {
          return {
            method_name: res?.method_name,
            execution_time: res?.execution_time,
            status: res?.status,
          };
        }),
      ].flat();
      console.log(categories);
      Highcharts.chart("execution", {
        chart: {
          type: "timeline",
        },
        xAxis: {
          visible: false,
        },
        yAxis: {
          visible: false,
        },
        title: {
          text: "Execution Time and Status per Method",
        },

        series: [
          {
            dataLabels: {
              connectorColor: "silver",
              connectorWidth: 2,
            },
            data: [
              ...categories?.map((cat) => {
                return {
                  name: cat?.method_name,
                  label: `${cat?.status}: ${cat?.execution_time}`,
                  description: `${cat?.method_name} executes in ${cat.execution_time} and ${cat?.status}`,
                  color:
                    cat?.status === "PASSED"
                      ? "green"
                      : cat?.status === "FAILED"
                      ? "red"
                      : "blue",
                };
              }),
            ],
          },
        ],
      });
    }
  }, [data]);
  return (
    <figure class="highcharts-figure !mt-0">
      <div id="execution"></div>
    </figure>
  );
}
export default ExecutionTimeGraph;
