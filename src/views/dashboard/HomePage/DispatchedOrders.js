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
import userImg from "../../../assets/img/profile/Generic-profile-picture.jpg.webp";
class DispatchedOrders extends React.Component {
  render() {
    return (
      <Card style={{height:"460px"}}>
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
                    { row["list_participants"]&& row["list_participants"].map((R) => (
                      <li className="avatar pull-up">
                        <img
                          src={
                            "id" in R["image"]
                              ? "http://185.235.40.173:8000" + R["image"]["image"]["thumbnail"]
                              : userImg 
                          }
                          alt="avatar"
                          height="30"
                          width="30"
                          id={"id"+R["first_name"]}
                        />
                        <UncontrolledTooltip
                          placement="bottom"
                          target={"id"+R["first_name"]}
                        >
                          {R["first_name"]}
                          {" "}
                          {R["last_name"]}
                        </UncontrolledTooltip>
                      </li>
                    ))}
                  </ul>
                  {row["title"]}
                </td>
                <td>{row["province"]}</td>
                <td>
                  {new Date(row["start_datetime"]).toLocaleDateString("fa-IR")} <br/> {new Date(row["start_datetime"]).toLocaleTimeString("en-GB")}
                </td>
                <td>{parseInt(((new Date(row["end_datetime"])-new Date(row["start_datetime"]))/60000)).toLocaleString()} دقیقه</td>
                {row["participant_count"] && <td>{row["participant_count"]}</td>}
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    );
  }
}
export default DispatchedOrders;
