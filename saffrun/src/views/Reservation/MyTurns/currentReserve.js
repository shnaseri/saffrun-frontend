import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
} from "reactstrap";
import "./buttonStyle.css";

import "../../../assets/scss/pages/coming-soon.scss";
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
import { history } from "../../../history";
import "./tooltipModal.css";

class CurrentReserve extends Component {
  state = {
    tooltipOpen: false,
    currentReserveModal: false,
  };
  toggleModal = () => {
    let { currentReserveModal } = this.state;
    this.setState({ currentReserveModal: !currentReserveModal });
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
    let { currentReserve } = this.props;
    return (
      <Card>
        <CardHeader>
          <CardTitle>نوبت‌ در حال اجرا</CardTitle>
        </CardHeader>

        <CardBody style={{ justifyContent: "center" }}>
          <Badge
            style={{ borderRadius: "50%", padding: "0.6rem" }}
            pill
            color="warning"
            className="mr-1 mb-1 badge-lg blinking-clock"
          >
            <Clock size={16} />
          </Badge>

          <span style={{ lineHeight: "3" }}>
            نوبت کنونی شما در ساعت{" "}
            <mark>
              <strong>{this.correctHour(currentReserve.holdTime)}</strong>
            </mark>{" "}
            با تعداد
            <mark>
              <strong>{currentReserve.participants.length}</strong>
            </mark>{" "}
             شرکت‌کننده شروع‌شده و در ساعت
            <mark>
              <strong>{this.correctHour(currentReserve.endTime)}</strong>
            </mark>{" "}
            به اتمام می‌رسد.
          </span>
          <Button
            className="current-reserve bg-warning"
            // color="warning"
            onClick={this.toggleModal}
            onMouseOver={(e) => this.setState({ tooltipOpen: true })}
            onMouseOut={(e) => this.setState({ tooltipOpen: false })}
            id="reserve-current-tooltip"
          >
            <span>مشاهده</span>
          </Button>

          <Tooltip
            isOpen={this.state.tooltipOpen}
            placement="top"
            target="reserve-current-tooltip"
          >
            برای مشاهده نوبت در حال انجام خود کلیک کنید
          </Tooltip>

          <Modal
            isOpen={this.state.currentReserveModal}
            toggle={this.toggleModal}
            className="modal-dialog-centered"
          >
            <ModalHeader
              toggle={this.toggleModal}
              className={"bg-gradient-primary"}
            >
              نوبت کنونی
            </ModalHeader>
            <ModalBody>
              <ul
                style={{ borderRight: "none" }}
                className="activity-timeline timeline-left list-unstyled"
              >
                <li>
                  <div className="timeline-icon bg-info">
                    <Calendar size={16} />
                  </div>
                  <div className="timeline-info">
                    <p className="font-weight-bold mb-0">تاریخ</p>
                    <span className="font-small-3">
                      {this.dateConverter(currentReserve.holdDate)}
                    </span>
                  </div>
                  <small className="text-muted">
                    {this.dayOfWeek(currentReserve.holdDate)} -
                    {this.correctHour(currentReserve.holdTime)}
                  </small>
                </li>
                <li>
                  <div className="timeline-icon bg-warning">
                    <Layers size={16} />
                  </div>
                  <div className="timeline-info">
                    <p className="font-weight-bold mb-0">ظرفیت</p>

                    <span className="font-small-3">
                      {currentReserve.allCap}
                    </span>
                  </div>
                  <small className="text-muted">
                    {currentReserve.participants.length} ظرفیت از{" "}
                    {currentReserve.allCap} ظرفیت شما پر شده‌است
                  </small>
                </li>
                <li>
                  <div className="timeline-icon bg-danger">
                    <MapPin size={16} />
                  </div>
                  <div className="timeline-info">
                    <p className="font-weight-bold mb-0">لوکاتیون</p>
                    <span className="font-small-3">
                      {currentReserve.location}
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
                        {currentReserve.participants
                          .slice(0, 5)
                          .map((R, index) => (
                            <li key={index} className="avatar pull-up">
                              <span></span>
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
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => {
                  history.push(`reserve-detail/${currentReserve.date}`);
                }}
              >
                مشاهده جزئیات
              </Button>
            </ModalFooter>
          </Modal>
        </CardBody>
      </Card>
    );
  }
}

export default CurrentReserve;
