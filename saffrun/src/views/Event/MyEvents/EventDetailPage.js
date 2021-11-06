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
    active: "1"
  }
  toggle = tab => {
    if (this.state.active !== tab) {
      this.setState({ active: tab })
    }
  }
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
        <NavLink disabled>Disabled</NavLink>
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
          Account
        </NavLink>
      </NavItem>
    </Nav>
    <TabContent activeTab={this.state.active}>
      <TabPane tabId="1">
        Candy canes donut chupa chups candy canes lemon drops oat
        cake wafer. Cotton candy candy canes marzipan carrot cake.
        Sesame snaps lemon drops candy marzipan donut brownie
        tootsie roll. Icing croissant bonbon biscuit gummi bears.
      </TabPane>
      <TabPane tabId="2">
        Pudding candy canes sugar plum cookie chocolate cake powder
        croissant. Carrot cake tiramisu danish candy cake muffin
        croissant tart dessert. Tiramisu caramels candy canes
        chocolate cake sweet roll liquorice icing cupcake.
      </TabPane>
      <TabPane tabId="3">
        Carrot cake dragée chocolate. Lemon drops ice cream wafer
        gummies dragée. Chocolate bar liquorice cheesecake cookie
        chupa chups marshmallow oat cake biscuit. Dessert toffee
        fruitcake ice cream powder tootsie roll cake.
      </TabPane>
    </TabContent>
    )
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
                <h3>Google - Google Home - White/Slate fabric</h3>
                <p className="text-muted">by Google</p>
                <div className="d-flex flex-wrap">
                  <h3 className="text-primary">$129</h3>
                  <div className="ratings border-left ml-1 pl-1">
                    <Star size={20} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={20} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={20} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={20} fill="#ff9f43" stroke="#ff9f43" />
                    <Star size={20} fill="#fff" stroke="#b8c2cc" />
                    <span className="ml-1 font-medium-1 text-dark align-middle">
                      424 Ratings
                    </span>
                  </div>
                </div>
                <hr />
                <p>
                  Simplify your everyday life with the Google Home, a
                  voice-activated speaker powered by the Google Assistant. Use
                  voice commands to enjoy music, get answers from Google and
                  manage everyday tasks. Google Home is compatible with Android
                  and iOS operating systems, and can control compatible smart
                  devices such as Chromecast or Nest.
                </p>
                <ul className="list-unstyled">
                  <li className="mb-50">
                    <Truck size={15} />
                    <span className="align-middle font-weight-bold ml-50">
                      Free Sheeping
                    </span>
                  </li>
                  <li>
                    <DollarSign size={15} />
                    <span className="align-middle font-weight-bold ml-50">
                      EMI options available
                    </span>
                  </li>
                </ul>
                <hr />
                <h4>Colors</h4>
                <div
                  className={classnames(
                    "color-radio color-radio-primary mr-50",
                    {
                      selected: this.state.selectedColor === 1
                    }
                  )}
                  onClick={() => this.toggleSelectedColor(1)}
                >
                  <div className="radio-content"></div>
                </div>
                <div
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
                </div>
                <hr />
                <p className="my-50">
                  <span>Available</span>
                  <span className="mx-50">-</span>
                  <span className="text-success">In Stock</span>
                </p>
                <div className="action-btns">
                  <Button className="mr-1 mb-1" color="primary">
                    <ShoppingCart size={15} />
                    <span className="align-middle ml-50">ADD TO CART</span>
                  </Button>
                  <Button className="mb-1" color="danger" outline>
                    <Heart size={15} />
                    <span className="align-middle ml-50">WISHLIST</span>
                  </Button>
                </div>
                <div className="d-flex flex-wrap social-media-btns">
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
                </div>
              </Col>
            </Row>
          </CardBody>
          <Row>
            <Col sm="12">
              <Row className="item-features py-5 mt-5">
                <Col className="text-center" md="4" sm="12">
                  <div className="w-50 mx-auto">
                    <Award className="text-primary mb-1" size={42} />
                    <p className="font-medium-2 text-bold-600 mb-0">
                      100% Original
                    </p>
                    <p>
                      Chocolate bar candy canes ice cream toffee cookie halvah.
                    </p>
                  </div>
                </Col>
                <Col className="text-center" md="4" sm="12">
                  <div className="w-50 mx-auto">
                    <Clock className="text-primary mb-1" size={42} />
                    <p className="font-medium-2 text-bold-600 mb-0">
                      10 Day Replacement
                    </p>
                    <p>Marshmallow biscuit donut dragée fruitcake wafer.</p>
                  </div>
                </Col>
                <Col className="text-center" md="4" sm="12">
                  <div className="w-50 mx-auto">
                    <Shield className="text-primary mb-1" size={42} />
                    <p className="font-medium-2 text-bold-600 mb-0">
                      1 Year Warranty
                    </p>
                    <p>Cotton candy gingerbread cake I love sugar sweet.</p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <CardBody>
            <Row>
              <Col className="details-page-swiper text-center mt-5" sm="12">
                <div className="heading-section mb-3">
                  <h2 className="text-uppercase mb-50">Related Products</h2>
                  <p>People also search for this items</p>
                </div>
                <Swiper {...swiperParams}>
                  <div>
                    <div className="title mb-1">
                      <p className="font-medium-1 text-bold-600 truncate mb-0">
                        Beats by Dr. Dre - Powerbeats2 Wireless Earbud
                        Headphones - Black/Red
                      </p>
                      <small>By Dr. Dre</small>
                    </div>
                    <div className="img-container">
                      <img src={watch} alt="watch" />
                    </div>
                    <div className="ratings  ml-1">
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#fff" stroke="#b8c2cc" />
                    </div>
                    <p className="text-bold-500 font-medium-2 text-primary mt-50">
                      $129
                    </p>
                  </div>
                  <div>
                    <div className="title mb-1">
                      <p className="font-medium-1 text-bold-600 truncate mb-0">
                        Apple - Apple Watch Nike+ 42mm Silver Aluminum Case
                        Silver/Volt Nike Sport Band - Silver Aluminum
                      </p>
                      <small>By Apple</small>
                    </div>
                    <div className="img-container">
                      <img src={earphones} alt="earphones" />
                    </div>
                    <div className="ratings  ml-1">
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#fff" stroke="#b8c2cc" />
                    </div>
                    <p className="text-bold-500 font-medium-2 text-primary mt-50">
                      $399
                    </p>
                  </div>
                  <div>
                    <div className="title mb-1">
                      <p className="font-medium-1 text-bold-600 truncate mb-0">
                        Google - Google Home - White/Slate fabric
                      </p>
                      <small>By Google</small>
                    </div>
                    <div className="img-container">
                      <img src={laptop} alt="laptop" />
                    </div>
                    <div className="ratings  ml-1">
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#fff" stroke="#b8c2cc" />
                    </div>
                    <p className="text-bold-500 font-medium-2 text-primary mt-50">
                      $1999.99
                    </p>
                  </div>
                  <div>
                    <div className="title mb-1">
                      <p className="font-medium-1 text-bold-600 truncate mb-0">
                        Amazon - Fire TV Stick with Alexa Voice Remote - Black
                      </p>
                      <small>By Amazon</small>
                    </div>
                    <div className="img-container">
                      <img src={homepod} alt="homepod" />
                    </div>
                    <div className="ratings  ml-1">
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#fff" stroke="#b8c2cc" />
                    </div>
                    <p className="text-bold-500 font-medium-2 text-primary mt-50">
                      $39.99
                    </p>
                  </div>
                  <div>
                    <div className="title mb-1">
                      <p className="font-medium-1 text-bold-600 truncate mb-0">
                        Google - Chromecast Ultra - Black
                      </p>
                      <small>By Google</small>
                    </div>
                    <div className="img-container">
                      <img src={iphoneX} alt="homepod" />
                    </div>
                    <div className="ratings  ml-1">
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#fff" stroke="#b8c2cc" />
                    </div>
                    <p className="text-bold-500 font-medium-2 text-primary mt-50">
                      $69.99
                    </p>
                  </div>
                  <div>
                    <div className="title mb-1">
                      <p className="font-medium-1 text-bold-600 truncate mb-0">
                        Beats by Dr. Dre - Beats EP Headphones - White
                      </p>
                      <small>Beats by Dr. Dre</small>
                    </div>
                    <div className="img-container">
                      <img src={headphones} alt="homepod" />
                    </div>
                    <div className="ratings  ml-1">
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#fff" stroke="#b8c2cc" />
                    </div>
                    <p className="text-bold-500 font-medium-2 text-primary mt-50">
                      $129.99
                    </p>
                  </div>
                  <div>
                    <div className="title mb-1">
                      <p className="font-medium-1 text-bold-600 truncate mb-0">
                        LG - 40" Class (39.5" Diag.) - LED - 1080p - HDTV -
                        Black
                      </p>
                      <small>by LG</small>
                    </div>
                    <div className="img-container">
                      <img src={mouse} alt="homepod" />
                    </div>
                    <div className="ratings  ml-1">
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#ff9f43" stroke="#ff9f43" />
                      <Star size={15} fill="#fff" stroke="#b8c2cc" />
                    </div>
                    <p className="text-bold-500 font-medium-2 text-primary mt-50">
                      $279.99
                    </p>
                  </div>
                </Swiper>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}
export default DetailPage
