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
  Table,
  ButtonGroup,
  ButtonDropdown,
  UncontrolledButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import InputMask from "react-input-mask";
import { Trash2, Edit } from "react-feather";
import userImg from "../../assets/img/profile/Generic-profile-picture.jpg.webp";
import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy";
import { Check, Lock } from "react-feather";
import axios from "axios";
import { history } from "../../history";
import isAuthenticated from "../../utility/authenticated";
import urlDomain from "../../utility/urlDomain";
import { toast } from "react-toastify";
// import { Avatar } from 'react-native-elements';

class UserAccountTab extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      currPass: "",
      newPass: "",
      repPass: "",
    };
  }

  postPassword = async () => {
    var token = "Bearer " + localStorage.getItem("access");
    var headers = {
      Authorization: token,
    };
    try {
      let response = await axios.post(
        `${urlDomain}/auth/change_password/`,
        {
          old_password: this.state.currPass,
          new_password: this.state.newPass,
          username: "admin",
        },
        { headers }
      );
      toast.success("رمز شما با موفقیت تغییر پیدا کرد", {
        position: toast.POSITION.TOP_CENTER,
      });
      return response;
    } catch (e) {
      console.log(e);
      toast.error("عملیات با خطا روبرو شد.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }
  };

  toggle() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }
  hiddenFileInput = React.createRef();
  handleClick = (event) => {
    console.log(this.hiddenFileInput.current);
    this.hiddenFileInput.current.click();
  };
  handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    this.setState({
      isUploadedImg: true,
      uploadedUrl: URL.createObjectURL(fileUploaded),
    });
    this.postImg(fileUploaded);
    this.props.updateImg(URL.createObjectURL(fileUploaded));
    console.log(URL.createObjectURL(fileUploaded));
  };

  postImg = async (file) => {
    try {
      var token = "Bearer " + localStorage.getItem("access");
      var headers = {
        "Content-type": "multipart/form-data",
        Authorization: token,
      };
      const formData = new FormData();
      formData.append("image", file);
      let response = await axios.post(
        `${urlDomain}/core/image/upload/`,
        formData,
        {
          headers,
        }
      );
      this.props.updateImg(response.data.id);
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  handleDel = () => {
    this.props.delImg();
  };

  handleAvatar = () => {
    if (this.props.userData["avatar"]["image"]) {
      return this.state.isUploadedImg
        ? this.state.uploadedUrl
        : "http://127.0.0.1:8000" +
            this.props.userData["avatar"]["image"]["thumbnail"];
    } else {
      return userImg;
    }
  };
  render() {
    return (
      <Row>
        <Col sm="12">
          <Media className="mb-2">
            <Media className="mr-2 my-25" left href="#">
              <Media
                className="users-avatar-shadow rounded"
                object
                src={this.handleAvatar()}
                edi
                alt="user profile image"
                height="84"
                width="84"
              />

              <UncontrolledButtonDropdown
                direction="right"
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
                style={{ marginTop: 58, marginRight: -20 }}
              >
                <DropdownToggle
                  style={{ padding: 3, backgroundColor: "#fff", float: "left" }}
                  caret
                >
                  <Edit style={{ right: 0, borderRadius: "5px" }} />
                </DropdownToggle>
                <DropdownMenu style={{ marginRight: 35 }}>
                  <DropdownItem onClick={this.handleClick}>تغییر</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.handleDel}>حذف</DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </Media>
            <Media className="mt-2" body>
              <Media className="font-medium-1 text-bold-600" tag="p" heading>
                {this.props.userData["first_name"]}
                <span> </span>
                {this.props.userData["last_name"]}
              </Media>
              <input
                type="file"
                ref={this.hiddenFileInput}
                onChange={this.handleChange}
                style={{ display: "none" }}
              />
            </Media>
          </Media>
        </Col>
        <Col sm="12">
          <Form onSubmit={(e) => e.preventDefault()}>
            <Row>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="username">نام کاربری</Label>
                  <Input
                    style={{
                      direction: this.props.changeDIR(
                        this.props.userData["username"]
                      ),
                    }}
                    type="text"
                    value={this.props.userData["username"]}
                    id="username"
                    placeholder="Username"
                    onChange={this.props.updateData}
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="email">ایمیل</Label>
                  <Input
                    style={{
                      direction: this.props.changeDIR(
                        this.props.userData["email"]
                      ),
                    }}
                    type="text"
                    value={this.props.userData["email"]}
                    id="email"
                    placeholder="Email"
                    onChange={this.props.updateData}
                  />
                </FormGroup>
              </Col>

              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="name">نام</Label>
                  <Input
                    style={{
                      direction: this.props.changeDIR(
                        this.props.userData["first_name"]
                      ),
                    }}
                    type="text"
                    value={this.props.userData["first_name"]}
                    id="first_name"
                    placeholder="Name"
                    onChange={this.props.updateData}
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="lName">نام خانوادگی</Label>
                  <Input
                    style={{
                      direction: this.props.changeDIR(
                        this.props.userData["last_name"]
                      ),
                    }}
                    type="text"
                    value={this.props.userData["last_name"]}
                    name="lName"
                    id="last_name"
                    // placeholder="lname"
                    onChange={this.props.updateData}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="company">شماره تلفن ثابت</Label>
                  <InputMask
                    style={{ direction: "ltr" }}
                    className="form-control"
                    mask="099 9999 9999"
                    // placeholder="شماره تلفن"
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="company"> شماره تلفن همراه</Label>
                  <InputMask
                    style={{ direction: "ltr" }}
                    className="form-control"
                    mask="0999 999 9999"
                    value={this.props.userData["phone"]}
                    onChange={this.props.updateData}
                    id="phone"
                    // placeholder="شماره تلفن"
                  />
                </FormGroup>
                {/* <FormGroup>
                  <Label for="company">شماره همراه</Label>
                  <Input
                    type="text"
                    id="phoneNumber"
                    value={this.props.userData["phone"]}
                    placeholder="phoneNumber"
                    onChange={this.props.updateData}
                  />
                </FormGroup> */}
              </Col>
              <Col sm="12" style={{ marginTop: 35 }}>
                <div className="permissions border px-2">
                  <div className="title pt-2 pb-0">
                    <Lock size={19} />
                    <span className="text-bold-500 font-medium-2 ml-50">
                      تغییر رمز کاربری
                    </span>
                    <hr />
                    <Col md="6" sm="12">
                      <FormGroup>
                        <Label for="password">رمز قبلی</Label>
                        <Input
                          type="password"
                          value={this.state.currPass}
                          id="password"
                          required
                          placeholder="رمز قبلی"
                          onChange={(e) =>
                            this.setState({ currPass: e.target.value })
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12">
                      <FormGroup>
                        <Label for="newpassword">رمز جدید</Label>
                        <Input
                          type="text"
                          value={this.state.newPass}
                          name="newpassword"
                          id="newpassword"
                          required
                          placeholder="رمز جدید"
                          onChange={(e) =>
                            this.setState({ newPass: e.target.value })
                          }
                        ></Input>
                      </FormGroup>
                    </Col>

                    <Col md="6" sm="12">
                      <FormGroup>
                        <Label for="RepPass">تکرار رمز جدید</Label>
                        <Input
                          type="text"
                          value={this.state.repPass}
                          id="RepPass"
                          placeholder="تکرار رمز"
                          required
                          invalid={this.state.repPass !== this.state.newPass}
                          onChange={(e) =>
                            this.setState({ repPass: e.target.value })
                          }
                        />
                        {this.state.repPass !== this.state.newPass && (
                          <small style={{ color: "red", fontSize: "11px" }}>
                            رمز شما مطابقت ندارد
                          </small>
                        )}
                      </FormGroup>
                    </Col>
                    <Col
                      className="d-flex justify-content-end flex-wrap mt-2"
                      sm="12"
                      style={{ marginTop: 50 }}
                    >
                      <Button
                        className="mr-1"
                        color="primary"
                        disabled={
                          this.state.repPass !== this.state.newPass ||
                          this.state.newPass.length === 0
                        }
                        onClick={() => this.postPassword()}
                        style={{ margin: 20 }}
                      >
                        تغییر رمز
                      </Button>
                      {/* <Button color="flat-warning">بازگرداندن به قبل</Button> */}
                    </Col>
                  </div>
                </div>
              </Col>
              {/* <Col sm="12" style={{ marginTop: 35 }}>
                <div className="permissions border px-2">
                  <div className="title pt-2 pb-0">
                    <Lock size={19} />
                    <span className="text-bold-500 font-medium-2 ml-50">
                      دسترسی ها
                    </span>
                    <hr />
                  </div>
                  <Table borderless responsive>
                    <thead>
                      <tr>
                        <th>نوع حساب کاربری</th>
                        <th>رویداد نامحدود</th>
                        <th>ارسال تبلیعات</th>
                        <th>ویژه کردن یک رویداد</th>
                        <th>ارسال ایمیل به کاربر</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>معمولی</td>
                        <td>
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={true}
                          />
                        </td>
                        <td>
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={false}
                          />
                        </td>
                        <td>
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={false}
                          />
                        </td>
                        <td>
                          {" "}
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={true}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>حرفه ای</td>
                        <td>
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={false}
                          />
                        </td>
                        <td>
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={true}
                          />
                        </td>
                        <td>
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={false}
                          />
                        </td>
                        <td>
                          {" "}
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={true}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>ویژه</td>
                        <td>
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={true}
                          />
                        </td>
                        <td>
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={true}
                          />
                        </td>
                        <td>
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={false}
                          />
                        </td>
                        <td>
                          {" "}
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={false}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col> */}
              <Col
                className="d-flex justify-content-end flex-wrap mt-2"
                sm="12"
                style={{ marginTop: 50 }}
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
export default UserAccountTab;
