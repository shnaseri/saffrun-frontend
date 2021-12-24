import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Badge,
  Input,
  Button,
  Progress,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  UncontrolledTooltip,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
} from "reactstrap";
import classnames from "classnames";
import "./buttonStyle.css";
import { history } from "../../../history";
import isAuthenticated from "../../../utility/authenticated";
import axios from "axios";
import Avatar from "../../../components/@vuexy/avatar/AvatarComponent";
import urlDomain from "../../../utility/urlDomain";
import ComponentSpinner from "../../../components/@vuexy/spinner/Loading-spinner";
import { ArrowLeft, ChevronLeft, ChevronRight, Clock } from "react-feather";
import ReactPaginate from "react-paginate";
import FutureTable from "./futureReservesTable";
import PastTable from "./pastReservesTable";
import "../../../assets/scss/pages/coming-soon.scss";
import Countdown from "react-countdown-now";
import { toast } from "react-toastify";
import "../../../assets/scss/pages/dashboard-analytics.scss";
import {
  Plus,
  AlertCircle,
  Check,
  Layers,
  MapPin,
  UserPlus,
  Calendar,
} from "react-feather";
import avatar1 from "../../../assets/img/portrait/small/avatar-s-5.jpg";
import avatar2 from "../../../assets/img/portrait/small/avatar-s-7.jpg";
import avatar3 from "../../../assets/img/portrait/small/avatar-s-1.jpg";
import avatar4 from "../../../assets/img/portrait/small/avatar-s-2.jpg";
import avatar5 from "../../../assets/img/portrait/small/avatar-s-4.jpg";
import ClosestReserve from "./closestReserve";
import CurrentReserve from "./currentReserve"

