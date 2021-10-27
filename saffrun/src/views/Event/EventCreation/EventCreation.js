import React from "react"
import momentJalaali from 'moment-jalaali'
import DatePicker from 'react-datepicker2';
import MyEvents from "../MyEvents/MyEvents"
import BreadCrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import { Row, Col } from "reactstrap"
import WizardBasic from "../../../components/@vuexy/wizard/WizardBasic"

class EventCreation extends React.Component {
  state ={
    mmd :0
  }
  constructor(props) {
    super(props);
    this.state = {
      value: momentJalaali('1396/7/6', 'jYYYY/jM/jD')
    };
  }
  render() {
    return (
      <div >
{/* <DatePicker
      isGregorian={false}
      value={this.state.value}
      onChange={value => this.setState({ value })}
    /> */}
    <React.Fragment>
        <Row>
          <Col sm="12">
            <WizardBasic />
          </Col>
        </Row>
      </React.Fragment>

     </div>
    )
  }
}
export default EventCreation
