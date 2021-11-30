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

import InputMask from "react-input-mask";
import _ from "lodash";
import { toast } from "react-toastify";
import AsyncSelect from "react-select/async";

class Comments extends Component {
  state = {
    page: 1,
    totalCount: 0,
    pageSize: 10,
    data: [
      {
        creationDate: "1399-09-05T12:29:53.000Z",
        isActive: true,
        message:
          "بسیار خوب بود.",
        modificationDate: null,
        parent: {
          creationDate: "1399-09-04T12:29:53.000Z",
          isActive: true,
          message:
            " بسیار خوب بود.",
          modificationDate: null,
          parent: null,
          answer:"",
          productTitle: "هالوژن گرد",
          uid: "255423d4-af61-4c7a-9c51-a5cb03e83f4e",
          userFullName: "Hosein Naseri",
          userPhoneNumber: "09381454033",
        },
        productTitle: "هالوژن گرد",
        uid: "255423d4-af62-4c7a-9c51-a5cb03e83f4e",
        userFullName: "Hosein Naseri",
      },
      {
        creationDate: "1399-09-05T12:29:53.000Z",
        isActive: true,
        message:
          "بد نبود میتونست بهتر باشه.",
        modificationDate: null,
        parent: {
          creationDate: "1399-09-04T12:29:53.000Z",
          isActive: true,
          message:
            "بد نبود میتونست بهتر باشه.",
          modificationDate: null,
          parent: null,
          productTitle: "هالوژن گرد",
          uid: "255423d4-af61-4c7a-9c51-a5cb03e83f4e",
          answer:"",
          userFullName: "ali moradian",
          userPhoneNumber: "09381454033",
        },
        productTitle: "هالوژن گرد",
        uid: "255423d4-af62-4c7a-9c51-a5cb03e83f4e",
        userFullName: "ali moradian",
      },
    ],
    error: "",
    fromDate: "",
    toDate: "",
    message: "",
    userPhoneNumber: "",
    productTitle: "",
  };
  /**
creationDate: "1399-09-05T12:29:53.000Z"
isActive: true
message: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است."
modificationDate: null
parent:
    creationDate: "1399-09-04T12:29:53.000Z"
    isActive: true
    message: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است."
    modificationDate: null
    parent: null
    productTitle: "هالوژن گرد"
    uid: "255423d4-af61-4c7a-9c51-a5cb03e83f4e"
    userFullName: "Hosein Naseri1"
    userPhoneNumber: "09381454033"
productTitle: "هالوژن گرد"
uid: "255423d4-af62-4c7a-9c51-a5cb03e83f4e"
     */

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
  handleDelete=(cid) =>{
    let data = [...this.state.data];
    console.log(cid)
    console.log(data)
    //javad dorost kon
    data =data.splice(cid,1)
    this.setState({data});
  }

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

  // loadProductsOptions = async (inputValue, callback) => {
  //   const res = await api.post(
  //     "/Products/GetProductsTitle",
  //     { keyword: inputValue },
  //     null,
  //     this.setError
  //   );
  //   if (res.status) {
  //     const productsOptions = [];
  //     res.data.forEach((product) => {
  //       productsOptions.push({ value: product.uid, label: product.title });
  //     });
  //     callback(productsOptions);
  //   } else callback([]);
  // };

  // paginationChange = async (currentPage) => {
  //   const { pageSize } = this.state;

  //   const {
  //     fromDate,
  //     toDate,
  //     message,
  //     userPhoneNumber,
  //     productTitle,
  //   } = this.state;

  //   const body = {
  //     sliding: {
  //       page: currentPage,
  //       pageCount: pageSize,
  //     },
  //   };

  //   if (fromDate) body.sliding.fromDate = fromDate;
  //   if (toDate) body.sliding.toDate = toDate;
  //   const searchParameters = [];
  //   if (message)
  //     searchParameters.push({
  //       keyword: message,
  //       prop: "Message",
  //     });
  //   if (userPhoneNumber)
  //     searchParameters.push({
  //       keyword: userPhoneNumber,
  //       prop: "UserPhoneNumber",
  //     });
  //   if (productTitle)
  //     searchParameters.push({
  //       keyword: productTitle,
  //       prop: "ProductTitle",
  //     });
  //   if (searchParameters) body.sliding.searchParameters = searchParameters;

