import { useEffect } from "react";
import Highcharts from "highcharts";
import heatmap from "highcharts/modules/heatmap";
import "./HeatMap.css";

// Initialize the heatmap module
heatmap(Highcharts);

Highcharts.Templating.helpers.substr = (s, from, length) =>
  s.substr(from, length);

function HeatMap({ data }) {
  useEffect(() => {
    if (data?.body?.trend) {
      const trendData = data?.body?.trend;
      const dates = Object.keys(trendData);
      const reversedDateKeys = dates.map((date) => {
        const [year, month, day] = date.split("-");
        return `${day}-${month}-${year}`;
      });

      const MatrixData = [];

      for (let i = 0; i < dates.length; i++) {
        MatrixData.push([i, 0, trendData[dates[i]]["skipped"]]);
        MatrixData.push([i, 1, trendData[dates[i]]["failed"]]);
        MatrixData.push([i, 2, trendData[dates[i]]["passed"]]);
      }

      Highcharts.chart("heatmap", {
        chart: {
          type: "heatmap",
          marginTop: 40,
          marginBottom: 80,
          plotBorderWidth: 1,
        },
        title: {
          text: "Test Result Heatmap (Weekly Aggregated)",
          style: {
            fontSize: "1em",
          },
        },
        xAxis: {
          categories: reversedDateKeys,
        },
        yAxis: {
          categories: ["Skipped", "Failed", "Passed"],
          title: null,
          reversed: true,
        },
        accessibility: {
          point: {
            descriptionFormat:
              "{(add index 1)}. " +
              "{series.xAxis.categories.(x)} sales " +
              "{series.yAxis.categories.(y)}, {value}.",
          },
        },
        colorAxis: {
          min: 0,
          minColor: "#FFFFFF",
          maxColor: Highcharts.getOptions().colors[0],
        },
        legend: {
          align: "right",
          layout: "vertical",
          margin: 0,
          verticalAlign: "top",
          y: 25,
          symbolHeight: 280,
        },
        tooltip: {
          format:
            "<b>{point.value}</b> tests on <br>" +
            "<b>{series.xAxis.categories.(point.x)}</b> <br>" +
            "<b>{series.yAxis.categories.(point.y)}</b>",
        },
        series: [
          {
            name: "Sales per employee",
            borderWidth: 1,
            data: [...MatrixData],
            dataLabels: {
              enabled: true,
              color: "#000000",
            },
          },
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                yAxis: {
                  labels: {
                    format: "{substr value 0 7}",
                  },
                },
              },
            },
          ],
        },
      });
    }
  }, [data?.body?.trend]);

  return (
    <figure className="highcharts-figure !mt-0">
      <div id="heatmap"></div>
    </figure>
  );
}

export default HeatMap;
