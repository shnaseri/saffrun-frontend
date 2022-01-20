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

import defaultImg from "../../../assets/img/profile/Generic-profile-picture.jpg.webp";
import imgUrlDomain from "../../../utility/imgUrlDomain";

class CurrentCard extends Component {
  state = {
    reserve: {
      participants: [],
    },
  };
  
  correctHour = (hourStr) => {
    let splitted = hourStr.split(":");
    return `${splitted[0]}:${splitted[1]}`;
  };
  differenceTwoTime = (hourStr1, hourStr2) => {
    let splitted1 = hourStr1.split(":");
    let splitted2 = hourStr2.split(":");
    let date1 = new Date(
      2000,
      1,
      1,
      parseInt(splitted1[0]),
      parseInt(splitted1[1])
    );
    let date2 = new Date(
      2000,
      1,
      1,
      parseInt(splitted2[0]),
      parseInt(splitted2[1])
    );
    return (date2 - date1) / (1000 * 60);
  };
  imgGenerator = (x) => {
    return x.image.image
      ? `${imgUrlDomain}${x.image.image.thumbnail}`
      : defaultImg;
  };
  participantsGenreator = (participants) => {
    return participants
      ? participants.map((x) => {
          return { name: x.name, imgUrl: this.imgGenerator(x) };
        })
      : [];
  };
  render() {
    let reserve = this.props.data
      ? {
          ...this.props.data,
          duration: this.props.data.start_time ? this.differenceTwoTime(
            this.props.data.start_time,
            this.props.data.end_time
          ) : "",
          participants: this.participantsGenreator(
            this.props.data.participants
          ),
        }
      : {};
    
    return (
      <Card>
        <CardHeader>
          <CardTitle>نزدیک‌ترین نوبت</CardTitle>
        </CardHeader>
        {reserve.id && (
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
                  <span className="font-small-3">
                    {this.correctHour(reserve.start_time)}
                  </span>
                </div>
                <small className="text-muted"></small>
              </li>
              <li style={{ height: "61px" }}>
                <div className="timeline-icon bg-gradient-success">
                  <Layers size={16} />
                </div>
                <div className="timeline-info">
                  <p className="font-weight-bold mb-0">ظرفیت</p>
                  <span className="font-small-3">{reserve.capacity} نفر</span>
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
        )}
        {!reserve.id && (
          <CardBody className="justify-content-center d-flex">
            <p style={{ marginTop: "30px" }}>نوبت نزدیکی وجود ندارد</p>
          </CardBody>
        )}
      </Card>
    );
  }
}

export default CurrentCard;
