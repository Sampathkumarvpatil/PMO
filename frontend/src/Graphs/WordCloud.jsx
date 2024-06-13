import { useEffect } from "react";
import Highcharts from "highcharts";
import "./WordCloud.css";
import wordcloud from "highcharts/modules/wordcloud";

wordcloud(Highcharts);

function WordCloud({ data }) {
  useEffect(() => {
    if (data) {
      let wordData = [];

      if (data?.body?.passed_results) {
        wordData = [
          ...wordData,
          ...data.body.passed_results.map((res) => ({
            name: res?.method_name,
            weight: Number(res?.execution_time?.split(" ")[0] ?? "0"),
          })),
        ];
      }

      if (data?.body?.failed_results) {
        wordData = [
          ...wordData,
          ...data.body.failed_results.map((res) => ({
            name: res?.method_name,
            weight: Number(res?.execution_time?.split(" ")[0] ?? "0"),
          })),
        ];
      }

      if (data?.body?.skipped_results) {
        wordData = [
          ...wordData,
          ...data.body.skipped_results.map((res) => ({
            name: res?.method_name,
            weight: Number(res?.execution_time?.split(" ")[0] ?? "0"),
          })),
        ];
      }

      Highcharts.chart("wordCloud", {
        accessibility: {
          screenReaderSection: {
            beforeChartFormat:
              "<h5>{chartTitle}</h5>" +
              "<div>{chartSubtitle}</div>" +
              "<div>{chartLongdesc}</div>" +
              "<div>{viewTableButton}</div>",
          },
        },
        series: [
          {
            type: "wordcloud",
            data: wordData,
            name: "seconds",
          },
        ],
        title: {
          text: `Execution Time Word Cloud: Visualizing ${data?.body?.class_name} Durations`,
          align: "left",
        },
        tooltip: {
          headerFormat:
            '<span style="font-size: 16px"><b>{point.key}</b></span><br>',
        },
      });
    }
  }, [data]);

  return (
    <figure className="highcharts-figure">
      <div id="wordCloud"></div>
    </figure>
  );
}

export default WordCloud;
