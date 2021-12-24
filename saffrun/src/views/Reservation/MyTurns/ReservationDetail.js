import React, { Component } from "react";
import CapacityChart from "./capacityOccupiedChart";
import CapacityPieChart from "./capacityPieChart";
import ReserveStats from "./reserveStats";
import CurrentClosest from "./CurrentORColsest";
import ReserveTable from "./reserveDetailTable";
import { Card, CardHeader, CardTitle, CardBody, Row, Col } from "reactstrap";

class ReserveDetail extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col lg="8" xs="12">
            <ReserveStats />
            <ReserveTable date={this.props.match.params.date}/>
          </Col>
          <Col lg="4" xs="12">
            <CurrentClosest />
            <CapacityPieChart />
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <CapacityChart />
          </Col>

        </Row>
      </React.Fragment>
    );
  }
}

export default ReserveDetail;
