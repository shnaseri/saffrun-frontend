import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
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
import { LogIn } from "react-feather";
import RegisterJWT from "./RegisterJWT";
import registerImg from "../../../assets/img/pages/register.jpg";
import "../../../assets/scss/pages/authentication.scss";
import ComponentSpinner from "../../../components/@vuexy/spinner/Loading-spinner";

class Register extends React.Component {
  state = {
    activeTab: "1",
    loadSpinner: false,
  };
  toggleSpinner = (status) => {
    this.setState({ loadSpinner: status });
  };
  to_show = () => {
    return (
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center px-1 py-0"
              >
                <img className="mr-1" src={registerImg} alt="registerImg" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 p-2">
                  <CardHeader className="pb-1 pt-50 text-center align-self-center">
                    <CardTitle>
                      <h2 className="mb-0 text-center align-self-center">
                        ثبت نام
                      </h2>
                    </CardTitle>
                  </CardHeader>

                  <CardBody className="pt-1 pb-50">
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <RegisterJWT changeSpinnerState={this.toggleSpinner} />
                      </TabPane>
                    </TabContent>
                  </CardBody>
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
export default Register;
