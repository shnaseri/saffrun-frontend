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
} from "reactstrap";
import Chart from "react-apexcharts";
import { ChevronDown } from "react-feather";
import { Settings } from "react-feather";

class Revenue extends React.Component {
  state = {
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        animations: {
          enabled: false,
        },
      },
      stroke: {
        curve: "smooth",
        dashArray: [0, 8],
        width: [4, 2],
      },
      grid: {
        borderColor: this.props.labelColor,
      },
      legend: {
        show: false,
      },
      colors: [this.props.dangerLight, this.props.strokeColor],

      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          inverseColors: false,
          gradientToColors: [this.props.primary, this.props.strokeColor],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
      markers: {
        size: 0,
        hover: {
          size: 5,
        },
      },
      xaxis: {
        labels: {
          style: {
            colors: this.props.strokeColor,
          },
        },
        axisTicks: {
          show: false,
        },
        categories: [
          "فروردین",
          "اردیبهشت",
          "خرداد",
          "تیر",
          "مرداد",
          "شهریور",
          "مهر",
          "آبان",
          "آذر",
          "دی",
          "بهمن",
          "اسفند",
        ],
        axisBorder: {
          show: false,
        },
        tickPlacement: "on",
      },
      yaxis: {
        tickAmount: 5,
        labels: {
          style: {
            color: this.props.strokeColor,
          },
          offsetX: -45,
          offsetY: 0,
          formatter: (val) => {
            return val > 999 ? (val / 1000) + "تومان" : val;
          },
        },
      },
      tooltip: {
        x: { show: false },
      },
    },
    series: [
      {
        name: "تراکنش",
        data: [
          45000,
          47000,
          44800,
          47500,
          45500,
          48000,
          46500,
          48600,
          5420,
          65000,
          25000,
          15400,
        ],
      },
      // {
      //   name: "Last Month",
      //   data: [46000, 48000, 45500, 46600, 44500, 46500, 45000, 47000,65000,87123,36500,63000]
      // }
    ],
  };
  render() {
    return (
      <Card style={{ height: "460px" }}>
        <CardHeader>
          <CardTitle>وضعیت مالی</CardTitle>
          {/* <Settings size={20} className="cursor-pointer text-muted" /> */}
          <UncontrolledDropdown>
            <DropdownToggle className="cursor-pointer" tag="small">
              انتخاب سال <ChevronDown size={10} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>1400</DropdownItem>
              <DropdownItem>1399</DropdownItem>
              <DropdownItem>1398</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </CardHeader>
        <CardBody>
          <div className="d-flex justify-content-center mb-1">
            <div className="mr-2">
              <p className="mb-50 text-bold-600">این ماه</p>
              <h2 className="text-bold-400">
                <sup className="font-medium-1 mr-50">تومان</sup>
                <span className="text-success">86,589</span>
              </h2>
            </div>
            <div>
              <p className="mb-50 text-bold-600">ماه قبل</p>
              <h2 className="text-bold-400">
                <sup className="font-medium-1 mr-50">تومان</sup>
                <span>73,683</span>
              </h2>
            </div>
          </div>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={285}
          />
        </CardBody>
      </Card>
    );
  }
}
export default Revenue;
