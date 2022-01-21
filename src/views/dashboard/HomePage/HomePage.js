import React from "react";
import { Row, Col, Button } from "reactstrap";

import RevenueChart from "../../ui-elements/cards/analytics/Revenue";
import SupportTracker from "./../../ui-elements/cards/analytics/SupportTracker";
import { Star, Users, Command, MessageCircle, Check } from "react-feather";
import ApexLineCharts from "./../../charts/apex/ApexLineChart";
import "../../../assets/scss/plugins/charts/apex-charts.scss";
import avatarImg from "../../../assets/img/portrait/small/avatar-s-12.jpg";
import { Card, CardHeader, CardBody } from "reactstrap";
import DispatchedOrders from "./DispatchedOrders";
import { ChevronsRight } from "react-feather";
import { history } from "./../../../history";
import isAuthenticated from "./../../../utility/authenticated";
import axios from "axios";
import urlDomain from "./../../../utility/urlDomain";
import ComponentSpinner from "./../../../components/@vuexy/spinner/Loading-spinner";
import userImg from "../../../assets/img/profile/Generic-profile-picture.jpg.webp";
import imgUrlDomain from "../../../utility/imgUrlDomain";

let $primary = "#7367F0",
  $danger = "#EA5455",
  $danger_light = "#f29292",
  $stroke_color = "#b9c3cd",
  $label_color = "#e7eef7",
  $white = "#fff";
const header = ["نوبت گیرنده", "مکان", "تاریخ و زمان", "مدت"];
class Home extends React.Component {
  state = {
    homeData: {},
    loadSpinner: true,
    last_comments: [],
  };
  async componentDidMount() {
    let authenticated = await isAuthenticated();
    if (!authenticated) history.push("/login");
    let token = localStorage.getItem("access");
    token = `Bearer ${token}`;
    try {
      let homeData = await axios.get(`${urlDomain}/core/homepage`, {
        headers: { Authorization: token },
      });
      console.log(homeData.data["last_comments"]);
      this.setState({
        homeData: homeData.data,
        loadSpinner: false,
        last_comments: homeData.data["last_comments"],
      });
    } catch (e) {
      this.setState({ loadSpinner: false });
    }
  }
  handleAvatar = () => {
    if (this.state.homeData["image"]["image"]) {
      return imgUrlDomain + this.state.homeData["image"]["image"]["thumbnail"];
    } else {
      return userImg;
    }
  };
  render() {
    return this.state.loadSpinner ? (
      <ComponentSpinner />
    ) : (
      <React.Fragment>
        <Row className="match-height">
          <Col lg="4" md="6" sm="12">
            <Card>
              <CardHeader className="mx-auto">
                <div className="avatar mr-1 avatar-xl">
                  <img src={this.handleAvatar()} alt="avatarImg" />
                </div>
              </CardHeader>
              <CardBody className="text-center">
                <h4>
                  {this.state.homeData["first_name"]}{" "}
                  {this.state.homeData["last_name"]}
                </h4>
                <div className="d-flex justify-content-between mt-2">
                  <div className="uploads">
                    <p className="font-weight-bold font-medium-2 mb-0">
                      {this.state.homeData["number_of_comments"]}
                    </p>
                    <span>کامنت ها</span>
                  </div>
                  <div className="followers">
                    <p className="font-weight-bold font-medium-2 mb-0">
                      {this.state.homeData["followers"]}
                    </p>
                    <span>دنبال کنندگان</span>
                  </div>
                  {/* <div className="following">
                    <p className="font-weight-bold font-medium-2 mb-0">112</p>
                    <span>Following</span>
                  </div> */}
                </div>
                <hr className="my-2" />
                {this.state.last_comments.length > 0 ? (
                  <div style={{ height: 250 }} className="d-flex  flex-column ">
                    <ul
                      className=" activity-timeline timeline-left list-unstyled"
                      style={{ textAlign: "right" }}
                    >
                      {this.state.last_comments.slice(0, 2).map((comment) => {
                        return (
                          <li>
                            <div className="timeline-icon bg-primary">
                              <MessageCircle size="18" />
                            </div>

                            <div className="timeline-info">
                              <p className="font-weight-bold">
                                {comment["username"]}
                              </p>
                              <span
                                style={{
                                  display: "inline-block",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  maxHeight: "8ch",
                                }}
                              >
                                {comment["content"]}
                              </span>
                            </div>
                            <small className="">
                              {new Date(
                                comment["created_at"]
                              ).toLocaleDateString("fa-IR")}
                            </small>
                            {"  "}
                            <small className="">
                              {new Date(
                                comment["created_at"]
                              ).toLocaleTimeString("en-GB")}
                            </small>
                          </li>
                        );
                      })}
                    </ul>
                    <Button
                      onClick={() => {
                        history.push("/received-comments");
                      }}
                      className=" mt-auto btn-block shadow"
                      color="primary"
                    >
                      <ChevronsRight size={15} />
                      مشاهده همه
                    </Button>
                  </div>
                ) : (
                  "پیامی برای نمایش دادن یافت نشد"
                )}
              </CardBody>
            </Card>
          </Col>
          <Col lg="8" md="6" sm="12">
            <SupportTracker
              primary={$primary}
              danger={$danger}
              white={$white}
              allEvents={this.state.homeData["number_of_events"]}
              allEventsActive={this.state.homeData["number_of_active_events"]}
              allReservs={this.state.homeData["number_of_all_reserves"]}
              allReservsActive={this.state.homeData["number_of_given_reserves"]}
              rate={this.state.homeData["rate"]}
              numberUserDate={this.state.homeData["number_user_rate"]}
            />
          </Col>
        </Row>
        <Row>
          <Col lg="7" md="12">
            <ApexLineCharts />
          </Col>
          <Col lg="5" md="12">
            <DispatchedOrders
              className="h-250"
              cardName="5 نوبت نزدیک"
              header={header}
              tBody={this.state.homeData["last_given_reserves"]}
            />
          </Col>
        </Row>
        <Row></Row>
        <Row>
          <Col lg="5" md="12" className="text-center">
            <DispatchedOrders
              cardName="5 رویداد اخیر"
              header={[
                "نام رویداد",
                "مکان",
                "تاریخ و زمان",
                "مدت",
                "تعداد شرکت کننده",
              ]}
              tBody={this.state.homeData["last_events"]}
            />
          </Col>
          <Col lg="7" md="12" className="text-center ">
            <RevenueChart
              primary={$primary}
              dangerLight={$danger_light}
              strokeColor={$stroke_color}
              labelColor={$label_color}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Home;