class MyReservation extends React.Component {
  state = {
    loadSpinner: true,
    futureReserves: [],
    pastReserves: [],
    active: "1",
    page: 1,
    page_count: 5,
    currentPageFuture: 0,
    currentPagePast: 0,
    curIdx: 0,
    nearestFive: [],
    currentReserve: {},
    currentReserveModal: false,
    tooltipOpen: false,
  };
  participantsGenreator = () => {
    return [
      { name: "Ali", imgUrl: avatar1 },
      { name: "Mmd", imgUrl: avatar2 },
      { name: "Mostafa", imgUrl: avatar3 },
      { name: "Saba", imgUrl: avatar4 },
      { name: "Sara", imgUrl: avatar5 },
    ];
  };
  async componentDidMount() {
    let authenticated = await isAuthenticated();
    if (!authenticated) history.push("/login");
    let { page, page_count } = this.state;
    let token = localStorage.getItem("access");
    let pagination = { page, page_count };
    try {
      let reserves = await axios.get(`${urlDomain}/reserve/get-all-reserves/`, {
        headers: { Authorization: `Bearer ${token}` },
        params: pagination,
      });
      console.log(reserves.data.future);
      let futureReserves = this.assignRandomNumber(reserves.data.future);
      let pastReserves = this.assignRandomNumber(reserves.data.past);
      let nearestFive = futureReserves.slice(0, 5);
      this.loadCurrentReserve();
      this.setState({
        futureReserves,
        pastReserves,
        nearestFive,
        loadSpinner: false,
      });
    } catch (e) {
      this.setState({ loadSpinner: false });
    }
  }
  loadCurrentReserve = () => {
    let currentReserve = {
      participants: this.participantsGenreator(),
      location: "تهران ، میرداماد ، خیابان پاسداران ، کوچه شهید دارابی",
      holdTime: "08:00",
      holdDate: "2021-12-15",
      capacity: "۶/۱۰",
    };
    this.setState({ currentReserve });
  };
  toggle = (tab) => {
    if (this.state.active !== tab) {
      this.setState({ active: tab });
    }
  };
  randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  assignRandomNumber = (reserves) => {
    for (var item in reserves) {
      reserves[item]["random"] = this.randomIntFromInterval(1, 100);
      reserves[item]["random_fill"] = this.randomIntFromInterval(1, 420);
    }
    return reserves;
  };
  futurePageChanged = async (selectedPage) => {
    // if you're using async and setstate before await
    // just use setstate in one component
    // or let me say differnet
    // if you're updating parent component from its children you should'nt use
    // setstate twice

    this.setState({ loadSpinner: true });
    let { page_count } = this.state;
    let token = localStorage.getItem("access");
    let pagination = { page: selectedPage, page_count };
    try {
      let reserves = await axios.get(`${urlDomain}/reserve/get-all-reserves/`, {
        headers: { Authorization: `Bearer ${token}` },
        params: pagination,
      });
      let futureReserves = this.assignRandomNumber(reserves.data.future);
      this.setState({
        futureReserves,
        currentPageFuture: selectedPage - 1,
        loadSpinner: false,
      });
    } catch (e) {
      this.setState({ futureReserves: [], loadSpinner: false });
    }
  };
  pastPageChanged = async (selectedPage) => {
    this.setState({ loadSpinner: true });
    let { page_count } = this.state;
    let token = localStorage.getItem("access");
    let pagination = { page: selectedPage, page_count };
    try {
      let reserves = await axios.get(`${urlDomain}/reserve/get-all-reserves/`, {
        headers: { Authorization: `Bearer ${token}` },
        params: pagination,
      });
      let pastReserves = this.assignRandomNumber(reserves.data.past);
      this.setState({
        pastReserves,
        loadSpinner: false,
        currentPagePast: selectedPage - 1,
      });
    } catch (e) {
      this.setState({ pastReserves: [], loadSpinner: false });
    }
  };
  timerFinished = () => {
    let { curIdx, nearestFive } = this.state;
    this.setState({ curIdx: curIdx + 1 });
    if (nearestFive.length == 5 && curIdx == 3) {
      this.setState({ curIdx: 0 });
      // call api to update to nearset five and setstate curIdx : 0
    }
  };
  dateCreator = (date, time) => {
    let newDate = new Date(date);
    let splittedTime = time.split(":");
    newDate.setHours(splittedTime[0], splittedTime[1]);
    return newDate.getTime();
  };
  dateConverter = (date) => {
    return new Date(date).toLocaleDateString("fa-IR");
  };
  dayOfWeek = (date) => {
    var days = {
      0: "یکشنبه",
      1: "دوشنبه",
      2: "سه‌شنبه",
      3: "چهارشنبه",
      4: "پنج‌شنبه",
      5: "جمعه",
      6: "شنبه",
    };
    return days[new Date(date).getDay()];
  };
  correctHour = (hourStr) => {
    let splitted = hourStr.split(":");
    return `${splitted[0]}:${splitted[1]}`;
  };
  showCurrentReserve = () => {
    let { currentReserve } = this.state;
    return (
      Object.keys(currentReserve).length > 0 && (
        <CurrentReserve currentReserve={currentReserve} />
      )
    );
  };
  toggleModal = () => {
    let { currentReserveModal } = this.state;
    this.setState({ currentReserveModal: !currentReserveModal });
  };
  closestReserve = () => {
    let { curIdx, nearestFive } = this.state;
    let currentTimer =
      (curIdx < nearestFive.length)
        ? this.dateCreator(
            nearestFive[curIdx].date,
            nearestFive[curIdx].next_reserve
          )
        : new Date().getTime();
    return (
      curIdx < nearestFive.length && (
        <ClosestReserve
          curIdx={curIdx}
          nearestFive={nearestFive}
          currentTimer={currentTimer}
          timerFinished={this.timerFinished}
          participantsGenreator={this.participantsGenreator}
        />
      )
    );
  };
  render() {
    let { futureReserves, pastReserves, curIdx } = this.state;
    return (
      <React.Fragment>
        {this.showCurrentReserve()}
        {futureReserves.length > 0 ? (
          this.closestReserve()
        ) : (
          <React.Fragment></React.Fragment>
        )}
        <Card>
          <CardHeader>
            <CardTitle>نوبت های من</CardTitle>
          </CardHeader>
          <CardBody>
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
                  حال و آینده
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
                  گذشته
                </NavLink>
              </NavItem>
            </Nav>
            {this.state.loadSpinner ? (
              <div style={{ marginTop: "400px" }}>
                <ComponentSpinner />
              </div>
            ) : (
              <React.Fragment>
                <TabContent activeTab={this.state.active}>
                  <TabPane tabId="1">
                    <FutureTable
                      futurePageChanged={this.futurePageChanged}
                      futureReserves={futureReserves}
                      currentPageFuture={this.state.currentPageFuture}
                    />
                  </TabPane>
                  <TabPane tabId="2">
                    <PastTable
                      pastPageChanged={this.pastPageChanged}
                      pastReserves={pastReserves}
                      currentPagePast={this.state.currentPagePast}
                    />
                  </TabPane>
                </TabContent>
              </React.Fragment>
            )}
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}
export default MyReservation;
