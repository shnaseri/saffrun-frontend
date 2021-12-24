import React, { Component } from "react";
import { Calendar, Clock, Layers, Users } from "react-feather";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import avatar1 from "../../../assets/img/portrait/small/avatar-s-5.jpg";
import avatar2 from "../../../assets/img/portrait/small/avatar-s-7.jpg";
import avatar3 from "../../../assets/img/portrait/small/avatar-s-1.jpg";
import avatar4 from "../../../assets/img/portrait/small/avatar-s-2.jpg";
import avatar5 from "../../../assets/img/portrait/small/avatar-s-4.jpg";

class CurrentCard extends Component {
  state = {
    reserve: {
      participants: [],
    },
  };
  async componentDidMount() {
    this.loadCurrentReserve();
  }
  participantsGenreator = () => {
    return [
      { name: "Ali", imgUrl: avatar1 },
      { name: "Mmd", imgUrl: avatar2 },
      { name: "Mostafa", imgUrl: avatar3 },
      { name: "Saba", imgUrl: avatar4 },
      { name: "Sara", imgUrl: avatar5 },
    ];
  };
  loadCurrentReserve = () => {
    let reserve = {
      participants: this.participantsGenreator(),
      location: "تهران ، میرداماد ، خیابان پاسداران ، کوچه شهید دارابی",
      holdTime: "08:00",
      capacity: "۶/۱۰",
      duration: "20",
    };
    this.setState({ reserve });
  };
  render() {
    let { reserve } = this.state;
    return (
      <Card>
        <CardHeader>
          <CardTitle>نزدیکترین نوبت</CardTitle>
        </CardHeader>
        <CardBody>
          <ul
            style={{ borderRight: "none" }}
            className="activity-timeline timeline-left list-unstyled"
          >
            <li style={{ height: "61px" }}>
              <div className="timeline-icon bg-gradient-info">
                <Calendar size={16} />
              </div>
              <div className="timeline-info">
                <p className="font-weight-bold mb-0">ساعت برگزاری</p>
                <span className="font-small-3">{reserve.holdTime}</span>
              </div>
              <small className="text-muted"></small>
            </li>
            <li style={{ height: "61px" }}>
              <div className="timeline-icon bg-gradient-success">
                <Layers size={16} />
              </div>
              <div className="timeline-info">
                <p className="font-weight-bold mb-0">ظرفیت</p>
                <span className="font-small-3">{reserve.capacity}</span>
              </div>
              <small className="text-muted"></small>
            </li>
            <li style={{ height: "61px" }}>
              <div className="timeline-icon bg-gradient-warning">
                <Clock size={16} />
              </div>
              <div className="timeline-info">
                <p className="font-weight-bold mb-0">طول نوبت</p>
                <span className="font-small-3">{reserve.duration} دقیقه</span>
              </div>
              <small className="text-muted"></small>
            </li>
            <li style={{ height: "61px" }}>
              <div className="timeline-icon bg-gradient-danger">
                <Users size={16} />
              </div>
              <div className="timeline-info">
                <p className="font-weight-bold mb-0">شرکت کنندگان</p>
                <span className="font-small-3">
                  <ul className="list-unstyled users-list m-0 d-flex">
                    {reserve.participants.slice(0, 5).map((R, index) => (
                      <li key={index} className="avatar pull-up">
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
              {/* <small className="text-muted">سلام</small> */}
            </li>
          </ul>
        </CardBody>
      </Card>
    );
  }
}

export default CurrentCard;
