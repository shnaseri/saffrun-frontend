import React from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { connect } from "react-redux";
import { history } from "../../../history";
import axios from "axios";
import urlDomain from "../../../utility/urlDomain";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/plugins/extensions/toastr.scss";

class RegisterJWT extends React.Component {
  state = {
    password: "",
    username: "",
    confirmPass: "",
  };

  handleRegister = async (e) => {
    e.preventDefault();
    if (this.state.password.length <= 7) {
      toast.error("طول رمز شما باید از ۸ بیشتر باشد", {
        position: toast.POSITION.TOP_LEFT,
      });
      return;
    }
    try {
      // register user
      await axios.post(`${urlDomain}/api/auth/register/`, {
        ...this.state,
      });
      try {
        // then login user
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
        <Form onSubmit={this.handleRegister}>
          <FormGroup className="form-label-group">
            <Input
              type="text"
              placeholder="نام کاربری"
              required
              value={this.state.username}
              onChange={(e) => this.setState({ username: e.target.value })}
            />
            <Label>نام کاربری</Label>
          </FormGroup>
          <FormGroup className="form-label-group">
            <Input
              type="password"
              placeholder="رمز"
              required
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <Label>رمز</Label>
          </FormGroup>
          <FormGroup className="form-label-group">
            <Input
              type="password"
              placeholder="تایید رمز"
              required
              value={this.state.confirmPass}
              onChange={(e) => this.setState({ confirmPass: e.target.value })}
              invalid={this.state.confirmPass !== this.state.password}
            />
            <Label>تایید رمز</Label>
          </FormGroup>
          <div className="d-flex justify-content-between">
            <Button
              outline
              color="primary"
              onClick={() => {
                history.push("/login");
              }}
            >
              ورود
            </Button>
            <Button
              disabled={this.state.confirmPass !== this.state.password}
              color="primary"
              type="submit"
            >
              ثبت نام
            </Button>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}
export default RegisterJWT;
