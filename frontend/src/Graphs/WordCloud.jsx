import { useEffect } from "react";
import Highcharts from "highcharts";
import "./WordCloud.css";
import wordcloud from "highcharts/modules/wordcloud";

wordcloud(Highcharts);
function WordCloud({ data }) {
  useEffect(() => {
    if (data) {
      const wordData = [
        data?.body?.passed_results?.map((res) => {
          return {
            name: res?.method_name,
            weight: Number(res?.execution_time?.split(" ")[0] ?? "0"),
          };
        }),
        data?.body?.failed_results?.map((res) => {
          return {
            name: res?.method_name,
            weight: Number(res?.execution_time?.split(" ")[0] ?? "0"),
          };
        }),
        data?.body?.skipped_results?.map((res) => {
          return {
            name: res?.method_name,
            weight: Number(res?.execution_time?.split(" ")[0] ?? "0"),
          };
        }),
      ].flat();
      console.log(wordData);
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
            '<span style="font-size: 16px"><b>{point.key}</b>' + "</span><br>",
        },
      });
    }
  }, [data]);
  return (
    <figure class="highcharts-figure">
      <div id="wordCloud"></div>
    </figure>
  );
}
export default WordCloud;
