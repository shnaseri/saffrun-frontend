import React, { Component } from "react";
import { Label, Input, FormGroup, Button } from "reactstrap";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import TimeField from "react-simple-timefield";

class DataListSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      category: "Audio",
      order_status: "pending",
      price: "",
      img: "",
      capacity: "",
      period_count: "",
      duration: "",
      start_time: "08:00",
      end_time: "17:00",
      popularity: {
        popValue: "",
      },
    };
  }
  componentWillReceiveProps(props) {
    this.initializeStateFromProps(props);
  }
  initializeStateFromProps = (props) => {
    if (props.data) {
      return this.changeStateInitialize(props.data);
    } else {
      return this.changeStateInitialize(props.newAddedItem);
    }
  };
  changeStateInitialize = (item) => {
    let { capacity, period_count, duration, start_time, end_time } = item;
    this.setState({ capacity, period_count, duration, start_time, end_time });
  };
  timeError = () => {
    if (this.state.start_time >= this.state.end_time)
      return (
        <small style={{ color: "red", fontSize: "11px" }}>
          زمان شروع نباید قبل از پایان باشد
        </small>
      );
    if (this.moreThanFiveMinutes(this.state.start_time, this.state.end_time))
      return (
        <small style={{ color: "red", fontSize: "11px" }}>
          فاصله زمانی باید بیشتر از ۵ دقیقه باشد{" "}
        </small>
      );
    return <React.Fragment />;
  };
  handleSubmit = () => {
    let { capacity, period_count, duration, start_time, end_time } = this.state;

    let item = {
      capacity,
      period_count,
      duration,
      start_time,
      end_time,
    };
    if (this.props.data) {
      let index = this.props.data.index;
      item["index"] = index;
      this.props.updateItem(item);
    } else this.props.addItem(item);
  };
  moreThanFiveMinutes = (start_time, end_time) => {
    if (start_time && end_time) {
      let startDetail = start_time.split(":");
      let endDetail = end_time.split(":");
      let startMinute = parseInt(startDetail[1]);
      let endMinute = parseInt(endDetail[1]);
      if (startDetail[0] === endDetail[0]) {
        if (endMinute < startMinute + 5) return true;
      }
      if (parseInt(startDetail[0]) + 1 === parseInt(endDetail[0])) {
        if (startMinute >= 55) {
          let afterFiveminute = (startMinute + 5) % 60;
          if (afterFiveminute > endMinute) {
            return true;
          }
        }
      }
    }
    return false;
  };
  disabledCondition = () => {
    let { capacity, duration, period_count, start_time, end_time } = this.state;
    return (
      capacity === "" ||
      (duration === "" && period_count === "") ||
      start_time >= end_time ||
      this.moreThanFiveMinutes(start_time, end_time)
    );
  };
  render() {
    let { show, handleSidebar, data } = this.props;
    let { duration, capacity, period_count, start_time, end_time } = this.state;
    return (
      <div
        className={classnames("data-list-sidebar", {
          show: show,
        })}
      >
        <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
          <h4>{data !== null ? "ویرایش" : "اضافه کردن"}</h4>
          <X
            onMouseOver={(e) => {
              e.currentTarget.style.cursor = "pointer";
              e.currentTarget.style.color = "red";
            }}
            onMouseOut={(e) => (e.currentTarget.style.color = null)}
            size={20}
            onClick={() => handleSidebar(false, true)}
          />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3"
          options={{ wheelPropagation: false }}
        >
          <FormGroup>
            <Label>ساعت شروع</Label>
            <TimeField
              value={start_time}
              onChange={(event, value) => this.setState({ start_time: value })}
              input={<Input />}
              colon=":"
            />
          </FormGroup>
          <FormGroup>
            <Label>ساعت پایان</Label>
            <TimeField
              value={end_time}
              onChange={(event, value) => this.setState({ end_time: value })}
              input={<Input />}
              colon=":"
            />
            {this.timeError()}
          </FormGroup>
          <FormGroup>
            <Label>
              تعداد نوبت
              <span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              type="number"
              value={period_count}
              onChange={(e) => this.setState({ period_count: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label>
              مدت زمان
              <span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              type="number"
              value={duration}
              onChange={(e) => this.setState({ duration: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label>
              ظرفیت هر نوبت
              <span style={{ color: "red" }}>*</span>{" "}
            </Label>
            <Input
              type="number"
              value={capacity}
              onChange={(e) => this.setState({ capacity: e.target.value })}
            />
          </FormGroup>
        </PerfectScrollbar>
        <div
          style={{ direction: "ltr" }}
          className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1"
        >
          <Button
            disabled={this.disabledCondition()}
            color="primary"
            onClick={() => this.handleSubmit(this.state)}
          >
            {data !== null ? "ویرایش" : "اضافه کردن"}
          </Button>
        </div>
      </div>
    );
  }
}
export default DataListSidebar;
