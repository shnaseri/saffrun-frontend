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
} from "reactstrap";
import { DatePicker } from "react-advance-jalaali-datepicker";
import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy";
import { ChevronDown, Check, Plus, Clock, Trash2 } from "react-feather";
import classnames from "classnames";
import TimeField from "react-simple-timefield";
import axios from "axios";

class BookingCreation extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  state = {
    disableEndTime: true,
    startDate: 0,
    endDate: 0,
    endBeforStart: false,
    collapse: true,
    display: false,
    basic: new Date(),
    ReservedName: "",
    capacity: "",
    period_count: "",
    duration: "",
    week: {
      saturday: [
        {
          start_time: "08:00",
          end_time: "17:00",
          duration: 0,
          period_count: 0,
          capacity: 0,
        },
      ],
      sunday: [
        {
          start_time: "08:00",
          end_time: "17:00",
          duration: 0,
          period_count: 0,
          capacity: 0,
        },
      ],
      monday: [
        {
          start_time: "08:00",
          end_time: "17:00",
          duration: 0,
          period_count: 0,
          capacity: 0,
        },
      ],
      tuesday: [
        {
          start_time: "08:00",
          end_time: "17:00",
          duration: 0,
          period_count: 0,
          capacity: 0,
        },
      ],
      wednesday: [
        {
          start_time: "08:00",
          end_time: "17:00",
          duration: 0,
          period_count: 0,
          capacity: 0,
        },
      ],
      thursday: [
        {
          start_time: "08:00",
          end_time: "17:00",
          duration: 0,
          period_count: 0,
          capacity: 0,
        },
      ],
      friday: [
        {
          start_time: "08:00",
          end_time: "17:00",
          duration: 0,
          period_count: 0,
          capacity: 0,
        },
      ],
    },
  };
  PostToServer = async () => {
    var days = {
      0: "sunday",
      1: "monday",
      2: "tuesday",
      3: "wednesday",
      4: "thursday",
      5: "friday",
      6: "saturday",
    };

    let startDate = new Date(this.state.startDate * 1000);
    let endDate = new Date(this.state.endDate * 1000);

    let data = {
      start_date: this.formatDate(startDate),
      end_date: this.formatDate(endDate),
      days_list: [],
    };
    let l = [];

    const diffTime = Math.abs(
      new Date(this.state.endDate * 1000) -
        new Date(this.state.startDate * 1000)
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    for (let index = 0; index < diffDays + 1; index++) {
      if (index === 7) break;
      let date = new Date(this.state.startDate * 1000);
      date.setDate(date.getDate() + index);
      l.push({ reserve_periods: this.state.week[days[date.getDay()]] });
    }
    data["days_list"] = l;
    let res = await axios.post("http://127.0.0.1:8000/reserve/create/", data, {
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQxNzMwNzQwLCJpYXQiOjE2MzY1NDY3NDAsImp0aSI6IjNjYTcyYTI1M2Q2YjQwY2JhZWI1YjYyMTdlZDdjNWQ2IiwidXNlcl9pZCI6MX0.lgupX15ZE66txd77Q27kAAS3-F900Nwufi2GUiwG2Rk",
      },
    });
    console.log(res);
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

  DatePickerInputFrom = (props) => {
    return (
      <React.Fragment>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            name="from"
            id="from"
            placeholder="از تاریخ"
            {...props}
          />
          <Label for="from">از تاریخ</Label>
        </FormGroup>
      </React.Fragment>
    );
  };

  DatePickerInputEnd = (props) => {
    return (
      <React.Fragment>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            name="End"
            id="End"
            placeholder="از تاریخ"
            {...props}
            disabled={this.state.disableEndTime}
          />
          <Label for="End">تا تاریخ</Label>
          {this.checkDate() && (
            <small style={{ color: "red", fontSize: "11px" }}>
              تاریخ شروع نباید بعد از پایان باشد.
            </small>
          )}
        </FormGroup>
      </React.Fragment>
    );
  };

  checkDate = () => {
    if (this.state.startDate > this.state.endDate) return true;
    else return false;
  };
  fillInput = () => {
    if (
      this.state.ReservedName === "" ||
      this.state.capacity === "" ||
      (this.state.period_count === "" && this.state.duration === "") ||
      (this.state.period_count !== "" && this.state.duration !== "") ||
      this.state.startDate === 0 || this.state.endDate === 0
    ) {
      return true;
    } else {
      return false;
    }
  };
  changeStart = (unix, formatted) => {
    this.setState({ disableEndTime: false, startDate: unix });
  };
  changeEnd = (unix, formatted) => {
    this.setState({ endDate: unix });
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
    for (let index = 0; index < days.length; index++) {
      this.state.week[days[index]][0]["duration"] = parseInt(
        this.state.duration === "" ? 0 : this.state.duration
      );
      this.state.week[days[index]][0]["period_count"] = parseInt(
        this.state.period_count === "" ? 0 : this.state.period_count
      );
      this.state.week[days[index]][0]["capacity"] = parseInt(
        this.state.capacity === "" ? 0 : this.state.capacity
      );
    }
    let week = this.state.week;
    console.log(week);
    this.setState({ display: true, week });
  };
  checkOverlapTime = (day, index) => {
    let dayList = [...this.state.week[day]];
    // console.log(index);
    // console.log(day);
    for (let i = 0; i < dayList.length; i++) {
      if (i === index) continue;
      if (
        dayList[index]["start_time"] < dayList[i]["start_time"] &&
        dayList[index]["end_time"] > dayList[i]["start_time"]
      ) {
        return true;
      }
      if (
        dayList[index]["start_time"] > dayList[i]["start_time"] &&
        dayList[index]["start_time"] < dayList[i]["end_time"]
      ) {
        return true;
      }
    }
    return false;
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
      new Date(this.state.endDate * 1000) -
        new Date(this.state.startDate * 1000)
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 6) return true;
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let ind = days.indexOf(day);
    let DayOfWeek = [];
    for (let i = 0; i < diffDays + 1; i++) {
      let date = new Date(this.state.startDate * 1000);
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
    } else if (this.checkOverlapTime(day, index)) {
      return (
        <small style={{ color: "red", fontSize: "11px" }}>
          بازه های زمانی وارد شده با یکدیگر تداخل دارند
        </small>
      );
    }
    return <React.Fragment></React.Fragment>;
  };
  weekDayInput = (day) => {
    return this.state.week[day].map((item, index) => (
      <React.Fragment>
        {index === 0 ? (
          <React.Fragment>
            <Col style={{ marginTop: 9 }} md="2" xl="1" lg="1" xs="4" sm="3">
              <TimeField
                value={item["end_time"]}
                onChange={(event, value) =>
                  this.handleChangeTime(event, value, day, index, "to")
                }
                input={<Input />}
                colon=":"
              />
            </Col>

            <Col style={{ marginTop: 9 }} md="2" xl="1" lg="1" xs="4" sm="3">
              <TimeField
                value={item["start_time"]}
                onChange={(event, value) =>
                  this.handleChangeTime(event, value, day, index, "start_time")
                }
                input={<Input />}
                colon=":"
              />
            </Col>
            <Col md="2" xl="1" lg="1" xs="1" sm="1">
              <Trash2
                onMouseOver={(e) => (e.currentTarget.style.cursor = "pointer")}
                onClick={() => this.handleDeleteTime(day, index)}
                size={18}
                style={{ marginTop: 18 }}
                color="red"
              />
            </Col>
            <Col md="3" xl="3" lg="3">
              {this.ShowError(day, index, item)}
            </Col>
            <Col md="1" xl="4" lg="4" xs="0" sm="0"></Col>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Col md="2" xl="2" lg="2" xs="2" sm="2"></Col>

            <Col style={{ marginTop: 9 }} md="2" xl="1" lg="1" xs="4" sm="3">
              <TimeField
                value={item["end_time"]}
                onChange={(event, value) =>
                  this.handleChangeTime(event, value, day, index, "end_time")
                }
                input={<Input style={{ border: "2px solid red" }} />}
                colon=":"
              />
            </Col>
            <Col style={{ marginTop: 9 }} md="2" xl="1" lg="1" xs="4" sm="3">
              <TimeField
                value={item["start_time"]}
                onChange={(event, value) =>
                  this.handleChangeTime(event, value, day, index, "start_time")
                }
                input={<Input style={{ border: "1px solid red" }} />}
                colon=":"
              />
            </Col>
            <Col md="2" xl="1" lg="1" xs="1" sm="1">
              <Trash2
                onMouseOver={(e) => (e.currentTarget.style.cursor = "pointer")}
                onClick={() => this.handleDeleteTime(day, index)}
                size={18}
                style={{ marginTop: 18 }}
                color="red"
              />
            </Col>
            <Col md="3" xl="3" lg="3">
              {this.ShowError(day, index, item)}
            </Col>
            <Col md="1" xl="4" lg="4" xs="0" sm="0"></Col>
          </React.Fragment>
        )}
      </React.Fragment>
    ));
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
                <Col style={{ padding: 5 }} md="6" sm="12">
                  <FormGroup className="form-label-group">
                    <Input
                      type="text"
                      name="name"
                      id="TurnName"
                      onChange={(e) =>
                        this.setState({ ReservedName: e.target.value })
                      }
                      value={this.state.ReservedName}
                      placeholder="نام نوبت"
                    />
                    <Label for="TurnName">نام نوبت</Label>
                  </FormGroup>
                </Col>
                <Col style={{ padding: 5 }} md="6" sm="12">
                  <FormGroup className="form-label-group">
                    <Input
                      type="number"
                      name="personsNum"
                      pattern="[1-9]"
                      id="personsNum"
                      onChange={(e) =>
                        this.setState({ capacity: e.target.value })
                      }
                      value={this.state.capacity}
                      placeholder="تعداد نفرات مجاز"
                    />
                    <Label for="personsNum">تعداد نفرات مجاز</Label>
                  </FormGroup>
                </Col>
                <Col style={{ padding: 5 }} md="6" sm="12">
                  <DatePicker
                    inputComponent={this.DatePickerInputFrom}
                    placeholder=" از تاریخ"
                    format="jYYYY/jMM/jDD"
                    onChange={this.changeStart}
                    id="datePicker"
                    lab
                  />
                </Col>
                <Col style={{ padding: 5 }} md="6" sm="12">
                  <DatePicker
                    inputComponent={this.DatePickerInputEnd}
                    placeholder="تا تاریخ"
                    format="jYYYY/jMM/jDD"
                    onChange={this.changeEnd}
                    id="datePicker"
                    // preSelected="1396/05/15"
                  />
                </Col>
                <Col style={{ padding: 5 }} md="6" sm="12">
                  <FormGroup className="form-label-group">
                    <Input
                      type="text"
                      name="NumOfTurns"
                      id="NumOfTurns"
                      onChange={(e) =>
                        this.setState({ period_count: e.target.value })
                      }
                      value={this.state.period_count}
                      placeholder="تعداد نوبت ها"
                    />
                    <Label for="NumOfTurns">تعداد نوبت ها </Label>
                  </FormGroup>
                </Col>
                <Col style={{ padding: 5 }} md="6" sm="12">
                  <FormGroup className="form-label-group">
                    <Input
                      type="text"
                      name="duration"
                      id="duration"
                      onChange={(e) =>
                        this.setState({ duration: e.target.value })
                      }
                      value={this.state.duration}
                      placeholder="مدت زمان هر نوبت (به دقیقه)"
                    />
                    <Label for="duration">مدت رمان هر نوبت (به دقیقه)</Label>
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup className="form-label-group">
                    <Button
                      color="primary"
                      // type="submit"
                      style={{ float: "left" }}
                      className="mr-1 mb-1"
                      disabled={this.fillInput() || (this.checkDate() || this.state.endDate === 0)}
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
        {this.state.display && (
          <Card
            ref={this.myRef}
            className={classnames("card-action card-reload", {})}
          >
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
                    {this.check7Day("Saturday") && (
                      <React.Fragment>
                        {" "}
                        <FormGroup row>
                          <Col md="1" xl="1" lg="1" xs="12" sm="12">
                            <span >شنبه ها</span>
                          </Col>
                          <Col md="1" xl="1" lg="1" xs="2" sm="2">
                            <Plus
                              onMouseOver={(e) =>
                                (e.currentTarget.style.cursor = "pointer")
                              }
                              
                              onClick={() => this.addInput("saturday")}
                            ></Plus>
                          </Col>
                          {this.weekDayInput("saturday")}
                        </FormGroup>
                        <div className="divider divider-left divider-warning">
                          <div className="divider-text">
                            <Clock />
                          </div>
                        </div>
                      </React.Fragment>
                    )}
                    {this.check7Day("Sunday") && (
                      <React.Fragment>
                        {" "}
                        <FormGroup row>
                          <Col md="1" xl="1" lg="1" xs="12" sm="12">
                            <span >یکشنبه ها</span>
                          </Col>
                          <Col md="1" xl="1" lg="1" xs="2" sm="2">
                            <Plus
                              onMouseOver={(e) =>
                                (e.currentTarget.style.cursor = "pointer")
                              }
                              
                              onClick={() => this.addInput("sunday")}
                            ></Plus>
                          </Col>
                          {this.weekDayInput("sunday")}
                        </FormGroup>
                        <div className="divider divider-left divider-warning " >
                          <div className="divider-text">
                            <Clock />
                          </div>
                        </div>
                      </React.Fragment>
                    )}
                    {this.check7Day("Monday") && (
                      <React.Fragment>
                        {" "}
                        <FormGroup row>
                          <Col md="1" xl="1" lg="1" xs="12" sm="12">
                            <span >دوشنبه ها</span>
                          </Col>
                          <Col md="1" xl="1" lg="1" xs="2" sm="2">
                            <Plus
                              onMouseOver={(e) =>
                                (e.currentTarget.style.cursor = "pointer")
                              }
                              
                              onClick={() => this.addInput("monday")}
                            ></Plus>
                          </Col>
                          {this.weekDayInput("monday")}
                        </FormGroup>
                        <div className="divider divider-left divider-warning">
                          <div className="divider-text">
                            <Clock />
                          </div>
                        </div>
                      </React.Fragment>
                    )}
                    {this.check7Day("Tuesday") && (
                      <React.Fragment>
                        {" "}
                        <FormGroup row>
                          <Col md="1" xl="1" lg="1" xs="12" sm="12">
                            <span >سه شنبه ها</span>
                          </Col>
                          <Col md="1" xl="1" lg="1" xs="2" sm="2">
                            <Plus
                              onMouseOver={(e) =>
                                (e.currentTarget.style.cursor = "pointer")
                              }
                              
                              onClick={() => this.addInput("tuesday")}
                            ></Plus>
                          </Col>
                          {this.weekDayInput("tuesday")}
                        </FormGroup>
                        <div className="divider divider-left divider-warning">
                          <div className="divider-text">
                            <Clock />
                          </div>
                        </div>
                      </React.Fragment>
                    )}
                    {this.check7Day("Wednesday") && (
                      <React.Fragment>
                        {" "}
                        <FormGroup row>
                          <Col md="1" xl="1" lg="1" xs="12" sm="12">
                            <span >چهارشنبه ها</span>
                          </Col>
                          <Col md="1" xl="1" lg="1" xs="2" sm="2">
                            <Plus
                              onMouseOver={(e) =>
                                (e.currentTarget.style.cursor = "pointer")
                              }
                              
                              onClick={() => this.addInput("wednesday")}
                            ></Plus>
                          </Col>
                          {this.weekDayInput("wednesday")}
                        </FormGroup>
                        <div className="divider divider-left divider-warning">
                          <div className="divider-text">
                            <Clock />
                          </div>
                        </div>
                      </React.Fragment>
                    )}
                    {this.check7Day("Thursday") && (
                      <React.Fragment>
                        <FormGroup row>
                          <Col md="1" xl="1" lg="1" xs="12" sm="12">
                            <span >پنجشنبه ها</span>
                          </Col>
                          <Col md="1" xl="1" lg="1" xs="2" sm="2">
                            <Plus
                              onMouseOver={(e) =>
                                (e.currentTarget.style.cursor = "pointer")
                              }
                              
                              onClick={() => this.addInput("thursday")}
                            ></Plus>
                          </Col>
                          {this.weekDayInput("thursday")}
                        </FormGroup>
                        <div className="divider divider-left divider-warning">
                          <div className="divider-text">
                            <Clock />
                          </div>
                        </div>
                      </React.Fragment>
                    )}
                    {this.check7Day("Friday") && (
                      <React.Fragment>
                        {" "}
                        <FormGroup row>
                          <Col md="1" xl="1" lg="1" xs="12" sm="12">
                            <span >جمعه ها</span>
                          </Col>
                          <Col md="1" xl="1" lg="1" xs="2" sm="2">
                            <Plus
                              onMouseOver={(e) =>
                                (e.currentTarget.style.cursor = "pointer")
                              }
                              
                              onClick={() => this.addInput("friday")}
                            ></Plus>
                          </Col>
                          {this.weekDayInput("friday")}
                        </FormGroup>
                        <div className="divider divider-left divider-warning">
                          <div className="divider-text">
                            <Clock />
                          </div>
                        </div>
                      </React.Fragment>
                    )}

                    <FormGroup row>
                      <Col md={{ size: 8, offset: 4 }}>
                        <Button
                          color="primary"
                          style={{ float: "left" }}
                          // type="submit"
                          className="mr-1 mb-1"
                          onClick={this.PostToServer}
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
      </React.Fragment>
    );
  }
}
export default BookingCreation;
