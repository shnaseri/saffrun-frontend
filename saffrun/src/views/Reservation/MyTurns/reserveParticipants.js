import React from "react";
import { Card, CardHeader, CardTitle, CardBody, Button } from "reactstrap";
import { Trash } from "react-feather";

class ReserveParticipants extends React.Component {
  render() {
    return (
      <div style={{ height: "440px", overflow: "auto" }}>
        <Card style={{ boxShadow: "none" }}>
          <CardHeader></CardHeader>
          <CardBody>
            {this.props.participants.map((item) => (
              <div className="d-flex justify-content-between align-items-center mb-1">
                <div className="user-info d-flex align-items-center">
                  <div className="avatar mr-50">
                    <img
                      src={item.imgUrl}
                      alt="avtar img holder"
                      height="35"
                      width="35"
                    />
                  </div>
                  <div className="user-page-info">
                    <h6 className="mb-0">{item.name}</h6>
                    {/* <span className="font-small-2">6 Mutual Friends</span> */}
                  </div>
                </div>
                <Button color="danger" className="btn-icon ml-auto">
                  <Trash size={17} />
                </Button>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default ReserveParticipants;
