import React from "react"
import { Row, Col, Button, Form, Input, Label, FormGroup } from "reactstrap"
import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy"
import Radio from "../../components/@vuexy/radio/RadioVuexy"
import { Check, User, MapPin } from "react-feather"
import Select from "react-select"
import chroma from "chroma-js"
import Flatpickr from "react-flatpickr";

import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"


const languages = [
  { value: "english", label: "English", color: "#7367f0" },
  { value: "french", label: "French", color: "#7367f0" },
  { value: "spanish", label: "Spanish", color: "#7367f0" },
  { value: "russian", label: "Russian", color: "#7367f0" },
  { value: "italian", label: "Italian", color: "#7367f0" }
]

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = data.color ? chroma(data.color) : "#7367f0"
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled && (isSelected ? data.color : "#7367f0")
      }
    }
  },
  multiValue: (styles, { data }) => {
    const color = data.color ? chroma(data.color) : "#7367f0"
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css()
    }
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color ? data.color : "#7367f0"
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color ? data.color : "#7367f0",
      color: "white"
    }
  })
}
class UserInfoTab extends React.Component {
  state = {
    dob: new Date("1995-05-22")
  }
  handledob = date => {
    this.setState({
      dob: date
    })
  }
  render() {
    return (
      <Form onSubmit={e => e.preventDefault()}>
        <Row className="mt-1">
          <Col className="mt-1" md="6" sm="12">
            <h5 className="mb-1">
              <User className="mr-50" size={16} />
              <span className="align-middle">اطلاعات شخصی</span>
            </h5>
            {/* <FormGroup>
              <Label className="d-block" for="dob">
                تاریخ تولد
              </Label>
              <Flatpickr
                id="dob"
                className="form-control"
                options={{ dateFormat: "Y-m-d" }}
                value={this.state.dob}
                onChange={date => this.handledob(date)}
              />
            </FormGroup> */}
            <FormGroup>
              <Label for="contactnumber">تلفن ثابت</Label>
              <Input
                type="text"
                id="homeNumber"
                // placeholder="Contact Number"
                value = {this.props.userData["homeNumber"]}
                onChange={this.props.updateData}
              />
            </FormGroup>
            <FormGroup>
              <Label for="website">Website</Label>
              <Input type="url" id="website" placeholder="Web Address" />
            </FormGroup>
            {/* <FormGroup>
              <Label for="languages">Languages</Label>
              <Select
                isMulti
                defaultValue={[languages[0], languages[1], languages[2]]}
                isClearable={true}
                styles={colourStyles}
                options={languages}
                className="React"
                classNamePrefix="select"
                id="languages"
              />
            </FormGroup> */}
            <FormGroup>
              <Label className="d-block mb-50">جنسیت</Label>
              <div className="d-inline-block mr-1">
                <Radio
                  label="مرد"
                  id = "gender"
                  color="primary"
                  value={this.props.userData["gender"]}
                  checked={this.props.userData["gender"]}
                  name="gender"
                  onChange={this.props.updateData}
                  onClick={()=>{this.props.userData["gender"] = !this.props.userData["gender"];}}
                />
              </div>
              <div className="d-inline-block mr-1">
                <Radio
                  label="زن"
                  id = "gender"
                  color="primary"
                  value={!this.props.userData["gender"]}
                  checked={!this.props.userData["gender"]}
                  name="gender"
                  onChange={this.props.updateData}
                  onClick={()=>{this.props.userData["gender"] = !this.props.userData["gender"];}}
                  
                />
              </div>
            </FormGroup>
            {/* <FormGroup>
              <Label className="d-block mb-50" for="communication">
                نوع ارتباط
              </Label>
              <div className="d-inline-block mr-1">
                <Checkbox
                  color="primary"
                  icon={<Check className="vx-icon" size={16} />}
                  label="ایمیل"
                  defaultChecked={false}
                />
              </div>
              <div className="d-inline-block mr-1">
                <Checkbox
                  color="primary"
                  icon={<Check className="vx-icon" size={16} />}
                  label="پیامک"
                  defaultChecked={false}
                />
              </div>
              <div className="d-inline-block">
                <Checkbox
                  color="primary"
                  icon={<Check className="vx-icon" size={16} />}
                  label="تماس"
                  defaultChecked={false}
                />
              </div>
            </FormGroup> */}
          </Col>
          <Col className="mt-1" md="6" sm="12">
            <h5 className="mb-1">
              <MapPin className="mr-50" size={16} />
              <span className="align-middle">آدرس</span>
            </h5>
            <FormGroup>
              <Label for="address1">نشانی</Label>
              <Input type="text" id="address"  value = {this.props.userData["address"]} onChange={this.props.updateData}/>
            </FormGroup>
            <FormGroup>
              <Label for="pincode">استان</Label>
              <Input type="text" id="province"  value = {this.props.userData["province"]} onChange={this.props.updateData} />
            </FormGroup>
            <FormGroup>
              <Label for="city">شهر</Label>
              <Input
                type="text"
                value={this.props.userData["city"]}
                id="city"
                onChange={this.props.updateData}
              />
            </FormGroup>
            {/* <FormGroup>
              <Label for="State">State</Label>
              <Input
                type="text"
                defaultValue="London"
                id="State"
                placeholder="State"
              />
            </FormGroup> */}
            <FormGroup>
              <Label for="Country">کشور</Label>
              <Input
                type="text"
                value={this.props.userData["city"]}
                id="Country"
                placeholder="Country"
                onChange={this.props.updateData}
              />
            </FormGroup>
          </Col>
          <Col className="d-flex justify-content-end flex-wrap" sm="12">
            <Button className="mr-1" color="primary" onClick={this.props.postData}>
              اعمال تغییرات
            </Button>
            {/* <Button color="flat-warning">بازگرداندن به قبل</Button> */}
          </Col>
        </Row>
      </Form>
    )
  }
}
export default UserInfoTab
