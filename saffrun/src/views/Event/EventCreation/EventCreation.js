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
  // Button
} from "reactstrap";
import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy";
import { Check } from "react-feather";
import Select from "react-select";
import DropzoneBasic from "../../../components/@vuexy/dropZone/dropZone";
import { DatePicker, RangeDatePicker } from "jalali-react-datepicker";
import "./input-datepicker.css";
import "../../../assets/scss/plugins/extensions/sweet-alerts.scss";
import axios from "axios";
import theme from "../../../assets/datePickerTheme/theme";
import { history } from "../../../history";
import isAuthenticated from "../../../utility/authenticated";

class EventCreation extends React.Component {
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
    files: [],
    successAlert: false,
    errorAlert: false,
  };
  async componentDidMount() {
    let authenticated = await isAuthenticated();
    if (!authenticated) history.push("/login");
  }
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
  deleteImage = () => {
    this.setState({ files: [] });
  };
  eventObject = () => {
    let { title, description, discount } = this.state;
    let event = {
      title,
      description,
      discount,
      start_datetime: this.acceptableDateFormat(this.createDate("from")),
      end_datetime: this.acceptableDateFormat(this.createDate("to")),
    };
    return event;
  };
  postEvent = async () => {
    var token = "Bearer " + localStorage.getItem("access");
    var headers = {
      Authorization: token,
    };
    try {
      let response = await axios.post(
        `${urlDomain}/event/add/`,
        { ...this.eventObject() },
        { headers }
      );
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  formSubmitted = async () => {
    let eventPost = await this.handleServerRequests();
    if (eventPost) this.handleAlert("successAlert", true);
    else this.handleAlert("errorAlert", true);
  };
  handleServerRequests = async () => {
    var token = "Bearer " + localStorage.getItem("access");
    var headers = {
      Authorization: token,
    };
    let imageIds = false;
    if (this.state.files.length > 0) {
      imageIds = await this.uploadImage();
    }
    let eventResponse = await this.postEvent();
    if (!eventResponse) return false;
    if (imageIds) {
      for (let index = 0; index < imageIds.length; index++) {
        try {
          let postImageEvent = await axios.post(
            `${urlDomain}/event/add-image/`,
            {
              event_id: eventResponse.data.event_id,
              image_id: imageIds[index],
            },
            { headers }
          );
        } catch (e) {
          console.log(e);
          return false;
        }
      }
    }
    return true;
  };

  stepsGenerator() {
    let { description, title, discount } = this.state;
    let jobSelect = this.state.jobCategory ? this.state.jobCategory.value : "";
    return [
      {
        title: "۱",
        buttonDisabled:
          discount < 0 ||
          discount > 100 ||
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
                <Label>
                  {" "}
                  توضیحات
                  <span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  value={this.state.description}
                  onChange={(e) => this.updateInput(e, "description")}
                  type="textarea"
                  rows="8"
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
          !this.compareDates() ||
          this.greaterThanToday("from") ||
          this.greaterThanToday("to"),
        content: (
          <Row>
            <Col lg="4" md="4" xs="12">
              <FormGroup>
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
              </FormGroup>
            </Col>
            <Col lg="4" md="4" xs="6">
              <Label>
                ساعت شروع
                <span style={{ color: "red" }}>*</span>
              </Label>
              <Select
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
        buttonDisabled: false,
        content: (
          <DropzoneBasic
            imageUploaded={this.imageUploaded}
            files={this.state.files}
            deleteImage={this.deleteImage}
          />
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
            <CardTitle>ایجاد رویداد</CardTitle>
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
export default EventCreation;
