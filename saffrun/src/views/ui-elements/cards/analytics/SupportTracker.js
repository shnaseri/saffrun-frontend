import React from "react";
import { Card, CardHeader, CardTitle, CardBody, Row, Col } from "reactstrap";
import Chart from "react-apexcharts";
import Rating from "@mui/material/Rating";
import { Star , Users } from "react-feather";

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
    series: [83],
  };
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>آمار کلی</CardTitle>
          {/* <UncontrolledDropdown>
            <DropdownToggle className="cursor-pointer" tag="small">
              Last 7 days <ChevronDown size={10} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Last 28 days</DropdownItem>
              <DropdownItem>Last Month</DropdownItem>
              <DropdownItem>Last Year</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
        </CardHeader>
        <CardBody className="pt-0">
          <Row>
            <Col sm="2" className="d-flex flex-column flex-wrap text-center">
              
              <h1 className="font-large-2 text-bold-600 mt-2 mb-0">163</h1>
              <div className="float-left">
                <Users size="15" className="warning" />
                <span className="ml-50 align-middle">تعداد نظر دهندگان</span>
              </div>
              {/* <small>تعداد نظر دهندگان</small> */}
              <hr></hr>
              {/* <Rating className="  mt-2 mb-0" name="read-only" value={3} readOnly /> */}
              <h1 className="font-large-2 text-bold-600 mt-2 mb-0">4.5</h1>
              <div className="float-left">
                <Star size="15" className="warning" />
                <span className="ml-50 align-middle">امتیاز</span>
              </div>
            </Col>

            <Col sm="10" className="d-flex justify-content-center">
              <Chart
                options={this.state.options}
                series={this.state.series}
                type="radialBar"
                height={350}
                className="support-tracker-card"
              />
            </Col>
          </Row>

          <div className="chart-info d-flex justify-content-between">
            <div className="text-center">
              <p className="mb-50"> کل رویداد ها</p>
              <span className="font-large-1">29</span>
            </div>
            <div className="text-center">
              <p className="mb-50">رویداد های فعال</p>
              <span className="font-large-1">29</span>
            </div>
            <div className="text-center">
              <p className="mb-50"> کل نوبت ها</p>
              <span className="font-large-1">63</span>
            </div>
            <div className="text-center">
              <p className="mb-50">نوبت های گرفته شده</p>
              <span className="font-large-1">25</span>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
}
export default SupportTracker;
