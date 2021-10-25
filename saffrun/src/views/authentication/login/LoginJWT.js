import React from "react";
import { Link } from "react-router-dom";
import { CardBody, FormGroup, Form, Input, Button, Label } from "reactstrap";
import { Mail, Lock } from "react-feather";
import { history } from "../../../history";
import axios from "axios";
import urlDomain from "../../../utility/urlDomain";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/plugins/extensions/toastr.scss";

class LoginJWT extends React.Component {
  state = {
    username: "",
    password: "",
  };
  async componentDidMount() {
    let token = localStorage.getItem("access");
    if (token) {
      try {
        let loginResponse = await axios.post(`${urlDomain}/api/auth/verify/`, {
          token,
        });
        console.log(loginResponse.data);
        history.push("/");
      } catch (e) {
        console.log(e);
      }
    }
  }
  handleLogin = async (e) => {
    e.preventDefault();
    try {
      let loginResponse = await axios.post(`${urlDomain}/api/auth/login/`, {
        ...this.state,
      });
      localStorage.setItem("access", loginResponse.data["access"]);
      history.push("/");
    } catch (e) {
      toast.error(JSON.stringify(e.response.data), {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <CardBody className="pt-1">
          <Form onSubmit={this.handleLogin}>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="text"
                placeholder="نام کاربری"
                value={this.state.username}
                onChange={(e) => this.setState({ username: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Mail size={15} />
              </div>
              <Label>نام کاربری</Label>
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
              <Button
                onClick={() => {
                  history.push("/register");
                }}
                color="warning"
                outline
              >
                ثبت نام
              </Button>
              <Button color="warning">ورود</Button>
            </div>
          </Form>
        </CardBody>
      </React.Fragment>
    );
  }
}
export default LoginJWT;
