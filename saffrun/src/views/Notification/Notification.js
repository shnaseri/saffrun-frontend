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
  
} from "reactstrap";
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
import FormNotif from "./FormNotif";
import TableNotif from "./TableNotif";

class Notification extends React.Component {
  state = {
    answer: "",
  };
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md="8">
            <TableNotif />
          </Col>
          <Col md="4">
            <FormNotif />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Notification;
