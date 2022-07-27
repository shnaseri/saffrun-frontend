import React from "react";
import { Card, CardHeader, CardTitle, CardBody, Button } from "reactstrap";
import { Trash } from "react-feather";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";
import { urlDomain } from "../../../utility/urlDomain";
import ComponentSpinner from "../../../components/@vuexy/spinner/Loading-spinner";

class ReserveParticipants extends React.Component {
  state = {
    participants: [],
    deleteParticipantModal: false,
    loadSpinner: false,
    participantsIdToDelete: 0,
  };
  componentDidMount() {
    this.setState({ participants: this.props.participants });
  }
  onDeleteParticipants = async (id) => {
    let token = localStorage.getItem("access");
    token = `Bearer ${token}`;
    try {
      this.setState({ loadSpinner: true });
      let deleteReserveItem = await axios.delete(
        `${urlDomain}/reserve/web/remove-participant-reserve`,
        {
          headers: { Authorization: token },
          data: {
            reserve_id: this.props.reserveId,
            user_id: this.state.participantsIdToDelete,
          },
        }
      );
      this.props.participantHasDeleted();
      let { participants } = this.state;
      participants = participants.filter((item) => item.id !== id);
      this.setState({ participants, loadSpinner: false });
    } catch (e) {
      this.setState({ loadSpinner: false });
      console.log("error raised");
      console.log(e);
    }
  };

  handleAlert = (state, value) => {
    this.setState({
      [state]: value,
    });
  };
  showSpinner = () => {
    return (
      <div style={{ marginTop: "100px" }}>
        <ComponentSpinner />
      </div>
    );
  };
  render() {
    let { participants, loadSpinner } = this.state;
    return (
      <div style={{ height: "440px", overflow: "auto" }}>
        {loadSpinner ? (
          this.showSpinner()
        ) : (
          <Card style={{ boxShadow: "none" }}>
            <CardBody>
              {participants.map((item) => (
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
                  <Button
                    disabled={this.props.diabledDeleteBtn}
                    color="danger"
                    className="btn-icon ml-auto"
                    outline
                    onClick={() => {
                      this.handleAlert("deleteParticipantModal", true);
                      this.setState({ participantsIdToDelete: item.id });
                    }}
                  >
                    <Trash size={17} />
                  </Button>
                </div>
              ))}
            </CardBody>
          </Card>
        )}
        <SweetAlert
          title="آیا از حذف این مورد اطمینان دارید؟"
          warning
          show={this.state.deleteParticipantModal}
          showCancel
          reverseButtons
          cancelBtnBsStyle="warning"
          confirmBtnText="بله؛ حذف کن"
          cancelBtnText="لغو"
          confirmBtnBsStyle="danger"
          onConfirm={async () => {
            this.handleAlert("deleteParticipantModal", false);
            await this.onDeleteParticipants(this.state.participantsIdToDelete);
          }}
          onCancel={() => {
            this.handleAlert("deleteParticipantModal", false);
          }}
        ></SweetAlert>
      </div>
    );
  }
}
export default ReserveParticipants;
