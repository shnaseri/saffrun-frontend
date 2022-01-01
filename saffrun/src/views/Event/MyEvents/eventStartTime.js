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
  render() {
    let { participants, datetime, start_datetime } = this.props;
    return (
      <Card>
        <CardHeader>
          <CardTitle>زمان پایان</CardTitle>
        </CardHeader>
        <CardBody className="justify-content-center d-flex">
          {this.compareDateTimes(datetime, start_datetime) && (
            <div
              style={{ color: "orange", fontSize: "14px" }}
              className="text-center   d-flex justify-content-center flex-wrap"
            >
              <Countdown
                date={this.loadTimer(datetime)}
                renderer={this.renderTimer}
                onComplete={() => {
                  toast.success("رویداد شما فرارسیده است.", {
                    position: toast.POSITION.TOP_CENTER,
                  });
                }}
              />
              <p
                style={{ fontSize: "14px", color: "black" }}
                className="mt-3 mb-5"
              >
                رویداد شما با تعداد {participants} شرکت‌کننده در حال اجراست
              </p>
            </div>
          )}
          {!this.compareDateTimes(datetime, start_datetime) && (
            <React.Fragment>
              <p className="mt-3 mb-5">
                رویداد شما با تعداد {participants} شرکت‌کننده در حال اجرا
                نمی‌باشد
              </p>
            </React.Fragment>
          )}
        </CardBody>
      </Card>
    );
  }
}

export default EventStartTime;
