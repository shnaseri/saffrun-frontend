import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
} from "reactstrap";
import { DatePicker } from "react-advance-jalaali-datepicker";
import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy";
import { Check } from "react-feather";

class BookingCreation extends React.Component {
  state = {
    disableEndTime :true,
    startDate : 0,
    endDate : 0,
    endBeforStart : false
  }
  DatePickerInputFrom =(props)=> {
    return (
      <React.Fragment>
        <FormGroup className="form-label-group">
        
        <Input
          type="text"
          name="from"
          id="from"
          placeholder="از تاریخ"
          {...props}
        />
        <Label for="from">از تاریخ</Label>
        
        </FormGroup>
      </React.Fragment>
    );
  }
  DatePickerInputEnd = (props) => {
    return (
      <React.Fragment>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            name="End"
            id="End"
            placeholder="از تاریخ"
            
            {...props}
            disabled = {this.state.disableEndTime}
          />
          <Label for="End">تا تاریخ</Label>
          {this.checkDate() &&  <small style={{ color: "red", fontSize: "11px" }}>
                تاریخ شروع نباید بعد از پایان باشد.
              </small>}
    {/* <p>{`${new Date(this.state.startDate * 1000)}`} - {`${new Date(this.state.endDate * 1000)}`}</p> */}
        </FormGroup>
      </React.Fragment>
    );
  }
  checkDate = () =>{
    if (this.state.endDate === 0)return false 
    if (this.state.startDate > this.state.endDate) return true;
    else return false
  }
  changeStart = (unix, formatted)=>{

    this.setState({ disableEndTime : false, startDate : unix})

  }
  changeEnd = (unix, formatted)=>{
    this.setState({endDate:unix})
    console.log(new Date(this.state.startDate * 1000))
    console.log(new Date(this.state.endDate * 1000))
    // if ( new Date(this.state.endDate * 1000) > new Date(this.state.startDate * 1000)){
    //   this.setState({endBeforStart:true})
    // }
    
  }
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>مشخصات نوبت</CardTitle>
        </CardHeader>
        <CardBody>
          <Form className="mt-2">
            <Row>
              <Col style={{ padding: 5 }} md="6" sm="12">
                <FormGroup className="form-label-group">
                  <Input
                    type="text"
                    name="name"
                    id="TurnName"
                    placeholder="نام نوبت"
                  />
                  <Label for="TurnName">نام نوبت</Label>
                </FormGroup>
              </Col>
              <Col style={{ padding: 5 }} md="6" sm="12">
                <FormGroup className="form-label-group">
                  <Input
                    type="text"
                    name="personsNum"
                    id="personsNum"
                    placeholder="تعداد نفرات مجاز"
                  />
                  <Label for="personsNum">تعداد نفرات مجاز</Label>
                </FormGroup>
              </Col>
              <Col style={{ padding: 5 }} md="6" sm="12">
                <DatePicker
                  inputComponent={this.DatePickerInputFrom}
                  placeholder=" از تاریخ"
                  format="jYYYY/jMM/jDD"
                  onChange={this.changeStart}
                  id="datePicker"
                  lab
                  // preSelected="از تاریخ"
                />
                {/* <Label for="from">از تاریخ</Label> */}
              </Col>
              <Col style={{ padding: 5 }} md="6" sm="12">
                <DatePicker
                  inputComponent={this.DatePickerInputEnd}
                  placeholder="تا تاریخ"
                  format="jYYYY/jMM/jDD"
                  onChange={this.changeEnd}
                  id="datePicker"
                  // preSelected="1396/05/15"
                />
              </Col>
              <Col style={{ padding: 5 }} md="6" sm="12">
                <FormGroup className="form-label-group">
                  <Input
                    type="text"
                    name="NumOfTurns"
                    id="NumOfTurns"
                    placeholder="تعداد نوبت ها"
                  />
                  <Label for="NumOfTurns">تعداد نوبت ها </Label>
                </FormGroup>
              </Col>
              <Col style={{ padding: 5 }} md="6" sm="12">
                <FormGroup className="form-label-group">
                  <Input
                    type="text"
                    name="duration"
                    id="duration"
                    placeholder="مدت زمان هر نوبت (به دقیقه)"
                  />
                  <Label for="duration">مدت رمان هر نوبت (به دقیقه)</Label>
                </FormGroup>
              </Col>
              {/* <Col style={{padding:5}} sm="12">
                <FormGroup className="form-label-group">
                  <Checkbox
                    color="primary"
                    icon={<Check className="vx-icon" size={16} />}
                    label="Remember Me"
                    defaultChecked={false}
                  />
                </FormGroup>
              </Col> */}
              <Col sm="12">
                <FormGroup className="form-label-group">
                  <Button
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                    onClick={(e) => e.preventDefault()}
                  >
                    تایید و ادامه
                  </Button>
                  {/* <Button
                    outline
                    color="warning"
                    type="reset"
                    className="mb-1"
                  >
                    Reset
                  </Button> */}
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default BookingCreation;
