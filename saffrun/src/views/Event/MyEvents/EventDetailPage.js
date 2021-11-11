import React from "react"
import { Card, CardBody, Row, Col, Button ,TabContent, TabPane, Nav, NavItem, NavLink} from "reactstrap"
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
  Shield
} from "react-feather"
import classnames from "classnames"
// import Sidebar from "react-sidebar"
// import EmailList from "./EmailList"
// import EmailSidebarContent from "./EmailSidebar"
import { ContextLayout } from "../../../utility/context/Layout"
// import "../../../assets/scss/pages/app-email.scss"
import Swiper from "react-id-swiper"
import macbook from "../../../assets/img/elements/macbook-pro.png"
import headphones from "../../../assets/img/elements/beats-headphones.png"
import laptop from "../../../assets/img/elements/macbook-pro.png"
import homepod from "../../../assets/img/elements/homepod.png"
import earphones from "../../../assets/img/elements/wireless-earphones.png"
import iphoneX from "../../../assets/img/elements/iphone-x.png"
import watch from "../../../assets/img/elements/apple-watch.png"
import mouse from "../../../assets/img/elements/magic-mouse.png"
import "swiper/css/swiper.css"
import "../../../assets/scss/pages/app-ecommerce-shop.scss"
import Status from "../../../components/@vuexy/status/Status"

const mql = window.matchMedia(`(min-width: 992px)`)
const swiperParams = {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  breakpoints: {
    1600: {
      slidesPerView: 5,
      spaceBetween: 55
    },
    1300: {
      slidesPerView: 4,
      spaceBetween: 55
    },
    1260: {
      slidesPerView: 3,
      spaceBetween: 55
    },
    900: {
      slidesPerView: 3,
      spaceBetween: 55
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 55
    },
    375: {
      slidesPerView: 1,
      spaceBetween: 55
    }
  }
}


class DetailPage extends React.Component {
  state = {
    selectedColor: 1,
    active: "1",
    event:{
      created_at: "2021-10-27T13:39:14.238Z",
      updated_at: "2021-10-27T13:39:14.238Z",
      title: "بازی مافیا",
      description: "بازی مافیا برای بچه های باحال ایران",
      image: "events-picture/None/09792300562592260881.jpg",
      discount: 0,
      owner: 1,
      start_datetime: "2021-10-27T13:38:47Z",
      end_datetime: "2021-10-29T19:30:00Z",
      participants: [
          1,
          3,
          4
      ]  
    }
  }
  handleComposeSidebar = status => {
    if (status === "open") {
      this.setState({
        composeMailStatus: true
      })
    } else {
      this.setState({
        composeMailStatus: false
      })
    }
  }

