import React from "react";
import {
  Card,
  CardBody,
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
import isAuthenticated from "./../../utility/authenticated";
import { history } from "./../../history";
import urlDomain from "./../../utility/urlDomain";
import { Edit } from "react-feather";
import { toast } from "react-toastify";
class workInfo extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      files: [],
      workData: {},
      loadSpinner: true,
      category: [],
      selectedCategory: {},
      showDate: true,
      images: [],
    };
  }
  componentDidMount = async () => {
    let authenticated = await isAuthenticated();
    if (!authenticated) history.push("/login");
    let token = localStorage.getItem("access");
    token = `Bearer ${token}`;
    let category = await axios.get(`${urlDomain}/category/get-all/`, {
      headers: { Authorization: token },
    });
    let workData = await axios.get(`${urlDomain}/profile/web/business/`, {
      headers: { Authorization: token },
    });
    this.loadCategories(category.data);
    this.showDateTime(workData.data["establishment_date"]);
    this.setState({
      workData: workData.data,
      loadSpinner: false,
      selectedCategory: this.standardCategoryFormat(workData.data["category"]),
      images: this.extractUrl(workData.data["images"]),
    });

    // this.extractUrl(workData.data["images"]);
  };
  showDateTime = (establishment_date) => {
    if (!establishment_date) this.setState({ showDate: false });
  };
  extractUrl = (imagesObj) => {
    let images = [...this.state.images];
    imagesObj.forEach((img) => {
      images.push(img["image"]["full_size"]);
    });
    return images;
  };
  standardCategoryFormat = (category) => {
    if (!category) return { id: "", name: "" };
    if ("value" in category) {
      return { id: category.value, name: category.label };
    }
    return { value: category.id, label: category.name };
  };
  updateWorkData = (e) => {
    this.toggleDirection(e);
    let workData = { ...this.state.workData, [e.target.id]: e.target.value };
    this.setState({ workData });
    console.log(this.state.workData);
  };
  toggleDirection = (e) => {
    if (e.target.id !== "phone_number") {
      if (e.target.value && e.target.value[0].match(/[a-z]/i))
        e.target.style.direction = "ltr";
      else e.target.style.direction = "rtl";
    }
  };
  loadCategories = (categories) => {
    let category = categories.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
    this.setState({ category: category });
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
    console.log(this.state.workData);
  };
  updateCategory = (e) => {
    this.setState({ selectedCategory: e });
    let workData = {
      ...this.state.workData,
      category: this.standardCategoryFormat(e),
    };
    this.setState({ workData });
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
  notifySuccess = () =>
    toast.success("اطلاعات به روزرسانی شد", {
      position: toast.POSITION.TOP_CENTER,
    });
  notifyError = () =>
    toast.error("خطا", {
      position: toast.POSITION.TOP_CENTER,
    });
  acceptableDateFormat = (date) => {
    let dateStringify = JSON.stringify(date);
    return dateStringify.substring(1, dateStringify.length - 1);
  };
  putData = async () => {
    if (!this.state.workData["category"]) {
      toast.error("لطفا گروه شغلی را انتخاب کنید", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    let token = localStorage.getItem("access");
    let imageIds = await this.uploadImage();
    let workDataToPut = {
      ...this.state.workData,
      category: this.state.workData["category"]["id"],
      images: imageIds,
      phone_number: this.state.workData["phone_number"] ? this.state.workData["phone_number"].replace(/\s/g, "") : null,
      establishment_date: this.state.workData["establishment_date"]
        ? this.acceptableDateFormat(this.state.workData["establishment_date"])
        : null,
    };
    token = `Bearer ${token}`;
    let x = await axios.put(
      `${urlDomain}/profile/web/business/`,

      { ...workDataToPut },
      {
        headers: { Authorization: token },
      }
    );
    if (x.status === 200) {
      this.notifySuccess();
    } else {
      this.notifyError();
    }
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
                    <Card>
                      <CardBody>
                        <Row>
                          <Col md="6" sm="12">
                            <FormGroup>
                              <Label for="title">
                                نام شرکت/موسسه/کسب وکار ...
                              </Label>
                              <Input
                                type="text"
                                value={this.state.workData["title"]}
                                id="title"
                                onChange={(e) => this.updateWorkData(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="6" sm="12">
                            <FormGroup>
                              <Label for="lName">گروه شغلی</Label>
                              <Select
                                className="React "
                                classNamePrefix="select"
                                // defaultValue={this.state.category[0]}
                                name="color"
                                id="category"
                                options={this.state.category}
                                onChange={(e) => this.updateCategory(e)}
                                value={this.state.selectedCategory}
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
                            {this.state.showDate ? (
                              <FormGroup>
                                <Label for="title"> تاریخ تاسیس</Label>
                                {"  "}
                                <Edit
                                  className="hover:color-red"
                                  role="button"
                                  size={17}
                                  onClick={() =>
                                    this.setState({ showDate: false })
                                  }
                                />
                                <Input
                                  type="text"
                                  value={new Date(
                                    this.state.workData["establishment_date"]
                                  ).toLocaleDateString("fa-IR")}
                                  id="establishment_date"
                                  disabled={true}
                                  //  onChange={(e) => this.updateWorkData(e)}
                                />
                              </FormGroup>
                            ) : (
                              // <div>
                              //   تاریخ ثبت شده{" "}
                              //   {new Date(
                              //     this.state.workData["establishment_date"]
                              //   ).toLocaleDateString("fa-IR")}
                              //   {"  "}
                              //   <Edit
                              //     className="hover:color-red"
                              //     role="button"
                              //     onClick={() =>
                              //       this.setState({ showDate: false })
                              //     }
                              //   />
                              // </div>
                              <DatePicker
                                label="تاریخ تاسیس"
                                className="my-datepicker-style"
                                onClickSubmitButton={(selectedTime) =>
                                  this.DateTimeChanged(
                                    selectedTime,
                                    "establishment_date"
                                  )
                                }
                                theme={theme}
                                id="establishment_date"
                                timePicker={false}
                                // onChange = {(e)=>this.updateWorkData(e)}
                                // value={}
                              />
                            )}
                          </Col>
                          <Col md="6" sm="12">
                            <FormGroup>
                              <Label for="number">تعداد کارکنان</Label>
                              <Input
                                style={{ marginTop: "6px" }}
                                type="number"
                                value={this.state.workData["worker_count"]}
                                name="number"
                                id="worker_count"
                                onChange={(e) => this.updateWorkData(e)}
                              ></Input>
                            </FormGroup>
                          </Col>
                          <Col md="6" sm="12">
                            <FormGroup>
                              <Label for="email">ایمیل</Label>
                              <Input
                                type="text"
                                value={this.state.workData["email"]}
                                id="email"
                                onChange={(e) => this.updateWorkData(e)}
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
                                id="phone_number"
                                value={this.state.workData["phone_number"]}
                                onChange={(e) => this.updateWorkData(e)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="6" sm="12">
                            <FormGroup>
                              <Label for="company">نشانی کامل</Label>
                              <Input
                                type="textarea"
                                name="text"
                                id="full_address"
                                value={this.state.workData["full_address"]}
                                rows="3"
                                onChange={(e) => this.updateWorkData(e)}
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
                                id="description"
                                value={this.state.workData["description"]}
                                rows="3"
                                onChange={(e) => this.updateWorkData(e)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
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
                    {!this.state.loadSpinner && (
                      <DropzoneBasic
                        imageUploaded={this.imageUploaded}
                        files={this.state.files}
                        deleteImage={this.deleteImage}
                        imageUrlList={this.state.images}
                      />
                    )}
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
                  onClick={this.putData}
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
