import React from "react"
import { Card, CardHeader, CardTitle, CardBody,  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle, } from "reactstrap"
import Chart from "react-apexcharts"
import { ChevronDown } from "react-feather"
class ApexLineCharts extends React.Component {
  state = {
    options: {
      chart: {
        id: "lineChart"
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
          "اسفند"
        ]
      },
      yaxis: {
        fontFamily : "Dana-FaNum",
      },
      stroke: {
        curve: "straight"
      },
      dataLabels: {
        enabled: true,
        style: {
          fontFamily : "Dana-FaNum",
        }

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
        }
      }
    },
    series: [
      {
        name: "نوبت ها",
        data: [10, 20, 15, 3, 21, 42, 33, 14, 7,25,39,33]
      },
      {
        name: "رویداد ها",
        data: [10, 41, 43, 51, 3, 62, 69, 77, 148,32,54,33]
      }
    ]
  }

  render() {
    return (
      <Card style={{height:"450px"}}>
        <CardHeader>
          <CardTitle>وضعیت رویداد ونوبت به تفکیک ماه</CardTitle>
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
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={350}
          />
        </CardBody>
      </Card>
    )
  }
}
export default ApexLineCharts
