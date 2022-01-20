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
import isAuthenticated from "./../../../utility/authenticated";
import axios from "axios";
import urlDomain from "./../../../utility/urlDomain";
import { history } from "./../../../history";
import "./chartStyle.css";
class ApexLineCharts extends React.Component {
  state = {
    loadSpinner: true,
    year: 1400,
    options: {
      chart: {
        id: "lineChart",
      },
      xaxis: {
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
      },
      yaxis: {
        fontFamily: "Dana-FaNum",
        labels: {
          offsetX: -22,
          offsetY: 0,
        },
      },
      stroke: {
        curve: "straight",
      },
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: "Dana-FaNum",
        },
      },
      // title: {
      //   text: "وضعیت رویداد ونوبت ها",
      //   align: "left"
      // },

      colors: this.props.themeColors,
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
    },
    series: [
      {
        name: " نوبت‌ها ",
        data: [],
      },
      {
        name: " رویدادها ",
        data: [],
      },
    ],
  };
  fillDataList = (data) => {
    let reservData = [];
    let eventData = [];
    data.map((obj) => {
      reservData.push(obj.reserve);
      eventData.push(obj.event);
    });
    let series = [...this.state.series];
    series[0].data = reservData;
    series[1].data = eventData;
    this.setState(series);
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
        `${urlDomain}/core/web/get-yearly-details/`,
        {
          headers: { Authorization: token },
          params: { year: date },
        }
      );
      this.fillDataList(chartData.data.result);
      this.setState({ loadSpinner: false });
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
      <Card style={{ height: "460px" }}>
        <CardHeader>
          <CardTitle>وضعیت رویداد ونوبت به تفکیک ماه</CardTitle>
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
          {!this.state.loadSpinner && (
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              height={350}
            />
          )}
        </CardBody>
      </Card>
    );
  }
}
export default ApexLineCharts;
