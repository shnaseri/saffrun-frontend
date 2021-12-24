import React, { Component } from "react";
import { Badge, UncontrolledTooltip } from "reactstrap";
import DataTable from "react-data-table-component";
import { history } from "../../../history";
import { ChevronLeft, ChevronRight } from "react-feather";
// import Pagination from "../../../components/@vuexy/pagination/Pagination";
import ReactPaginate from "react-paginate";
import "../../../assets/scss/plugins/extensions/react-paginate.scss";
import ComponentSpinner from "../../../components/@vuexy/spinner/Loading-spinner";

class FutureTable extends Component {
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
        selector: "random_fill",
        center: true,
        sortable: true,
        cell: (row) => (
          <React.Fragment>
            <UncontrolledTooltip
              style={{
                backgroundColor: "rgb(245, 199, 100)",
                color: "black",
              }}
              placement="top"
              target={this.genereateUniqueID(row.date, "fill")}
            >
              {row.random_fill} نوبت از تعداد کل {row.available} نوبت شما
              پر‌شده‌است
            </UncontrolledTooltip>
            <p
              id={this.genereateUniqueID(row.date, "fill")}
              className="text-bold-500 text-truncate mb-0"
            >
              {row.random_fill}
            </p>
          </React.Fragment>
        ),
      },
      {
        center: true,
        name: "میزان رزرو",
        cell: (row) => (
          <React.Fragment>
            <UncontrolledTooltip
              style={{
                backgroundColor: "rgb(245, 199, 100)",
                color: "black",
              }}
              placement="top"
              target={this.genereateUniqueID(row.date, "percentage")}
            >
              {row.random}٪ از نوبت های شما پرشده‌است
            </UncontrolledTooltip>
            <Badge
              id={this.genereateUniqueID(row.date, "percentage")}
              color={this.defineColor(row.random)}
              pill
            >
              {row.random}%
            </Badge>
          </React.Fragment>
        ),
      },
      {
        center: true,
        name: "رزرو بعدی",
        selector: "next_reserve",
        sortable: true,
        cell: (row) => (
          <React.Fragment>
            <UncontrolledTooltip
              style={{
                backgroundColor: "rgb(245, 199, 100)",
                color: "black",
              }}
              placement="top"
              target={this.genereateUniqueID(row.date, "nearest_reserve")}
            >
              نزدیک‌ترین نوبت بعدی شما ساعت {this.correctHour(row.next_reserve)}{" "}
              می‌باشد.
            </UncontrolledTooltip>
            <p
              id={this.genereateUniqueID(row.date, "nearest_reserve")}
              className="text-bold-500 mb-0"
            >
              {this.correctHour(row.next_reserve)}
            </p>
          </React.Fragment>
        ),
      },
    ],
    loadSpinner: false,
  };
  genereateUniqueID = (date, str) => {
    return `${str}ـ${date.split("-").join("")}`;
  };
  defineColor = (num) => {
    if (num < 25) return "light-success";
    if (num < 75) return "light-warning";
    return "light-danger";
  };

  dateConverter = (date) => {
    return new Date(date).toLocaleDateString("fa-IR");
  };
  correctHour = (hourStr) => {
    try {
      let splitted = hourStr.split(":");
      return `${splitted[0]}:${splitted[1]}`;
    }
    catch(e) {
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
    await this.props.futurePageChanged(data.selected + 1);
  };
  render() {
    let { columns } = this.state;
    let futureReserves = this.props.futureReserves;
    return (
      <React.Fragment>
        <DataTable
          data={futureReserves}
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
          forcePage={this.props.currentPageFuture}
          pageCount={20}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
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

export default FutureTable;
