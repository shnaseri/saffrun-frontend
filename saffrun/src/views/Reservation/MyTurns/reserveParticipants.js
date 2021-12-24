import React from "react"
import { Card, CardHeader, CardTitle, CardBody, Button } from "reactstrap"
import {Trash } from "react-feather"
import img1 from "../../../assets/img/portrait/small/avatar-s-5.jpg"
import img3 from "../../../assets/img/portrait/small/avatar-s-7.jpg"
import img5 from "../../../assets/img/portrait/small/avatar-s-9.jpg"

class ReserveParticipants extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader>
        <p className="font-weight-bold mb-0">شرکت کنندگان</p>
          {/* <MoreHorizontal className="cursor-pointer" size={15} /> */}
        </CardHeader>
        <CardBody>
          <div className="d-flex justify-content-between align-items-center mb-1">
            <div className="user-info d-flex align-items-center">
              <div className="avatar mr-50">
                <img src={img1} alt="avtar img holder" height="35" width="35" />
              </div>
              <div className="user-page-info">
                <h6 className="mb-0">علی اکبری</h6>
                {/* <span className="font-small-2">6 Mutual Friends</span> */}
              </div>
            </div>
            <Button color="primary" className="btn-icon ml-auto">
              <Trash size={17} />
            </Button>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-1">
            <div className="user-info d-flex align-items-center">
              <div className="avatar mr-50">
                <img src={img5} alt="avtar img holder" height="35" width="35" />
              </div>
              <div className="user-page-info">
                <h6 className="mb-0">حسین ناصری</h6>
                {/* <span className="font-small-2">3 Mutual Friends</span> */}
              </div>
            </div>
            <Button color="primary" className="btn-icon ml-auto">
              <Trash size={17} />
            </Button>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-1">
            <div className="user-info d-flex align-items-center">
              <div className="avatar mr-50">
                <img src={img3} alt="avtar img holder" height="35" width="35" />
              </div>
              <div className="user-page-info">
                <h6 className="mb-0">محمد جواد </h6>
                {/* <span className="font-small-2">2 Mutual Friends</span> */}
              </div>
            </div>
            <Button color="primary" className="btn-icon ml-auto">
              <Trash size={17} />
            </Button>
          </div>
        </CardBody>
      </Card>
    )
  }
}
export default ReserveParticipants
