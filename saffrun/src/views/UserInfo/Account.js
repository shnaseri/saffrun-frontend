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
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { Trash2, Edit } from "react-feather";
import userImg from "../../assets/img/profile/Generic-profile-picture.jpg.webp";
import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy";
import { Check, Lock } from "react-feather";
import axios from "axios";
// import { Avatar } from 'react-native-elements';

class UserAccountTab extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }
  state = {
    currPass: "",
    newPass: "",
    repPass: "",
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
    this.props.updateImg(URL.createObjectURL(fileUploaded));
    console.log(URL.createObjectURL(fileUploaded));
  };
  handleDel = () => {
    this.props.delImg();
  };
  handleAvatar = () => {
    if (this.props.userData["avatar"] != "")
      return this.props.userData["avatar"];
    else {
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

              <Dropdown
                direction="left"
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
                style={{ marginTop: -15 }}
              >
                <DropdownToggle
                  style={{ padding: 0, color: "#ff9f43", float: "left" }}
                  caret
                >
                  <Edit style={{ right: 0 }} />
                </DropdownToggle>
                <DropdownMenu style={{ position: "relative" }}>
                  <DropdownItem onClick={this.handleClick}>تغییر</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.props.delImg}>حذف</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Media>
            <Media className="mt-2" body>
              <Media className="font-medium-1 text-bold-600" tag="p" heading>
                {this.props.userData["fname"]}
                {this.props.userData["lname"]}
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
                  <Label for="password">رمز عبور</Label>
                  <Input
                    type="password"
                    value={this.props.userData["password"]}
                    name="password"
                    id="password"
                    onChange={this.props.updateData}
                  ></Input>
                </FormGroup>
              </Col>

              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="name">نام</Label>
                  <Input
                    type="text"
                    value={this.props.userData["fname"]}
                    id="fname"
                    placeholder="Name"
                    onChange={this.props.updateData}
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="lName">نام خانوادگی</Label>
                  <Input
                    type="text"
                    value={this.props.userData["lname"]}
                    name="lName"
                    id="lname"
                    placeholder="lname"
                    onChange={this.props.updateData}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="email">ایمیل</Label>
                  <Input
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
                  <Label for="company">شماره همراه</Label>
                  <Input
                    type="text"
                    id="phoneNumber"
                    value={this.props.userData["phoneNumber"]}
                    placeholder="phoneNumber"
                    onChange={this.props.updateData}
                  />
                </FormGroup>
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
                          placeholder="رمز قبلی"
                          onChange={(e) => this.setState({ currPass: e.target.value })}
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
                          placeholder="رمز جدید"
                          onChange={(e) => this.setState({ newPass: e.target.value })}
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
                          invalid={this.state.repPass !== this.state.newPass}
                          onChange={(e) => this.setState({ repPass: e.target.value })}
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
                        // onClick={this.props.postData}
                        style={{ margin: 20 }}
                      >
                        تغییر رمز
                      </Button>
                      {/* <Button color="flat-warning">بازگرداندن به قبل</Button> */}
                    </Col>
                  </div>
                </div>
              </Col>
              <Col sm="12" style={{ marginTop: 35 }}>
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
              </Col>
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
