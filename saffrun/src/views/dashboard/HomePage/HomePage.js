
import React from "react"
import { Row, Col } from "reactstrap"
import SubscribersGained from "../../ui-elements/cards/statistics/SubscriberGained"
import RevenueGenerated from "../../ui-elements/cards/statistics/RevenueGenerated"
import QuaterlySales from "../../ui-elements/cards/statistics/QuaterlySales"
import OrdersReceived from "../../ui-elements/cards/statistics/OrdersReceived"
import RevenueChart from "../../ui-elements/cards/analytics/Revenue"
import GoalOverview from "../../ui-elements/cards/analytics/GoalOverview"
import BrowserStats from "../../ui-elements/cards/analytics/BrowserStatistics"
import ClientRetention from "../../ui-elements/cards/analytics/ClientRetention"
import SessionByDevice from "../../ui-elements/cards/analytics/SessionByDevice"
import CustomersChart from "../../ui-elements/cards/analytics/Customers"
import SupportTracker from './../../ui-elements/cards/analytics/SupportTracker';
import ChatWidget from "../../../components/@vuexy/chatWidget/ChatWidget"
import { Star, Users ,Command ,MessageCircle , Check } from "react-feather"
import "../../../assets/scss/plugins/charts/apex-charts.scss"
import avatarImg from "../../../assets/img/portrait/small/avatar-s-12.jpg"
import {

  Card,
  CardHeader,
  CardBody,
} from "reactstrap"

let $primary = "#7367F0",
  $success = "#28C76F",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $info = "#00cfe8",
  $primary_light = "#9c8cfc",
  $warning_light = "#FFC085",
  $danger_light = "#f29292",
  $info_light = "#1edec5",
  $stroke_color = "#b9c3cd",
  $label_color = "#e7eef7",
  $purple = "#df87f2",
  $white = "#fff"


class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        {/* <Row className="match-height">
          <Col lg="3" md="6" sm="6">
            <SubscribersGained />
          </Col>
          <Col lg="3" md="6" sm="6">
            <RevenueGenerated />
          </Col>
          <Col lg="3" md="6" sm="6">
            <QuaterlySales />
          </Col>
          <Col lg="3" md="6" sm="6">
            <OrdersReceived />
          </Col>
        </Row> */}
        <Row className="match-height">

          <Col lg="4" md="6" sm="12">
          <Card>
            <CardHeader className="mx-auto">
              <div className="avatar mr-1 avatar-xl">
                <img src={avatarImg} alt="avatarImg" />
              </div>
            </CardHeader>
            <CardBody className="text-center">
              <h4>محمد رضایی</h4>
              <p>نام کسب و کار</p>
              <div className="d-flex justify-content-between mt-2">
                <div className="uploads">
                  <p className="font-weight-bold font-medium-2 mb-0">568</p>
                  <span>کامنت ها</span>
                </div>
                <div className="followers">
                  <p className="font-weight-bold font-medium-2 mb-0">76.8k</p>
                  <span>دنبال کنندگان</span>
                </div>
                <div className="following">
                  <p className="font-weight-bold font-medium-2 mb-0">112</p>
                  <span>Following</span>
                </div>
              </div>
              <hr className="my-2" />
              <ul className="activity-timeline timeline-right list-unstyled">
                <li>
                  <div className="timeline-icon bg-primary">
                    <MessageCircle size="18" />
                  </div>
                  <div className="timeline-info">
                    <p className="font-weight-bold">اکبر محمدی</p>
                    <span>
                      Bonbon macaroon jelly beans gummi bears jelly lollipop
                      apple
                    </span>
                  </div>
                  <small className="">13 دقیه قبل</small>
                </li>
                <li>
                  <div className="timeline-icon bg-warning">
                    <MessageCircle size="18" />
                  </div>
                  <div className="timeline-info">
                    <p className="font-weight-bold">حسین کریمی</p>
                    <span>Cupcake gummi bears soufflé caramels candy</span>
                  </div>
                  <small className="">20 دقیه قبل</small>
                </li>
              </ul>
              {/* <div className="card-btns d-flex justify-content-between"> */}

                {/* <Button className="gradient-light-primary">
                  Follow
                </Button>
                <Button color="primary" outline>
                  Message
                </Button> */}
              {/* </div> */}
              <hr className="my-2" />
              <div className="card-btns d-flex justify-content-between">
                <div className="float-left">
                  <Star size="15" className="warning" />
                  <span className="ml-50 align-middle">4.9</span>
                </div>
                <div className="float-right">
                  <Users size="15" className="primary" />
                  <span className="ml-50 align-middle">150</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        {/* <Col lg="8" md="6" sm="12">
            <RevenueChart
              primary={$primary}
              dangerLight={$danger_light}
              strokeColor={$stroke_color}
              labelColor={$label_color}
            />
          </Col> */}
          <Col lg="8" md="6" sm="12">
            <SupportTracker primary={$primary}
              danger={$danger}
              white={$white} />
            {/* <GoalOverview strokeColor={$stroke_color} success={$success} /> */}
          </Col>
        </Row>
        {/* <Row className="match-height">
          <Col lg="4" md="6" sm="12">
            <BrowserStats />
          </Col>
          <Col lg="8" md="6" sm="12">
            <ClientRetention
              strokeColor={$stroke_color}
              primary={$primary}
              danger={$danger}
              labelColor={$label_color}
            />
          </Col>
        </Row> */}
        <Row>
          <Col lg="4" md="12">
            <SessionByDevice
              primary={$primary}
              warning={$warning}
              danger={$danger}
              primaryLight={$primary_light}
              warningLight={$warning_light}
              dangerLight={$danger_light}
            />
          </Col>
          {/* <Col lg="4" md="12" className="text-center align-middle">
            <ChatWidget></ChatWidget>
          </Col> */}
          <Col lg="4" md="12" className="text-center align-middle">
            <GoalOverview strokeColor={$stroke_color} success={$success} />
          </Col>
          <Col lg="4" md="12" className="text-center align-middle">
            <CustomersChart
              primary={$primary}
              warning={$warning}
              danger={$danger}
              primaryLight={$primary_light}
              warningLight={$warning_light}
              dangerLight={$danger_light}
            />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default Home
