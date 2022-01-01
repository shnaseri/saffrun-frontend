import React, { Component } from "react";
import CapacityChart from "./capacityOccupiedChart";
import CapacityPieChart from "./capacityPieChart";
import ReserveStats from "./reserveStats";
import CurrentClosest from "./CurrentORColsest";
import ReserveTable from "./reserveDetailTable";
import { Card, CardHeader, CardTitle, CardBody, Row, Col } from "reactstrap";
import urlDomain from "../../../utility/urlDomain";
import imgUrlDomain from "../../../utility/imgUrlDomain";
import { history } from "../../../history";
import isAuthenticated from "../../../utility/authenticated";
import axios from "axios";
import ComponentSpinner from "../../../components/@vuexy/spinner/Loading-spinner";

class ReserveDetail extends Component {
  state = {
    loadSpinner: true,
  };
  async componentDidMount() {
    let authenticated = await isAuthenticated();
    if (!authenticated) history.push("/login");
    let token = localStorage.getItem("access");
    let params = { date: this.props.match.params.date };
    try {
      let reserveData = await axios.get(
        `${urlDomain}/reserve/web/get-reserve-detail`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params,
        }
      );
      this.setState({ ...reserveData.data, loadSpinner: false });
    } catch (e) {
      this.setState({ loadSpinner: false });
      console.log(e);
    }
  }
  showSpinner = () => {
    return (
      <div style={{ marginTop: "500px" }}>
        <ComponentSpinner />
      </div>
    );
  };
  render() {
    return this.state.loadSpinner
      ? this.showSpinner()
      : this.state.number_of_reservation !== 0 && (
          <React.Fragment>
            <Row>
              <Col lg="8" xs="12">
                <ReserveStats data={this.state} />
                <ReserveTable date={this.props.match.params.date} />
              </Col>
              <Col lg="4" xs="12">
                <CurrentClosest data={this.state.nearest_reserve} />
                <CapacityPieChart data={this.state} />
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <CapacityChart data={this.state.data_of_chart}/>
              </Col>
            </Row>
          </React.Fragment>
        );
  }
}

export default ReserveDetail;
