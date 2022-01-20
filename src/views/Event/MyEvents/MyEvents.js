import React from "react";
import * as Icon from "react-feather";
import { Badge } from "reactstrap";
import img2 from "../../../assets/img/slider/banner-20.jpg";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardImg,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Collapse,
  Spinner,
  Button,
  Progress,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledCarousel,
  NavLink,
  NavItem,
} from "reactstrap";
import ReactPaginate from "react-paginate";
import "./carousel.css";
import Radio from "../../../components/@vuexy/radio/RadioVuexy";
import "../../../assets/scss/plugins/extensions/react-paginate.scss";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowDown,
  ArrowUp,
  Filter,
} from "react-feather";
import "../../../assets/scss/plugins/forms/react-select/_react-select.scss";
import { DatePicker } from "react-advance-jalaali-datepicker";
import axios from "axios";
import classnames from "classnames";
import { history } from "../../../history";
import isAuthenticated from "../../../utility/authenticated";
import Status from "../../../components/@vuexy/status/status";
import Select from "react-select";
import ComponentSpinner from "../../../components/@vuexy/spinner/Loading-spinner";
import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../assets/scss/pages/users.scss";
import urlDomain from "../../../utility/urlDomain";
import sliderImage1 from "../../../assets/img/pages/not-found-image.jpg";

class MyEvents extends React.Component {
  state = {
    collapse: false,
    events: [],
    startDate: "",
    endDate: "",
    eventState: "all",
    eventTitle: "",
    eventCollapse: true,
    loadSpinner: true,
    currentPage: 1,
    pageCount: 6,
    totalPages: 0,
    sortStates: [
      {
        basedOn: "start_datetime",
        label: "زمان شروع",
        status: null,
        enabled: false,
      },
      { basedOn: "title", label: "عنوان", status: null, enabled: false },
    ],
    categories: [],
    selectedCategory: null,
    images: [
      {
        src: sliderImage1,
        id: 1,
      },
    ],
  };
  async componentDidMount() {
    let authenticated = await isAuthenticated();
    if (!authenticated) history.push("/login");
    let token = localStorage.getItem("access");
    token = `Bearer ${token}`;
    let pagination = {
      page: this.state.currentPage,
      page_count: this.state.pageCount,
    };
    try {
      let events = await axios.get(`${urlDomain}/event/get-all/`, {
        headers: { Authorization: token },
        params: { search_query: "", ...pagination },
      });
      let categories = await axios.get(`${urlDomain}/category/get-all/`, {
        headers: { Authorization: token },
      });
      this.loadCategories(categories.data);
      this.setState({
        events: events.data.events,
        totalPages: events.data.pages,
        loadSpinner: false,
      });
    } catch (e) {
      this.setState({ loadSpinner: false });
    }
  }
  loadCategories = (categories) => {
    let categoryItems = categories.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
    this.setState({ categories: categoryItems });
  };
  toggleCollapse = () => {
    this.setState((state) => ({
      collapse: !state.collapse,
      eventCollapse: false,
    }));
  };
  eventToggleCollapse = () => {
    this.setState((state) => ({
      eventCollapse: !state.eventCollapse,
      collapse: false,
    }));
  };
  compareDateTimes = (eventDateTime, startDateTime) => {
    return (
      new Date(eventDateTime) > new Date() &&
      new Date(startDateTime) < new Date()
    );
  };

