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
import { toast } from "react-toastify";
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

class FormNotif extends React.Component {
  state = {
    answer: "",
    defalert:false,
    title:"",
  };

  handleAlert = (state, value) => {
    this.setState({
      [state]: value,
    });
  };

  sendNotif = async ()=>
  {
    var token = "Bearer " + localStorage.getItem("access");
    var headers = {
      Authorization: token,
    };
    try {
      let response = await axios.post(
        `${urlDomain}/event/add/`,
        { ...this.eventObject() },
        { headers }
      );
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  render() {
    return (
      <React.Fragment>
        <Card style={{height:"477px"}}>
          <CardHeader>
            <CardTitle>ایجاد اعلان</CardTitle>
          </CardHeader>
          <CardBody>
            
            <div>
              <Row className="d-flex align-items-center">
                <Col lg="4" xs="2" md="3" >
                  <br></br>

                  <strong>افراد</strong>
                </Col>
                  <Col lg="4" xs="5" md="4">
                  <br></br>
                    <Radio
                      label="همه"
                      defaultChecked={true}
                      name="exampleRadio"
                    />
                  </Col>
                  <Col lg="4" xs="5" md="5">
                  <br></br>
                    <Radio
                      label="مخاطبان"
                      defaultChecked={false}
                      name="exampleRadio"
                    />
                  </Col>
                </Row>

            </div>
            <FormGroup style={{marginTop:"10px"}}>
                <Label>
                <br></br>
                  <strong>
                  عنوان اعلان
                  </strong>
                </Label>
                <Input
                  type="text"
                  value={this.state.title}
                  maxLength={40}
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
                maxLength={100}
                onChange={(e) => this.setState({ answer: e.target.value })}
              />
            </FormGroup>
            <Button  onClick={() =>  this.handleAlert("defalert", true)} className="btn-block shadow" color="primary">ارسال</Button>
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
