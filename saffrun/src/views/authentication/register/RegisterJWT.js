import React from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { connect } from "react-redux";
import { history } from "../../../history";

class RegisterJWT extends React.Component {
  state = {
    email: "",
    password: "",
    name: "",
    confirmPass: "",
  };

  handleRegister = (e) => {
    e.preventDefault();
    // this.props.signupWithJWT(
    //   this.state.email,
    //   this.state.password,
    //   this.state.name
    // )
    history.push("/");
  };

  render() {
    return (
      <Form onSubmit={this.handleRegister}>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="نام"
            required
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
          <Label>نام</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="email"
            placeholder="ایمیل"
            required
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <Label>ایمیل</Label>
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
            outline
          >
            ثبت نام
          </Button>
        </div>
      </Form>
    );
  }
}
export default RegisterJWT;
