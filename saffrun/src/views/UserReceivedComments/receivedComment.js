import React, { Component } from "react";
import Comment from "./commentComponents/Comment";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowDown,
  ArrowUp,
  Filter,
} from "react-feather";
import {
  DatePicker,
  DateTimePicker,
  DateRangePicker,
  DateTimeRangePicker,
} from "react-advance-jalaali-datepicker";
import Radio from "../../components/@vuexy/radio/RadioVuexy";
import "../../assets/scss/plugins/extensions/react-paginate.scss";
import Select from "react-select";
import classnames from "classnames";
import "../../assets/scss/plugins/forms/react-select/_react-select.scss";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Alert,
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
} from "reactstrap";
import _ from "lodash";
import { history } from "../../history";
import isAuthenticated from "../../utility/authenticated";
import axios from "axios";
import urlDomain from "../../utility/urlDomain";
import defaultImg from "../../assets/img/profile/Generic-profile-picture.jpg.webp";
import imgUrlDomain from "../../utility/imgUrlDomain";
import ComponentSpinner from "../../components/@vuexy/spinner/Loading-spinner";
import ReactPaginate from "react-paginate";

class Comments extends Component {
  state = {
    currentPage: 0,
    totalCount: 0,
    pageSize: 3,
    loadSpinner: true,
    eventCollapse: true,
    collapse: false,
    data: [],
    error: "",
    fromDate: "",
    toDate: "",
    message: "",
    userPhoneNumber: "",
    productTitle: "",
    commentState: "all",
  };

  imgGenerator = (x) => {
    return x.image.image
      ? `${imgUrlDomain}${x.image.image.thumbnail}`
      : defaultImg;
  };
  isReplied = (item) => {
    return item.reply ? item.reply.content : "";
  };
  dateRound = (end_datetime) => {
    let totalDate = `${new Date(end_datetime).toLocaleString("fa-IR")}`;
    let splitted = totalDate.split("،");
    return `${splitted[0]}،${splitted[1].split(":")[0]}:${
      splitted[1].split(":")[1]
    }`;
  };
  async componentDidMount() {
    let authenticated = await isAuthenticated();
    if (!authenticated) history.push("/login");
    let token = localStorage.getItem("access");
    token = `Bearer ${token}`;
    try {
      let comments = await axios.get(
        `${urlDomain}/comment/get_comment_of_owner/`,
        {
          headers: { Authorization: token },
        }
      );
      console.log(comments.data.comments);
      let data = comments.data.comments.map((item) => {
        return {
          ...item,
          imgUrl: this.imgGenerator(item.user),
          answer: this.isReplied(item),
          date: this.dateRound(item.created_at),
        };
      });
      this.setState({ data, loadSpinner: false });
    } catch (e) {
      console.log(e);
      this.setState({ loadSpinner: false });
    }
  }
  imgGenerator = (x) => {
    return x.image.image
      ? `${imgUrlDomain}${x.image.image.thumbnail}`
      : defaultImg;
  };
  setError = (message) => {
    this.setState({ error: message });
  };
  startDatePickerInput = (props) => {
    return (
      <Input
        type="text"
        className="popo"
        {...props}
        // value={this.timeStampToDate(this.state.startDate)} eyval ddsh
      />
    );
  };
  handleDelete = (cid) => {
    let data = [...this.state.data];
    data = data.filter(x => x.id !== cid)
    let comments = this.loadFileteredComments(data);
    if (comments.length === 0)
      this.setState({currentPage : 0})
    this.setState({ data });
  };
  toggleAnswered = (answer, cid) => {
    let comments = [...this.state.data];
    let commentIdx = comments.findIndex(x => x.id === cid);
    let comment = {...comments[commentIdx]}
    comment.answer = answer;
    comments[commentIdx] = comment;
    let filteredComments = this.loadFileteredComments(comments);
    if (filteredComments.length === 0)
      this.setState({currentPage : 0})
    this.setState({ data: comments });
  };

  endDatePickerInput = (props) => {
    return (
      <Input
        type="text"
        className="popo"
        {...props}
        // value={this.timeStampToDate(this.state.endDate)}
      />
    );
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
  RadioChanged = async ({ currentTarget: input }) => {
    this.setState({ commentState: input.id, currentPage: 0 });
  };
  pageChanged = (data) => {
    this.setState({ currentPage: data.selected });
  };
  loadFileteredComments = (data) => {
    let { commentState, currentPage, pageSize } = this.state;
    if (commentState === "responseLess")
      return data
        .filter((x) => x.answer === "")
        .slice(currentPage * pageSize, (currentPage + 1) * pageSize);
    else if (commentState === "responsed")
      return data
        .filter((x) => x.answer !== "")
        .slice(currentPage * pageSize, (currentPage + 1) * pageSize);
    return data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
  };
  commentsCount = () => {
    let { data, commentState } = this.state;
    if (commentState === "responseLess")
      return data.filter((x) => x.answer === "").length;
    else if (commentState === "responsed")
      return data.filter((x) => x.answer !== "").length;
    return data.length;
  };
  render() {
    const {
      data,
      error,
      pageSize,
    } = this.state;
    let comments = this.loadFileteredComments(data);
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
                        <Label for="search-events">جستجو در متن</Label>
                        <Input
                          className="search-product"
                          placeholder=" جستجو در متن"
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
                          // preSelected="1396/05/15" eyval ndadm
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
                        onClick={this.handleFilter}
                      >
                        اعمال
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Collapse>
            </Card>
          </Col>
          <Col xs="12">
            <Card className={classnames("card-action card-reload", {})}>
              <CardHeader
                onClick={this.eventToggleCollapse}
                onMouseOver={(e) => (e.currentTarget.style.cursor = "pointer")}
              >
                <CardTitle>وضعیت پاسخ</CardTitle>
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
                        name="commentStatus"
                        defaultChecked={true}
                      />
                    </Col>
                    <Col lg="2" xs="4" md="3">
                      <Radio
                        label="بدون پاسخ"
                        onChange={this.RadioChanged}
                        id="responseLess"
                        name="commentStatus"
                      />
                    </Col>
                    <Col lg="2" xs="4" md="3">
                      <Radio
                        label="پاسخ داده‌شده "
                        onChange={this.RadioChanged}
                        id="responsed"
                        name="commentStatus"
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Collapse>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="12">
            <Card>
              <CardHeader>
                <CardTitle>نظرات کاربران</CardTitle>
                {error && <Alert color="danger"> {error} </Alert>}
              </CardHeader>
              <CardBody>
                {this.state.loadSpinner ? (
                  <div style={{ marginTop: "400px" }}>
                    <ComponentSpinner />
                  </div>
                ) : comments.length > 0 ? (
                  <div className="comment-container">
                    {comments.map((x, ind) => (
                      <Comment
                        data={x}
                        key={x.id}
                        reload={this.reloadData}
                        onError={this.setError}
                        cid={x.id}
                        toggleAnswered={this.toggleAnswered}
                        handleDelete={this.handleDelete}
                      />
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: "center", width: "100%" }}>
                    موردی جهت نمایش وجود ندارد
                  </div>
                )}

                {!this.state.loadSpinner && comments.length > 0 && (
                  <ReactPaginate
                    previousLabel={<ChevronLeft size="15" />}
                    nextLabel={<ChevronRight size="15" />}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={Math.ceil(this.commentsCount() / pageSize)}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
                    containerClassName={
                      "vx-pagination icon-pagination pagination-center mt-3"
                    }
                    activeClassName={"active"}
                    onPageChange={this.pageChanged}
                    forcePage={this.state.currentPage}
                  />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Comments;
