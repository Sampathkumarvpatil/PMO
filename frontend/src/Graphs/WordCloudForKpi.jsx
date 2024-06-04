import { useEffect } from "react";
import Highcharts from "highcharts";
import "./WordCloud.css";
import wordcloud from "highcharts/modules/wordcloud";
import { useLocation } from "react-router-dom";

wordcloud(Highcharts);
function WordCloudForKpi() {
  const location = useLocation();
  const { selectedSprints } = location.state || { selectedSprints: [] };

  useEffect(() => {
    if (selectedSprints) {
      const wordData = selectedSprints?.map((sprint) => {
        return {
          name: sprint?.sprintName,
          weight: sprint?.workHoursUsed,
        };
      });

      Highcharts.chart("wordCloudKpi", {
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
          text: `Sprints based on worked hours`,
          align: "left",
        },

        tooltip: {
          headerFormat:
            '<span style="font-size: 16px"><b>{point.key}</b>' + "</span><br>",
        },
      });
    }
  }, [selectedSprints]);
  return (
    <figure class="highcharts-figure">
      <div id="wordCloudKpi"></div>
    </figure>
  );
}
export default WordCloudForKpi;
