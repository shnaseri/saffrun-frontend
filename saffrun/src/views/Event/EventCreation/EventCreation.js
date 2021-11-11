import React from "react";
import urlDomain from "../../../utility/urlDomain";
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
import { date } from "yup";
import axios from "axios";

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
    discount: 0,
    files: [],
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

  compareDates = () => {
    return this.state.endDate > this.state.startDate;
  };
  uploadImage = async () => {
    try {
      var token = "Bearer " + localStorage.getItem("access");
      var headers = {
        "Content-type": "multipart/form-data",
        Authorization: token,
      };
      const formData = new FormData();
      formData.append("image", this.state.files[0]);
      let response = await axios.post(`${urlDomain}/image/`, formData, headers);
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  deleteImage = () => {
    this.setState({ files: [] });
  };
  eventObject = () => {
    let { title, description, startDate, endDate, discount } = this.state;
    // i should define owner from api
    // but for now i'll give it static id = 1
    let event = {
      title,
      description,
      discount,
      owner: 1,
      start_datetime: startDate,
      endDate: endDate,
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
        this.eventObject(),
        headers
      );
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  formSubmitted = async () => {
    var token = "Bearer " + localStorage.getItem("access");
    var headers = {
      Authorization: token,
    };
    let imageId = null;
    let status = false;
    if (this.state.files.length > 0) {
      let imageResponse = await this.uploadImage();
      if (imageResponse) {
        imageId = imageResponse.data.id;
      }
    }
    let eventResponse =  await this.postEvent();
    if (eventResponse && imageId)
    {
        try 
        {
          let postImageEvent = await axios.post(
            `${urlDomain}/event/add-image/`,
            {event_id : eventResponse.data.id, image_id : imageId},
            headers
          );
        }
        catch(e) {
          console.log(e);
          return false;
        }
    }
    if (! eventResponse)
      return false
    return true
  };

  stepsGenerator() {
    let { description, title, discount, startDate, endDate } = this.state;
    let jobSelect = this.state.jobCategory ? this.state.jobCategory.value : "";
    return [
      {
        title: "۱",
        buttonDisabled:
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
                  onChange={(e) => this.setState({ title: e.target.value })}
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
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                  type="textarea"
                  rows="5"
                  placeholder="توضیحات درمورد رویداد"
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
          discount < 0 ||
          discount > 100 ||
          discount === "",
        content: (
          <Row>
            <Col lg="4" md="6" sm="12">
              <FormGroup>
                <DatePicker
                  label="تاریخ شروع"
                  className="my-datepicker-style"
                  onClickSubmitButton={(selectedTime) =>
                    this.DateTimeChanged(selectedTime, "startDate")
                  }
                />
              </FormGroup>
            </Col>
            <Col lg="4" md="6" sm="12">
              <FormGroup>
                <DatePicker
                  label="تاریخ پایان"
                  className="my-datepicker-style"
                  onClickSubmitButton={(selectedTime) =>
                    this.DateTimeChanged(selectedTime, "endDate")
                  }
                />
                {!this.compareDates() && (
                  <small style={{ color: "red", fontSize: "11px" }}>
                    تاریخ پایان باید از تاریخ شروع بزرگتر باشد
                  </small>
                )}
              </FormGroup>
            </Col>
            <Col lg="3" md="4" sm="12">
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
          </Row>
        ),
      },
      {
        title: "۳",
        buttonDisabled:
          false,
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
              onFinish={() => alert("submitted")}
              steps={this.stepsGenerator()}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default EventCreation;
