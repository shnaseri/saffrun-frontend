import React, { Component } from "react";
import { Eye, Calendar, Layers, DollarSign, Users } from "react-feather";
import StatisticsCard from "../../../components/@vuexy/statisticsCard/StatisticsCard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Button,
} from "reactstrap";
import { history } from "../../../history";

class ReserveStats extends Component {
  state = {
    stats: {},
  };
  async componentDidMount() {
    this.loadCurrentReserve();
  }
  loadCurrentReserve = () => {
    let stats = {
      participantsCount: 24,
      date: "2022-12-27",
      turnOver: 1_240_000,
      reserveCount: 25,
    };
    this.setState({ stats });
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
  dateConverter = (date) => {
    return new Date(date).toLocaleDateString("fa-IR");
  };
  moreThan1000 = (num) => {
    if (num > 1000000) {
      num = `${num / 1000000}`;
      return `${num.substring(0, 3)} میلیون تومان`;
    }
    if (num > 1000) {
      num = `${num / 1000}`;
      return `${num.substring(0, 3)} هزار تومان`;
    }
    return num;
  };
  tempFunction = () => {
    history.push({ pathname: "/edit-day", state: { date: "1400/12/24" } });
  };
  render() {
    let stats = this.props.data;
    
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>اطلاعات نوبت روز</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col lg="6">
                <ul
                  style={{ borderRight: "none" }}
                  className="activity-timeline timeline-left list-unstyled"
                >
                  <li style={{ height: "61px" }}>
                    <div className="timeline-icon bg-success">
                      <Calendar size={16} />
                    </div>
                    <div className="timeline-info">
                      <p className="font-weight-bold mb-0">تاریخ</p>
                      <span className="font-small-3">
                        {this.dayOfWeek(stats.date)} -{" "}
                        {this.dateConverter(stats.date)}
                      </span>
                    </div>
                    {/* <small className="text-muted">سلام</small> */}
                  </li>
                  <li style={{ height: "61px" }}>
                    <div className="timeline-icon bg-warning">
                      <DollarSign size={16} />
                    </div>
                    <div className="timeline-info">
                      <p className="font-weight-bold mb-0">گردش مالی</p>
                      <span className="font-small-3">
                        {this.moreThan1000(stats.payment_of_date)}
                      </span>
                    </div>
                    {/* <small className="text-muted">
                      ۶ ظرفیت از ۱۰ ظرفیت شما پر شده‌است
                    </small> */}
                  </li>
                </ul>
              </Col>
              <Col lg="6">
                <ul
                  style={{ borderRight: "none" }}
                  className="activity-timeline timeline-left list-unstyled"
                >
                  <li style={{ height: "61px" }}>
                    <div className="timeline-icon bg-info">
                      <Layers size={16} />
                    </div>
                    <div className="timeline-info">
                      <p className="font-weight-bold mb-0">تعداد نوبت</p>
                      <span className="font-small-3">
                        {stats.number_of_reservation} نوبت ایجاد شده
                      </span>
                    </div>
                    {/* <small className="text-muted">سلام</small> */}
                  </li>
                  <li style={{ height: "61px" }}>
                    <div className="timeline-icon bg-danger">
                      <Users size={16} />
                    </div>
                    <div className="timeline-info">
                      <p className="font-weight-bold mb-0">
                        تعداد شرکت‌کنندگان
                      </p>
                      <span className="font-small-3">
                        {stats.number_of_users} نفر شرکت کرده
                      </span>
                    </div>
                    {/* <small className="text-muted">
                      ۶ ظرفیت از ۱۰ ظرفیت شما پر شده‌است
                    </small> */}
                  </li>
                </ul>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default ReserveStats;
