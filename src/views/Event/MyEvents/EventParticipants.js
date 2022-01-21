import React from "react";
import { Card, CardHeader, CardTitle, CardBody, Button } from "reactstrap";
import { MoreHorizontal, UserPlus, Plus, Trash } from "react-feather";

import defaultImg from "../../../assets/img/profile/Generic-profile-picture.jpg.webp";
import imgUrlDomain from "../../../utility/imgUrlDomain";
import SweetAlert from "react-bootstrap-sweetalert";

class EventParticipants extends React.Component {
  state = {
    deleteUserModal: false,
    userId: 0,
  };
  imgGenerator = (x) => {
    return x.image.image
      ? `${imgUrlDomain}${x.image.image.thumbnail}`
      : defaultImg;
  };
  participantsGenreator = (participants) => {
    return participants.map((x) => {
      return { id: x.id, name: x.name, imgUrl: this.imgGenerator(x) };
    });
  };
  marginTopDefiner = (idx) => {
    return idx === 0 ? "0px" : "30px";
  };
  userSelected = (id) => {
    this.setState({ deleteUserModal: true, userId: id });
  };
  handleAlert = (state, value) => {
    this.setState({
      [state]: value,
    });
  };
  render() {
    let participants = this.participantsGenreator(this.props.participants);
    let disabledButton = this.props.disabledDeleteParticipants;
    return (
      <Card>
        <CardHeader>
          <CardTitle>شرکت‌‌کنندگان</CardTitle>
        </CardHeader>
        {participants.length > 0 && (
          <CardBody style={{ height: "450px", overflow: "auto" }}>
            {participants.map((item, index) => {
              return (
                <div
                  style={{ marginTop: this.marginTopDefiner(index) }}
                  className="d-flex justify-content-between align-items-center mb-1"
                  key={index}
                >
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
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      this.userSelected(item.id);
                    }}
                    color="danger"
                    className="btn-icon ml-auto"
                    disabled={disabledButton}
                    outline
                  >
                    <Trash size={17} />
                  </Button>
                </div>
              );
            })}
            <SweetAlert
              title="آیا از حذف این مورد اطمینان دارید؟"
              warning
              show={this.state.deleteUserModal}
              showCancel
              reverseButtons
              cancelBtnBsStyle="warning"
              confirmBtnText="بله؛ حذف کن"
              cancelBtnText="لغو"
              confirmBtnBsStyle="danger"
              onConfirm={() => {
                this.props.deleteUser(this.state.userId);
                this.handleAlert("deleteUserModal", false);
              }}
              onCancel={() => {
                this.handleAlert("deleteUserModal", false);
              }}
            >
              بعد از حذف نمیتوانید دوباره این مورد را بازگردانی کنید!
            </SweetAlert>
          </CardBody>
        )}
        {participants.length === 0 && (
          <CardBody
            style={{ height: "200px" }}
            className="justify-content-center d-flex"
          >
            <p style={{ marginTop: "50px" }}>
              شرکت‌‌کننده‌ای در رویداد شما شرکت نکرده است
            </p>
          </CardBody>
        )}
      </Card>
    );
  }
}
export default EventParticipants;
