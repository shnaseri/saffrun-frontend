import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  UncontrolledTooltip,
  Row,
  Col,
  Toast,
  ToastHeader,
  ToastBody,
} from "reactstrap";
import "./buttonStyle.css";
import "../../../assets/scss/pages/coming-soon.scss";
import Countdown from "react-countdown-now";
import { toast } from "react-toastify";
import "../../../assets/scss/pages/dashboard-analytics.scss";
import {
  Plus,
  AlertCircle,
  Clock,
  Layers,
  MapPin,
  UserPlus,
  Calendar,
} from "react-feather";

class ClosestReserve extends Component {
  state = {};
  renderTimer = ({ days, hours, minutes, seconds }) => {
    return (
      <div className="timer-style">
        <div className="clockCard px-1">
          <p>{seconds}</p>
          <p className="bg-amber clockFormat lead px-1 black"> ثانیه </p>
        </div>
        <div className="clockCard px-1">
          <p>{minutes}</p>
          <p className="bg-amber clockFormat lead px-1 black"> دقیقه </p>
        </div>
        <div className="clockCard px-1">
          <p>{hours}</p>
          <p className="bg-amber clockFormat lead px-1 black"> ساعت </p>
        </div>
        <div className="clockCard px-1">
          <p>{days}</p>
          <p className="bg-amber clockFormat lead px-1 black"> روز </p>
        </div>
      </div>
    );
  };
  dateCreator = (date, time) => {
    let newDate = new Date(date);
    let splittedTime = time.split(":");
    newDate.setHours(splittedTime[0], splittedTime[1]);
    return newDate.getTime();
  };
  dateConverter = (date) => {
    return new Date(date).toLocaleDateString("fa-IR");
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
  correctHour = (hourStr) => {
    let splitted = hourStr.split(":");
    return `${splitted[0]}:${splitted[1]}`;
  };
  render() {
    let { curIdx, nearestFive, currentTimer } = this.props;
    return (
      <Card>
        <CardHeader>
          <CardTitle>نزدیکترین نوبت</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="text-center getting-started pt-2 d-flex justify-content-center flex-wrap">
            <Countdown
              date={currentTimer}
              renderer={this.renderTimer}
              key={curIdx}
              onComplete={() => {
                toast.success("نوبت شما فرارسیده است.", {
                  position: toast.POSITION.TOP_CENTER,
                });
                this.props.timerFinished();
              }}
            />
          </div>
          <div style={{ height: "30px" }}></div>
          <Row>
            <Col lg="4">
              <ul className="activity-timeline timeline-left list-unstyled">
                <li>
                  <div className="timeline-icon bg-info">
                    <Calendar size={16} />
                  </div>
                  <div className="timeline-info">
                    <p className="font-weight-bold mb-0">تاریخ</p>
                    <span className="font-small-3">
                      {this.dateConverter(nearestFive[curIdx].date)}
                    </span>
                  </div>
                  <small className="text-muted">
                    {this.dayOfWeek(nearestFive[curIdx].date)}
                  </small>
                </li>
                <li>
                  <div className="timeline-icon bg-warning">
                    <Layers size={16} />
                  </div>
                  <div className="timeline-info">
                    <p className="font-weight-bold mb-0">ظرفیت</p>
                    <span className="font-small-3">۶/۱۰</span>
                  </div>
                  <small className="text-muted">
                    ۶ ظرفیت از ۱۰ ظرفیت شما پر شده‌است
                  </small>
                </li>
              </ul>
            </Col>
            <Col lg="4">
              <ul className="activity-timeline timeline-left list-unstyled">
                <li>
                  <div className="timeline-icon bg-danger">
                    <MapPin size={16} />
                  </div>
                  <div className="timeline-info">
                    <p className="font-weight-bold mb-0">لوکاتیون</p>
                    <span className="font-small-3">
                      تهران ، میرداماد ، خیابان پاسداران ، کوچه شهید دارابی
                    </span>
                  </div>
                  <small className="text-muted">
                    مکان حضور شما برای نوبت بعدی
                  </small>
                </li>
                <li>
                  <div className="timeline-icon bg-success">
                    <UserPlus size={16} />
                  </div>
                  <div className="timeline-info">
                    <p className="font-weight-bold mb-0">شرکت کنندگان </p>
                    <span className="font-small-3">
                      <ul className="list-unstyled users-list m-0 d-flex">
                        {this.props
                          .participantsGenreator()
                          .slice(0, 5)
                          .map((R) => (
                            <li key={"sos"} className="avatar pull-up">
                              <img
                                src={R["imgUrl"]}
                                alt="avatar"
                                height="30"
                                width="30"
                                id={R["name"]}
                              />
                              <UncontrolledTooltip
                                placement="bottom"
                                target={R["name"]}
                              >
                                {R["name"]}
                              </UncontrolledTooltip>
                            </li>
                          ))}
                      </ul>
                    </span>
                  </div>
                  <small className="text-muted"></small>
                </li>
              </ul>
            </Col>
            <Col lg="4">
              <ul className="activity-timeline timeline-left list-unstyled">
                <li>
                  <div className="timeline-icon bg-gradient-success">
                    <Clock size={16} />
                  </div>
                  <div className="timeline-info">
                    <p className="font-weight-bold mb-0">طول نوبت</p>
                    <span className="font-small-3">۲۰ دقیقه</span>
                  </div>
                  <small className="text-muted">مدت زمان نوبت شما</small>
                </li>
                {curIdx + 1 < nearestFive.length && (
                  <li>
                    <div
                      style={{ backgroundColor: "#c882c8" }}
                      className="timeline-icon"
                    >
                      <MapPin size={16} />
                    </div>
                    <div className="timeline-info">
                      <p className="font-weight-bold mb-0">نوبت بعدی</p>
                      <span className="font-small-3">
                        {this.dayOfWeek(nearestFive[curIdx + 1].date)} -{" "}
                        {this.correctHour(nearestFive[curIdx + 1].next_reserve)}
                      </span>
                    </div>
                    <small className="text-muted">
                      {this.dateConverter(nearestFive[curIdx + 1].date)}
                    </small>
                  </li>
                )}
              </ul>
              {/* <Toast style={{borderRadius : "50%"}}>
                <ToastHeader
                  className="bg-warning"
                  style={{ color: "white"}}
                >
                  Vuexy
                </ToastHeader>
                <ToastBody style={{ backgroundColor: "#ffe0c3" }}>
                  This is a toast on a warning background — check it out!
                </ToastBody>
              </Toast> */}
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default ClosestReserve;
