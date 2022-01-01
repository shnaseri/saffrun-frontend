import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  UncontrolledTooltip,
  Row,
  Col,
  Toast,
  ToastHeader,
  ToastBody,
  Input,
  Label,
  Button,
  FormGroup,
} from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import Countdown from "react-countdown-now";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/scss/plugins/extensions/toastr.scss";
import {
  Plus,
  AlertCircle,
  Clock,
  Layers,
  MapPin,
  UserPlus,
  Calendar,
} from "react-feather";
import Radio from "../../components/@vuexy/radio/RadioVuexy";
import axios from "axios";
import urlDomain from "../../utility/urlDomain";
import { history } from "../../history";
import isAuthenticated from "../../utility/authenticated";

class FormNotif extends React.Component {
  state = {
    answer: "",
    defalert: false,
    title: "",
    exampleRadio: 2,
  };

  handleAlert = (state, value) => {
    this.setState({
      [state]: value,
    });
  };

  async componentDidMount() {
    let authenticated = await isAuthenticated();
    if (!authenticated) history.push("/login");
    let token = localStorage.getItem("access");
    token = `Bearer ${token}`;
    try {
      let response = await axios.get(`${urlDomain}/profile/user/`, {
        headers: { Authorization: token },
      });
      this.setState({
        username: response.data.username,
        image: response.data.avatar["image"],
      });
    } catch (e) {
      // this.setState({ loadSpinner: false });
    }
  }
  sendNotif = async () => {
    var token = "Bearer " + localStorage.getItem("access");
    var headers = {
      Authorization: token,
    };
    try {
      let response = await axios.post(
        `${urlDomain}/notification/send-notification/`,
        {
          title: this.state.title,
          text: this.state.answer,
          type: this.state.exampleRadio,
          url: "https://www.google.com",
        },
        { headers }
      );
      toast.success("با موفقیت ارسال شد", {
        position: toast.POSITION.TOP_CENTER,
      });
      return response;
    } catch (e) {
      toast.error("ارسال نشد", {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }
  };

  render() {
    return (
      <React.Fragment>
        <Card style={{ height: "477px" }}>
          <CardHeader>
            <CardTitle>ایجاد اعلان</CardTitle>
          </CardHeader>
          <CardBody>
            <div>
              <Row className="d-flex align-items-center">
                <Col lg="4" xs="3" md="3">
                  <br></br>

                  <strong>افراد</strong>
                </Col>
                <Col lg="4" xs="4" md="4">
                  <br></br>
                  <Radio
                    label="همه"
                    defaultChecked={true}
                    name="exampleRadio"
                    onChange={() => this.setState({ exampleRadio: 2 })}
                  />
                </Col>
                <Col lg="4" xs="4" md="5">
                  <br></br>
                  <Radio
                    label="مخاطبان"
                    defaultChecked={false}
                    name="exampleRadio"
                    onChange={() => this.setState({ exampleRadio: 1 })}
                  />
                </Col>
              </Row>
            </div>
            <FormGroup style={{ marginTop: "10px" }}>
              <Label>
                <br></br>
                <strong>عنوان اعلان</strong>
              </Label>
              <Input
                type="text"
                value={this.state.title}
                maxLength={30}
                placeholder="عنوان اعلان"
                required
                onChange={(e) => this.setState({ title: e.target.value })}
              />
            </FormGroup>
            <FormGroup style={{ marginTop: "20px" }}>
              <Label>
                {" "}
                <strong>توضیحات</strong>
              </Label>
              <Input
                type="textarea"
                rows="5"
                placeholder="توضیحات درمورد اعلان"
                maxLength={500}
                required
                onChange={(e) => this.setState({ answer: e.target.value })}
              />
            </FormGroup>
            <Button
              disabled={
                this.state.answer.length === 0 || this.state.title.length === 0
              }
              onClick={() => this.handleAlert("defalert", true)}
              className="btn-block shadow"
              color="primary"
            >
              ارسال
            </Button>
          </CardBody>
        </Card>
        <SweetAlert
          title="آیا از ارسال این اعلان اطمینان دارید؟"
          warning
          show={this.state.defalert}
          showCancel
          reverseButtons
          cancelBtnBsStyle="danger"
          confirmBtnBsStyle="success"
          confirmBtnText="بله؛ ارسال کن"
          cancelBtnText="لغو"
          onConfirm={() => {
            this.handleAlert("defalert", false);
            this.sendNotif();
          }}
          onCancel={() => {
            this.handleAlert("defalert", false);
          }}
        >
          بعد از ارسال نمیتوانید دوباره این مورد را ویرایش کنید!
        </SweetAlert>
      </React.Fragment>
    );
  }
}

export default FormNotif;
