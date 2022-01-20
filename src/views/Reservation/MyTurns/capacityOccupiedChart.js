import React from "react";
import { Card, CardHeader, CardTitle, CardBody, Row, Col } from "reactstrap";
import Chart from "react-apexcharts";
import "./chartStyle.css";
import { options, series } from "./areaChartOptions";
import "../../../assets/scss/plugins/charts/apex-charts.scss";

class CapacityChart extends React.Component {
  state = {};
  makeCorrectHour = (dateStr) => {
    let date = new Date(dateStr);
    return `${this.twoDigitsFromat(date.getHours())}:${this.twoDigitsFromat(
      date.getMinutes()
    )}`;
  };
  twoDigitsFromat = (time) => {
    return ("0" + time).slice(-2);
  };
  loadData = () => {
    let data = this.props.data ? this.props.data : [];
    let Xaxis = data.map((item) => this.makeCorrectHour(item.start_datetime));
    let Yaxis = data.map((item) => item.percent_full);
    return { Xaxis, Yaxis };
  };
  XAxis = (xLabels) => {
    let xaxis = options.xaxis;
    xaxis.categories = xLabels;
    return { ...options, xaxis };
  };
  render() {
    let data = this.loadData();
    let YAxis = [
      {
        name: "data",
        data: data.Yaxis,
      },
    ];

    return (
      <Card>
        <CardHeader>
          <CardTitle>میزان پر شدن ظرفیت</CardTitle>
        </CardHeader>
        <CardBody>
          <Chart
            options={this.XAxis(data.Xaxis)}
            series={YAxis}
            type="area"
            height={350}
          />
        </CardBody>
      </Card>
    );
  }
}
export default CapacityChart;