  //   const res = await api.post("/Comments/GetAll", body, null, this.setError);

  //   if (res.status) {
  //     this.setState({
  //       page: currentPage,
  //       totalCount: res.data.totalCount,
  //       data: res.data.data,
  //       error: "",
  //     });
  //   } else {
  //     let message = "";
  //     res.data.forEach((element) => {
  //       message += element + "\n";
  //     });
  //     toast.error(message);
  //   }
  // };

  reloadData = async () => {
    await this.paginationChange(this.state.page);
  };
  toggleCollapse = () => {
    this.setState((state) => ({
      collapse: !state.collapse,
      eventCollapse: false,
    }));
  };

  toggleAnswered =(answer,cid)=>
  {
    let comments = [...this.state.data];
    let comment = {...comments[cid]};
    let parent = {...comment.parent};
    parent.answer = answer; 
    comment.parent = parent;
    comments[cid] = comment;
    this.setState({data:comments});
  }
  

  handleSearch = async () => await this.paginationChange(1);

  // async componentDidMount() {
  //   const res = await api.post(
  //     "/Comments/GetAll",
  //     {
  //       sliding: {
  //         page: 1,
  //         pageCount: 10,
  //       },
  //     },
  //     null,
  //     this.setError
  //   );
  //   this.setState({ totalCount: res.data.totalCount, data: res.data.data });
  // }

  renderPagination = () => {
    const { page, totalCount, pageSize } = this.state;
    const pagesCount = totalCount / pageSize;
    const pages = _.range(1, pagesCount + 1);
    return (
      <Pagination className="d-flex justify-content-center mt-1">
        {pages.map((x) => {
          if (x === page) {
            return (
              <PaginationItem active key={x}>
                <PaginationLink>{x}</PaginationLink>
              </PaginationItem>
            );
          } else {
            return (
              <PaginationItem key={x}>
                <PaginationLink
                  onClick={async () => await this.paginationChange(x)}
                >
                  {x}
                </PaginationLink>
              </PaginationItem>
            );
          }
        })}
      </Pagination>
    );
  };

  render() {
    const {
      data,
      error,
      fromDate,
      toDate,
      message,
      userPhoneNumber,
    } = this.state;
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
                    <Col lg="3" md="6" sm="12">
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
                    <Col lg="3" md="6" sm="12">
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
                    <Col lg="3" md="6" sm="12">
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
                    <Col lg="3" md="6" sm="12">
                      <FormGroup>
                        <Label for="asdsad">دسته‌بندی</Label>
                        <Select
                          id="asdsad"
                          className="React"
                          classNamePrefix="select"
                          // defaultValue={colourOptions[0]}
                          name="color"
                          options={this.state.categories}
                          isClearable={true}
                          placeholder="دسته‌بندی..."
                          value={this.state.selectedCategory}
                          onChange={this.SelectChanged}
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
        </Row>
      <Row>
        <Col lg="12">
          <Card>
            <CardHeader>
              <CardTitle>نظرات کاربران</CardTitle>
              {error && <Alert color="danger"> {error} </Alert>}
            </CardHeader>
            <CardBody>
              {data.length > 0 ? (
                <div className="comment-container">
                  {data.map((x,ind) => (
                    <Comment
                      data={x}
                      key={x.uid}
                      reload={this.reloadData}
                      onError={this.setError}
                      cid={ind}
                      toggleAnswered = {this.toggleAnswered}
                      handleDelete={this.handleDelete}
                    />
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", width: "100%" }}>
                  موردی جهت نمایش وجود ندارد
                </div>
              )}
              {this.renderPagination()}
            </CardBody>
          </Card>
        </Col>
      </Row>
      </React.Fragment>
    );
  }
}

export default Comments;
