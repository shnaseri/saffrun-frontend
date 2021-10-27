import React from "react";
import Wizard from "./WizardComponent";
import {
  // Form,
  FormGroup,
  Input,
  Label,
  CustomInput,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  // Button
} from "reactstrap";
import Checkbox from "../checkbox/CheckboxesVuexy";
import { Check } from "react-feather";
import Select from "react-select";
const colourOptions = [
  { value: "پزشک", label: "پزشک" },
  { value: "بغالی", label: "بغالی" },
  { value: "استادیار", label: "استادیار" },
  { value: "سلمونی", label: "سلمونی" },
];
class WizardBasic extends React.Component {
  state = {
    title: "",
    jobCategory: "",
    description: "",
    colourOptions :[
      { value: "پزشک", label: "پزشک" },
      { value: "بغالی", label: "بغالی" },
      { value: "استادیار", label: "استادیار" },
      { value: "سلمونی", label: "سلمونی" },
    ],
  };

  stepsGenerator() {
    let { description, title } = this.state;
    let jobSelect = this.state.jobCategory ? this.state.jobCategory.value : ""
    return [
      {
        title: "۳",
        buttonDisabled:
          description.length === 0 ||
          title.length === 0 ||
         jobSelect.length === 0,
        content: (
          <Row>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>
                  عنوان رویداد
                  <span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  type="text"
                  value={this.state.title}
                  onChange={(e) => this.setState({ title: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label>
                  عنوان شغل
                  <span style={{ color: "red" }}>*</span>
                </Label>
                {/* dropdown bashe */}
                <Select
                  className="React"
                  classNamePrefix="select"
                  name="clear"
                  options={this.state.colourOptions}
                  isClearable={true}
                  placeholder=""
                  value={this.state.jobCategory}
                  onChange={this.onSelectJob.bind(this)}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label>
                  {" "}
                  توضیحات
                  <span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  value={this.state.description}
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                  type="textarea"
                  rows="5"
                  placeholder=" توضیحات درمورد رویداد"
                />
              </FormGroup>
            </Col>
          </Row>
        ),
      },
      {
        title: "۲",
        buttonDisabled:
          description.length === 0 &&
          title.length === 0 &&
         jobSelect.length === 0,
        content: (
          <Row>
            <Col md="6" sm="12">
              <FormGroup>
                <Label> Event Name </Label>
                <Input
                  value={this.state.title}
                  onChange={(e) => this.setState({ title: e.target.value })}
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label> Event Location </Label>
                <Select
                  className="React"
                  classNamePrefix="select"
                  name="clear"
                  options={colourOptions}
                  isClearable={true}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label> Event Status </Label>
                <CustomInput type="select" name="select" id="status">
                  <option>Planning</option>
                  <option>In Process</option>
                  <option>Finished</option>
                </CustomInput>
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label> Event Status </Label>
                <Label className="mr-2">Requirements :</Label>
                <div className="stacked-checkbox">
                  <div className="d-inline-block mr-2">
                    <Checkbox
                      color="primary"
                      icon={<Check className="vx-icon" size={16} />}
                      label="Staffing"
                      defaultChecked={false}
                    />
                  </div>
                  <div className="d-inline-block">
                    <Checkbox
                      color="primary"
                      icon={<Check className="vx-icon" size={16} />}
                      label="Catering"
                      defaultChecked={false}
                    />
                  </div>
                </div>
              </FormGroup>
            </Col>
          </Row>
        ),
      },
      {
        title: "۱",
        buttonDisabled:
          description.length === 0 &&
          title.length === 0 &&
         jobSelect.length === 0,
        content: (
          <Row>
            <Col md="6" sm="12">
              <FormGroup>
                <Label> Event Name </Label>
                <Input
                  value={this.state.title}
                  onChange={(e) => this.setState({ title: e.target.value })}
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label> Event Location </Label>
                <CustomInput type="select" name="select" id="location">
                  <option>New York</option>
                  <option>Chicago</option>
                  <option>San Francisco</option>
                  <option>Boston</option>
                </CustomInput>
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label> Event Status </Label>
                <CustomInput type="select" name="select" id="status">
                  <option>Planning</option>
                  <option>In Process</option>
                  <option>Finished</option>
                </CustomInput>
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label> Event Status </Label>
                <Label className="mr-2">Requirements :</Label>
                <div className="stacked-checkbox">
                  <div className="d-inline-block mr-2">
                    <Checkbox
                      color="primary"
                      icon={<Check className="vx-icon" size={16} />}
                      label="Staffing"
                      defaultChecked={false}
                    />
                  </div>
                  <div className="d-inline-block">
                    <Checkbox
                      color="primary"
                      icon={<Check className="vx-icon" size={16} />}
                      label="Catering"
                      defaultChecked={false}
                    />
                  </div>
                </div>
              </FormGroup>
            </Col>
          </Row>
        ),
      },
    ];
  }
  onSelectJob(val){
    this.setState({jobCategory: val})
}
  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle>ایجاد رویداد</CardTitle>
          </CardHeader>
          <CardBody>
            <Wizard
              enableAllSteps
              onFinish={() => alert("submitted")}
              steps={this.stepsGenerator()}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default WizardBasic;
