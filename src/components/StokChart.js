import React, { Component } from "react";
import CanvasJSReact from "../assets/canvasjs.stock.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

class StokChart extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints: [], isLoaded: false };
  }

  componentDidMount() {
    fetch("https://canvasjs.com/data/gallery/react/btcusd2017-18.json")
      .then((res) => res.json())
      .then((data) => {
        var dps = [];
        for (var i = 0; i < data.length; i++) {
          dps.push({
            x: new Date(data[i].date),
            y: Number(data[i].close),
          });
        }
        this.setState({
          isLoaded: true,
          dataPoints: dps,
        });
      });
  }

  render() {
    const options = {
      theme: "light2",
      subtitles: [
        {
          text: "",
        },
      ],
      charts: [
        {
          axisX: {
            crosshair: {
              enabled: true,
              snapToDataPoint: false,
              valueFormatString: "MMM DD YYYY",
            },
          },
          axisY: {
            prefix: "$",
            crosshair: {
              enabled: true,
              snapToDataPoint: false,
              valueFormatString: "$#,###.##",
            },
          },
          toolTip: {
            shared: true,
          },
          data: [
            {
              name: "Price (in USD)",
              type: "splineArea",
              color: "lightgreen",
              yValueFormatString: "$#,###.##",
              xValueFormatString: "MMM DD YYYY",
              dataPoints: this.state.dataPoints,
            },
          ],
        },
      ],
      navigator: {
        slider: {
          minimum: new Date("2017-05-01"),
          maximum: new Date("2023-05-01"),
        },
      },
    };
    const containerProps = {
      width: "100%",
      height: "450px",
      margin: "auto",
    };
    return (
      <div>
        <div style={{ marginTop: "80px" }}>
          {this.state.isLoaded && (
            <CanvasJSStockChart
              containerProps={containerProps}
              options={options}
            />
          )}
        </div>
      </div>
    );
  }
}

export default StokChart;
