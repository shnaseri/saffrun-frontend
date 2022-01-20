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
import { history } from "../../../history";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Edit2,
  Trash,
  Users,
} from "react-feather";
import ReactPaginate from "react-paginate";
import "../../../assets/scss/plugins/extensions/react-paginate.scss";
import SweetAlert from "react-bootstrap-sweetalert";
import "./buttonStyle.css";
import ReserveParticipants from "./reserveParticipants";
import axios from "axios";
import urlDomain from "../../../utility/urlDomain";
import "./modal-style.css";
import defaultImg from "../../../assets/img/profile/Generic-profile-picture.jpg.webp";
import imgUrlDomain from "../../../utility/imgUrlDomain";
import ComponentSpinner from "../../../components/@vuexy/spinner/Loading-spinner";

const reserveDateGreatherThanToday = (reserveDate) => {
  if (new Date(reserveDate) > new Date()) return true;
  return false;
};

const createClass = (reserveDate) => {
  if (reserveDateGreatherThanToday(reserveDate)) {
    return "cursor-pointer delete-reserve-icon";
  }
  return "disabled-icon-color";
};

const ActionsComponent = (props) => {
  return (
    <div className="data-list-action">
      <UncontrolledTooltip
        placement="top"
        target={`participants-icon-${props.row.id}`}
      >
        شرکت کنندگان
      </UncontrolledTooltip>
      <span id={`participants-icon-${props.row.id}`}>
        <Users
          className={`cursor-pointer mr-1 show-participants-icon`}
          size={20}
          onClick={() => {
            props.participantsShow(props.row);
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
          className={`${createClass(props.date, "delete")}`}
          size={20}
          onClick={() => {
            if (reserveDateGreatherThanToday(props.date))
              props.deleteRow(props.row);
          }}
        />
      </span>
    </div>
  );
};

class ReservationTable extends Component {
  state = {
    columns: [
      {
        // center: true,
        name: "زمان شروع",
        selector: "start_time",
        sortable: true,
        cell: (row) => (
          <React.Fragment>
            <p className="text-bold-500 mb-0">
              {" "}
              {this.correctHour(row.start_time)}
            </p>
          </React.Fragment>
        ),
      },
      {
        // center: true,
        name: "زمان پایان",
        selector: "end_time",
        sortable: true,
        cell: (row) => (
          <React.Fragment>
            <p className="text-bold-500 mb-0">
              {this.correctHour(row.end_time)}
            </p>
          </React.Fragment>
        ),
      },
      {
        name: "میزان رزرو",
        selector: "fillPercentage",
        center: true,
        sortable: true,
        cell: (row) => (
          <React.Fragment>
            <Badge color={this.defineColor(row.fillPercentage)} pill>
              {row.fillPercentage}%
            </Badge>
          </React.Fragment>
        ),
      },
      {
        center: true,
        name: "تعداد شرکت‌کنندگان",
        minWidth: "150px",
        sortable: true,
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
          <ActionsComponent
            row={row}
            participantsShow={this.participantsShow}
            deleteRow={this.deleteRow}
            date={this.props.date}
          />
        ),
      },
    ],
    deleteModalOpen: false,
    editModalOpen: false,
    participantsModal: false,
    reserveDeleteModal: false,
    loadSpinner: false,
    participantDeleted: false,
    reserveDetails: [],
    currentPage: 1,
    pageCount: 5,
    totalPage: 0,
    rowClicked: 0,
  };
  async componentDidMount() {
    let token = localStorage.getItem("access");
    token = `Bearer ${token}`;
    let pagination = {
      page: this.state.currentPage,
      page_count: this.state.pageCount,
    };
    await this.callServer(pagination);
  }
  defineColor = (num) => {
    if (num < 25) return "light-success";
    if (num < 75) return "light-warning";
    return "light-danger";
  };
  calculateFillPercentage = (row) => {
    return Math.floor((row.participants.length / row.capacity) * 100);
  };
  imgGenerator = (x) => {
    return x.image.image
      ? `${imgUrlDomain}${x.image.image.thumbnail}`
      : defaultImg;
  };
  participantsGenreator = (participants) => {
    return participants.map((x) => {
      return { id: x.id, name: x.name, imgUrl: this.imgGenerator(x) };
    });
  };
  handleParticipants = (reserveDetails) => {
    return reserveDetails.map((item) => {
      return {
        ...item,
        participantsCount: item.participants.length,
        fillPercentage: this.calculateFillPercentage(item),
        participants: this.participantsGenreator(item.participants),
      };
    });
  };
  handleAlert = (state, value) => {
    this.setState({
      [state]: value,
    });
  };
  correctHour = (hourStr) => {
    try {
      let splitted = hourStr.split(":");
      return `${splitted[0]}:${splitted[1]}`;
    } catch (e) {
      return "خالی";
    }
  };
  deleteWholeReserve = async () => {
    let token = localStorage.getItem("access");
    token = `Bearer ${token}`;
    try {
      let deleteReserveItem = await axios.delete(
        `${urlDomain}/reserve/web/remove-all-reserve-date`,
        {
          headers: { Authorization: token },
          data: { date: this.props.date },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  deleteRow = (row) => {
    this.setState({ rowClicked: row.id });
    this.handleAlert("reserveDeleteModal", true);
  };
  participantsShow = (row) => {
    this.setState({ rowClicked: row.id });
    this.handleAlert("participantsModal", true);
  };
  getParticipants = () => {
    let { reserveDetails, rowClicked, loadSpinner } = this.state;
    if (reserveDetails.length === 0 || rowClicked === 0 || loadSpinner)
      return [];
    let foundParticipant = reserveDetails.find(
      (item) => item.id === this.state.rowClicked
    );
    if (!foundParticipant) return [];
    if (foundParticipant) return foundParticipant.participants;
  };
  disabledDeleteParticipants = () => {
    let { reserveDetails, rowClicked, loadSpinner } = this.state;
    if (reserveDetails.length === 0 || rowClicked === 0 || loadSpinner)
      return false;
    let foundDateTime = reserveDetails.find(
      (item) => item.id === this.state.rowClicked
    );
    if (!foundDateTime) return false;

    return (
      new Date() > new Date(`${foundDateTime.date}T${foundDateTime.end_time}`)
    );
  };
  participantHasDeleted = () => {
    this.setState({
      participantDeleted: true,
    });
  };
  callServer = async (pagination) => {
    let token = localStorage.getItem("access");
    token = `Bearer ${token}`;
    try {
      let reserveDetails = await axios.get(
        `${urlDomain}/reserve/web/get-reserve-table-detail`,
        {
          headers: { Authorization: token },
          params: { date: this.props.date, ...pagination },
        }
      );
      this.setState({
        reserveDetails: this.handleParticipants(reserveDetails.data.reserves),
        loadSpinner: false,
        totalPage: reserveDetails.data.pages,
      });
      return 200;
    } catch (e) {
      console.log(e);
      this.setState({ loadSpinner: false });
      return e.response.status;
    }
  };
  deleteReserve = async () => {
    this.setState({ rowClicked: 0, loadSpinner: true });
    let token = localStorage.getItem("access");
    token = `Bearer ${token}`;
    let pagination = {
      page: this.state.currentPage,
      page_count: this.state.pageCount,
    };
    let deleteReserveItem = await axios.delete(
      `${urlDomain}/reserve/web/remove-reserve`,
      {
        headers: { Authorization: token },
        data: { reserve_id: this.state.rowClicked },
      }
    );
    await this.props.updateReserveDetail()
    let statusCode = await this.callServer(pagination);
    if (statusCode === 404) {
      this.setState({ currentPage: 1 });
      await this.callServer({ page: 1, page_count: this.state.pageCount });
    }
  };
  editReserve = async () => {
    await this.deleteWholeReserve();
    history.push({ pathname: "/edit-day", state: { date: this.props.date } });
  };
  toggleModal = async () => {
    let { participantDeleted } = this.state;
    if (participantDeleted) {
      this.setState({ loadSpinner: true, rowClicked: 0 });
      let pagination = {
        page: this.state.currentPage,
        page_count: this.state.pageCount,
      };
      await this.props.updateReserveDetail()
      await this.callServer(pagination);
    }
    this.setState({ participantsModal: false, participantDeleted: false });
  };
  pageChanged = async (data) => {
    this.setState({ currentPage: data.selected + 1, loadSpinner: true });
    let pagination = {
      page: data.selected + 1,
      page_count: this.state.pageCount,
    };
    await this.callServer(pagination);
  };
  showSpinner = () => {
    return (
      <div style={{ marginTop: "400px" }}>
        <ComponentSpinner />
      </div>
    );
  };
  createIconColor = (icon) => {
    if (reserveDateGreatherThanToday(this.props.date)) {
      if (icon === "edit") return "cursor-pointer show-participants-icon";
      return "cursor-pointer delete-reserve-icon";
    }
    return "disabled-icon-color";
  };
  render() {
    let { reserveDetails } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>
              جزئیات روز
              <span id="edit-reserve">
                <Edit2
                  size={16}
                  className={`mr-1 ml-1 ${this.createIconColor("edit")}`}
                  onClick={() => {
                    if (reserveDateGreatherThanToday(this.props.date))
                      this.handleAlert("editModalOpen", true);
                  }}
                />
              </span>
              <span id="delete-reserve">
                <Trash
                  size={16}
                  className={`${this.createIconColor("delete")}`}
                  onClick={() => {
                    if (reserveDateGreatherThanToday(this.props.date))
                      this.handleAlert("deleteModalOpen", true);
                  }}
                />
              </span>
            </CardTitle>
            <UncontrolledTooltip placement="top" target="edit-reserve">
              ویرایش کل نوبت
            </UncontrolledTooltip>
            <UncontrolledTooltip placement="top" target="delete-reserve">
              حذف کل نوبت‌های روز
            </UncontrolledTooltip>
          </CardHeader>
          <CardBody>
            <br />

            {this.state.loadSpinner && this.showSpinner()}
            {!this.state.loadSpinner && (
              <DataTable
                data={reserveDetails}
                columns={this.state.columns}
                style={{ height: "296px" }}
                noHeader
                responsive
                noDataComponent="آیتمی برای نشان دادن نیست."
              />
            )}
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
              onConfirm={async () => {
                await this.deleteWholeReserve();
                history.push("/my-reservation");
              }}
              onCancel={() => {
                this.handleAlert("deleteModalOpen", false);
              }}
            >
              بعد از حذف نمیتوانید دوباره این مورد را بازگردانی کنید!
            </SweetAlert>
            <SweetAlert
              title="آیا از حذف این مورد اطمینان دارید؟"
              warning
              show={this.state.reserveDeleteModal}
              showCancel
              reverseButtons
              cancelBtnBsStyle="warning"
              confirmBtnText="بله؛ حذف کن"
              cancelBtnText="لغو"
              confirmBtnBsStyle="danger"
              onConfirm={() => {
                this.deleteReserve();
                this.handleAlert("reserveDeleteModal", false);
              }}
              onCancel={() => {
                this.handleAlert("reserveDeleteModal", false);
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
              >
                <strong style={{ marginRight: "20px" }}>شرکت‌کنندگان</strong>
              </ModalHeader>
              <ModalBody>
                <ReserveParticipants
                  diabledDeleteBtn={this.disabledDeleteParticipants()}
                  participants={this.getParticipants()}
                  reserveId={this.state.rowClicked}
                  participantHasDeleted={this.participantHasDeleted}
                />
              </ModalBody>
            </Modal>
            {!this.state.loadSpinner && (
              <ReactPaginate
                previousLabel={<ChevronLeft size="15" />}
                nextLabel={<ChevronRight size="15" />}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.totalPage}
                marginPagesDisplayed={1}
                pageRangeDisplayed={1}
                forcePage={this.state.currentPage - 1}
                containerClassName={
                  "vx-pagination icon-pagination pagination-center mt-3"
                }
                activeClassName={"active"}
                onPageChange={this.pageChanged}
              />
            )}
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default ReservationTable;
