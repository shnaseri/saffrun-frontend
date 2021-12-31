import React, { Component } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  UncontrolledTooltip,
  Button,
  ModalHeader,
  Modal,
  ModalBody,
  Row,
  Col,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { history } from "../../history";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash,
  Users,
  Eye,
} from "react-feather";
// import Pagination from "../../../components/@vuexy/pagination/Pagination";
import ReactPaginate from "react-paginate";
import "../../assets/scss/plugins/extensions/react-paginate.scss";
import reservesList from "./fakeDataGenerator";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";
import urlDomain from "../../utility/urlDomain";
import isAuthenticated from "../../utility/authenticated";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/scss/plugins/extensions/toastr.scss";

const ActionsComponent = (props) => {
  return (
    <div className="data-list-action">
      <UncontrolledTooltip placement="top" target={`edit-icon-${props.row.id}`}>
        جزئیات
      </UncontrolledTooltip>
      <span id={`edit-icon-${props.row.id}`}>
        <Eye
          onMouseOver={(e) => {
            e.currentTarget.style.color = "orange";
          }}
          onMouseOut={(e) => (e.currentTarget.style.color = null)}
          className="cursor-pointer mr-1"
          size={20}
          onClick={() => {
            console.log(props.row);
            props.toggleModal(props.row.id);
          }}
        />
      </span>
    </div>
  );
};
class TableNotif extends React.Component {
  showDate = (row) => {
    return new Date(row["created_at"]).toLocaleDateString("fa-IR");
  };
  state = {
    data: [],
    page: 1,
    page_count: 5,
    row:-1,
    columns: [
      {
        // center: true,
        name: "تاریخ",
        selector: "created_at",
        sortable: true,
        cell: (row) => (
          <React.Fragment>
            <p className="text-bold-500 mb-0">{this.showDate(row)}</p>
          </React.Fragment>
        ),
      },
      {
        // center: true,
        name: "عنوان",
        selector: "title",
        sortable: false,
        cell: (row) => (
          <React.Fragment>
            <p className="text-bold-500 mb-0">{row.title.length >=10 ? row.title.slice(0,10) + "..." :row.title}</p>
          </React.Fragment>
        ),
      },
      {
        // center: true,
        name: "متن",
        selector: "text",
        sortable: false,
        cell: (row) => (
          <React.Fragment>
            <p className="text-bold-500 mb-0">{row.text.length >=10 ? row.text.slice(0,10) + "...": row.text }</p>
          </React.Fragment>
        ),
      },
          {
            minWidth:"150px",
            center: true,
            name: "تعداد شرکت کنندگان",
            selector: "receivers_count",
            sortable:true,
            cell: (row) => (
              <React.Fragment>
                <p className="text-bold-400 mb-0">{row.receivers_count}</p>
              </React.Fragment>
            ),
          },
      {
        name: "افراد",
        selector: "People",
        // center: true,
        sortable: false,
        cell: (row) => (
          <React.Fragment>
            <p className="text-bold-400 mb-0">{row.type===1 ?  "مخاطبان" : "همه" } </p>
          </React.Fragment>
        ),
      },
      {
        center: true,
        name: "",
        cell: (row) => (
          <ActionsComponent row={row} toggleModal={this.detailClicked} />
        ),
      },
    ],
    deleteModalOpen: false,
    editModalOpen: false,
    participantsModal: false,
  };
  handleAlert = (state, value) => {
    this.setState({
      [state]: value,
    });
  };
  showTitle = ()=>
  {
    if(this.state.row===-1)
      return "akbar"
    return this.state.data.find((x) => x.id === this.state.row).title
  }

  showText = ()=>
  {
    if(this.state.row===-1)
      return "akbar"
    return this.state.data.find((x) => x.id === this.state.row).text
  }
  showDates = ()=>
  {
    if(this.state.row===-1)
      return "akbar"
    return this.showDate( this.state.data.find((x) => x.id === this.state.row))
  }

