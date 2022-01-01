import React, { Component } from "react";
import {
  Button,
  UncontrolledTooltip,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Input,
  Label,
  FormGroup,
} from "reactstrap";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import { Edit, Trash, Plus, Check } from "react-feather";

import Sidebar from "../CreateTurns/daySidebar";
import Chip from "../../../components/@vuexy/chips/ChipComponent";
import "../../../assets/scss/pages/data-list.scss";
import { toast } from "react-toastify";
import SweetAlert from "react-bootstrap-sweetalert";
import { history } from "../../../history";
import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy";
import axios from "axios";
import urlDomain from "../../../utility/urlDomain";

const chipColors = {
  "on hold": "warning",
  delivered: "success",
  pending: "primary",
  canceled: "danger",
};

const selectedStyle = {
  rows: {
    selectedHighlighStyle: {
      backgroundColor: "rgba(115,103,240,.05)",
      color: "#7367F0 !important",
      boxShadow: "0 0 1px 0 #7367F0 !important",
      "&:hover": {
        transform: "translateY(0px) !important",
      },
    },
  },
};

const ActionsComponent = (props) => {
  return (
    <div className="data-list-action">
      <UncontrolledTooltip
        placement="top"
        target={`edit-icon-${props.row.id}`}
        style={{ backgroundColor: "rgb(245, 199, 100)", color: "black" }}
      >
        ویرایش
      </UncontrolledTooltip>
      <span id={`edit-icon-${props.row.id}`}>
        <Edit
          onMouseOver={(e) => {
            e.currentTarget.style.color = "orange";
          }}
          onMouseOut={(e) => (e.currentTarget.style.color = null)}
          className="cursor-pointer mr-1"
          size={20}
          onClick={() => {
            // return props.currentData(props.row);
            props.editItem(props.row);
          }}
        />
      </span>
      <UncontrolledTooltip
        style={{ backgroundColor: "rgb(245, 199, 100)", color: "black" }}
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
            props.deleteRow(props.row);
          }}
        />
      </span>
    </div>
  );
};

