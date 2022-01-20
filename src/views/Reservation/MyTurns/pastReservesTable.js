import React, { Component } from "react";
import { Badge, UncontrolledTooltip } from "reactstrap";
import DataTable from "react-data-table-component";
import { history } from "../../../history";
import { ChevronLeft, ChevronRight } from "react-feather";
import ReactPaginate from "react-paginate";
import "../../../assets/scss/plugins/extensions/react-paginate.scss";

class PastTable extends Component {
  state = {
    columns: [
      {
        name: "تاریخ رزرو",
        selector: "date",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span className="d-block text-bold-500 text-truncate mb-0">
                {this.dateConverter(row.date)}
              </span>
              <small>{this.dayOfWeek(row.date)}</small>
            </div>
          </div>
        ),
      },
      {
        name: "نوبت‌های پرشده",
        selector: "fill",
        center: true,
        sortable: true,
        cell: (row) => (
          <React.Fragment>
            <UncontrolledTooltip
              placement="top"
              target={this.genereateUniqueID(row.date, "fill")}
            >
              {row.fill} 
              {" "}
               نوبت از تعداد کل 
               {" "}
              {row.fill + row.available}
              {" "} 
              نوبت شما پر شده‌است.
            </UncontrolledTooltip>
            <p
              id={this.genereateUniqueID(row.date, "fill")}
              className="text-bold-500 text-truncate mb-0"
            >
              {row.fill}
            </p>
          </React.Fragment>
        ),
      },
      {
        center: true,
        name: "نوبت‌های رزرو نشده ",
        selector: "available",
        sortable: true,
        cell: (row) => <p className="text-bold-500 mb-0">{row.available}</p>,
      },
      {
        center: true,
        name: "میزان رزرو",
        cell: (row) => (
          <React.Fragment>
            <UncontrolledTooltip
              placement="top"
              target={this.genereateUniqueID(row.date, "percentage")}
            >
              {this.calculateFillPercentage(row)}٪ از نوبت های شما پرشده‌است
            </UncontrolledTooltip>
            <Badge
              id={this.genereateUniqueID(row.date, "percentage")}
              color={this.defineColor(this.calculateFillPercentage(row))}
              pill
            >
              {this.calculateFillPercentage(row)}%
            </Badge>
          </React.Fragment>
        ),
      },
    ],
  };
  calculateFillPercentage = (row) => {
    return Math.floor(
      (row.fill / (row.available + row.fill)) * 100
    );
  };
  defineColor = (num) => {
    if (num < 25) return "light-success";
    if (num < 75) return "light-warning";
    return "light-danger";
  };
  genereateUniqueID = (date, str) => {
    return `${str}ـ${date.split("-").join("")}`;
  };
  dateConverter = (date) => {
    return new Date(date).toLocaleDateString("fa-IR");
  };
  correctHour = (hourStr) => {
    try {
      let splitted = hourStr.split(":");
      return `${splitted[0]}:${splitted[1]}`;
    } catch (e) {
      return "خالی";
    }
  };
  dayOfWeek = (date) => {
    var days = {
      0: "یکشنبه",
      1: "دوشنبه",
      2: "سه‌شنبه",
      3: "چهارشنبه",
      4: "پنج‌شنبه",
      5: "جمعه",
      6: "شنبه",
    };
    return days[new Date(date).getDay()];
  };
  pageChanged = async (data) => {
    await this.props.pastPageChanged(data.selected + 1);
  };
  render() {
    let { columns } = this.state;
    let pastReserves = this.props.pastReserves;
    return (
      <React.Fragment>
        <DataTable
          data={pastReserves}
          columns={columns}
          noHeader
          highlightOnHover
          responsive
          onRowClicked={(e) => history.push(`reserve-detail/${e.date}`)}
          pointerOnHover
          noDataComponent="آیتمی برای نشان دادن نیست."
        />
        <ReactPaginate
          previousLabel={<ChevronLeft size="15" />}
          nextLabel={<ChevronRight size="15" />}
          breakLabel={"..."}
          breakClassName={"break-me"}
          forcePage={this.props.currentPagePast}
          pageCount={this.props.totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={1}
          containerClassName={
            "vx-pagination icon-pagination pagination-center mt-3"
          }
          activeClassName={"active"}
          onPageChange={this.pageChanged}
        />
      </React.Fragment>
    );
  }
}

export default PastTable;
