import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import "./buttonStyle.css";
import { history } from "../../../history";
import isAuthenticated from "../../../utility/authenticated";
import axios from "axios";
import Avatar from "../../../components/@vuexy/avatar/AvatarComponent";
import { urlDomain } from "../../../utility/urlDomain";
import imgUrlDomain from "../../../utility/imgUrlDomain";
import ComponentSpinner from "../../../components/@vuexy/spinner/Loading-spinner";
import FutureTable from "./futureReservesTable";
import PastTable from "./pastReservesTable";
import "../../../assets/scss/pages/coming-soon.scss";
import "../../../assets/scss/pages/dashboard-analytics.scss";
import ClosestReserve from "./closestReserve";
import CurrentReserve from "./currentReserve";
import defaultImg from "../../../assets/img/profile/Generic-profile-picture.jpg.webp";

class MyReservation extends React.Component {
  state = {
    loadSpinner: true,
    futureReserves: [],
    pastReserves: [],
    active: "1",
    page: 1,
    page_count: 5,
    totalPagesFuture: 0,
    totalPagesPast: 0,
    currentPageFuture: 0,
    currentPagePast: 0,
    curIdx: 0,
    nearestFive: [],
    currentReserve: {},
    currentReserveModal: false,
  };
  imgGenerator = (x) => {
    return x.image.image
      ? `${imgUrlDomain}${x.image.image.thumbnail}`
      : defaultImg;
  };
  participantsGenreator = (participants) => {
    return participants.map((x) => {
      return { name: x.name, imgUrl: this.imgGenerator(x) };
    });
  };
  async componentDidMount() {
    let authenticated = await isAuthenticated();
    if (!authenticated) history.push("/login");
    let { page, page_count } = this.state;
    let token = localStorage.getItem("access");
    let pagination = { page, page_count };
    try {
      let FutureReserves = await axios.get(
        `${urlDomain}/reserve/get-future-reserves/`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: pagination,
        }
      );
      let PastReserves = await axios.get(
        `${urlDomain}/reserve/get-past-reserves/`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: pagination,
        }
      );
      console.log(FutureReserves);
      await this.loadCurrentReserve();
      this.setState({
        totalPagesFuture: FutureReserves.data["pages "],
        totalPagesPast: PastReserves.data["pages "],
        futureReserves: FutureReserves.data.reserves,
        pastReserves: PastReserves.data.reserves,
        loadSpinner: false,
      });
    } catch (e) {
      this.setState({ loadSpinner: false });
    }
  }
  loadCurrentReserve = async () => {
    let token = localStorage.getItem("access");
    let response = await axios.get(
      `${urlDomain}/reserve/get-nearest-reserve/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    let userInfo = await axios.get(`${urlDomain}/profile/user/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    let { current_reserve, nearest_reserves } = response.data;
    let currentReserve = current_reserve
      ? {
          participants: this.participantsGenreator(
            current_reserve.participants
          ),
          location: userInfo.data.address,
          holdTime: current_reserve.start_time,
          holdDate: current_reserve.date,
          capacity:
            current_reserve.participants.length / current_reserve.capacity,
          allCap: current_reserve.capacity,
          endTime: current_reserve.end_time,
        }
      : {};
    nearest_reserves = nearest_reserves.map((item) => {
      return {
        ...item,
        location: userInfo.data.address,
        participants: this.participantsGenreator(item.participants),
      };
    });
    this.setState({ currentReserve, nearestFive: nearest_reserves });
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

  futurePageChanged = async (selectedPage) => {
    // if you're using async and setstate before await
    // just use setstate in one component
    // or let me say differently
    // if you're updating parent component from its children you should'nt use
    // setstate twice

    this.setState({ loadSpinner: true });
    let { page_count } = this.state;
    let token = localStorage.getItem("access");
    let pagination = { page: selectedPage, page_count };
    try {
      let reserves = await axios.get(
        `${urlDomain}/reserve/get-future-reserves/`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: pagination,
        }
      );
      console.log(reserves);
      this.setState({
        futureReserves: reserves.data.reserves,
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
      let reserves = await axios.get(
        `${urlDomain}/reserve/get-past-reserves/`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: pagination,
        }
      );
      this.setState({
        pastReserves: reserves.data.reserves,
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
      this.loadCurrentReserve();
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
      curIdx < nearestFive.length
        ? this.dateCreator(
            nearestFive[curIdx].date,
            nearestFive[curIdx].start_time
          )
        : new Date().getTime();
    return (
      curIdx < nearestFive.length && (
        <ClosestReserve
          curIdx={curIdx}
          nearestFive={nearestFive}
          currentTimer={currentTimer}
          timerFinished={this.timerFinished}
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
                      totalPages={this.state.totalPagesFuture}
                    />
                  </TabPane>
                  <TabPane tabId="2">
                    <PastTable
                      pastPageChanged={this.pastPageChanged}
                      pastReserves={pastReserves}
                      currentPagePast={this.state.currentPagePast}
                      totalPages={this.state.totalPagesPast}
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