const CustomHeader = (props) => {
  return (
    <div
      style={{ marginTop: "35px" }}
      className="data-list-header d-flex justify-content-between flex-wrap"
    >
      <div className="actions-left d-flex flex-wrap">
        <Button
          className="add-new-btn "
          color="primary"
          onClick={() => props.addNewItem()}
          outline
        >
          <Plus size={15} />
          <span className="align-middle">اضافه کردن </span>
        </Button>
      </div>
    </div>
  );
};
class EditDay extends Component {
  //   get day by props.location.state.date
  state = {
    deleteModalOpen: false,
    price: 0,
    items: [
      {
        index: 0,
        start_time: "08:00",
        end_time: "17:00",
        duration: 5,
        period_count: 5,
        capacity: 5,
        interfere: false,
      },
    ],
    columns: [
      {
        name: "از ساعت",

        // sortable: true,
        // minWidth: "300px",
        cell: (row) => (
          <p
            title={row.start_time}
            className="text-truncate text-bold-500 mb-0"
          >
            {row.start_time}
          </p>
        ),
      },
      {
        name: "تا ساعت",

        cell: (row) => row.end_time,
        // sortable: true,
      },
      {
        name: "مدت زمان",

        // sortable: true,
        cell: (row) =>
          //   <Progress
          //     className="w-100 mb-0"
          //     color={row.popularity.color}
          //     value={row.popularity.popValue}
          //   />
          row.duration,
      },
      {
        name: "تعداد نوبت",

        // sortable: true,
        cell: (row) => row.period_count,
      },
      {
        name: "ظرفیت",
        // sortable: true,
        cell: (row) => row.capacity,
      },
      {
        name: "تداخل زمان ها",
        cell: (row) => <Chip className="m-0" {...this.checkOverlapTime(row)} />,
      },
      {
        name: "",
        // sortable: true,
        cell: (row) => (
          <ActionsComponent
            row={row}
            deleteRow={this.deleteRow}
            editItem={this.editItem}
          />
        ),
      },
    ],
    sidebar: false,
    currentData: null,
    errorAlert: false,
    successAlert: false,
    addNew: "",
    newAddedItem: {},
  };
  deleteRow = (item) => {
    this.setState({ deleteModalOpen: true, item });
  };
  handleAlert = (state, value) => {
    this.setState({
      [state]: value,
    });
  };
  checkOverlapTime = (item) => {
    return item.interfere
      ? { color: "danger", text: "تداخل" }
      : { color: "success", text: "عدم تداخل" };
  };
  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean });
    if (addNew) this.setState({ currentData: null, addNew: true });
  };
  editItem = (row) => {
    this.setState({ currentData: row });
    this.handleSidebar(true);
  };
  addNewItem = () => {
    if (this.state.items.length < 5) {
      this.handleSidebar(true, true);
      this.addDefaultNewItem();
    } else {
      toast.warn("بیشتر از ۵ مورد نمی‌توانید اضافه کنید", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };
  PostToServer = async () => {
    let startDate = new Date(this.props.location.state.date);
    let endDate = new Date(this.props.location.state.date);
    let data = {
      start_date: this.formatDate(startDate),
      end_date: this.formatDate(endDate),
      price: this.state.price,
      days_list: [],
    };
    let l = [];
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    for (let index = 0; index < diffDays + 1; index++) {
      if (index === 7) break;
      let date = startDate;
      date.setDate(date.getDate() + index);
      l.push({ reserve_periods: this.state.items });
    }
    data["days_list"] = l;
    console.log(data);
    let token = localStorage.getItem("access");
    try {
      let res = await axios.post(`${urlDomain}/reserve/create/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.handleAlert("successAlert", true);
    } catch (e) {
      this.handleAlert("errorAlert", true);
    }
  };
  twoDigitsFromat = (hour) => {
    hour = parseInt(hour.split(":")[0]) + 1;
    return ("0" + hour).slice(-2);
  };
  addDefaultNewItem = () => {
    let items = this.state.items;
    if (items.length !== 0) {
      let lastItem = items[items.length - 1];
      let newStartTime = lastItem["end_time"];
      let startTimeHour = newStartTime.split(":")[0];
      if (startTimeHour === "23") newStartTime = "00:00";
      let newEndTime = `${this.twoDigitsFromat(newStartTime)}:00`;
      let newAddedItem = {
        start_time: newStartTime,
        end_time: newEndTime,
        capacity: lastItem.capacity,
        duration: lastItem.duration,
        period_count: lastItem.period_count,
      };
      this.setState({ newAddedItem });
    } else {
      let newAddedItem = {
        start_time: "08:00",
        end_time: "17:00",
        capacity: 5,
        duration: 5,
        period_count: 5,
      };
      this.setState({ newAddedItem });
    }
  };
  updateItemOfDay = (items) => {
    for (let i = 0; i < items.length; i++) {
      let interfere = false;
      for (let j = 0; j < items.length; j++) {
        if (i == j) continue;
        if (
          items[j]["start_time"] <= items[i]["start_time"] &&
          items[j]["end_time"] > items[i]["start_time"]
        ) {
          interfere = true;
        }
        if (
          items[j]["start_time"] >= items[i]["start_time"] &&
          items[j]["start_time"] < items[i]["end_time"]
        ) {
          interfere = true;
        }
      }
      if (interfere) items[i] = { ...items[i], interfere: true };
      else items[i] = { ...items[i], interfere: false };
    }
    this.setState({ items });
  };
  addItem = (item) => {
    let items = this.state.items;
    let newAddedItem = {};
    if (items.length !== 0) {
      let lastItem = items[items.length - 1];
      newAddedItem = { ...item, index: lastItem["index"] + 1 };
    } else {
      newAddedItem = { ...item, index: 0 };
    }
    let newItems = [...items, { ...newAddedItem, interfere: false }];
    this.updateItemOfDay(newItems);
    this.handleSidebar(false, true);
  };
  updateItem = (item) => {
    let items = [...this.state.items];
    let foundItemIndex = items.findIndex((x) => x.index === item.index);
    items[foundItemIndex] = item;
    this.updateItemOfDay(items);
    this.handleSidebar(false, true);
  };
  deleteItem = () => {
    let item = this.state.item;
    let items = [...this.state.items];
    items = items.filter((x) => x.index !== item.index);
    this.updateItemOfDay(items);
  };
  dateConverter = (date) => {
    return new Date(date).toLocaleDateString("fa-IR");
  };
  disabledSubmitButton = () => {
    let { items } = this.state;

    for (let j = 0; j < items.length; j++) {
      if (items[j].interfere) return true;
    }
    return items.length === 0 ? true : false;
  };
  handleAlert = (state, value) => {
    this.setState({ [state]: value });
  };
  postEditedDate = async () => {
    await this.PostToServer();
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
  render() {
    let { columns, currentData, sidebar } = this.state;
    let { items } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>
              ویرایش نوبت {this.dayOfWeek(this.props.location.state.date)} -{" "}
              {this.dateConverter(this.props.location.state.date)}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
              <Col lg="2" />
              <Col xs="12" md="6" lg="3">
                <Label>قیمت هر نوبت</Label>
                <Input
                  value={this.state.price}
                  onChange={(e) => this.setState({ price: e.target.value })}
                  id="price-input"
                  placeholder="قیمت به تومان"
                  type="number"
                />
              </Col>
              <Col lg="1" />
              <Col style={{ marginTop: "20px" }} xs="12" md="6" lg="3">
                <Checkbox
                  color="primary"
                  icon={<Check className="vx-icon" size={16} />}
                  label="هزینه اینترنتی پرداخت شود."
                  defaultChecked={true}
                />
              </Col>
            </Row>
            <div
              className={`data-list ${
                this.props.thumbView ? "thumb-view" : "list-view"
              }`}
              style={{ width: "100%" }}
            >
              <DataTable
                columns={columns}
                data={items}
                noHeader
                subHeader
                responsive
                style={{ backgroundColor: "#f8f8f8" }}
                customStyles={selectedStyle}
                subHeaderComponent={
                  <CustomHeader addNewItem={this.addNewItem} />
                }
                noDataComponent="آیتمی برای نشان دادن نیست."
              />
              <Sidebar
                show={sidebar}
                data={currentData}
                handleSidebar={this.handleSidebar}
                newAddedItem={this.state.newAddedItem}
                addItem={this.addItem}
                updateItem={this.updateItem}
              />
              <div
                className={classnames("data-list-overlay", {
                  show: sidebar,
                })}
                onClick={() => this.handleSidebar(false, true)}
              />
              <Button
                style={{
                  float: "left",
                  marginTop: "20px",
                  padding: "12px",
                  paddingRight: "30px",
                  paddingLeft: "30px",
                }}
                color="primary"
                className="btn-lg"
                disabled={this.disabledSubmitButton()}
                onClick={this.postEditedDate}
              >
                ثبت
              </Button>
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
                onConfirm={() => {
                  this.deleteItem();
                  this.handleAlert("deleteModalOpen", false);
                }}
                onCancel={() => {
                  this.handleAlert("deleteModalOpen", false);
                }}
              >
                بعد از حذف نمیتوانید دوباره این مورد را بازگردانی کنید!
              </SweetAlert>
            </div>
          </CardBody>
        </Card>
        <SweetAlert
          success
          title="Success"
          show={this.state.successAlert}
          confirmBtnText="باشه"
          onConfirm={() => {
            this.handleAlert("successAlert", false);
            history.push(`/reserve-detail/${this.props.location.state.date}`);
          }}
        >
          <p className="sweet-alert-text">نوبت های ممکن ساخته شد.</p>
        </SweetAlert>

        <SweetAlert
          error
          title="Error"
          confirmBtnText="باشه"
          show={this.state.errorAlert}
          onConfirm={() => this.handleAlert("errorAlert", false)}
        >
          <p className="sweet-alert-text">
            فرآیند با خطا مواجه شد دوباره تلاش کنید
          </p>
        </SweetAlert>
      </React.Fragment>
    );
  }
}

export default EditDay;
