import React from "react";
import { Card, CardHeader, CardTitle, CardBody, Row, Col } from "reactstrap";
import Chart from "react-apexcharts";
import "./chartStyle.css";
import { options, series } from "./areaChartOptions";
import "../../../assets/scss/plugins/charts/apex-charts.scss";

class CapacityChart extends React.Component {
  state = {};

  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>میزان پر شدن ظرفیت</CardTitle>
        </CardHeader>
        <CardBody>
          <Chart options={options} series={series} type="area" height={350} />
        </CardBody>
      </Card>
    );
  }
}
export default CapacityChart;
