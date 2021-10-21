import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  Button,
  Label,
} from "reactstrap";
import fgImg from "../../assets/img/pages/forgot-password.png";
import { history } from "../../history";
import "../../assets/scss/pages/authentication.scss";

class ForgotPassword extends React.Component {
  state = {
    btnText: "تایید ایمیل",
    email: "",
    enterCode: true,
    codeEntered: "",
  };
  emailConfirmed = () => {
    if (this.state.btnText == "تایید ایمیل") {
      // email to this.state.email a random code
      let btnText = "اعمال";
      this.setState({ btnText, enterCode: false });
    } else {
      // check if code entered and code we generate is equal give him his password
    }
  };
  render() {
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
                className="d-lg-block d-none text-center align-self-center"
              >
                <img src={fgImg} alt="fgImg" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2 py-1">
                  <CardHeader className="pb-1">
                    <CardTitle>
                      <h4 className="mb-0">بازیابی رمز عبور</h4>
                    </CardTitle>
                  </CardHeader>
                  <p className="px-2 auth-title">
                    ایمیل خود رو وارد کنید و سپس کد داده شده به ایمیل خود را
                    وارد کنید
                  </p>
                  <CardBody className="pt-1 pb-0">
                    <Form>
                      <FormGroup className="form-label-group">
                        <Input
                          onChange={(e) =>
                            this.setState({ email: e.target.value })
                          }
                          type="text"
                          placeholder="Email"
                          required
                          value={this.state.email}
                        />
                        {/* <Label>Email</Label> */}
                        <Input
                          style={{ marginTop: "5px" }}
                          onChange={(e) =>
                            this.setState({ codeEntered: e.target.value })
                          }
                          type="text"
                          placeholder="code"
                          hidden={this.state.enterCode}
                          required
                          value={this.state.codeEntered}
                        />
                        {/* <Label>code</Label> */}
                      </FormGroup>
                      <div className="float-md-left d-block mb-1">
                        <Button
                          color="primary"
                          className="px-75 btn-block"
                          onClick={() => history.push("/login")}
                        >
                          بازگشت به صفحه ورود
                        </Button>
                      </div>
                      <div className="float-md-right d-block mb-1">
                        <Button
                          color="primary"
                          type="submit"
                          outline
                          className="px-75 btn-block"
                          onClick={(e) => {
                            e.preventDefault();
                            this.emailConfirmed();
                          }}
                        >
                          {this.state.btnText}
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default ForgotPassword;