  assignIndex = (data)=>{
    return data.map((item,ind) => {
      return {
        ...item,
        id:ind
      };
    });
  }
  async componentDidMount() {
    let authenticated = await isAuthenticated();
    if (!authenticated) history.push("/login");
    let token = localStorage.getItem("access");
    let { page, page_count } = this.state;
    let pagination = { page, page_count };
    token = `Bearer ${token}`;
    try {
      let response = await axios.get(
        `${urlDomain}/notification/employee/get-notifications`,
        {
          headers: { Authorization: token },
          params: pagination,
        }
      );

      let data = response.data.notifications;
      data =this.assignIndex(data);
      this.setState({ data: data });
    } catch (e) {}
  }
  deleteReserve = () => {
    history.push("/my-reservation");
  };
  editReserve = () => {
    history.push({ pathname: "/edit-day", state: { date: this.props.date } });
  };
  toggleModal = () => {
    this.setState({ participantsModal: !this.state.participantsModal  });
  };
  detailClicked =(row) =>
  {
    this.setState({row});
    this.toggleModal();
  }
  render() {
    return (
      <React.Fragment>
       
        <Card>
          <CardHeader>
            <CardTitle>جزئیات روز</CardTitle>
          </CardHeader>
          <CardBody>
            <DataTable
              data={this.state.data}
              columns={this.state.columns}
              style={{ height: "296px" , }}
              noHeader
              responsive
              noDataComponent="آیتمی برای نشان دادن نیست."
            />
            <SweetAlert
              title="آیا از حذف این مورد اطمینان دارید؟"
              warning
              show={this.state.deleteModalOpen}
              showCancel
              reverseButtons
              cancelBtnBsStyle="warning"
              confirmBtnText="بله؛ حذف کن"
              cancelBtnText="لغو"
              confirmBtnBsStyle="danger"
              onConfirm={this.deleteReserve}
              onCancel={() => {
                this.handleAlert("deleteModalOpen", false);
              }}
            >
              بعد از حذف نمیتوانید دوباره این مورد را بازگردانی کنید!
            </SweetAlert>
            <SweetAlert
              title="آیا از ویرایش این مورد اطمینان دارید؟"
              warning
              show={this.state.editModalOpen}
              showCancel
              reverseButtons
              cancelBtnBsStyle="warning"
              confirmBtnText="بله؛ ویرایش کن"
              cancelBtnText="لغو"
              confirmBtnBsStyle="success"
              onConfirm={this.editReserve}
              onCancel={() => {
                this.handleAlert("editModalOpen", false);
              }}
            />
            <Modal
              isOpen={this.state.participantsModal}
              toggle={this.toggleModal}
              className="modal-dialog-centered"
            >
              <ModalHeader
                toggle={this.toggleModal}
                className={"bg-gradient-primary"}
              >جزئیات اعلان</ModalHeader>
              <ModalBody>
              <Row className="pr-1 pl-1 pt-1">
                <span
                  style={{ fontSize: 14, color: "#ff9f43", fontWeight: "bold" }}
                >
                  {" "}
                  عنوان:{" "}
                </span>
                <span style={{ fontWeight: 300, fontSize: 14 }}>
                  {this.state.row !==-1 && this.showTitle()}
                </span>
              </Row>
              <Row className="pr-1 pl-1 pt-1">
                <span
                  style={{ fontSize: 15, color: "#ff9f43", fontWeight: "bold" }}
                >
                  {" "}
                  متن پیام:{" "}
                </span>
                <span style={{ fontWeight: 300, fontSize: 15 }}>
                {this.state.row !==-1 && this.showText()}
                </span>
              </Row>
              <Row className="pr-1 pl-1 pt-1">
                <span
                  style={{ fontSize: 14, color: "#ff9f43", fontWeight: "bold" }}
                >
                  {" "}
                  تاریخ ارسال:{" "}
                </span>
                <span style={{ fontWeight: 300, fontSize: 14 }}>

                {this.state.row !==-1 && this.showDates()}
                </span>
              </Row>              
                 </ModalBody>
            </Modal>
            <ReactPaginate
              previousLabel={<ChevronLeft size="15" />}
              nextLabel={<ChevronRight size="15" />}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={20}
              marginPagesDisplayed={1}
              pageRangeDisplayed={1}
              containerClassName={
                "vx-pagination icon-pagination pagination-center mt-3"
              }
              activeClassName={"active"}
            />
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default TableNotif;
