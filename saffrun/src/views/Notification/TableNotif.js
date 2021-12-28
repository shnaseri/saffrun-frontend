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
} from "reactstrap";
import DataTable from "react-data-table-component";
import { history } from "../../history";
import { ChevronLeft, ChevronRight, Edit, Trash, Users } from "react-feather";
// import Pagination from "../../../components/@vuexy/pagination/Pagination";
import ReactPaginate from "react-paginate";
import "../../assets/scss/plugins/extensions/react-paginate.scss";
import reservesList from "./fakeDataGenerator";
import SweetAlert from "react-bootstrap-sweetalert";
const ActionsComponent = (props) => {
  return (
    <div className="data-list-action">
      <UncontrolledTooltip placement="top" target={`edit-icon-${props.row.id}`}>
        شرکت کنندگان
      </UncontrolledTooltip>
      <span id={`edit-icon-${props.row.id}`}>
        <Users
          onMouseOver={(e) => {
            e.currentTarget.style.color = "orange";
          }}
          onMouseOut={(e) => (e.currentTarget.style.color = null)}
          className="cursor-pointer mr-1"
          size={20}
          onClick={() => {
            props.toggleModal();
          }}
        />
      </span>
      <UncontrolledTooltip
        placement="top"
        target={`delete-icon-${props.row.id}`}
      >
        حذف
      </UncontrolledTooltip>
      <span id={`delete-icon-${props.row.id}`}>
        <Trash
          onMouseOver={(e) => {
            e.currentTarget.style.color = "red";
          }}
          onMouseOut={(e) => (e.currentTarget.style.color = null)}
          className="cursor-pointer"
          size={20}
          onClick={() => {
            // props.deleteRow(props.row);
          }}
        />
      </span>
    </div>
  );
};
class TableNotif extends React.Component {
  state = {
    columns: [
      {
        // center: true,
        name: "زمان شروع",
        selector: "startTime",
        sortable: true,
        cell: (row) => (
          <React.Fragment>
            <p className="text-bold-500 mb-0">{row.startTime}</p>
          </React.Fragment>
        ),
      },
      {
        // center: true,
        name: "زمان پایان  ",
        selector: "endTime",
        sortable: true,
        cell: (row) => (
          <React.Fragment>
            <p className="text-bold-500 mb-0">{row.endTime}</p>
          </React.Fragment>
        ),
      },
      {
        name: "ظرفیت",
        selector: "capacity",
        // center: true,
        sortable: true,
        cell: (row) => (
          <React.Fragment>
            <Badge color="light-danger" pill>
              {row.capacity}%
            </Badge>
          </React.Fragment>
        ),
      },
      {
        center: true,
        name: "تعداد شرکت کنندگان",
        selector: "participantsCount",
        cell: (row) => (
          <React.Fragment>
            <p className="text-bold-500 mb-0">{row.participantsCount}</p>
          </React.Fragment>
        ),
      },
      {
        center: true,
        name: "",
        cell: (row) => (
          <ActionsComponent row={row} toggleModal={this.toggleModal} />
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
  deleteReserve = () => {
    history.push("/my-reservation");
  };
  editReserve = () => {
    history.push({ pathname: "/edit-day", state: { date: this.props.date } });
  };
  toggleModal = () => {
    this.setState({ participantsModal: !this.state.participantsModal });
  };
  render() {
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>جزئیات روز</CardTitle>
          </CardHeader>
          <CardBody>
            <DataTable
              data={reservesList}
              columns={this.state.columns}
              style={{ height: "296px" }}
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
              ></ModalHeader>
              <ModalBody>
                
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
