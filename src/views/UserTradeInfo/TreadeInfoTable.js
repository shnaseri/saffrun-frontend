import React from "react";
import { Card, CardBody, CardHeader, CardTitle, Table } from "reactstrap";
import DataTable from "react-data-table-component";
import isAuthenticated from "./../../utility/authenticated";
import { history } from "./../../history";
import urlDomain from "./../../utility/urlDomain";
import axios from "axios";
import ReactPaginate from "react-paginate";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowDown,
  ArrowUp,
  Filter,
} from "react-feather";
import ComponentSpinner from "../../components/@vuexy/spinner/Loading-spinner";

const dateConverter = (date) => {
  return new Date(date).toLocaleDateString("fa-IR");
};
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const columns = [
  {
    name: "تاریخ",
    selector: "date",
    sortable: true,
    cell: (row) => (
      <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
        <div className="user-info text-truncate ml-xl-50 ml-0">
          <span className="d-block text-bold-500 text-truncate mb-0">
            {dateConverter(row.date)}
          </span>
          {/* <small>{this.dayOfWeek(row.date)}</small> */}
        </div>
      </div>
    ),
  },
  {
    name: "تعداد رویدادها",
    selector: "count_event",
    sortable: true,
  },
  {
    name: "تعداد نوبت ها",
    selector: "count_reserve",
    sortable: true,
  },
  {
    name: "مبلغ",
    selector: "total_payment",
    sortable: true,
    cell: (row) => <span>{moreThan1000(row.total_payment)}</span>,
  },
];
const moreThan1000 = (num) => {
  if (num > 1000000) {
    num = `${num / 1000000}`;
    return `${num.substring(0, 3)} میلیون تومان`;
  }
  if (num > 1000) {
    num = `${num / 1000}`;
    return `${num.substring(0, 3)} هزار تومان`;
  }
  return `${num} تومان`;
};
const ExpandableTable = ({ data }) => {
  return (
    <div style={{ maxHeight: "200px", overflow: "auto" }}>
      <Table
        className="border border-4 border-secondary rounded-2"
        responsive
        striped
      >
        <thead>
          <tr>
            <th>نام و نام خانوادگی</th>
            <th>نوع</th>
            <th>ساعت</th>
            <th>مبلغ</th>
          </tr>
        </thead>
        <tbody>
          {data.payment_detail.map((row, ind) => {
            return (
              <React.Fragment>
                <tr>
                  <td>{row.name}</td>
                  <td>{row.type}</td>
                  <td>{new Date(row.time).toLocaleTimeString("en-GB").substring(0,5)}</td>
                  <td>{moreThan1000(row.amount)}</td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

class DataTableExpandableRows extends React.Component {
  state = {
    loadSpinner: true,
    tradeData: {},
    pageCount: 5,
    currentPage: 1,
    totalPages: 0,
  };
  pageChanged = async (data) => {
    this.setState({ currentPage: data.selected + 1, loadSpinner: true });
    let pagination = {
      page: data.selected + 1,
      page_count: this.state.pageCount,
    };
    let token = localStorage.getItem("access");
    token = `Bearer ${token}`;
    let tradeData = await axios.get(
      `${urlDomain}/payment/web/get-all-payment/`,
      {
        headers: { Authorization: token },
        params: { ...pagination },
      }
    );
    this.setState({
      tradeData: tradeData.data,
      loadSpinner: false,
      totalPages: tradeData.data["pages"],
    });
  };
  componentDidMount = async () => {
    let authenticated = await isAuthenticated();
    if (!authenticated) history.push("/login");
    let token = localStorage.getItem("access");
    token = `Bearer ${token}`;
    let tradeData = await axios.get(
      `${urlDomain}/payment/web/get-all-payment/`,
      {
        headers: { Authorization: token },
        params: {
          page: this.state.currentPage,
          page_count: this.state.pageCount,
        },
      }
    );
    this.setState({
      tradeData: tradeData.data,
      loadSpinner: false,
      totalPages: tradeData.data["pages"],
    });
    // console.log(this.state.userData);
  };
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>تاریخچه تراکنش ها</CardTitle>
        </CardHeader>
        <CardBody>
          {this.state.loadSpinner ? (
            <div style={{ marginTop: "400px" }}>
              <ComponentSpinner />
            </div>
          ) : (
            <React.Fragment>
              <DataTable
                data={this.state.tradeData["payments"]}
                columns={columns}
                noHeader
                expandableRows
                expandOnRowClicked
                expandableRowsComponent={<ExpandableTable />}
                noDataComponent="آیتمی برای نشان دادن نیست."
              />
              <ReactPaginate
                previousLabel={<ChevronLeft size="15" />}
                nextLabel={<ChevronRight size="15" />}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.totalPages}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                containerClassName={
                  "vx-pagination icon-pagination pagination-center mt-3"
                }
                activeClassName={"active"}
                onPageChange={this.pageChanged}
                forcePage={this.state.currentPage - 1}
              />
            </React.Fragment>
          )}
        </CardBody>
      </Card>
    );
  }
}

export default DataTableExpandableRows;
