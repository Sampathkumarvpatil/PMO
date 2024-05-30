import { useEffect } from "react";
import Highcharts from "highcharts";
import "./PieChart.css";
function PieChart({ data }) {
  useEffect(() => {
    if (data) {
      Highcharts.chart("container", {
        chart: {
          type: "pie",
        },
        title: {
          text: "Total Test Result",
        },
        tooltip: {
          valueSuffix: "%",
        },

        plotOptions: {
          series: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: [
              {
                enabled: true,
                distance: 20,
              },
              {
                enabled: true,
                distance: -40,
                format: "{point.percentage:.1f}%",
                style: {
                  fontSize: "1.2em",
                  textOutline: "none",
                  opacity: 0.7,
                },
                filter: {
                  operator: ">",
                  property: "percentage",
                  value: 10,
                },
              },
            ],
          },
        },
        series: [
          {
            name: "Percentage",
            colorByPoint: true,
            data: [
              {
                name: "Pass Rate",
                y:
                  (data?.body?.total_passed / data?.body?.total_test_cases) *
                  100,
                color: "green",
              },
              {
                name: "Fail Rate",
                sliced: true,
                selected: true,
                y:
                  (data?.body?.total_failed / data?.body?.total_test_cases) *
                  100,
                color: "red",
              },
              {
                name: "Skipped Rate",
                y:
                  (data?.body?.total_skipped / data?.body?.total_test_cases) *
                  100,
                color: "yellow",
              },
            ],
          },
        ],
      });
    }
  }, [data]);
  return (
    <figure class="highcharts-figure">
      <div id="container"></div>
    </figure>
  );
}
export default PieChart;
