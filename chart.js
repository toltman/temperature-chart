import embed from "vega-embed";
import data from "vega-datasets";

data["weather.csv"]().then((weather) => {
  var chart = {
    layer: [
      {
        $schema: "https://vega.github.io/schema/vega-lite/v4.0.json",
        description: "Temperature Ranges in Seattle and New York",
        mark: { type: "area", opacity: 0.3, interpolate: "monotone" },
        encoding: {
          x: {
            field: "date",
            type: "temporal",
            timeUnit: "month",
            title: "Month",
          },
          y: { aggregate: "mean", field: "temp_max", type: "quantitative" },
          y2: {
            aggregate: "mean",
            field: "temp_min",
            type: "qantitative",
            title: "Temperature °C",
          },
          color: {
            field: "location",
            type: "nominal",
            legend: { title: "City" },
          },
        },
        title: { text: "Temperature Ranges by Month", fontSize: 18 },
      },
      {
        $schema: "https://vega.github.io/schema/vega-lite/v4.0.json",
        description: "Temperature Ranges in Seattle and New York",
        mark: { type: "line", interpolate: "monotone" },
        encoding: {
          x: {
            field: "date",
            type: "temporal",
            timeUnit: "month",
            title: "Month",
            axis: { labelFontSize: 14, titleFontSize: 14 },
          },
          y: {
            aggregate: "mean",
            field: "temp_mid",
            type: "quantitative",
            axis: {
              tickCount: 5,
              labelFontSize: 14,
              titleFontSize: 14,
            },
          },
          color: {
            field: "location",
            type: "nominal",
            legend: { title: "City", labelFontSize: 14, titleFontSize: 14 },
          },
        },
      },
    ],
    data: { values: weather },
    transform: [
      {
        calculate: "(datum.temp_max + datum.temp_min) / 2",
        as: "temp_mid",
      },
    ],
    width: 800,
    height: 500,
  };

  embed("#chart", chart);
});
