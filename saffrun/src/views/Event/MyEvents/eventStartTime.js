import React, { Component } from "react";
import { Card, CardBody, CardTitle, CardHeader } from "reactstrap";
import "../../../assets/scss/pages/coming-soon.scss";
import Countdown from "react-countdown-now";
import { toast } from "react-toastify";
import { date } from "yup";
import "./timer.css";

class EventStartTime extends Component {
  state = {};
  renderTimer = ({ days, hours, minutes, seconds }) => {
    return (
      <div>
        <div className="clockCard my-padding">
          <p>{seconds}</p>
          <p className="bg-amber clockFormat lead my-padding "> ثانیه </p>
        </div>
        <div className="clockCard my-padding">
          <p>{minutes}</p>
          <p className="bg-amber clockFormat lead my-padding "> دقیقه </p>
        </div>
        <div className="clockCard my-padding">
          <p>{hours}</p>
          <p className="bg-amber clockFormat lead my-padding "> ساعت </p>
        </div>
        <div className="clockCard my-padding">
          <p>{days}</p>
          <p className="bg-amber clockFormat lead my-padding "> روز </p>
        </div>
      </div>
    );
  };
  loadTimer = (datetime) => {
    return new Date(datetime).getTime();
  };
  compareDateTimes = (eventDateTime, startDateTime) => {
    return (
      new Date(eventDateTime) > new Date() &&
      new Date(startDateTime) < new Date()
    );
  };
  loadCardBody = (end_datetime, start_datetime, participants) => {
    if (new Date(end_datetime) < new Date()) {
      return (
        <p className="mt-3 mb-5">
          رویداد شما با تعداد {participants} شرکت‌کننده به اتمام رسید
        </p>
      );
    } else if (new Date(start_datetime) > new Date()) {
      return (
        <div
          style={{ color: "orange", fontSize: "14px" }}
          className="text-center   d-flex justify-content-center flex-wrap"
        >
          <Countdown
            date={this.loadTimer(start_datetime)}
            renderer={this.renderTimer}
            onComplete={() => {
              toast.success("رویداد شما فرارسیده است.", {
                position: toast.POSITION.TOP_CENTER,
              });
            }}
          />
          <p style={{ fontSize: "14px", color: "black" }} className="mt-3 mb-5">
            رویداد شما با تعداد {participants} شرکت‌کننده طبق زمان بالا شروع
            می‌شود
          </p>
        </div>
      );
    } else if (new Date(end_datetime) > new Date()) {
      return (
        <div
          style={{ color: "orange", fontSize: "14px" }}
          className="text-center   d-flex justify-content-center flex-wrap"
        >
          <Countdown
            date={this.loadTimer(end_datetime)}
            renderer={this.renderTimer}
            onComplete={() => {
              toast.success("رویداد شما فرارسیده است.", {
                position: toast.POSITION.TOP_CENTER,
              });
            }}
          />
          <p style={{ fontSize: "14px", color: "black" }} className="mt-3 mb-5">
            رویداد شما با تعداد {participants} شرکت‌کننده طبق زمان بالا به اتمام 
            می‌رسد
          </p>
        </div>
      );
    }
  };
  render() {
    let { participants, end_datetime, start_datetime } = this.props;
    return (
      <Card>
        <CardHeader>
          <CardTitle>زمان نوبت</CardTitle>
        </CardHeader>
        <CardBody className="justify-content-center d-flex">
          {this.loadCardBody(end_datetime, start_datetime, participants)}
        </CardBody>
      </Card>
    );
  }
}

export default EventStartTime;
