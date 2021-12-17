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
} from "reactstrap";
import { history } from "../../../history";
import EventParticipants from "./EventParticipants";
import FadeEffectSwiper from "./FadeEffect";
import {
  Star,
  Truck,
  DollarSign,
  ShoppingCart,
  Heart,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Award,
  Clock,
  Shield,
  MapPin,
  Info,
} from "react-feather";
import classnames from "classnames";
import { Media } from "reactstrap";
import Comments from "../../UserReceivedComments/receivedComment";
// import Sidebar from "react-sidebar"
// import EmailList from "./EmailList"
// import EmailSidebarContent from "./EmailSidebar"
import { ContextLayout } from "../../../utility/context/Layout";
// import "../../../assets/scss/pages/app-email.scss"
import Swiper from "react-id-swiper";
import macbook from "../../../assets/img/elements/macbook-pro.png";
import headphones from "../../../assets/img/elements/beats-headphones.png";
import laptop from "../../../assets/img/elements/macbook-pro.png";
import homepod from "../../../assets/img/elements/homepod.png";
import earphones from "../../../assets/img/elements/wireless-earphones.png";
import iphoneX from "../../../assets/img/elements/iphone-x.png";
import watch from "../../../assets/img/elements/apple-watch.png";
import mouse from "../../../assets/img/elements/magic-mouse.png";
import "swiper/css/swiper.css";
import "../../../assets/scss/pages/app-ecommerce-shop.scss";
import Status from "../../../components/@vuexy/status/status";
import ShowParticipant from "./ShowParticipant";
import Avatar from "../../../components/@vuexy/avatar/AvatarComponent";

const mql = window.matchMedia(`(min-width: 992px)`);
const swiperParams = {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    1600: {
      slidesPerView: 5,
      spaceBetween: 55,
    },
    1300: {
      slidesPerView: 4,
      spaceBetween: 55,
    },
    1260: {
      slidesPerView: 3,
      spaceBetween: 55,
    },
    900: {
      slidesPerView: 3,
      spaceBetween: 55,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 55,
    },
    375: {
      slidesPerView: 1,
      spaceBetween: 55,
    },
  },
};

