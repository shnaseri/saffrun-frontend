import React from "react";
import urlDomain from "../../../utility/urlDomain";
import SweetAlert from "react-bootstrap-sweetalert";
import Wizard from "../../../components/@vuexy/wizard/WizardComponent";
import {
  // Form,
  FormGroup,
  Input,
  Label,
  CustomInput,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Button,
  UncontrolledTooltip,
} from "reactstrap";
import { Clock, MapPin, Info, Edit, LogOut, Edit2 } from "react-feather";
import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy";
import { Check } from "react-feather";
import Select from "react-select";
import DropzoneBasic from "../../../components/@vuexy/dropZone/dropZone";
import { DatePicker, RangeDatePicker } from "jalali-react-datepicker";
import "./input-datepicker3.css";
import "../../../assets/scss/plugins/extensions/sweet-alerts.scss";
import axios from "axios";
import theme from "../../../assets/datePickerTheme/theme";
import { history } from "../../../history";
import isAuthenticated from "../../../utility/authenticated";
import ComponentSpinner from "../../../components/@vuexy/spinner/Loading-spinner";

class EditEvent extends React.Component {
  state = {
    title: "",
    jobCategory: "",
    description: "",
    jobCategoryOptions: [
      { value: "پزشک", label: "پزشک" },
      { value: "بغالی", label: "بغالی" },
      { value: "استادیار", label: "استادیار" },
      { value: "سلمونی", label: "سلمونی" },
    ],
    startDate: +new Date(),
    endDate: +new Date(),
    startHour: { value: 0, label: "00" },
    endHour: { value: 0, label: "00" },
    startMinute: { value: 0, label: "00" },
    endMinute: { value: 0, label: "00" },
    discount: 0,
    price: 0,
    files: [],
    successAlert: false,
    errorAlert: false,
    editDate: false,
    submitBtnDisabled: false,
    initialStartDate: "",
    initialEndDate: "",
    initialImages: [],
  };
  async componentDidMount() {
    let authenticated = await isAuthenticated();
    if (!authenticated) history.push("/login");
    this.loadEventFields();
    let token = localStorage.getItem("access");
    token = `Bearer ${token}`;
    try {
      let categories = await axios.get(`${urlDomain}/category/get-all/`, {
        headers: { Authorization: token },
      });
      this.loadCategories(categories.data);
    } catch {
      history.push("/login");
    }
  }
  loadEventFields = () => {
    let {
      title,
      description,
      discount,
      start_datetime,
      end_datetime,
      category,
      images,
      price,
    } = this.props.event;
    this.setState({
      title,
      description,
      discount,
      price,
      initialStartDate: this.handleInitialDate(start_datetime),
      initialEndDate: this.handleInitialDate(end_datetime),
      jobCategory: this.handleIntitalCategory(category),
      initialImages: images,
      startHour: this.handleInitialHour(start_datetime),
      endHour: this.handleInitialHour(end_datetime),
      startMinute: this.handleInitialMinute(start_datetime),
      endMinute: this.handleInitialMinute(end_datetime),
    });
  };
  handleInitialHour = (datetime) => {
    let date = new Date(datetime);
    let minute = date.getHours();
    return { value: minute, label: String(minute).padStart(2, "0") };
  };
  handleInitialMinute = (datetime) => {
    let date = new Date(datetime);
    let minute = date.getMinutes();
    return { value: minute, label: String(minute).padStart(2, "0") };
  };
  handleIntitalCategory = (cat) => {
    return {
      value: cat.id,
      label: cat.title,
    };
  };
  handleInitialDate = (datetime) => {
    let date = new Date(datetime);
    return date.toLocaleDateString("fa-IR");
  };
  loadCategories = (categories) => {
    let categoryItems = categories.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
    this.setState({ jobCategoryOptions: categoryItems });
  };
  hoursGenerator = () => {
    let options = [];
    for (let i = 0; i < 24; i++)
      options.push({ value: i, label: String(i).padStart(2, "0") });
    return options;
  };
  minutesGenerator = () => {
    let options = [];
    for (let i = 0; i < 60; i += 5)
      options.push({ value: i, label: String(i).padStart(2, "0") });
    return options;
  };
  roundedTimeStamp = (timeStamp) => {
    let selectedDatetime = new Date(timeStamp);
    console.log(selectedDatetime);
    let minute = selectedDatetime.getMinutes();
    if (minute % 5 !== 0) {
      minute = minute - (minute % 5) + 5;
      selectedDatetime.setMinutes(minute);
    }
    console.log(selectedDatetime);
    return selectedDatetime.getTime();
  };
  handleAlert = (state, value) => {
    this.setState({ [state]: value });
  };

