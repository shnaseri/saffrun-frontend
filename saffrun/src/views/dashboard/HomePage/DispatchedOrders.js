import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  Table,
  UncontrolledTooltip,
  Progress,
} from "reactstrap";
import avatar1 from "../../../assets/img/portrait/small/avatar-s-5.jpg";
import avatar2 from "../../../assets/img/portrait/small/avatar-s-7.jpg";
import avatar3 from "../../../assets/img/portrait/small/avatar-s-10.jpg";
import avatar4 from "../../../assets/img/portrait/small/avatar-s-8.jpg";
import avatar5 from "../../../assets/img/portrait/small/avatar-s-1.jpg";
import avatar6 from "../../../assets/img/portrait/small/avatar-s-2.jpg";
import avatar7 from "../../../assets/img/portrait/small/avatar-s-3.jpg";
import avatar8 from "../../../assets/img/portrait/small/avatar-s-4.jpg";

class DispatchedOrders extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{this.props.cardName}</CardTitle>
        </CardHeader>
        <Table
          responsive
          className="dashboard-table table-hover-animation mb-0 mt-1"
        >
          <thead>
            <tr>
              {this.props.header.map((headerName) => (
                <th>{headerName}</th>
              ))}
              {/* <th>نوبت گیرنده</th>
              <th>مکان</th>
              <th>تاریخ و زمان</th>
              <th>مدت</th> */}
            </tr>
          </thead>
          <tbody>
            {this.props.tBody.map((row) => (
              <tr>
                <td className="p-1">
                  <ul className="list-unstyled users-list m-0 d-flex">
                    {row["Recipient"].map(R=>
                      <li className="avatar pull-up">
                        <img
                          src={R["imgUrl"]}
                          alt="avatar"
                          height="30"
                          width="30"
                          id={R["name"]}
                        />
                        <UncontrolledTooltip
                          placement="bottom"
                          target={R["name"]}
                        >
                          {R["name"]}
                        </UncontrolledTooltip>
                      </li>
                    )}
                  </ul>
            {row["eventName"]}
                </td>
                    <td>{row["Place"]}</td>
                <td>{row["Time"]} {row["Date"]}</td>
                <td>{row["Duration"]}</td>
                {row["Participant"] && <td>{row["Participant"]}</td>}
              </tr>
            ))}

          </tbody>
        </Table>
      </Card>
    );
  }
}
export default DispatchedOrders;
