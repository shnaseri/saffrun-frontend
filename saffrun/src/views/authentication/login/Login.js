import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import { LogIn } from "react-feather";
import loginImg from "../../../assets/img/pages/login.png";
import "../../../assets/scss/pages/authentication.scss";
import LoginJWT from "./LoginJWT";
import ComponentSpinner from "../../../components/@vuexy/spinner/Loading-spinner";

class Login extends React.Component {
  state = {
    activeTab: "1",
    loadSpinner: false,
  };
  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };
  toggleSpinner = (status) => {
    this.setState({ loadSpinner: status });
  };

  to_show = () => {
    return (
      <Row className="m-0 justify-content-center h-100">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication login-card rounded-0 mb-0 w-100 ">
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center px-1 py-0"
              >
                <img src={loginImg} alt="loginImg" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2 ">
                  <CardHeader className="pb-1 text-center align-self-center">
                    <CardTitle>
                      <h2 className="mb-0 text-center align-self-center">
                        ورود
                      </h2>
                    </CardTitle>
                  </CardHeader>

                  <TabContent>
                    <TabPane>
                      <LoginJWT changeSpinnerState={this.toggleSpinner} />
                    </TabPane>
                  </TabContent>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  };
  render() {
    return this.state.loadSpinner ? <ComponentSpinner /> : this.to_show();
  }
}
export default Login;
