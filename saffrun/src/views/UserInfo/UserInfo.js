import React from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import { User, Info, Users } from "react-feather";
import AccountTab from "./Account";
import InfoTab from "./Information";
import SocialTab from "./Social";
import "../../assets/scss/pages/users.scss";
import axios from "axios";
import { toast } from "react-toastify";
import ComponentSpinner from "../../components/@vuexy/spinner/Loading-spinner";

class UserEdit extends React.Component {
  state = {
    activeTab: "1",
    userData: {},
    loadSpinner: true,
  };
  notifySuccess = () =>
    toast.success("اطلاعات به روزرسانی شد", {
      position: toast.POSITION.TOP_CENTER,
    });
  notifyError = () =>
    toast.error("خطا", {
      position: toast.POSITION.TOP_CENTER,
    });
  componentDidMount = async () => {
    console.log("asd");
    let userData = await axios.get(
      "https://6176598703178d00173daba2.mockapi.io/users/20"
    );
    this.setState({ userData: userData.data, loadSpinner: false });
    // console.log(this.state.userData)
  };
  postData = async () => {
    let x = await axios.put(
      "https://6176598703178d00173daba2.mockapi.io/users/6",
      this.state.userData
    );
    if (x.status === 200) {
      this.notifySuccess();
    } else {
      this.notifyError();
    }
  };
  updateImg = (url) => {
    let userData = { ...this.state.userData, avatar: url };
    this.setState({ userData });
  };
  delImg = () => {
    let userData = { ...this.state.userData, avatar: "" };
    this.setState({ userData });
    console.log(this.state.userData);
  };
  updateData = (e) => {
    let userData = { ...this.state.userData, [e.target.id]: e.target.value };

    this.setState({ userData });
    console.log(this.state.userData);
  };

  toggle = (tab) => {
    this.setState({
      activeTab: tab,
    });
  };
  render() {
    return this.state.loadSpinner ? (
      <ComponentSpinner />
    ) : (
      <Row>
        <Col sm="12">
          <Card>
            <CardBody className="pt-2">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1",
                    })}
                    onClick={() => {
                      this.toggle("1");
                    }}
                  >
                    <User size={16} />
                    <span className="align-middle ml-50">حساب کاربری</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2",
                    })}
                    onClick={() => {
                      this.toggle("2");
                    }}
                  >
                    <Info size={16} />
                    <span className="align-middle ml-50">اطلاعات شخصی</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "3",
                    })}
                    onClick={() => {
                      this.toggle("3");
                    }}
                  >
                    <Users size={16} />
                    <span className="align-middle ml-50">دنبال کنندگان</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <AccountTab
                    userData={this.state.userData}
                    postData={this.postData}
                    updateData={this.updateData}
                    updateImg={this.updateImg}
                    delImg={this.delImg}
                  />
                </TabPane>
                <TabPane tabId="2">
                  <InfoTab
                    updateData={this.updateData}
                    userData={this.state.userData}
                  />
                </TabPane>
                <TabPane tabId="3">
                  <SocialTab userData={this.state.userData} />
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default UserEdit;
