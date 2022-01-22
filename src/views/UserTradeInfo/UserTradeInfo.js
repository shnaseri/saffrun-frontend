import React from "react";
import * as Icon from "react-feather";
import { Badge } from "reactstrap";
import img2 from "../../assets/img/slider/banner-20.jpg";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardImg,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Collapse,
  Spinner,
  Button,
  Progress,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledCarousel,
} from "reactstrap";
import ReactPaginate from "react-paginate";
import "./carousel.css";
import Radio from "../../components/@vuexy/radio/RadioVuexy";
import "../../assets/scss/plugins/extensions/react-paginate.scss";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowDown,
  ArrowUp,
  Filter,
} from "react-feather";
import "../../assets/scss/plugins/forms/react-select/_react-select.scss";
import {
  DatePicker,
  DateTimePicker,
  DateRangePicker,
  DateTimeRangePicker,
} from "react-advance-jalaali-datepicker";
import axios from "axios";
import classnames from "classnames";
import { history } from "../../history";
import isAuthenticated from "../../utility/authenticated";
import Status from "../../components/@vuexy/status/status";
import Select from "react-select";
import moment from "moment-jalaali";
import ComponentSpinner from "../../components/@vuexy/spinner/Loading-spinner";
import "../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../assets/scss/pages/users.scss";
import imgUrlDomain from "../../utility/imgUrlDomain";
import urlDomain from "../../utility/urlDomain";
import sliderImage1 from "../../assets/img/slider/03.jpg";
import sliderImage2 from "../../assets/img/slider/04.jpg";
import sliderImage3 from "../../assets/img/slider/05.jpg";
import DataTableExpandableRows from "./TreadeInfoTable";
class TreadeInfo extends React.Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col>
            <DataTableExpandableRows />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
export default TreadeInfo;
