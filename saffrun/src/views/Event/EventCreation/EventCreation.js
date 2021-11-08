import React from "react";

import MyEvents from "../MyEvents/MyEvents";
import BreadCrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { Row, Col } from "reactstrap";
import WizardBasic from "../../../components/@vuexy/wizard/WizardBasic";

class EventCreation extends React.Component {
  state = {
    mmd: 0,
  };

  render() {
    return (
      <div>
        <React.Fragment>
          <Row>

            <Col sm="12">
              <WizardBasic />
            </Col>
          </Row>
        </React.Fragment>
      </div>
    );
  }
}
export default EventCreation;
