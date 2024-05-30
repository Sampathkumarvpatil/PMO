import { useEffect } from "react";
import Highcharts from "highcharts";
import "./SpeedoMeterAvg.css";

function SpeedoMeterAvg({ data }) {
  useEffect(() => {
    if (data) {
      const totalTime = data?.body?.passed_results?.reduce(
        (acc, current) => acc + Number(current?.execution_time?.split(" ")[0]),
        data?.body?.failed_results?.reduce(
          (acc, current) =>
            acc + Number(current?.execution_time?.split(" ")[0]),
          data?.body?.skipped_results?.reduce(
            (acc, current) =>
              acc + Number(current?.execution_time?.split(" ")[0]),
            0
          )
        )
      );
      const totalMethods =
        data?.body?.passed_results?.length +
        data?.body?.failed_results?.length +
        data?.body?.skipped_results?.length;

      const avgTime = Math.floor(totalTime / totalMethods);

      Highcharts.chart("spedoAvg", {
        chart: {
          type: "gauge",
        },

        title: {
          text: "Average execution time per method",
        },

        pane: {
          startAngle: -150,
          endAngle: 150,
          background: {
            backgroundColor: "transparent",
            borderWidth: 0,
          },
        },

        // The value axis
        yAxis: {
          min: 0,
          max: 120,

          minorTickInterval: 0,
          tickColor: "#ffffff",
          tickLength: 40,
          tickPixelInterval: 40,
          tickWidth: 2,
          lineWidth: 0,
          title: {
            text: "seconds",
          },
          labels: {
            distance: 15,
          },
          // Plot bands with rounded corners. To avoid the bands having rounded
          // corners in the transitions between them, we apply a trick. For the
          // first and the last band we apply rounded corners, but let them extend
          // behind the middle one. The middle one is not rounded, but has a
          // higher zIndex to be above the other two.
          plotBands: [
            {
              from: 1,
              to: 70,
              color: "#55BF3B",
              innerRadius: "82%",
              borderRadius: "50%",
            },
            {
              from: 50,
              to: 90,
              color: "#DDDF0D",
              innerRadius: "82%",
              zIndex: 1,
            },
            {
              from: 70,
              to: 119,
              color: "#DF5353",
              innerRadius: "82%",
              borderRadius: "50%",
            },
          ],
        },

        series: [
          {
            name: "Average running time per method",
            data: [avgTime],
            dataLabels: {
              borderWidth: 0,
              style: {
                fontSize: "2em",
              },
            },
            tooltip: {
              valueSuffix: "seconds",
            },
          },
        ],
      });
    }
  }, [data]);
  return (
    <figure class="highcharts-figure">
      <div id="spedoAvg"></div>
    </figure>
  );
}
export default SpeedoMeterAvg;
