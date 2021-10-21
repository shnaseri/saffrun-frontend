import React from "react";
import { Link } from "react-router-dom";
import { CardBody, FormGroup, Form, Input, Button, Label } from "reactstrap";
import { Mail, Lock } from "react-feather";
import { history } from "../../../history";

class LoginJWT extends React.Component {
  state = {
    email: "",
    password: "",
  };

  handleLogin = (e) => {
    e.preventDefault();
    console.log("slm");
  };
  render() {
    return (
      <React.Fragment>
        <CardBody className="pt-1">
          <Form onSubmit={this.handleLogin}>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="email"
                placeholder="ایمیل"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Mail size={15} />
              </div>
              <Label>ایمیل</Label>
            </FormGroup>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="password"
                placeholder="رمز ورود"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Lock size={15} />
              </div>
              <Label>رمز ورود</Label>
            </FormGroup>
            <FormGroup className="d-flex justify-content-between align-items-center">
              <div className="float-right">
                <Link to="/forget-password">رمز خود را فراموش کرده‌اید؟</Link>
              </div>
            </FormGroup>

            <div className="d-flex justify-content-between">
              <Button color="warning" outline>
                ورود
              </Button>

              <Button
                onClick={() => {
                  history.push("/register");
                }}
                color="warning"
              >
                ثبت نام
              </Button>
            </div>
          </Form>
        </CardBody>
      </React.Fragment>
    );
  }
}
export default LoginJWT;
