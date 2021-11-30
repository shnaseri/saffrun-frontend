import React, { Component } from "react";
import { Button, UncontrolledTooltip } from "reactstrap";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import { Edit, Trash, Plus } from "react-feather";

import Sidebar from "./daySidebar";
import Chip from "../../../components/@vuexy/chips/ChipComponent";
import "../../../assets/scss/pages/data-list.scss";
import { toast } from "react-toastify";

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
        target="edit-icon"
        style={{ backgroundColor: "rgb(245, 199, 100)", color: "black" }}
      >
        ویرایش
      </UncontrolledTooltip>
      <span id="edit-icon">
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
        target="delete-icon"
      >
        حذف
      </UncontrolledTooltip>
      <span id="delete-icon">
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
      style={{ marginTop: "15px" }}
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

class DataListConfig extends Component {
  state = {
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
    addNew: "",
    newAddedItem: {},
  };
  deleteRow = (item) => {
    this.props.deleteItem(item, this.props.day);
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
    if (this.props.items.length < 5) {
      this.handleSidebar(true, true);
      this.addDefaultNewItem();
    } else {
      toast.warn("بیشتر از ۵ مورد نمی‌توانید اضافه کنید", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  twoDigitsFromat = (hour) => {
    hour = parseInt(hour.split(":")[0]) + 1;
    return ("0" + hour).slice(-2);
  };
  addDefaultNewItem = () => {
    let { duration, capacity, period_count } = this.props;
    let items = this.props.items;
    let lastItem = items[items.length - 1];
    let newStartTime = lastItem["end_time"];
    let startTimeHour = newStartTime.split(":")[0];
    if (startTimeHour === "23") newStartTime = "00:00";
    let newEndTime = `${this.twoDigitsFromat(newStartTime)}:00`;
    let newAddedItem = {
      start_time: newStartTime,
      end_time: newEndTime,
      capacity,
      duration,
      period_count,
    };
    this.setState({ newAddedItem });
  };
  addItem = (item) => {
    let items = this.props.items;
    let lastItem = items[items.length - 1];
    let newAddedItem = { ...item, index: lastItem["index"] + 1 };
    this.props.addItemToDay(newAddedItem, this.props.day);
    this.handleSidebar(false, true);
  };
  updateItem = (item) => {
    this.props.updateItem(item, this.props.day);
    this.handleSidebar(false, true);
  };
  render() {
    let { columns, currentData, sidebar } = this.state;
    let data = this.props.items;
    return (
      <div
        className={`data-list ${
          this.props.thumbView ? "thumb-view" : "list-view"
        }`}
        style={{ width: "100%" }}
      >
        <DataTable
          columns={columns}
          data={data}
          noHeader
          subHeader
          responsive
          style={{ backgroundColor: "#f8f8f8" }}
          customStyles={selectedStyle}
          subHeaderComponent={<CustomHeader addNewItem={this.addNewItem} />}
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
      </div>
    );
  }
}

export default DataListConfig;
