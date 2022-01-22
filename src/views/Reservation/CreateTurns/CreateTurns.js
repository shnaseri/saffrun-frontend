import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
  Collapse,
  UncontrolledTooltip,
} from "reactstrap";
import { DatePicker, RangeDatePicker } from "jalali-react-datepicker";
import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy";
import { ChevronDown, Check, Plus, Clock, Trash2 } from "react-feather";
import classnames from "classnames";
import TimeField from "react-simple-timefield";
import axios from "axios";
import urlDomain from "../../../utility/urlDomain";
import "./input-datepicker2.css";
import theme from "../../../assets/datePickerTheme/theme";
import colWidthes from "./dayColumnsWidth";
import { object } from "prop-types";
import DataListConfig from "./dayDetails";
import { toast } from "react-toastify";
import SweetAlert from "react-bootstrap-sweetalert";
import { history } from "../../../history";
import isAuthenticated from "../../../utility/authenticated";

class BookingCreation extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    disableEndTime: true,
    startDate: 0,
    endDate: 0,
    endBeforStart: false,
    collapse: true,
    display: false,
    ReservedName: "",
    capacity: "",
    period_count: "",
    duration: "",
    price: "",
    successAlert: false,
    errorAlert: false,
    submitBtnDisabled: false,
    week: {
      saturday: [
        {
          index: 0,
          start_time: "08:00",
          end_time: "17:00",
          duration: 0,
          period_count: 0,
          capacity: 0,
          interfere: false,
        },
      ],
      sunday: [
        {
          index: 0,
          start_time: "08:00",
          end_time: "17:00",
          duration: 0,
          period_count: 0,
          capacity: 0,
          interfere: false,
        },
      ],
      monday: [
        {
          index: 0,
          start_time: "08:00",
          end_time: "17:00",
          duration: 0,
          period_count: 0,
          capacity: 0,
          interfere: false,
        },
      ],
      tuesday: [
        {
          index: 0,
          start_time: "08:00",
          end_time: "17:00",
          duration: 0,
          period_count: 0,
          capacity: 0,
          interfere: false,
        },
      ],
      wednesday: [
        {
          index: 0,
          start_time: "08:00",
          end_time: "17:00",
          duration: 0,
          period_count: 0,
          capacity: 0,
          interfere: false,
        },
      ],
      thursday: [
        {
          index: 0,
          start_time: "08:00",
          end_time: "17:00",
          duration: 0,
          period_count: 0,
          capacity: 0,
          interfere: false,
        },
      ],
      friday: [
        {
          index: 0,
          start_time: "08:00",
          end_time: "17:00",
          duration: 0,
          period_count: 0,
          capacity: 0,
          interfere: false,
        },
      ],
    },
  };
  async componentDidMount() {
    let authenticated = await isAuthenticated();
    if (!authenticated) history.push("/login");
    let startDate = new Date();
    let endDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    startDate = startDate.getTime();
    endDate = endDate.getTime();
    this.setState({ startDate, endDate });
  }
  DateTimeChanged = ({ value }, name) => {
    this.setState({ [name]: value["_d"].getTime() });
  };
  PostToServer = async () => {
    this.setState({ submitBtnDisabled: true });
    var days = {
      0: "sunday",
      1: "monday",
      2: "tuesday",
      3: "wednesday",
      4: "thursday",
      5: "friday",
      6: "saturday",
    };

    let startDate = new Date(this.state.startDate);
    let endDate = new Date(this.state.endDate);
    let data = {
      start_date: this.formatDate(startDate),
      end_date: this.formatDate(endDate),
      price: this.state.price,
      days_list: [],
    };
    let l = [];
    const diffTime = Math.abs(
      new Date(this.state.endDate) - new Date(this.state.startDate)
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    for (let index = 0; index < diffDays + 1; index++) {
      if (index === 7) break;
      let date = new Date(this.state.startDate);
      date.setDate(date.getDate() + index);
      l.push({ reserve_periods: this.state.week[days[date.getDay()]] });
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
      this.setState({ submitBtnDisabled: false });
      this.handleAlert("successAlert", true);
    } catch (e) {
      this.setState({ submitBtnDisabled: false });
      this.handleAlert("errorAlert", true);
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

  checkDate = () => {
    let { startDate, endDate } = this.state;
    let todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    return (
      startDate > endDate ||
      todayDate.getTime() > startDate ||
      todayDate.getDate() > endDate
    );
  };
  fillInput = () => {
    if (
      this.state.capacity === "" ||
      this.state.price === "" ||
      (this.state.period_count === "" && this.state.duration === "") ||
      parseInt(this.state.duration % 5) !== 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  toggleCollapse = () => {
    this.setState({ collapse: !this.state.collapse });
  };
  GoToTimeSection = () => {
    var days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    let week = { ...this.state.week };
    let { duration, period_count, capacity } = this.state;
    for (let index = 0; index < days.length; index++) {
      week[days[index]] = [
        { ...week[days[index]][0], duration, period_count, capacity },
      ];
    }
    this.setState({ display: true, week });
  };
  changeDayInputAfterVisible = (name, value) => {
    let days = this.state.week;
    let week = {};
    for (var day in days) {
      let itemsOfDay = days[day];
      let tempItems = [];
      for (var i = 0; i < itemsOfDay.length; i++) {
        tempItems.push({ ...itemsOfDay[i], [name]: value });
      }
      week[day] = tempItems;
    }
    this.setState({ week });
  };
  durationMod5 = () => {
    if (parseInt(this.state.duration % 5) !== 0) {
      return (
        <small style={{ color: "red", fontSize: "11px" }}>
          بازه های زمانی باید بر ۵ بخش‌پذیر باشند{" "}
        </small>
      );
    }
    return <React.Fragment></React.Fragment>;
  };
  updateItemOfDay = (day, dayList) => {
    for (let i = 0; i < dayList.length; i++) {
      let interfere = false;
      for (let j = 0; j < dayList.length; j++) {
        if (i == j) continue;
        if (
          dayList[j]["start_time"] <= dayList[i]["start_time"] &&
          dayList[j]["end_time"] > dayList[i]["start_time"]
        ) {
          interfere = true;
        }
        if (
          dayList[j]["start_time"] >= dayList[i]["start_time"] &&
          dayList[j]["start_time"] < dayList[i]["end_time"]
        ) {
          interfere = true;
        }
      }
      if (interfere) dayList[i] = { ...dayList[i], interfere: true };
      else dayList[i] = { ...dayList[i], interfere: false };
    }
    this.setState({ week: { ...this.state.week, [day]: dayList } });
  };
  handleDeleteTime = (day, index) => {
    let dayList = [...this.state.week[day]];
    if (dayList.length === 1) return;
    let copyItem = { ...dayList[index] };
    dayList.splice(index, 1);
    let week = { ...this.state.week, [day]: dayList };
    this.setState({ week });
  };
  handleChangeTime = (event, value, day, index, offset) => {
    let dayList = [...this.state.week[day]];
    let copyItem = { ...dayList[index] };
    copyItem[offset] = value;
    dayList[index] = copyItem;
    let week = { ...this.state.week, [day]: dayList };
    this.setState({ week });
  };
  check7Day = (day) => {
    const diffTime = Math.abs(
      new Date(this.state.endDate) - new Date(this.state.startDate)
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 6) return true;
    var days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    let ind = days.indexOf(day);
    let DayOfWeek = [];
    for (let i = 0; i < diffDays + 1; i++) {
      let date = new Date(this.state.startDate);
      date.setDate(date.getDate() + i);
      DayOfWeek.push(date.getDay());
    }
    if (DayOfWeek.includes(ind)) return true;
    else return false;
  };
  ShowError = (day, index, item) => {
    if (item["start_time"] >= item["end_time"]) {
      return (
        <small style={{ color: "red", fontSize: "11px" }}>
          زمان شروع نباید قبل از پایان باشد
        </small>
      );
    } else if (this.updateItemOfDay(day, index)) {
      return (
        <small style={{ color: "red", fontSize: "11px" }}>
          بازه های زمانی وارد شده با یکدیگر تداخل دارند
        </small>
      );
    }
    return <React.Fragment></React.Fragment>;
  };

  specificWidth = (colName, index) => {
    return index === 0
      ? colWidthes.firstRow[colName]
      : colWidthes.otherRows[colName];
  };
  addInput = (day) => {
    let tempDay = [...this.state.week[day]];
    if (tempDay.length < 5) {
      let lastTime = tempDay[tempDay.length - 1];
      tempDay.push({
        start_time: lastTime["end_time"],
        end_time: `${parseInt(lastTime["end_time"].split(":")[0]) + 1}:00`,
        duration: parseInt(this.state.duration),
        period_count: parseInt(this.state.period_count),
        capacity: parseInt(this.state.capacity),
      });
      let week = { ...this.state.week, [day]: tempDay };
      this.setState({ week });
    }
  };
  addItemToDay = (newAddedItem, day) => {
    let week = { ...this.state.week };
    let items = [...week[day], { ...newAddedItem, interfere: false }];
    this.updateItemOfDay(day, items);
  };
  updateItem = (item, day) => {
    let week = { ...this.state.week };
    let items = [...week[day]];
    let foundItemIndex = items.findIndex((x) => x.index === item.index);
    items[foundItemIndex] = item;
    this.updateItemOfDay(day, items);
  };
  deleteItem = (item, day) => {
    let week = { ...this.state.week };
    let items = [...week[day]];
    items = items.filter((x) => x.index !== item.index);
    this.updateItemOfDay(day, items);
  };
  weekDayInput = (day) => {
    let { duration, capacity, period_count } = this.state;
    return (
      <DataListConfig
        items={this.state.week[day]}
        duration={duration}
        capacity={capacity}
        period_count={period_count}
        day={day}
        addItemToDay={this.addItemToDay}
        updateItem={this.updateItem}
        deleteItem={this.deleteItem}
      />
    );
  };
  handleAlert = (state, value) => {
    this.setState({ [state]: value });
  };

  generateRowOfWeeks = () => {
    let daysList = [
      ["saturday", "شنبه‌ها"],
      ["sunday", "یک‌شنبه‌ها"],
      ["monday", "دو‌شنبه‌ها"],
      ["tuesday", "سه‌شنبه‌ها"],
      ["wednesday", "چهار‌شنبه‌ها"],
      ["thursday", "پنج‌شنبه‌ها"],
      ["friday", "جمعه‌ها"],
    ];
    return daysList.map(
      (x) =>
        this.check7Day(x[0]) && (
          <React.Fragment key={x[0]}>
            {" "}
            <FormGroup style={{ marginTop: "10px" }} row>
              <Col xs="12">
                <span>{x[1]} : </span>
              </Col>
              {this.weekDayInput(x[0])}
            </FormGroup>
            <div className="divider divider-left divider-warning">
              <div className="divider-text">
                <Clock />
              </div>
            </div>
          </React.Fragment>
        )
    );
  };
  showDateErrorStart = () => {
    let todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    if (this.state.endDate < this.state.startDate)
      return (
        <small style={{ color: "red", fontSize: "11px" }}>
          تاریخ شروع باید از تاریخ پایان بزرگتر باشد
        </small>
      );
    else if (this.state.startDate < todayDate.getTime())
      return (
        <small style={{ color: "red", fontSize: "11px" }}>
          تاریخ انتخاب شده نمی‌تواند قبل از امروز باشد
        </small>
      );
    return <React.Fragment></React.Fragment>;
  };
  showDateErrorEnd = () => {
    let todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    if (this.state.endDate < this.state.startDate)
      return (
        <small style={{ color: "red", fontSize: "11px" }}>
          تاریخ پایان باید از تاریخ شروع بزرگتر باشد
        </small>
      );
    else if (this.state.endDate < todayDate.getTime())
      return (
        <small style={{ color: "red", fontSize: "11px" }}>
          تاریخ انتخاب شده نمی‌تواند قبل از امروز باشد
        </small>
      );
    return <React.Fragment></React.Fragment>;
  };
  disabledSubmitButton = () => {
    let { week } = this.state;
    let dayNames = Object.keys(week);
    for (let i = 0; i < dayNames.length; i++) {
      let itemsOfDay = week[dayNames[i]];
      for (let j = 0; j < itemsOfDay.length; j++) {
        if (itemsOfDay[j].interfere) return true;
      }
    }
    return false;
  };
  render() {
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>مشخصات نوبت</CardTitle>
          </CardHeader>
          <CardBody>
            <Form className="mt-2">
              <Row>
                <Col md="3" sm="12">
                  <FormGroup>
                    <Label for="personsNum">
                      تعداد نفرات مجاز
                      <span style={{ color: "red" }}>*</span>
                    </Label>
                    <UncontrolledTooltip placement="top" target="personsNum">
                      تعداد افرادی که در هر نوبت می‌توانند حضور داشته‌باشند
                    </UncontrolledTooltip>
                    <Input
                      type="number"
                      name="personsNum"
                      id="personsNum"
                      onChange={(e) => {
                        if (e.target.value.length < 5) {
                          this.setState({ capacity: e.target.value });
                          this.changeDayInputAfterVisible(
                            "capacity",
                            e.target.value
                          );
                        }
                      }}
                      value={this.state.capacity}
                      placeholder="عدد وارد کنید"
                    />
                  </FormGroup>
                </Col>
                <Col md="1" />
                <Col md="3" sm="12">
                  <FormGroup>
                    <Label>
                      تعداد نوبت‌ها
                      <span style={{ color: "red" }}>*</span>
                    </Label>
                    <UncontrolledTooltip placement="top" target="NumOfTurns">
                      در بین دو بازه زمانی چه تعداد نوبت می‌خواهید ایجاد کنید
                    </UncontrolledTooltip>
                    <Input
                      type="number"
                      name="NumOfTurns"
                      id="NumOfTurns"
                      onChange={(e) => {
                        if (e.target.value.length < 5) {
                          this.setState({ period_count: e.target.value });
                          this.changeDayInputAfterVisible(
                            "period_count",
                            e.target.value
                          );
                        }
                      }}
                      value={this.state.period_count}
                      placeholder="عدد وارد کنید"
                    />
                  </FormGroup>
                </Col>
                <Col md="1" />
                <Col md="3" sm="12">
                  <FormGroup>
                    <Label for="duration">
                      بازه یک نوبت
                      <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      type="number"
                      name="duration"
                      id="duration"
                      onChange={(e) => {
                        if (e.target.value.length < 4) {
                          this.setState({ duration: e.target.value });
                          this.changeDayInputAfterVisible(
                            "duration",
                            e.target.value
                          );
                        }
                      }}
                      maxLength={3}
                      value={this.state.duration}
                      placeholder="مدت زمان هر نوبت (به دقیقه)"
                    />
                    {this.durationMod5()}
                  </FormGroup>
                </Col>
                <Col md="1" />
              </Row>
              <Row style={{ marginTop: "5px", marginBottom: "20px" }}>
                <Col md="3" sm="12">
                  <FormGroup>
                    <Label for="price">
                      هزینه نوبت
                      <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      type="number"
                      name="price"
                      id="price"
                      onChange={(e) => {
                        if (e.target.value.length < 7) {
                          this.setState({ price: e.target.value });
                        }
                      }}
                      maxLength={3}
                      value={this.state.price}
                      placeholder="قیمت به تومان"
                    />
                  </FormGroup>
                </Col>
                <Col md="1" />
                <Col md="3" sm="12">
                  <DatePicker
                    label="تاریخ شروع"
                    className="my-datepicker-style"
                    onClickSubmitButton={(selectedTime) =>
                      this.DateTimeChanged(selectedTime, "startDate")
                    }
                    theme={theme}
                    timePicker={false}
                  />
                  {this.showDateErrorStart()}
                </Col>
                <Col md="1" />
                <Col md="3" sm="12">
                  <DatePicker
                    label="تاریخ پایان"
                    className="my-datepicker-style"
                    onClickSubmitButton={(selectedTime) =>
                      this.DateTimeChanged(selectedTime, "endDate")
                    }
                    timePicker={false}
                    theme={theme}
                  />
                  {this.showDateErrorEnd()}
                </Col>
              </Row>
              <Row>
                <Col md="10" />
                <Col md="2" sm="12">
                  <FormGroup className="form-label-group">
                    <Button
                      color="primary"
                      style={{ float: "left", width: "100%" }}
                      disabled={
                        this.fillInput() ||
                        this.checkDate() ||
                        this.state.display
                      }
                      onClick={this.GoToTimeSection}
                    >
                      تایید و ادامه
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
        {this.state.display && !this.fillInput() && !this.checkDate() && (
          <Card className={classnames("card-action card-reload", {})}>
            <CardHeader
              onClick={this.toggleCollapse}
              onMouseOver={(e) => (e.currentTarget.style.cursor = "pointer")}
            >
              <CardTitle>تعیین بازه های زمانی</CardTitle>
              <div className="actions">
                <ChevronDown
                  className="collapse-icon mr-50"
                  size={15}
                  // onClick={this.toggleCollapse}
                />
              </div>
            </CardHeader>

            <Collapse isOpen={this.state.collapse}>
              <Card>
                <CardBody>
                  <Form>
                    {this.generateRowOfWeeks()}
                    <FormGroup row>
                      <Col md={{ size: 8, offset: 4 }}>
                        <Button
                          color="primary"
                          style={{ float: "left" }}
                          // type="submit"
                          className="mr-1 mb-1"
                          outline
                          onClick={this.PostToServer}
                          disabled={
                            this.state.submitBtnDisabled ||
                            this.disabledSubmitButton()
                          }
                        >
                          ثبت
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Collapse>
          </Card>
        )}
        <SweetAlert
          success
          title="Success"
          show={this.state.successAlert}
          confirmBtnText="باشه"
          onConfirm={() => {
            this.handleAlert("successAlert", false);
            history.push("my-reservation");
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
export default BookingCreation;