  loadImg = (img) => {
    return `http://185.235.40.173:8000${img.image.full_size}`;
  };
  loadImages = (event) => {
    let images = event.images;
    let correctFormat = [];
    for (let i = 0; i < images.length; i++) {
      correctFormat.push({ id: i, src: this.loadImg(images[i]) });
    }
    return correctFormat.length > 0 ? correctFormat : this.state.images;
  };
  dateRound = (event) => {
    let totalDate = `${new Date(event.end_datetime).toLocaleString("fa-IR")}`;
    let splitted = totalDate.split("،");
    return `${splitted[0]}،${splitted[1].split(":")[0]}:${
      splitted[1].split(":")[1]
    }`;
  };
  moreThan1000 = (num) => {
    if (num > 1000000) {
      num = `${num / 1000000}`;
      return `${num.substring(0, 3)}M`;
    }
    if (num > 1000) {
      num = `${num / 1000}`;
      return `${num.substring(0, 3)}K`;
    }
    return num;
  };
  loadEventCards = () => {
    return this.state.events.length === 0 ? (
      <React.Fragment>
        <Col style={{ marginTop: "30px" }} md="12">
          <h3 style={{ textAlign: "center" }}>رویدادی برای نشان دادن نیست</h3>
        </Col>
      </React.Fragment>
    ) : (
      this.state.events.map((ev) => (
        <Col key={ev.id} xl={4} md="6" sm="12">
          <Card>
            <CardBody>
              <UncontrolledCarousel items={this.loadImages(ev)} />
              <h5>{ev.title}</h5>
              <Row>
                <Col md="5" lg="6" sm="12" xl="6">
                  <p style={{ height: "42px" }}>
                    {ev.description && ev.description.length >= 40
                      ? ev.description.substring(0, 40) + "..."
                      : ev.description}
                  </p>
                </Col>
                <Col md="7" lg="6" sm="12" xl="6">
                  <Button
                    onClick={() => {
                      history.push(`/event-detail/${ev.id}`);
                    }}
                    style={{ width: "100%" }}
                    color="primary"
                  >
                    نمایش
                  </Button>
                </Col>
              </Row>
              <hr className="my-1" />
              <div style={{ height: "30px" }} className="card-btns  mt-2">
                <Row>
                  <Col xs="3">
                    <div className="fonticon-wrap">
                      <Status
                        currentState={
                          this.compareDateTimes(
                            ev.end_datetime,
                            ev.start_datetime
                          )
                            ? "success"
                            : "danger"
                        }
                      />
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "bold",
                        }}
                      >
                        {this.compareDateTimes(
                          ev.end_datetime,
                          ev.start_datetime
                        )
                          ? "فعال"
                          : "غیرفعال"}
                      </span>
                    </div>
                  </Col>
                  <Col style={{ textAlign: "left" }} xs="3">
                    {/* <div className="fonticon-wrap"> */}
                    <span style={{ marginLeft: "4px" }}>
                      {this.moreThan1000(ev.participants.length)}
                    </span>
                    <Icon.Users size={20} />

                    {/* </div> */}
                  </Col>
                  <Col style={{ textAlign: "left" }} xs="6">
                    <div className="fonticon-wrap">{this.dateRound(ev)}</div>
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))
    );
  };
  startDateSelected = (timeStamp, formatted) => {
    this.setState({ startDate: timeStamp });
  };
  endDateSelected = (timeStamp, formatted) => {
    this.setState({ endDate: timeStamp });
  };

  startDatePickerInput = (props) => {
    return (
      <Input
        type="text"
        className="popo"
        {...props}
        value={this.timeStampToDate(this.state.startDate)}
      />
    );
  };
  endDatePickerInput = (props) => {
    return (
      <Input
        type="text"
        className="popo"
        {...props}
        value={this.timeStampToDate(this.state.endDate)}
      />
    );
  };
  timeStampToDate = (timeStamp) => {
    return timeStamp === ""
      ? ""
      : new Date(timeStamp * 1000).toLocaleDateString("fa-IR");
  };
  InputChanged = (e) => {
    this.toggleDirection(e);
    this.setState({ [e.currentTarget.name]: e.target.value });
  };
  toggleDirection = (e) => {
    if (e.target.value && e.target.value[0].match(/[a-z]/i))
      e.target.style.direction = "ltr";
    else e.target.style.direction = "rtl";
  };
  SelectChanged = (selectedOption) => {
    this.setState({ selectedCategory: selectedOption });
  };
  RadioChanged = async ({ currentTarget: input }) => {
    this.setState({ eventState: input.id });
    await this.handleFilter(this.state.sortStates, input.id);
  };
  clearFilters = () => {
    this.setState({
      selectedCategory: null,
      startDate: "",
      endDate: "",
      eventTitle: "",
    });
  };
  acceptableDateFormat = (date) => {
    let dateStringify = JSON.stringify(date);
    return dateStringify.substring(1, dateStringify.length - 1);
  };
  handleFilter = async (
    sortList = false,
    radioSelected,
    newPagination = false
  ) => {
    this.setState({ loadSpinner: true, events: [] });
    let { endDate, startDate, eventTitle } = this.state;
    let pagination = newPagination
      ? newPagination
      : { page: 1, page_count: this.state.pageCount };
    if (!newPagination) {
      this.setState({ currentPage: 1 });
    }
    let filters = {
      search_query: eventTitle,
      type: radioSelected,
      from_datetime:
        startDate === ""
          ? ""
          : this.acceptableDateFormat(new Date(startDate * 1000)),
      until_datetime:
        endDate === ""
          ? ""
          : this.acceptableDateFormat(new Date(endDate * 1000)),
      ...pagination,
    };

    if (sortList) {
      let enabled = null;
      for (let i = 0; i < sortList.length; i++) {
        if (sortList[i].enabled) enabled = sortList[i].basedOn;
      }
      if (enabled) filters["sort"] = enabled;
    }
    let token = localStorage.getItem("access");
    token = `Bearer ${token}`;
    try {
      let events = await axios.get(`${urlDomain}/event/get-all/`, {
        headers: { Authorization: token },
        params: filters,
      });
      this.setState({ events: events.data.events, loadSpinner: false });
    } catch (e) {
      this.setState({ loadSpinner: false });
    }
  };
  sortIcon = (x) => {
    if (x.enabled) return <ArrowUp size={15} />;
    return <React.Fragment></React.Fragment>;
  };
  handleSort = async (x, index) => {
    let sortStates = [...this.state.sortStates];
    for (let i = 0; i < sortStates.length; i++) {
      let item = { ...sortStates[i] };
      if (i === index) {
        item.enabled = !item.enabled;
      } else {
        item.enabled = false;
      }
      sortStates[i] = item;
    }
    this.setState({ sortStates });
    await this.handleFilter(sortStates, this.state.eventState);
  };
  pageChanged = async (data) => {
    this.setState({ currentPage: data.selected + 1 });
    let pagination = {
      page: data.selected + 1,
      page_count: this.state.pageCount,
    };
    await this.handleFilter(
      this.state.sortStates,
      this.state.eventState,
      pagination
    );
  };
  render() {
    return (
      <React.Fragment>
        <Row className="app-user-list">
          <Col sm="12">
            <Card className={classnames("card-action card-reload", {})}>
              <CardHeader
                onClick={this.toggleCollapse}
                onMouseOver={(e) => (e.currentTarget.style.cursor = "pointer")}
              >
                <CardTitle>اعمال فیلتر</CardTitle>
                <div className="actions">
                  <ChevronDown
                    className="collapse-icon mr-50"
                    size={15}
                    // onClick={this.toggleCollapse}
                  />
                </div>
              </CardHeader>
              <Collapse isOpen={this.state.collapse}>
                <CardBody>
                  <Row>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <Label for="search-events">عنوان</Label>
                        <Input
                          className="search-product"
                          placeholder="عنوان رویداد"
                          id="search-events"
                          value={this.state.eventTitle}
                          onChange={this.InputChanged}
                          name="eventTitle"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <Label for="datePicker_1">تاریخ شروع</Label>
                        <DatePicker
                          inputComponent={this.startDatePickerInput}
                          placeholder="انتخاب تاریخ"
                          format="jYYYY/jMM/jDD"
                          onChange={this.startDateSelected}
                          id="datePicker_1"
                          // preSelected="1396/05/15"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <Label for="datePicker_2">تاریخ پایان</Label>
                        <DatePicker
                          inputComponent={this.endDatePickerInput}
                          placeholder="انتخاب تاریخ"
                          format="jYYYY/jMM/jDD"
                          onChange={this.endDateSelected}
                          id="datePicker_2"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" md="5" lg="3" xl="2">
                      <Button
                        style={{
                          width: "100%",
                          margin: "6px",
                          marginTop: "9px",
                        }}
                        onClick={this.clearFilters}
                        color="warning"
                        outline
                      >
                        پاکسازی فیلتر ها
                      </Button>
                    </Col>
                    <Col md="2" lg="6" xl="8"></Col>
                    <Col
                      style={{ textAlign: "left" }}
                      xs="12"
                      md="5"
                      lg="3"
                      xl="2"
                    >
                      <Button
                        style={{
                          width: "100%",
                          margin: "6px",
                          marginTop: "9px",
                        }}
                        color="warning"
                        onClick={() =>
                          this.handleFilter(
                            this.state.sortStates,
                            this.state.eventState
                          )
                        }
                      >
                        اعمال
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Collapse>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <Card className={classnames("card-action card-reload", {})}>
              <CardHeader
                onClick={this.eventToggleCollapse}
                onMouseOver={(e) => (e.currentTarget.style.cursor = "pointer")}
              >
                <CardTitle>وضعیت رویداد</CardTitle>
                <div className="actions">
                  <ChevronDown
                    className="collapse-icon mr-50"
                    size={15}
                    // onClick={this.toggleCollapse}
                  />
                </div>
              </CardHeader>
              <Collapse isOpen={this.state.eventCollapse}>
                <CardBody>
                  <Row>
                    <Col lg="3" xs="0" md="2"></Col>
                    <Col lg="2" xs="4" md="3">
                      <Radio
                        label="همه"
                        onChange={this.RadioChanged}
                        id="all"
                        name="eventStatus"
                        defaultChecked={true}
                      />
                    </Col>
                    <Col lg="2" xs="4" md="3">
                      <Radio
                        label="در حال اجرا"
                        onChange={this.RadioChanged}
                        id="running"
                        name="eventStatus"
                      />
                    </Col>
                    <Col lg="2" xs="4" md="3">
                      <Radio
                        label="اتمام رسیده"
                        onChange={this.RadioChanged}
                        id="done"
                        name="eventStatus"
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Collapse>
            </Card>
          </Col>
        </Row>
        <Row>
          <div
            className="dropdown actions-dropdown"
            style={{ marginBottom: "20px", marginRight: "15px" }}
          >
            <UncontrolledButtonDropdown>
              <DropdownToggle className="px-2 py-75" color="white">
                مرتب سازی
                <Filter className="ml-50" size={15} />
              </DropdownToggle>
              <DropdownMenu>
                {this.state.sortStates.map((x, index) => (
                  <DropdownItem
                    key={x.basedOn}
                    tag="a"
                    onClick={(e) => this.handleSort(x, index)}
                  >
                    {this.sortIcon(x)}
                    <span className="align-middle ml-50">{x.label}</span>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>
        </Row>
        <Row>
          {this.state.loadSpinner ? (
            <div style={{ marginTop: "700px" }}>
              <ComponentSpinner />
            </div>
          ) : (
            this.loadEventCards()
          )}
        </Row>
        <Row style={{ marginBottom: "20px", marginTop: "10px" }}>
          <Col xs="3"></Col>
          <Col xs="6">
            {!this.state.loadSpinner && this.state.events.length > 0 && (
              <ReactPaginate
                previousLabel={<ChevronLeft size="15" />}
                nextLabel={<ChevronRight size="15" />}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.totalPages}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                containerClassName={
                  "vx-pagination icon-pagination pagination-center mt-3"
                }
                activeClassName={"active"}
                onPageChange={this.pageChanged}
                forcePage={this.state.currentPage - 1}
              />
            )}
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
export default MyEvents;
