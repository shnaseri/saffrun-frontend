import React from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { connect } from "react-redux";
import { Mail, Lock, User } from "react-feather";
import { history } from "../../../history";
import axios from "axios";
import {urlDomain} from "../../../utility/urlDomain";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/plugins/extensions/toastr.scss";
import ComponentSpinner from "../../../components/@vuexy/spinner/Loading-spinner";

class RegisterJWT extends React.Component {
  state = {
    password: "",
    username: "",
    confirmPass: "",
    loadSpinner: false,
  };

  handleRegister = async (e) => {
    e.preventDefault();
    this.setState({ loadSpinner: true });
    // this.props.changeSpinnerState(true);
    // if (this.state.password.length <= 7) {
    //   toast.error("طول رمز شما باید از ۸ بیشتر باشد", {
    //     position: toast.POSITION.TOP_CENTER,
    //   });
    //   return;
    // }
    try {
      // register user
      await axios.post(
        `${urlDomain}/auth/register/`,
        {
          ...this.state,
          client: "web",
        }
        // { headers: { Client: "web" }}
      );
      try {
        // then login user
        let loginResponse = await axios.post(`${urlDomain}/auth/login/`, {
          ...this.state,
        });
        localStorage.setItem("access", loginResponse.data["access"]);
        // this.props.changeSpinnerState(false);
        this.setState({ loadSpinner: false });
        history.push("/");
      } catch (e) {
        // this.props.changeSpinnerState(false);
        this.setState({ loadSpinner: false });
        toast.error("مشکلی در فرآیند به وجود آمده‌است.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (e) {
      // this.props.changeSpinnerState(false);
      this.setState({ loadSpinner: false });
      toast.error("مشکلی در فرآیند به وجود آمده‌است.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  setConditionRegister = () => {
    const { username, password, confirmPass } = this.state;
    return (
      username.length < 6 || password.length < 8 || confirmPass !== password
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.state.loadSpinner ? (
          <div style={{ marginTop: "270px" }}>
            <ComponentSpinner />
          </div>
        ) : (
          <Form onSubmit={this.handleRegister}>
            <FormGroup style={{ marginTop: "5%" }} className="form-label-group position-relative has-icon-left">
              <Input
                type="text"
                placeholder="نام کاربری"
                required
                value={this.state.username}
                onChange={(e) => this.setState({ username: e.target.value })}
                invalid={
                  this.state.username.length > 0 &&
                  this.state.username.length < 6
                }
              />
                <div className="form-control-position">
                  <User size={15} />
                </div>
              <Label style={{ fontSize: "12px" }}>نام کاربری</Label>
              {this.state.username.length > 0 &&
                this.state.username.length < 6 && (
                  <small style={{ color: "red", fontSize: "11px" }}>
                    طول نام کاربری شما باید بیش‌تر از ۵ باشد
                  </small>
                )}
            </FormGroup>
            <FormGroup
              style={{ marginTop: "10%" }}
              className="form-label-group position-relative has-icon-left"
            >
                   <div className="form-control-position">
                  <Lock size={15} />
                </div>
              <Input
                type="password"
                placeholder="رمز"
                required
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
                invalid={
                  this.state.password.length > 0 &&
                  this.state.password.length < 8
                }
              />
                 
              <Label style={{ fontSize: "12px" }}>رمز</Label>
              {this.state.password.length > 0 &&
                this.state.password.length < 8 && (
                  <small style={{ color: "red", fontSize: "11px" }}>
                    طول رمز شما باید بیشتر از ۷ باشد
                  </small>
                )}
            </FormGroup>
            <FormGroup
              style={{ marginTop: "10%" }}
              className="form-label-group position-relative has-icon-left"
            >
              <Input
                type="password"
                placeholder="تایید رمز"
                required
                value={this.state.confirmPass}
                onChange={(e) => this.setState({ confirmPass: e.target.value })}
                invalid={this.state.confirmPass !== this.state.password}
              />
                              <div className="form-control-position">
                  <Lock size={15} />
                </div>
              <Label style={{ fontSize: "12px" }}>تایید رمز</Label>
              {this.state.confirmPass !== this.state.password && (
                <small style={{ color: "red", fontSize: "11px" }}>
                  رمز شما مطابقت ندارد
                </small>
              )}
            </FormGroup>
            <div
              style={{ marginTop: "10%" }}
              className="d-flex justify-content-between"
            >
              <Button
                disabled={this.setConditionRegister()}
                color="primary"
                type="submit"
              >
                ثبت نام
              </Button>
              <Button
                outline
                color="primary"
                onClick={() => {
                  history.push("/login");
                }}
              >
                ورود
              </Button>
            </div>
          </Form>
        )}
      </React.Fragment>
    );
  }
}
export default RegisterJWT;