  imageUploaded = (files) => {
    this.setState({ files });
  };
  DateTimeChanged = ({ value }, name) => {
    this.setState({ [name]: value["_d"].getTime() });
  };
  acceptableDateFormat = (date) => {
    let dateStringify = JSON.stringify(date);
    return dateStringify.substring(1, dateStringify.length - 1);
  };
  createDate = (identifier) => {
    let {
      startDate,
      endDate,
      startHour,
      startMinute,
      endHour,
      endMinute,
    } = this.state;
    let startDateObj = new Date(startDate);
    let endDateobj = new Date(endDate);
    startDateObj.setHours(startHour.value, startMinute.value);
    endDateobj.setHours(endHour.value, endMinute.value);
    if (identifier === "to") return endDateobj;
    return startDateObj;
  };
  compareDates = () => {
    let endDateobj = this.createDate("to");
    let startDateObj = this.createDate("from");
    return endDateobj > startDateObj;
  };
  greaterThanToday = (identifier) => {
    return this.createDate(identifier) < new Date();
  };
  updateInput = (e, name) => {
    this.toggleDirection(e);
    this.setState({ [name]: e.target.value });
  };
  toggleDirection = (e) => {
    if (e.target.value && e.target.value[0].match(/[a-z]/i))
      e.target.style.direction = "ltr";
    else e.target.style.direction = "rtl";
  };
  showDateErrorStart = () => {
    if (!this.compareDates())
      return (
        <small style={{ color: "red", fontSize: "11px" }}>
          تاریخ شروع باید از تاریخ پایان بزرگتر باشد
        </small>
      );
    else if (this.createDate("from") < new Date())
      return (
        <small style={{ color: "red", fontSize: "11px" }}>
          تاریخ انتخاب شده نمی‌تواند قبل از امروز باشد
        </small>
      );
    return <React.Fragment></React.Fragment>;
  };
  showDateErrorEnd = () => {
    if (!this.compareDates())
      return (
        <small style={{ color: "red", fontSize: "11px" }}>
          تاریخ پایان باید از تاریخ شروع بزرگتر باشد
        </small>
      );
    else if (this.createDate("to") < new Date())
      return (
        <small style={{ color: "red", fontSize: "11px" }}>
          تاریخ انتخاب شده نمی‌تواند قبل از امروز باشد
        </small>
      );
    return <React.Fragment></React.Fragment>;
  };
  uploadImage = async () => {
    let { files } = this.state;
    let imageIds = [];
    for (let index = 0; index < files.length; index++) {
      try {
        var token = "Bearer " + localStorage.getItem("access");
        var headers = {
          "Content-type": "multipart/form-data",
          Authorization: token,
        };
        const formData = new FormData();
        formData.append("image", files[index]);
        let response = await axios.post(
          `${urlDomain}/core/image/upload/`,
          formData,
          {
            headers,
          }
        );
        imageIds.push(response.data.id);
      } catch (e) {
        console.log(e);
        return false;
      }
    }
    return imageIds;
  };
  eventObject = (imageIds) => {
    let {
      title,
      description,
      discount,
      jobCategory,
      price,
      editDate,
    } = this.state;
    let event = {
      title,
      description,
      discount,
      start_datetime: !editDate
        ? this.props.event.start_datetime
        : this.acceptableDateFormat(this.createDate("from")),
      end_datetime: !editDate
        ? this.props.event.end_datetime
        : this.acceptableDateFormat(this.createDate("to")),
      category: jobCategory.value,
      price,
      images: imageIds,
      owner: this.props.ownerId,
    };
    return event;
  };
  postEvent = async (imageIds) => {
    var token = "Bearer " + localStorage.getItem("access");
    var headers = {
      Authorization: token,
    };
    try {
      let response = await axios.put(
        `${urlDomain}/event/${this.props.id}`,
        { ...this.eventObject(imageIds) },
        { headers }
      );
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  formSubmitted = async () => {
    this.setState({ submitBtnDisabled: true });
    let eventPost = await this.handleServerRequests();
    this.setState({ submitBtnDisabled: false });
    if (eventPost) this.handleAlert("successAlert", true);
    else this.handleAlert("errorAlert", true);
  };
  handleServerRequests = async () => {
    var token = "Bearer " + localStorage.getItem("access");
    var headers = {
      Authorization: token,
    };
    let imageIds = [];
    if (this.state.files.length > 0) {
      imageIds = await this.uploadImage();
    }
    let eventResponse = await this.postEvent(imageIds);
    if (!eventResponse) return false;

    return true;
  };
  initialDateInput = (dateTime, label) => {
    return (
      <React.Fragment>
        <Label style={{ marginBottom: "6px" }}>
          تاریخ {label}{" "}
          <Edit2
            size={16}
            id="edit-event"
            onMouseOver={(e) => {
              e.currentTarget.style.color = "orange";
            }}
            className="cursor-pointer"
            onMouseOut={(e) => (e.currentTarget.style.color = null)}
            onClick={() => this.setState({ editDate: true })}
          />
          <UncontrolledTooltip placement="top" target={`edit-event`}>
            ویرایش
          </UncontrolledTooltip>
        </Label>
        <Input value={dateTime} disabled />
      </React.Fragment>
    );
  };
  initialImagesGenerator = () => {
    return this.state.initialImages.map((item) =>
      item.image.full_size.replace("http", "https")
    );
  };
  stepsGenerator() {
    let {
      description,
      title,
      discount,
      price,
      editDate,
      submitBtnDisabled,
    } = this.state;
    let jobSelect = this.state.jobCategory ? this.state.jobCategory.value : "";
    return [
      {
        title: "۱",
        buttonDisabled:
          discount < 0 ||
          discount > 100 ||
          price < 0 ||
          price === "" ||
          discount === "" ||
          description.length === 0 ||
          title.length === 0 ||
          jobSelect.length === 0,
        content: (
          <Row>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>
                  عنوان رویداد
                  <span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  type="text"
                  value={this.state.title}
                  maxLength={40}
                  onChange={(e) => this.updateInput(e, "title")}
                />
              </FormGroup>
              <FormGroup>
                <Label>
                  عنوان شغل
                  <span style={{ color: "red" }}>*</span>
                </Label>
                <Select
                  className="React"
                  classNamePrefix="select"
                  name="clear"
                  options={this.state.jobCategoryOptions}
                  isClearable={true}
                  placeholder=""
                  value={this.state.jobCategory}
                  onChange={this.onSelectJob.bind(this)}
                />
              </FormGroup>
              <FormGroup>
                <Label> تخفیف </Label>
                <Input
                  value={this.state.discount}
                  onChange={(e) => this.setState({ discount: e.target.value })}
                  type="number"
                  placeholder="مقدار تخفیف را به درصد وارد کنید"
                />
                {(discount < 0 || discount > 100 || discount === "") && (
                  <small style={{ color: "red", fontSize: "11px" }}>
                    تخفیف باید بین ۱ تا ۱۰۰ باشد
                  </small>
                )}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label> قیمت </Label>
                <span style={{ color: "red" }}>*</span>
                <Input
                  value={this.state.price}
                  onChange={(e) => this.setState({ price: e.target.value })}
                  type="number"
                  placeholder="هزینه رویداد را به تومان وارد کنید"
                />
                {(price < 0 || discount === "") && (
                  <small style={{ color: "red", fontSize: "11px" }}>
                    عدد معتبر وارد کنید
                  </small>
                )}
              </FormGroup>
              <FormGroup>
                <Label>
                  {" "}
                  توضیحات
                  <span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  value={this.state.description}
                  onChange={(e) => this.updateInput(e, "description")}
                  type="textarea"
                  rows="4"
                  placeholder="توضیحات درمورد رویداد"
                  maxLength={500}
                  // style={{ direction: "ltr" }}
                />
              </FormGroup>
            </Col>
          </Row>
        ),
      },
      {
        title: "۲",
        buttonDisabled:
          editDate &&
          (!this.compareDates() ||
            this.greaterThanToday("from") ||
            this.greaterThanToday("to")),
        content: (
          <Row>
            <Col lg="4" md="4" xs="12">
              <FormGroup>
                {editDate ? (
                  <React.Fragment>
                    <DatePicker
                      label="تاریخ شروع"
                      className="my-datepicker-style"
                      onClickSubmitButton={(selectedTime) =>
                        this.DateTimeChanged(selectedTime, "startDate")
                      }
                      theme={theme}
                      timePicker={false}
                    />
                    {this.showDateErrorStart()}
                  </React.Fragment>
                ) : (
                  this.initialDateInput(this.state.initialStartDate, "شروع")
                )}
              </FormGroup>
            </Col>
            <Col lg="4" md="4" xs="6">
              <Label>
                ساعت شروع
                <span style={{ color: "red" }}>*</span>
              </Label>
              <Select
                isDisabled={!editDate}
                className="React hour-minute-style"
                classNamePrefix="select"
                name="clear"
                options={this.hoursGenerator()}
                placeholder=""
                value={this.state.startHour}
                onChange={(value) => this.setState({ startHour: value })}
              />
            </Col>
            <Col lg="4" md="4" xs="6">
              <Label>
                دقیقه شروع
                <span style={{ color: "red" }}>*</span>
              </Label>
              <Select
                isDisabled={!editDate}
                className="React hour-minute-style"
                classNamePrefix="select"
                name="clear"
                options={this.minutesGenerator()}
                placeholder=""
                value={this.state.startMinute}
                onChange={(value) => this.setState({ startMinute: value })}
              />
            </Col>
            <Col lg="4" md="4" xs="12">
              <FormGroup>
                {editDate ? (
                  <React.Fragment>
                    <DatePicker
                      label="تاریخ پایان"
                      className="my-datepicker-style"
                      onClickSubmitButton={(selectedTime) =>
                        this.DateTimeChanged(selectedTime, "endDate")
                      }
                      timePicker={false}
                      theme={theme}
                    />
                    {this.showDateErrorEnd()}
                  </React.Fragment>
                ) : (
                  this.initialDateInput(this.state.initialEndDate, "پایان")
                )}
              </FormGroup>
            </Col>
            <Col lg="4" md="4" xs="6">
              <Label>
                ساعت پایان
                <span style={{ color: "red" }}>*</span>
              </Label>
              <Select
                className="React hour-minute-style"
                classNamePrefix="select"
                name="clear"
                options={this.hoursGenerator()}
                isDisabled={!editDate}
                placeholder=""
                value={this.state.endHour}
                onChange={(value) => this.setState({ endHour: value })}
                maxMenuHeight="150px"
              />
            </Col>
            <Col lg="4" md="4" xs="6">
              <Label>
                دقیقه پایان
                <span style={{ color: "red" }}>*</span>
              </Label>
              <Select
                className="React hour-minute-style"
                classNamePrefix="select"
                name="clear"
                options={this.minutesGenerator()}
                isDisabled={!editDate}
                placeholder=""
                value={this.state.endMinute}
                onChange={(value) => this.setState({ endMinute: value })}
                maxMenuHeight="150px"
              />
            </Col>
          </Row>
        ),
      },
      {
        title: "۳",
        buttonDisabled: submitBtnDisabled,
        content: submitBtnDisabled ? (
          <React.Fragment>
            <div style={{ height: "160px" }}></div>
            <div>
              <ComponentSpinner customClass="without-margin" />
            </div>
          </React.Fragment>
        ) : (
          this.state.title !== "" && (
            <DropzoneBasic
              imageUrlList={this.initialImagesGenerator()}
              imageUploaded={this.imageUploaded}
              files={this.state.files}
            />
          )
        ),
      },
    ];
  }
  onSelectJob(val) {
    this.setState({ jobCategory: val });
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle>ویرایش رویداد</CardTitle>
          </CardHeader>
          <CardBody>
            <Wizard
              enableAllSteps
              onFinish={this.formSubmitted}
              steps={this.stepsGenerator()}
            />
          </CardBody>
        </Card>
        <SweetAlert
          success
          title="Success"
          show={this.state.successAlert}
          onConfirm={() => {
            this.handleAlert("successAlert", false);
            history.push("/my-events");
          }}
        >
          <p className="sweet-alert-text">عملیات با موفقیت انجام شد.</p>
        </SweetAlert>

        <SweetAlert
          error
          title="Error"
          show={this.state.errorAlert}
          onConfirm={() => this.handleAlert("errorAlert", false)}
        >
          <p className="sweet-alert-text">
            فرآیند با خطا مواجه شد دوباره تلاش کنید
          </p>
        </SweetAlert>
      </div>
    );
  }
}
export default EditEvent;
