import React from "react";
import { Card, CardHeader, CardTitle, CardBody, Row, Col } from "reactstrap";
import Chart from "react-apexcharts";
import Rating from "@mui/material/Rating";
import { Star, Users } from "react-feather";
import "./style1.css";
class SupportTracker extends React.Component {
  state = {
    options: {
      chart: {},
      plotOptions: {
        radialBar: {
          size: 150,
          offsetY: 20,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: "65%",
            fontFamily: "Dana-FaNum",
          },
          track: {
            background: this.props.white,
            strokeWidth: "100%",
          },
          dataLabels: {
            value: {
              offsetY: 30,
              color: "#99a2ac",
              fontSize: "2rem",
              fontFamily: "Dana-FaNum",
            },
          },
        },
      },
      colors: [this.props.danger],
      fill: {
        type: "gradient",
        gradient: {
          // enabled: true,
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: [this.props.primary],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        dashArray: 8,
      },
      labels: ["میزان رضایت"],
    },
  };
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle style={{ fontWeight: "bold" }}>آمار کلی</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col sm="2" className="d-flex flex-column flex-wrap text-center">
              <h1 className="font-large-2 text-bold-600 mt-2 mb-0">
                {this.props.numberUserDate}
              </h1>
              <div className="float-left">
                <Users size="15" className="warning" />
                <span className="ml-50 align-middle">تعداد نظر دهندگان</span>
              </div>

              <hr></hr>

              <h1 className="font-large-2 text-bold-600 mt-2 mb-0">
                {this.props.rate === null ? 0 : this.props.rate}
              </h1>
              <div className="float-left">
                <Star size="15" className="warning" />
                <span className="ml-50 align-middle">امتیاز</span>
              </div>
            </Col>

            <Col sm="10" className="d-flex justify-content-center">
              <Chart
                options={this.state.options}
                series={this.props.rate === null ? [0] :[parseInt(parseFloat(this.props.rate) * 20)]}
                type="radialBar"
                height={350}
                className="support-tracker-card"
              />
            </Col>
          </Row>

          <Row style={{ marginTop: "50px" }}>
            <Col sm="12">
              <div className="chart-info d-flex justify-content-sm-between">
                <div className="text-center">
                  <p className="mb-50"> کل رویداد ها</p>
                  <span className="font-large-1">{this.props.allEvents}</span>
                </div>
                <div className="text-center">
                  <p className="mb-50">رویداد های فعال</p>
                  <span className="font-large-1">
                    {this.props.allEventsActive}
                  </span>
                </div>
                <div className="text-center">
                  <p className="mb-50"> کل نوبت ها</p>
                  <span className="font-large-1">{this.props.allReservs}</span>
                </div>
                <div className="text-center">
                  <p className="mb-50">نوبت های گرفته شده</p>
                  <span className="font-large-1">
                    {this.props.allReservsActive}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}
export default SupportTracker;
