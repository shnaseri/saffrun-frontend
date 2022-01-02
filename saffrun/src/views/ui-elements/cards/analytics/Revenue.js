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
import isAuthenticated from "./../../../../utility/authenticated";
import axios from "axios";
import urlDomain from "./../../../../utility/urlDomain";
import { history } from "./../../../../history";

class Revenue extends React.Component {
  state = {
    current : 0,
    past : 0,
    loadSpinner: true,
    year: 1400,
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
          formatter: (val) => {
            return val > 999 ? (val / 1000).toFixed(1) + "تومان" : val;
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
        data: [],
      },
      // {
      //   name: "Last Month",
      //   data: [46000, 48000, 45500, 46600, 44500, 46500, 45000, 47000,65000,87123,36500,63000]
      // }
    ],
  };

  async componentDidMount() {
    let authenticated = await isAuthenticated();
    if (!authenticated) history.push("/login");
    this.callCardApi(new Date().getFullYear());
  }
  callCardApi = async (date) => {
    let token = localStorage.getItem("access");
    token = `Bearer ${token}`;
    try {
      let chartData = await axios.get(
        `${urlDomain}/payment/web/get-yearly-details/`,
        {
          headers: { Authorization: token },
          params: { year: date },
        }
      );
      console.log(chartData.data)
      this.setState({
        loadSpinner: false,
        series: [{ name: "تراکنش", data: chartData.data.data }],
        current : chartData.data.current_month,
        past : chartData.data.past_month
      });
    } catch (e) {
      this.setState({ loadSpinner: false });
    }
  };
  setValue = async (e) => {
    this.setState({ loadSpinner: true, year: e.target.childNodes[0].data });
    await this.callCardApi(e.target.value);
  };
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>وضعیت مالی</CardTitle>
          {/* <Settings size={20} className="cursor-pointer text-muted" /> */}
          <UncontrolledDropdown>
            <DropdownToggle className="cursor-pointer" tag="small">
              {this.state.year} <ChevronDown size={10} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem value={2022} onClick={(e) => this.setValue(e)}>
                1401
              </DropdownItem>
              <DropdownItem value={2021} onClick={(e) => this.setValue(e)}>
                1400
              </DropdownItem>
              <DropdownItem value={2020} onClick={(e) => this.setValue(e)}>
                1399
              </DropdownItem>
              <DropdownItem value={2019} onClick={(e) => this.setValue(e)}>
                1398
              </DropdownItem>
              <DropdownItem value={2018} onClick={(e) => this.setValue(e)}>
                1397
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </CardHeader>
        <CardBody>
          <div className="d-flex justify-content-start mb-1">
            <div className="mr-2">
              <p className="mb-50 text-bold-600">این ماه</p>
              <h2 className="text-bold-400">
                <sup className="font-medium-1 mr-50">تومان</sup>
                <span className="text-success">{this.state.current}</span>
              </h2>
            </div>
            <div>
              <p className="mb-50 text-bold-600">ماه قبل</p>
              <h2 className="text-bold-400">
                <sup className="font-medium-1 mr-50">تومان</sup>
                <span>{this.state.past}</span>
              </h2>
            </div>
          </div>
          {!this.state.loadSpinner && (
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              height={285}
            />
          )}
        </CardBody>
      </Card>
    );
  }
}
export default Revenue;