class DetailPage extends React.Component {
  state = {
    selectedColor: 1,
    active: "1",
    event: {
      created_at: "2021-10-27T13:39:14.238Z",
      updated_at: "2021-10-27T13:39:14.238Z",
      title: "بازی مافیا",
      description: "بازی مافیا برای بچه های باحال ایران",
      image: "events-picture/None/09792300562592260881.jpg",
      discount: 0,
      owner: 1,
      start_datetime: "2021-10-27T13:38:47Z",
      end_datetime: "2021-10-29T19:30:00Z",
      participants: [1, 3, 4],
    },
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

  UNSAFE_componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen = (open) => {
    this.setState({ sidebarOpen: open });
  };

  mediaQueryChanged = () => {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  };

  handleMainAndComposeSidebar = () => {
    this.handleComposeSidebar("close");
    this.onSetSidebarOpen(false);
  };
  showComment() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <div className="media-list">
              <Media>
                <Media left href="#">
                  <Avatar color="info" className="mr-1" content="A" size="xl" />
                </Media>
                <Media body>
                  <Media heading>اصغر اکبری</Media>
                  <p>
                    گیم مستر بازی اصلا خوب نبود و بازی خوب اجرا نشد و راهنمایی
                    ها بد بود ، روند بازی و معما هیچ ربطی به داستان نداشت ولی
                    ترس خوبی داشت.
                  </p>
                </Media>
              </Media>
              <hr></hr>
            </div>
            <div className="media-list">
              <Media>
                <Media left href="#">
                  <Avatar
                    color="success"
                    className="mr-1"
                    content="K"
                    size="xl"
                  />
                </Media>
                <Media body>
                  <Media heading>کمیل اصغری</Media>
                  <p>
                    بی نظیره بهترین اتاق فراری بود که رفتم و فوق‌العاده بود.
                  </p>
                </Media>
              </Media>
              <hr></hr>
            </div>
            <div className="media-list">
              <Media>
                <Media left href="#">
                  <Avatar
                    color="danger"
                    className="mr-1"
                    content="A"
                    size="xl"
                  />
                </Media>
                <Media body>
                  <Media heading>امیر مهدی بهکام کیا</Media>
                  <p>
                    همه چی عالی بود به خصوص رفتار گیم مستر و افراد و کارکنان
                    اونجا.
                  </p>
                </Media>
              </Media>
              <hr></hr>
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }

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
  compareDateTimes = (eventDateTime) => {
    return new Date(eventDateTime) > new Date();
  };
  eventStatus = (date) => {
    return this.compareDateTimes(date)
      ? " timeline-icon bg-success "
      : "timeline-icon bg-danger";
  };
  toggleSelectedColor = (color) => this.setState({ selectedColor: color });
  render() {
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
          {/* <NavItem>
            <NavLink
              className={classnames({
                active: this.state.active === "3",
              })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              شرکت کنندگان
            </NavLink>
          </NavItem> */}
        </Nav>
        <TabContent activeTab={this.state.active}>
          <TabPane tabId="1">
            <FadeEffectSwiper />
            <Card className="overflow-hidden app-ecommerce-details">
              <CardHeader>
                <CardTitle> مشخصات نوبت</CardTitle>
              </CardHeader>
              <CardBody className="pb-0">
                <Row>
                  <Col
                    md="3"
                    sm="12"
                    style={{ marginRight: "14px", marginTop: "19px" }}
                  >
                    <ul className="activity-timeline timeline-left list-unstyled">
                      <li>
                        <div className="timeline-icon bg-warning">
                          <MapPin size={16} />
                        </div>
                        <div className="timeline-info">
                          <p className="font-weight-bold mb-0">نام رویداد:</p>
                          <span className="font-small-3">مافیا</span>
                        </div>

                        {/* <small className="text-muted">
                          مکان حضور شما برای نوبت بعدی
                        </small> */}
                      </li>
                      <li>
                        <div className="timeline-icon bg-gradient-success">
                          <Clock size={16} />
                        </div>
                        <div className="timeline-info">
                          <p className="font-weight-bold mb-0">تاریخ شروع:</p>
                          <span className="font-small-3">
                            {this.handleDate(
                              new Date(
                                this.state.event.start_datetime
                              ).toLocaleString("fa-IR")
                            )}
                          </span>
                        </div>
                        {/* <small className="text-muted">
                          مکان حضور شما برای نوبت بعدی
                        </small> */}
                      </li>
                      <li>
                        <div className="timeline-icon bg-gradient-info">
                          <Clock size={16} />
                        </div>
                        <div className="timeline-info">
                          <p className="font-weight-bold mb-0">تاریخ پایان:</p>
                          <span className="font-small-3">
                            {this.handleDate(
                              new Date(
                                this.state.event.end_datetime
                              ).toLocaleString("fa-IR")
                            )}
                          </span>
                        </div>
                        {/* <small className="text-muted">
                          مکان حضور شما برای نوبت بعدی
                        </small> */}
                      </li>
                      <li>
                        <div
                          className={this.eventStatus(
                            this.state.event.end_datetime
                          )}
                        >
                          <Info size={16} />
                        </div>
                        <div className="timeline-info">
                          <p className="font-weight-bold mb-0">وضعیت نوبت:</p>
                          <span className="font-small-3">
                            {this.compareDateTimes(
                              this.state.event.end_datetime
                            )
                              ? "در حال اجرا"
                              : "پایان یافته"}
                          </span>
                        </div>
                        {/* <small className="text-muted">
                          مکان حضور شما برای نوبت بعدی
                        </small> */}
                      </li>
                    </ul>
                  </Col>
                  <Col
                    md="4"
                    sm="12"
                    style={{ marginRight: "14px", marginTop: "19px" }}
                  >
                    <strong>توضیحات:</strong>
                    <p
                      style={{
                        textAlign: "justify",
                        textJustify: "inter-word",
                      }}
                    >
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                      و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه
                      روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای
                      شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف
                      بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
                      درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
                      طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه
                      ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی
                      ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری
                      موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد .
                    </p>
                  </Col>
                  <Col md="4" sm="12">
                    <EventParticipants />
                  </Col>
                  </Row>
                  <Row style={{marginBottom:"15px"}}>
                  <Col md="2" xs="4">
                  <Button color="primary" >ویرایش</Button>
                  </Col>
                  <Col md="8" xs="4"></Col>
                  <Col md="2" xs="4" style={{textAlign:"left"}}>
                  <Button color="primary" onClick={() => history.push("/my-events")} >بازگشت</Button>
                  </Col>
                  </Row>
                {/* <Row className="mb-5 mt-2">
                  <Col
                    className="d-flex align-items-center justify-content-center mb-2 mb-md-0"
                    sm="12"
                    md="5"
                  >
                    <img
                      src={
                        "https://upload.wikimedia.org/wikipedia/en/0/0d/Mafia_II_Boxart.jpg"
                      }
                      alt="Google Home"
                      height="350"
                      width="350"
                    />
                  </Col>
                  <Col md="7" sm="12">
                    <h3>{this.state.event.title}</h3>
                    <div className="d-flex flex-wrap">
                      <h3 className="text-primary">
                        {" "}
                        شرکت کنندگان: {this.state.event.participants.length} نفر
                      </h3>
                    </div>
                    <hr />
                    <p>توضیحات: {this.state.event.description}</p>

                    <hr />
                    <h4>
                      تاریخ شروع: */}
                {/* {new Date().toLocaleDateString('fa-IR',this.state.event.start_datetime)} */}
                {/* {this.handleDate(
                        new Date(
                          this.state.event.start_datetime
                        ).toLocaleString("fa-IR")
                      )}
                    </h4>

                    <br></br>
                    <h4>
                      تاریخ پایان: */}
                {/* {this.state.event.end_datetime.trim(" ")} */}
                {/* {this.handleDate(
                        new Date(this.state.event.end_datetime).toLocaleString(
                          "fa-IR"
                        )
                      )}
                    </h4>
                    <hr />
                    <p className="my-50">
                      <span className="text-success"></span>
                    </p>
                    <p>
                      <Status
                        currentState={
                          this.compareDateTimes(this.state.event.end_datetime)
                            ? "success"
                            : "danger"
                        }
                      />
                      {this.compareDateTimes(this.state.event.end_datetime)
                        ? "فعال"
                        : "غیرفعال"}
                    </p>
                    <div className="action-btns">
                      <Button className="mr-1 mb-1" color="primary"> */}
                {/* <ShoppingCart size={15} /> */}
                {/* <span className="align-middle ml-50">ویرایش</span>
                      </Button>
                    </div>
                  </Col>
                </Row> */}
              </CardBody>
            </Card>
          </TabPane>
          <TabPane tabId="2">
            <Comments />
          </TabPane>
          <TabPane tabId="3">
            <ShowParticipant userData={this.state.userData} />
          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  }
}
export default DetailPage;
