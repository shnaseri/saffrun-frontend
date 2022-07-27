import React from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardTitle,
  CardHeader,
  Toast,
  ToastBody,
  ToastHeader,
  UncontrolledTooltip,
} from "reactstrap";
import { history } from "../../../history";
import EventParticipants from "./EventParticipants";
import FadeEffectSwiper from "./FadeEffect";
import { Clock, MapPin, Info, Edit, LogOut, Edit2 } from "react-feather";
import classnames from "classnames";
import EditEvent from "./editEvent";
import { Media } from "reactstrap";
import Comments from "../../UserReceivedComments/receivedComment";
import "swiper/css/swiper.css";
import "../../../assets/scss/pages/app-ecommerce-shop.scss";
import ComponentSpinner from "../../../components/@vuexy/spinner/Loading-spinner";
import Status from "../../../components/@vuexy/status/status";
import ShowParticipant from "./ShowParticipant";
import EventStartTime from "./eventStartTime";
import Avatar from "../../../components/@vuexy/avatar/AvatarComponent";
import { urlDomain } from "../../../utility/urlDomain";
import isAuthenticated from "../../../utility/authenticated";
import axios from "axios";

class DetailPage extends React.Component {
  state = {
    selectedColor: 1,
    active: "1",
    event: {
      id: "",
      title: "",
      description: "",
      images: [],
      discount: 0,
      owner: { id: 1 },
      start_datetime: "2021-10-27T13:38:47Z",
      end_datetime: "2021-10-29T19:30:00Z",
      participants: [],
    },
    editClicked: false,
    loadSpinner: true,
  };
  async componentDidMount() {
    let authenticated = await isAuthenticated();
    if (!authenticated) history.push("/login");
    let token = localStorage.getItem("access");
    token = `Bearer ${token}`;

    try {
      let event = await axios.get(
        `${urlDomain}/event/${this.props.match.params.id}`,
        {
          headers: { Authorization: token },
        }
      );
      this.setState({ loadSpinner: false, event: event.data });
    } catch (e) {
      this.setState({ loadSpinner: false });
    }
  }

  handleEventState = (e) => {
    this.props.history.push("/event-creation", this.state.event);
  };
  handleComposeSidebar = (status) => {
    if (status === "open") {
      this.setState({
        composeMailStatus: true,
      });
    } else {
      this.setState({
        composeMailStatus: false,
      });
    }
  };

  toggle = (tab) => {
    if (this.state.active !== tab) {
      this.setState({ active: tab });
    }
  };
  handleDate = (date) => {
    let tmpDate = date.split("،");
    let rightSide = tmpDate[1].split(":");
    let result = tmpDate[0] + "،" + rightSide[0] + ":" + rightSide[1];
    return result;
  };
  compareDateTimes = (eventDateTime, startDateTime) => {
    return (
      new Date(eventDateTime) > new Date() &&
      new Date(startDateTime) < new Date()
    );
  };

  diabledDeleteParticipants = () => {
    return new Date(this.state.event.end_datetime) < new Date();
  };

  eventStatus = (date, startDateTime) => {
    return this.compareDateTimes(date, startDateTime)
      ? " timeline-icon bg-success "
      : "timeline-icon bg-danger";
  };
  deleteUser = async (userId) => {
    this.setState({ loadSpinner: true });
    let token = localStorage.getItem("access");
    token = `Bearer ${token}`;
    try {
      await axios.delete(`${urlDomain}/event/remove-participant-event`, {
        data: {
          event_id: this.props.match.params.id,
          user_id: userId,
        },
        headers: { Authorization: token },
      });
      let filteredUsers = this.state.event.participants.filter(
        (x) => x.id !== userId
      );
      let event = { ...this.state.event };
      event.participants = filteredUsers;
      this.setState({ event, loadSpinner: false });
    } catch (e) {
      this.setState({ loadSpinner: false });
      console.log(e);
    }
  };
  showSpinner = () => {
    return (
      <div style={{ marginTop: "400px" }}>
        <ComponentSpinner />
      </div>
    );
  };