  UNSAFE_componentWillMount() {
    mql.addListener(this.mediaQueryChanged)
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged)
  }

  onSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open })
  }

  mediaQueryChanged = () => {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false })
  }

  handleMainAndComposeSidebar = () => {
    this.handleComposeSidebar("close")
    this.onSetSidebarOpen(false)
  }

  toggle = tab => {
    if (this.state.active !== tab) {
      this.setState({ active: tab })
    }
  }
  handleDate = date =>
  {
    let tmpDate = date.split("،")
    let rightSide = tmpDate[1].split(":")
    let result = tmpDate[0] + "،" + rightSide[0] +":" + rightSide[1]
    return result
  }
  compareDateTimes = 
  
  (eventDateTime) => {
    return new Date(eventDateTime) > new Date();
  };
  toggleSelectedColor = color => this.setState({ selectedColor: color })
  render() {
    return (
      <React.Fragment>
        <Nav tabs className="nav-fill">
      <NavItem>
        <NavLink
          className={classnames({
            active: this.state.active === "1"
          })}
          onClick={() => {
            this.toggle("1")
          }}
        >
          مشخصات و ویرایش
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({
            active: this.state.active === "2"
          })}
          onClick={() => {
            this.toggle("2")
          }}
        >
          کامنت
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({
            active: this.state.active === "3"
          })}
          onClick={() => {
            this.toggle("3")
          }}
        >
          شرکت کنندگان
        </NavLink>
      </NavItem>
    </Nav>
    <TabContent activeTab={this.state.active}>
      <TabPane tabId="1">
      <Card className="overflow-hidden app-ecommerce-details">
          <CardBody className="pb-0">
            <Row className="mb-5 mt-2">
              <Col
                className="d-flex align-items-center justify-content-center mb-2 mb-md-0"
                sm="12"
                md="5"
              >
                <img src={macbook} alt="Google Home" height="250" width="250" />
              </Col>
              <Col md="7" sm="12">
        <h3>{this.state.event.title}</h3>
                <div className="d-flex flex-wrap">
        <h3 className="text-primary"> تعداد نفرات شرکت کنندگان: {this.state.event.participants.length} نفر</h3>
                  {/* <div className="ratings border-left ml-1 pl-1">
                    {/* <Star size={20} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={20} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={20} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={20} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={20} fill="#fff" stroke="#b8c2cc" /> */}
                    {/* <span className="ml-1 font-medium-1 text-dark align-middle">
                      امتیاز
                    </span> */}
                  {/* </div> */}
                  
                </div>
                <hr />
                <p>
               توضیحات: {this.state.event.description}

                </p>
                {/* <ul className="list-unstyled"> */}
                  {/* <li className="mb-50">
                    <Truck size={15} />
                    <span className="align-middle font-weight-bold ml-50">
                      Free Sheeping
                    </span>
                  </li> */}
                  {/* <li>
                    <DollarSign size={15} />
                    <span className="align-middle font-weight-bold ml-50">
                      EMI options available
                    </span>
                  </li>
                </ul> */}
                <hr />
                <h4>تاریخ شروع:
                  {/* {new Date().toLocaleDateString('fa-IR',this.state.event.start_datetime)} */}
                  {this.handleDate (new Date(this.state.event.start_datetime).toLocaleString("fa-IR"))}
                </h4>

                <br></br>
                <h4>تاریخ پایان:
                  {/* {this.state.event.end_datetime.trim(" ")} */}
                  {this.handleDate(new Date(this.state.event.end_datetime).toLocaleString("fa-IR"))}
                </h4>
                
                {/* <div
                  className={classnames(
                    "color-radio color-radio-primary mr-50",
                    {
                      selected: this.state.selectedColor === 1
                    }
                  )}
                  onClick={() => this.toggleSelectedColor(1)}
                > */}
                  {/* <div className="radio-content"></div>
                </div> */}
                {/* <div
                  className={classnames(
                    "color-radio color-radio-success mr-50",
                    {
                      selected: this.state.selectedColor === 2
                    }
                  )}
                  onClick={() => this.toggleSelectedColor(2)}
                >
                  <div className="radio-content"></div>
                </div>
                <div
                  className={classnames(
                    "color-radio color-radio-danger mr-50",
                    {
                      selected: this.state.selectedColor === 3
                    }
                  )}
                  onClick={() => this.toggleSelectedColor(3)}
                >
                  <div className="radio-content"></div>
                </div>
                <div
                  className={classnames("color-radio color-radio-info mr-50", {
                    selected: this.state.selectedColor === 4
                  })}
                  onClick={() => this.toggleSelectedColor(4)}
                >
                  <div className="radio-content"></div>
                </div>
                <div
                  className={classnames(
                    "color-radio color-radio-warning mr-50",
                    {
                      selected: this.state.selectedColor === 5
                    }
                  )}
                  onClick={() => this.toggleSelectedColor(5)}
                >
                  <div className="radio-content"></div>
                </div>
                <div
                  className={classnames("color-radio color-radio-dark", {
                    selected: this.state.selectedColor === 6
                  })}
                  onClick={() => this.toggleSelectedColor(6)}
                >
                  <div className="radio-content"></div>
                </div> */}
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
                  {this.compareDateTimes(this.state.event.end_datetime) ? "فعال" : "غیرفعال"}</p>
                <div className="action-btns">
                  <Button className="mr-1 mb-1" color="primary" >
                    {/* <ShoppingCart size={15} /> */}
                    <span className="align-middle ml-50">ویرایش</span>
                  </Button>
                  {/* <Button className="mb-1" color="danger" outline>
                    <Heart size={15} />
                    <span className="align-middle ml-50">WISHLIST</span>
                  </Button> */}
                </div>
                {/* <div className="d-flex flex-wrap social-media-btns">
                  <Button
                    className="mr-1 btn-icon rounded-circle"
                    color="primary"
                    outline
                  >
                    <Facebook size={15} />
                  </Button>
                  <Button
                    className="mr-1 btn-icon rounded-circle"
                    color="info"
                    outline
                  >
                    <Twitter size={15} />
                  </Button>
                  <Button
                    className="mr-1 btn-icon rounded-circle"
                    color="danger"
                    outline
                  >
                    <Youtube size={15} />
                  </Button>
                  <Button
                    className="btn-icon rounded-circle"
                    color="primary"
                    outline
                  >
                    <Instagram size={15} />
                  </Button>
                </div> */}
              </Col>
            </Row>
          </CardBody>
       </Card>
      </TabPane>
      <TabPane tabId="2">
      <div className="email-application position-relative">
        {/* <div
          className={`app-content-overlay ${
            this.state.composeMailStatus || this.state.sidebarOpen ? "show" : ""
          }`}
          onClick={this.handleMainAndComposeSidebar}
        />
        <ContextLayout.Consumer>
          {context => (
            <Sidebar
              sidebar={
                <EmailSidebarContent
                  handleComposeSidebar={this.handleComposeSidebar}
                  mainSidebar={this.onSetSidebarOpen}
                  routerProps={this.props}
                />
              }
              docked={this.state.sidebarDocked}
              open={this.state.sidebarOpen}
              sidebarClassName="sidebar-content email-app-sidebar d-flex"
              touch={false}
              contentClassName="sidebar-children"
              pullRight={context.state.direction === "rtl"}>
              ""
            </Sidebar>
          )}
        </ContextLayout.Consumer>
        <EmailList
          mainSidebar={this.onSetSidebarOpen}
          routerProps={this.props}
        /> 
         <ComposeMail
          handleComposeSidebar={this.handleComposeSidebar}
          currentStatus={this.state.composeMailStatus}
        />  */}
      </div>
      </TabPane>
      <TabPane tabId="3">
        Carrot cake dragée chocolate. Lemon drops ice cream wafer
        gummies dragée. Chocolate bar liquorice cheesecake cookie
        chupa chups marshmallow oat cake biscuit. Dessert toffee
        fruitcake ice cream powder tootsie roll cake.
      </TabPane>
    </TabContent>


      </React.Fragment>
    )
  }
}
export default DetailPage
