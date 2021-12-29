import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { ChevronDown } from "react-feather";
import Chart from "react-apexcharts";

import "../../../assets/scss/pages/card-analytics.scss";

let $primary = "#7367F0",
  $success = "#28C76F",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $primary_light = "#9c8cfc",
  $warning_light = "#FFC085",
  $danger_light = "#f29292",
  $success_light = "#43ff6b";

class CapacityPieChart extends React.Component {
  state = {
    options: {
      chart: {
        dropShadow: {
          enabled: false,
          blur: 5,
          left: 1,
          top: 1,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        style: {
          fontSize: "12px",
          fontFamily: "Dana-FaNum, Arial, sans-serif",
        },
      },
      colors: [$success, $warning, $danger],
      fill: {
        type: "gradient",
        gradient: {
          gradientToColors: [$success_light, $warning_light, $danger_light],
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: { show: false },
      stroke: {
        width: 5,
      },
      labels: ["ظرفیت کامل", "ظرفیت نیمه کامل", "ظرفیت خالی"],
    },
    series: [1, 4, 2],
  };
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>میزان ظرفیت</CardTitle>
        </CardHeader>
        <CardBody className="pt-0">
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="pie"
            height={210}
          />
        </CardBody>
        <ListGroup flush>
          <ListGroupItem className="d-flex justify-content-between">
            <div className="item-info">
              <div
                className="bg-success"
                style={{
                  height: "10px",
                  width: "10px",
                  borderRadius: "50%",
                  display: "inline-block",
                  margin: "0 5px",
                }}
              />
              <span className="text-bold-600">کامل</span>
            </div>
            <div className="product-result">
              <span>1</span>
            </div>
          </ListGroupItem>
          <ListGroupItem className="d-flex justify-content-between">
            <div className="item-info">
              <div
                className="bg-warning"
                style={{
                  height: "10px",
                  width: "10px",
                  borderRadius: "50%",
                  display: "inline-block",
                  margin: "0 5px",
                }}
              />
              <span className="text-bold-600">نیمه کامل</span>
            </div>
            <div className="product-result">
              <span>4</span>
            </div>
          </ListGroupItem>
          <ListGroupItem className="d-flex justify-content-between">
            <div className="item-info">
              <div
                className="bg-danger"
                style={{
                  height: "10px",
                  width: "10px",
                  borderRadius: "50%",
                  display: "inline-block",
                  margin: "0 5px",
                }}
              />
              <span className="text-bold-600">خالی</span>
            </div>
            <div className="product-result">
              <span>2</span>
            </div>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  }
}
export default CapacityPieChart;
