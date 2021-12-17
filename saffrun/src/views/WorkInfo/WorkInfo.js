import React from "react";
import {
  Media,
  Row,
  Col,
  Button,
  Form,
  Input,
  Label,
  FormGroup,
} from "reactstrap";
import InputMask from "react-input-mask";
import Select from "react-select";
import theme from "../../assets/datePickerTheme/theme";
import { DatePicker, RangeDatePicker } from "jalali-react-datepicker";
import { Check, Briefcase, CheckCircle, Image } from "react-feather";
import axios from "axios";
import "../Event/EventCreation/input-datepicker.css";
import DropzoneBasic from "../../components/@vuexy/dropZone/dropZone";
const colourOptions = [
  { value: "ocean", label: "پزشکی" },
  { value: "blue", label: "بهداشتی" },
  { value: "purple", label: "سرگرمی" },
  { value: "red", label: "رستوران" },
];
class workInfo extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      files: [],
      workData : {}
    };
  }
  updateWorkData = (e) => {
    if (e.target.id != "phone")
    this.toggleDirection(e);
    let workData = { ...this.state.workData, [e.target.id]: e.target.value };
    this.setState({ workData });
    console.log(this.state.workData);
  };
  toggleDirection = (e) => {
    if (e.target.value && e.target.value[0].match(/[a-z]/i))
      e.target.style.direction = "ltr";
    else e.target.style.direction = "rtl";
  };
  deleteImage = () => {
    this.setState({ files: [] });
  };
  imageUploaded = (files) => {
    this.setState({ files });
  };
  toggle() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }
  hiddenFileInput = React.createRef();
  handleClick = (event) => {
    this.hiddenFileInput.current.click();
  };
  DateTimeChanged = ({ value }, name) => {
    let workData = { ...this.state.workData, [name]: value["_d"] };
    this.setState({ workData });
    // this.setState({ [name]: value["_d"].getTime() });
    console.log(this.state.workData);
  };
  render() {
    return (
      <Row>
        <Col sm="12">
          <Form onSubmit={(e) => e.preventDefault()}>
            <Row>
              <Col sm="12">
                <div className="permissions border px-2">
                  <div className="title pt-2 pb-0">
                    <Briefcase size={19} />
                    <span className="text-bold-500 font-medium-2 ml-50">
                      مشخصات کلی کسب و کار
                    </span>
                    <hr />
                    <Row>
                      <Col md="6" sm="12">
                        <FormGroup>
                          <Label for="username">
                            نام شرکت/موسسه/کسب وکار ...
                          </Label>
                          <Input
                            type="text"
                            value={this.state.workData["username"]}
                            id="username"
                            onChange={(e)=>this.updateWorkData(e)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6" sm="12">
                        <FormGroup>
                          <Label for="lName">گروه شغلی</Label>
                          <Select
                            className="React "
                            classNamePrefix="select"
                            defaultValue={colourOptions[0]}
                            name="color"
                            id = "WorkCategory"
                            options={colourOptions}
                            onChange = {(e)=>this.updateWorkData(e)}
                            value = {this.state.workData["WorkCategory"]}
                            theme={(theme) => ({
                              ...theme,
                              colors: {
                                ...theme.colors,
                                text: "orangered",
                                primary25: "#f5e1ce",
                                primary: "#ff9f43",
                              },
                            })}
                          />
                        </FormGroup>
                      </Col>

                      <Col md="6" sm="12">
                        <DatePicker
                          label="تاریخ تاسیس"
                          className="my-datepicker-style"
                          onClickSubmitButton={(selectedTime) =>
                            this.DateTimeChanged(selectedTime, "EstablishmentDate")
                          }
                          theme={theme}
                          id="EstablishmentDate"
                          timePicker={false}
                          // onChange = {(e)=>this.updateWorkData(e)}
                          value = {this.state.workData["EstablishmentDate"]}
                        />
                      </Col>
                      <Col md="6" sm="12">
                        <FormGroup>
                          <Label for="number">تعداد کارکنان</Label>
                          <Input
                            style={{ marginTop: "6px" }}
                            type="number"
                            value = {this.state.workData["workerNum"]}
                            name="number"
                            id="workerNum"
                            onChange = {(e)=>this.updateWorkData(e)}
                          ></Input>
                        </FormGroup>
                      </Col>
                      <Col md="6" sm="12">
                        <FormGroup>
                          <Label for="email">ایمیل</Label>
                          <Input
                            type="text"
                            value = {this.state.workData["email"]}
                            id="email"
                            onChange = {(e)=>this.updateWorkData(e)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6" sm="12">
                        <FormGroup>
                          <Label for="company">شماره تلفن</Label>
                          <InputMask
                            style={{ direction: "ltr" }}
                            className="form-control"
                            mask="099 9999 9999"
                            id ="phone"
                            value = {this.state.workData["phone"]}
                            onChange = {(e)=>this.updateWorkData(e)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6" sm="12">
                        <FormGroup>
                          <Label for="company">نشانی کامل</Label>
                          <Input
                            type="textarea"
                            name="text"
                            id="fullAddres"
                            value = {this.state.workData["fullAddres"]}
                            rows="3"
                            onChange = {(e)=>this.updateWorkData(e)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6" sm="12">
                        <FormGroup>
                          <Label for="company">
                            توضیحات بیشتر در مورد کسب و کار
                          </Label>
                          <Input
                            type="textarea"
                            name="text"
                            id="describtion"
                            value = {this.state.workData["describtion"]}
                            rows="3"
                            onChange = {(e)=>this.updateWorkData(e)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>

              <Col sm="12" style={{ marginTop: 35 }}>
                <div className="permissions border px-2">
                  <div className="title pt-2 pb-0">
                    <Image size={19} />
                    <span className="text-bold-500 font-medium-2 ml-50">
                      بارگذاری تصاویر کسب و کار
                    </span>
                    <hr />
                    <DropzoneBasic
                      imageUploaded={this.imageUploaded}
                      files={this.state.files}
                      deleteImage={this.deleteImage}
                    />
                  </div>
                </div>
              </Col>
              <Col
                className="d-flex justify-content-end flex-wrap mt-2"
                sm="12"
                style={{ marginTop: 50, marginBottom: 50 }}
              >
                <Button
                  className="mr-1"
                  color="primary"
                  onClick={this.props.postData}
                  style={{ marginTop: 20 }}
                >
                  اعمال تغییرات
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    );
  }
}
export default workInfo;
