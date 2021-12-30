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
import axios from "axios";
import urlDomain from "../../utility/urlDomain";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/scss/plugins/extensions/toastr.scss";

class ForgotPassword extends React.Component {
  state = {
    btnText: "تایید نام کاربری",
    username: "",
    enterCode: true,
    codeEntered: "",
  };
  postUsername = async () => {
    try {
      let response = await axios.post(
        `${urlDomain}/auth/change_password/`,
        { username :this.state.username }
        
      )

      ;

      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  check ()
  {
    if(this.state.username.length ===0)
      return "true"
    return ""
  }
  
  emailConfirmed =  async () => {
    toast.success("تا لحظات دیگر به قسمت لاگین منتقل میشوید", {
      position: toast.POSITION.TOP_CENTER,
    });
    await this.postUsername();
      history.push("/login");
  };
  render() {
    return (
      <Row className="m-0 justify-content-center">
      <ToastContainer />
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
                    نام کاربری خود رو وارد کنید و سپس رمز جدید برای شما ارسال خواهد شد 
                  </p>
                  <CardBody className="pt-1 pb-0">
                    <Form>
                      <FormGroup className="form-label-group">
                        <Input
                          onChange={(e) =>
                            this.setState({ username: e.target.value })
                          }
                          type="text"
                          placeholder="نام کاربری"
                          required
                          value={this.state.username}
                        />
                        {/* <Label>Email</Label> */}
                      </FormGroup>
                      <div className="float-md-left d-block mb-1">
                        <Button
                          color="primary"
                          type="submit"
                          
                          className="px-75 btn-block"
                          disabled={this.check()}
                          onClick={(e) => {
                            e.preventDefault();
                            this.emailConfirmed();
                          }}
                        >
                          {this.state.btnText}

                        </Button>
                      </div>
                      <div className="float-md-right d-block mb-1">
                        <Button
                          color="primary"
                          outline
                          className="px-75 btn-block"
                          onClick={() => history.push("/login")}
                        >
                                                    بازگشت به صفحه ورود
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
