import { useEffect } from "react";
import Highcharts from "highcharts";
import "./CylinderGraph.css";

function CylinderGraph({ data }) {
  useEffect(() => {
    if (data) {
      let passed = data?.body?.passed_results?.length ?? 0,
        failed = data?.body?.failed_results?.length ?? 0,
        skipped = data?.body?.skipped_results?.length ?? 0,
        total = passed + failed + skipped;

      // if (data?.body?.total_passed?.length > 0)
      //   passed = data?.body?.total_passed?.length;
      // if (data?.body?.total_failed) failed = data?.body?.total_failed?.length;
      // if (data?.body?.total_skipped)
      //   skipped = data?.body?.total_skipped?.length;
      // total = passed + failed + skipped;

      Highcharts.chart("container2", {
        chart: {
          type: "cylinder",
          options3d: {
            enabled: true,
            alpha: 0,
            beta: 0,
            depth: 50,
            viewDistance: 25,
          },
        },
        title: {
          text: "KPI Summary Report",
        },

        xAxis: {
          categories: [
            "Total Test Cases",
            "Total Passed",
            "Total Failed",
            "Total Skipped",
          ],
          title: {
            text: "KPI Summary",
          },
          labels: {
            skew3d: true,
          },
        },
        yAxis: {
          title: {
            margin: 20,
            text: "Count",
          },
          labels: {
            skew3d: true,
          },
        },
        tooltip: {
          headerFormat: "<b>Tests: {point.x}</b><br>",
        },
        plotOptions: {
          series: {
            depth: 25,
            colorByPoint: true,
          },
        },
        series: [
          {
            data: [
              {
                y: total,
                color: "#0000FF",
              },
              { y: passed, color: "#00FF00" },
              { y: failed, color: "#FF0000" },
              { y: skipped, color: "#FFFF00" },
            ],
            name: "Count",
            showInLegend: false,
          },
        ],
      });
    }
  }, [data]);
  return (
    <figure class="highcharts-figure">
      <div id="container2"></div>
    </figure>
  );
}
export default CylinderGraph;