  eventDetailShow = () => {
    return (
      <React.Fragment>
        <Nav tabs className="nav-fill">
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.active === "1",
              })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              مشخصات و ویرایش
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.active === "2",
              })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              کامنت
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.active}>
          <TabPane tabId="1">
            <Row>
              <Col md="8" xs="12">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      مشخصات{" "}
                      <Edit2
                        size={16}
                        id="edit-event"
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = "orange";
                        }}
                        className="cursor-pointer"
                        onMouseOut={(e) => (e.currentTarget.style.color = null)}
                        onClick={() => this.setState({ editClicked: true })}
                      />
                    </CardTitle>
                    <UncontrolledTooltip placement="top" target={`edit-event`}>
                      ویرایش
                    </UncontrolledTooltip>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col style={{ marginTop: "5px" }} md="4" xs="12">
                        <ul
                          style={{ borderRight: "none" }}
                          className="activity-timeline timeline-left list-unstyled"
                        >
                          <li>
                            <div className="timeline-icon bg-warning">
                              <MapPin size={16} />
                            </div>
                            <div className="timeline-info">
                              <p className="font-weight-bold mb-0">
                                نام رویداد:
                              </p>
                              <span className="font-small-3">
                                {this.state.event.title}
                              </span>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-icon bg-gradient-success">
                              <Clock size={16} />
                            </div>
                            <div className="timeline-info">
                              <p className="font-weight-bold mb-0">
                                تاریخ شروع:
                              </p>
                              <span className="font-small-3">
                                {this.handleDate(
                                  new Date(
                                    this.state.event.start_datetime
                                  ).toLocaleString("fa-IR")
                                )}
                              </span>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-icon bg-gradient-info">
                              <Clock size={16} />
                            </div>
                            <div className="timeline-info">
                              <p className="font-weight-bold mb-0">
                                تاریخ پایان:
                              </p>
                              <span className="font-small-3">
                                {this.handleDate(
                                  new Date(
                                    this.state.event.end_datetime
                                  ).toLocaleString("fa-IR")
                                )}
                              </span>
                            </div>
                          </li>
                          <li>
                            <div
                              className={this.eventStatus(
                                this.state.event.end_datetime,
                                this.state.event.start_datetime
                              )}
                            >
                              <Info size={16} />
                            </div>
                            <div className="timeline-info">
                              <p className="font-weight-bold mb-0">
                                وضعیت رویداد:
                              </p>
                              <span className="font-small-3">
                                {this.compareDateTimes(
                                  this.state.event.end_datetime,
                                  this.state.event.start_datetime
                                )
                                  ? "در حال اجرا"
                                  : "غیر فعال"}
                              </span>
                            </div>
                          </li>
                        </ul>
                      </Col>
                      <Col md="7" xs="12">
                        <strong>توضیحات:</strong>
                        <p
                          style={{
                            textAlign: "justify",
                            textJustify: "inter-word",
                          }}
                        >
                          {this.state.event.description}
                        </p>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <FadeEffectSwiper images={this.state.event.images} />
              </Col>
              <Col md="4" xs="12">
                <EventParticipants
                  participants={this.state.event.participants}
                  deleteUser={this.deleteUser}
                  disabledDeleteParticipants={this.diabledDeleteParticipants()}
                />
                <EventStartTime
                  end_datetime={this.state.event.end_datetime}
                  start_datetime={this.state.event.start_datetime}
                  participants={this.state.event.participants.length}
                />
              </Col>
            </Row>

            <Row>
              <Col md="8"></Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Comments eventId={this.props.match.params.id} />
          </TabPane>
          <TabPane tabId="3">
            <ShowParticipant userData={this.state.userData} />
          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  };
  render() {
    return this.state.loadSpinner ? (
      this.showSpinner()
    ) : this.state.editClicked ? (
      <EditEvent
        event={this.state.event}
        id={this.state.event.id}
        ownerId={this.state.event.owner.id}
      />
    ) : (
      this.eventDetailShow()
    );
  }
}
export default DetailPage;
