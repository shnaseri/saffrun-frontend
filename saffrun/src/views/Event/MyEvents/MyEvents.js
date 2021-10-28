import React from "react";
import * as Icon from "react-feather"
import {Badge} from "reactstrap"
import img2 from "../../../assets/img/pages/content-img-2.jpg";
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
  UncontrolledDropdown,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Collapse,
  Spinner,
  Button,
  Progress,
} from "reactstrap";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import {
  Edit,
  Trash2,
  ChevronDown,
  Clipboard,
  Printer,
  Download,
  RotateCw,
  X,
} from "react-feather";
import classnames from "classnames";
import { history } from "../../../history";


class MyEvents extends React.Component {
  state = {
    collapse: false,
    status: "Closed",
    role: "All",
    events:[]
  };
  async componentDidMount() {
    let token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwNjAzMDY4LCJpYXQiOjE2MzU0MTkwNjgsImp0aSI6ImVlMzJhMzA1ZTIxNDQ3MDA5YzlmOTM1OWQ0YWM1ZGU3IiwidXNlcl9pZCI6MX0.rtTzM84bx29run_DOnUG_a98OYDcrTUymtFJWbYo9j0"
    let events = await axios.get("http://127.0.0.1:8000/event/get-all/",{headers:{Authorization:token},params:{search_query: ""}})
    this.setState({events: events.data.events})
    console.log(this.state.events)
  }
  toggleCollapse = () => {
    this.setState((state) => ({ collapse: !state.collapse }));
  };
  loadEventCards = () => {
    return this.state.events.map((ev) => <Col lg="4" md="6" sm="12">
    <Card>
      <CardBody>
        <CardImg
          className="img-fluid mb-2"
          src={img2}
          alt="card image cap"
        />
        <h5>{ev.title}</h5>
        <Row>
          <Col md="5" lg="6" sm="12" xl="7">
        <p>{ev.description.length >= 20 ? ev.description.substring(0,20) + "..." : ev.description }</p>
        </Col>
        <Col md="7" lg="6" sm="12" xl="5" >
        <Button style = {{width : "100%"}} color="primary">نمایش</Button>
        </Col>
        </Row>
        <hr className="my-1" />
        <div className="card-btns d-flex justify-content-between mt-2">
          <div className="fonticon-wrap">
          <Badge color="success" style={{height : "8px"}} > 
          {/* ddshmi */}
          <p>فعال</p>
            </Badge>
          </div>
          <div className="fonticon-wrap">
                  <Icon.Users size={30} className="mr-4 fonticon-wrap" />
  <p>{ev.participants.length}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  </Col>)
  }
  render() {
    return (
      <React.Fragment>
        <Row className="app-user-list">
        <Col sm="12">
          <Card
            className={classnames("card-action card-reload", {
              // "d-none": this.state.isVisible === false
            })}
          >
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <div className="actions">
                <ChevronDown
                  className="collapse-icon mr-50"
                  size={15}
                  onClick={this.toggleCollapse}
                />
              </div>
            </CardHeader>
            <Collapse
              isOpen={this.state.collapse}
            >
              <CardBody>
                <Row>
                  <Col lg="3" md="6" sm="12">
                    <FormGroup className="mb-0">
                      <Label for="role">Role</Label>
                      <Input
                        type="select"
                        name="role"
                        id="role"
                        value={this.state.role}
                        onChange={(e) => {
                          this.setState(
                            {
                              role: e.target.value,
                            },
                            () =>
                              this.filterData(
                                "role",
                                this.state.role.toLowerCase()
                              )
                          );
                        }}
                      >
                        <option value="All">All</option>
                        <option value="User">User</option>
                        <option value="Staff">Staff</option>
                        <option value="Admin">Admin</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Collapse>
          </Card>
        </Col>
      </Row>
      <Row>
      {this.loadEventCards()}
        {/* <Col lg="4" md="6" sm="12">
          <Card>
            <CardBody>
              <CardImg
                className="img-fluid mb-2"
                src={img2}
                alt="card image cap"
              />
              <h5>Vuexy Admin</h5>
              <p>By Pixinvent Creative Studio</p>
              <hr className="my-1" />
              <div className="card-btns d-flex justify-content-between mt-2">
                <div className="float-left">
                  <p className="font-medium-2 mb-0">$ 4785.78</p>
                  <p>Income</p>
                </div>
                <div className="float-right">
                  <p className="font-medium-2 mb-0">12 June 2020</p>
                  <p>Delivery Date</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4" md="6" sm="12">
      <Card>
            <CardBody>
              <CardImg
                className="img-fluid mb-2"
                src={img2}
                alt="card image cap"
              />
              <h5>Vuexy Admin</h5>
              <p>By Pixinvent Creative Studio</p>
              <hr className="my-1" />
              <div className="card-btns d-flex justify-content-between mt-2">
                <div className="float-left">
                  <p className="font-medium-2 mb-0">$ 4785.78</p>
                  <p>Income</p>
                </div>
                <div className="float-right">
                  <p className="font-medium-2 mb-0">12 June 2020</p>
                  <p>Delivery Date</p>
                </div>
              </div>
            </CardBody>
          </Card>
          </Col>
          <Col lg="4" md="6" sm="12">
      <Card>
            <CardBody>
              <CardImg
                className="img-fluid mb-2"
                src={img2}
                alt="card image cap"
              />
              <h5>Vuexy Admin</h5>
              <p>By Pixinvent Creative Studio</p>
              <hr className="my-1" />
              <div className="card-btns d-flex justify-content-between mt-2">
                <div className="float-left">
                  <p className="font-medium-2 mb-0">$ 4785.78</p>
                  <p>Income</p>
                </div>
                <div className="float-right">
                  <p className="font-medium-2 mb-0">12 June 2020</p>
                  <p>Delivery Date</p>
                </div>
              </div>
            </CardBody>
          </Card>
          </Col>
          <Col lg="4" md="6" sm="12">
      <Card>
            <CardBody>
              <CardImg
                className="img-fluid mb-2"
                src={img2}
                alt="card image cap"
              />
              <h5>Vuexy Admin</h5>
              <p>By Pixinvent Creative Studio</p>
              <hr className="my-1" />
              <div className="card-btns d-flex justify-content-between mt-2">
                <div className="float-left">
                  <p className="font-medium-2 mb-0">$ 4785.78</p>
                  <p>Income</p>
                </div>
                <div className="float-right">
                  <p className="font-medium-2 mb-0">12 June 2020</p>
                  <p>Delivery Date</p>
                </div>
              </div>
            </CardBody>
          </Card>
          </Col> */}
      </Row>
      </React.Fragment>
    );
  }
}
export default MyEvents;
