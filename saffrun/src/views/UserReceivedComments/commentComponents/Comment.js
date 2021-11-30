import React, { Component } from "react";
import {
  Col,
  Row,
  UncontrolledTooltip,
  Button,
  ModalHeader,
  Modal,
  ModalBody,
  Input,
  Label,
} from "reactstrap";
// import { Send } from "react-icons/bs";
// import { RiDeleteBin6Line, Send } from "react-icons/ri";
// import { AiOutlineInfoCircle } from "react-icons/ai";
import {Send} from "react-feather"
import {Trash2} from "react-feather"
import {BiMessageRoundedDetail} from "react-icons/bi"
// import { BiLeftArrow } from "react-icons/bi";
import "./sample.css";
import SweetAlert from "react-bootstrap-sweetalert";
// import getPersianDateFormat from "./../../common/persianDate";
import { toast } from "react-toastify";
// import api from "../../../../utility/api/api";
import userImage from "../../../assets/img/flags/en.png";
import { Link } from "react-router-dom";

class Comment extends Component {
  state = {
    defaultAlert: false,
    confirmAlert: false,
    successAlert: false,
    parentModal: false,
    replyModal: false,
    confirmSend:false,
    answer: "",
  };
  /**
              creationDate: "1399-09-05T12:29:53.000Z"
              isActive: true
              message: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است."
              modificationDate: null
              parent:
                  creationDate: "1399-09-04T12:29:53.000Z"
                  isActive: true
                  message: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است."
                  modificationDate: null
                  parent: null
                  productTitle: "هالوژن گرد"
                  uid: "255423d4-af61-4c7a-9c51-a5cb03e83f4e"
                  userFullName: "Hosein Naseri1"
                  userPhoneNumber: "09381454033"
              productTitle: "هالوژن گرد"
              uid: "255423d4-af62-4c7a-9c51-a5cb03e83f4e"
               */
  toggleParentModal = () => {
    this.setState((prevState) => ({
      parentModal: !prevState.parentModal,
    }));
  };
  toggleReplyModal = () => {
    // this.setState((prevState) => ({
    //   replyModal: !prevState.replyModal,
    // }));
    this.setState({replyModal : !this.state.replyModal} )
  };
  handleAnswer =() =>
  {
    let answer = this.state.answer;
    this.props.toggleAnswered(answer,this.props.cid); 
    this.toggleParentModal();
    //call API autosave  
  }
  updateInput = (e, name) => {
    this.toggleDirection(e);
    this.setState({ [name]: e.target.value });
  };
  toggleDirection = (e) => {
    if (e.target.value && e.target.value[0].match(/[a-z]/i))
      e.target.style.direction = "ltr";
    else e.target.style.direction = "rtl";
  };
  // handleDelete = async () => {
  //   const { data, onError, reload } = this.props;
  //   const res = await api.post({ uids: [data.uid] }, null, onError);
  //   await reload();
  //   return res;
  // };

  // handleConfirm = async () => {
  //   const { data, onError, reload } = this.props;
  //   const res = await api.post(
  //     "/Comments/Confirm",
  //     { uids: [data.uid] },
  //     null,
  //     onError
  //   );
  //   await reload();
  //   return res;
  // };

  // handleAnswer = async () => {
  //   const { data, onError } = this.props;
  //   const res = await api.post(
  //     "/Comments/Answer",
  //     {
  //       uid: data.uid,
  //       response: this.state.answer,
  //     },
  //     null,
  //     onError
  //   );
  //   if (res.status) {
  //     this.toggleReplyModal();
  //     toast.success("پاسخ نظر با موفقیت ثبت شد");
  //   } else {
  //     let message = "";
  //     res.data.forEach((element) => {
  //       message += element + "\n";
  //     });
  //     toast.error(message);
  //   }
  //   this.setState({ answer: "" });
  // };

  handleAlert = (state, value) => {
    this.setState({
      [state]: value,
    });
  };

  render() {
    const { data } = this.props;
    return (
      <div>
        <div className="comment-item">
          <Row>
            <Col lg="2" className="comment-sender-section">
               
              {data.userProfilePic ? (
                <img
                  src={data.userProfilePic}
                  className="comment-sender-image"
                />
              ) : (
                <img src={userImage} className="comment-sender-image" />
              )} 
              <div className="comment-sender-name">
                {/* <Link to={"/user?" + data.userUid}> {data.userFullName} </Link>  */}
              </div> 
            </Col> 
            <Col lg="6" className="comment-title-container">
              <BiMessageRoundedDetail size="14" className="comment-title-icon" />
              <span className="comment-title"> {data.userFullName} </span> 
              <Col lg="12" className="comment-body">
                 
                {data.message} 
              </Col> 
            </Col> 
            <Col lg="4">
              <Row className="justify-content-end">
                <div className="chip-wrapper">
                  <div className="chip m-0">
                    <div className="chip-body">
                       
                      {data.parent.answer.length !==0 ? (
                        <span className="chip-text" id="confirm-chip">
                          <span className="bullet bullet-success bullet-xs">
                             
                          </span> 
                          <span className="text-capitalize ml-25">
                            پاسخ داده شده
                          </span> 
                        </span>
                      ) : (
                        <span className="chip-text">
                          <span className="bullet bullet-danger bullet-xs">
                             
                          </span> 
                          <span className="text-capitalize ml-25">
                            پاسخ داده نشده
                          </span> 
                        </span>
                      )} 
                    </div> 
                  </div> 
                </div> 
                <Trash2
                  size="20"
                  color="#ff531f"
                  id="remove-comment"
                  onClick={() => this.handleAlert("defaultAlert", true)}
                /> 
                {data.isActive === false && (
                  <BiMessageRoundedDetail
                    size="20"
                    color="green"
                    id="confirm-comment"
                    onClick={() => this.handleAlert("confirmAlert", true)}
                  />
                )}    
                {/* <BiMessageRoundedDetail
                  size="20"
                  color="darkgray"
                  id="reply-icon"
                  onClick={() => this.toggleReplyModal()}
                />  */}
                {data.parent && (
                  <BiMessageRoundedDetail
                    size="20"
                    color="orange"
                    id="main-comment"
                    onClick={() => this.toggleParentModal()}
                  />
                )} 
              </Row> 
              <Row className="pt-1">
                <Col
                  style={{
                    textAlign: "left",
                    fontSize: "10px",
                    position: "absolute",
                    bottom: 0,
                  }}
                >
                  تاریخ ارسال پیام: {data.creationDate} 
                  salam ino dorost kon
                </Col> 
              </Row> 
            </Col> 
          </Row> 
        </div> 
        <SweetAlert
          title="آیا از حذف این مورد اطمینان دارید؟"
          warning
          show={this.state.defaultAlert}
          showCancel
          reverseButtons
          cancelBtnBsStyle="danger"
          confirmBtnText="بله؛ حذف کن"
          cancelBtnText="لغو"
          // onConfirm={async () => {
          //   const res = await this.handleDelete();
          //   if (res.status) {
          //     this.handleAlert("defaultAlert", false);
          //     this.handleAlert("successAlert", true);
          //   } else {
          //     let message = "";
          //     res.data.forEach((element) => {
          //       message += element + "\n";
          //     });
          //     this.handleAlert("defaultAlert", false);
          //     toast.error(message);
          //   }
          // }}
          onConfirm={() =>{this.props.handleDelete(this.props.cid);this.handleAlert("defaultAlert", false); } }
          onCancel={() => {
            this.handleAlert("defaultAlert", false);
          }}
        >
          بعد از حذف نمیتوانید دوباره این مورد را بازگردانی کنید!
        </SweetAlert> 
        {/* <SweetAlert
          title="آیا از تایید این مورد اطمینان دارید؟"
          success
          show={this.state.confirmAlert}
          showCancel
          reverseButtons
          cancelBtnBsStyle="success"
          confirmBtnText="بله؛ تایید کن"
          cancelBtnText="لغو"
          onConfirm={async () => {
            const res = await this.handleConfirm();
            if (res.status) {
              this.handleAlert("confirmAlert", false);
              this.handleAlert("successAlert", true);
            } else {
              let message = "";
              res.data.forEach((element) => {
                message += element + "\n";
              });
              this.handleAlert("confirmAlert", false);
              toast.error(message);
            }
          }}
          onCancel={() => {
            this.handleAlert("confirmAlert", false);
          }}
        >
          بعد از تایید نمیتوانید دوباره این مورد را بازگردانی کنید!
        </SweetAlert>  */}
        <SweetAlert
          success
          title="عملیات موفق"
          confirmBtnBsStyle="success"
          confirmBtnText="باشه"
          show={this.state.successAlert}
          onConfirm={() => {
            this.handleAlert("defaultAlert", false);
            this.handleAlert("confirmAlert", false);
            this.handleAlert("successAlert", false);
          }}
        >
          <p className="sweet-alert-text"> مورد انتخابی با موفقیت حذف شد </p> 
        </SweetAlert> 
        {/* <Modal
          isOpen={this.state.replyModal}
          toggle={this.toggleReplyModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggleReplyModal}>
            پاسخ به پیام ارسال شده 
          </ModalHeader> 
          <ModalBody>
            <div>
              <div className="form-label-group mt-2 mb-0">
                <Input
                  type="textarea"
                  name="text"
                  id="exampleText"
                  rows="3"
                  value={this.state.answer}
                  placeholder="پاسخ"
                  maxLength="500"
                  onChange={(e) => this.setState({ answer: e.target.value })}
                /> 
                <Label> پاسخ: </Label> 
                api
              </div> 
              <small
                className={`counter-value float-right ${
                  this.state.answer.length >= 500 ? "bg-danger" : ""
                }`}
              >
                {`${this.state.answer.length}/500`} 
              </small> 
              <Button
                outline
                color="success"
                
                onClick={this.handleAnswer}
                className="mt-1"
              >
                ارسال پاسخ 
              </Button> 
            </div> 
          </ModalBody> 
        </Modal>  */}
        {data.parent && (
          <Modal
            isOpen={this.state.parentModal}
            toggle={this.toggleParentModal}
            className="modal-dialog-centered"
          >
            <ModalHeader toggle={this.toggleParentModal}>
              پیام اصلی 
            </ModalHeader> 
            <ModalBody>
              <Row className="pr-1 pl-1 pt-1">
              <span style={{ fontSize: 14 ,color:"#ff9f43",fontWeight: "bold"}}> ارسال شده توسط: </span> 
                  <span style={{ fontWeight: 300, fontSize: 14 }}>
                     
        {data.userFullName}
                  </span> 
              </Row> 
              <Row className="pr-1 pl-1 pt-1">
                <span style={{ fontSize: 15,color:"#ff9f43",fontWeight: "bold" }}> متن پیام: </span> 
                <span style={{ fontWeight: 300, fontSize: 15 }}>
                   
                  {data.parent.message} 
                </span> 
              </Row> 
              <Row className="pr-1 pl-1 pt-1">
                {/* <Col lg="6">
                  <span style={{ fontSize: 14 }}> تاریخ ارسال: </span> 
                  <span style={{ fontWeight: 300, fontSize: 14 }}>
                     
                   1
                  </span> 
                </Col>  */}
                  <span style={{ fontSize: 14,color:"#ff9f43",fontWeight: "bold" }}> تاریخ ارسال: </span> 
                  <span style={{ fontWeight: 300, fontSize: 14 }}>
                     
                   
                  </span> 
              </Row>
          {/* <ModalHeader toggle={this.toggleReplyModal}>
            پاسخ به پیام ارسال شده 
          </ModalHeader>  */}
          <SweetAlert
          title="آیا از ارسال این مورد اطمینان دارید؟"
          warning
          show={this.state.confirmSend}
          showCancel
          reverseButtons
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          confirmBtnText="بله،ارسال کن"
          cancelBtnText="لغو"
          //ersal api onConfirm
          onConfirm={() => {this.handleAnswer() ; this.setState({confirmSend :false})  }}
          onCancel={() => {
            this.setState({confirmSend :false})
          }}
        >
          بعد از فرستادن نمیتوانید دوباره این کامنت را ویرایش کنید!
        </SweetAlert> 
        <SweetAlert
          title="آیا از تایید این مورد اطمینان دارید؟"
          success
          show={this.state.confirmAlert}
          showCancel
          reverseButtons
          cancelBtnBsStyle="success"
          confirmBtnText="بله؛ تایید کن"
          cancelBtnText="لغو"
          onConfirm={async () => {
            const res = await this.handleConfirm();
            if (res.status) {
              this.handleAlert("confirmAlert", false);
              this.handleAlert("successAlert", true);
            } else {
              let message = "";
              res.data.forEach((element) => {
                message += element + "\n";
              });
              this.handleAlert("confirmAlert", false);
              toast.error(message);
            }
          }}
          onCancel={() => {
            this.handleAlert("confirmAlert", false);
          }}
        >
          بعد از تایید نمیتوانید دوباره این مورد را بازگردانی کنید!
        </SweetAlert> 
        <SweetAlert
          success
          title="عملیات موفق"
          confirmBtnBsStyle="success"
          confirmBtnText="باشه"
          show={this.state.successAlert}
          onConfirm={() => {
            this.handleAlert("defaultAlert", false);
            this.handleAlert("confirmAlert", false);
            this.handleAlert("successAlert", false);
          }}
        >
          <p className="sweet-alert-text"> مورد انتخابی با موفقیت حذف شد </p> 
        </SweetAlert> 
        {data.parent.answer.length ===0 ?
            <div>
          
              <div className="form-label-group mt-2 mb-0">
             
                <Input
                  type="textarea"
                  name="text"
                  id="exampleText"
                  rows="3"
                  value={this.state.answer}
                  placeholder="پاسخ"
                  maxLength="500"
                  onChange={ (e) => this.updateInput(e,"answer") }
                > 
                              <small
                className={`counter-value float-right ${
                  this.state.answer.length >= 500 ? "bg-danger" : ""
                }`}
              >
                {`${this.state.answer.trim().length}/500`} 
              </small>
              </Input> 
                <Label> پاسخ: </Label> 
              </div> 

              <Button
                outline
                color="success"
                onClick={() => this.setState({confirmSend:true})}
                disabled={this.state.answer.trim() === ""}
                className="mt-1"
              >
                ارسال پاسخ 
              </Button>
               
            </div>
          :   
          <Row className="pr-1 pl-1 pt-1">
          <span style={{ fontSize: 15 ,color:"#ff9f43",fontWeight: "bold"}}> متن پاسخ: </span> 
          <span style={{ fontWeight: 300, fontSize: 15 }}>
             
            {data.parent.answer} 
          </span> 
        </Row>
          }
            </ModalBody> 
          </Modal>
        )}
        {/* <UncontrolledTooltip placement="top" target="reply-icon">
          پاسخ دادن 
        </UncontrolledTooltip>  */}
        {/* {data.isActive && (
          <UncontrolledTooltip placement="top" target="confirm-chip">
            {getPersianDateFormat(data.modificationDate)}
          </UncontrolledTooltip>
        )}  */}
        {data.parent && (
          <UncontrolledTooltip placement="top" target="main-comment">
            پیام اصلی 
          </UncontrolledTooltip>
        )} 
        
        {data.isActive === false && (
          <UncontrolledTooltip placement="top" target="confirm-comment">
            تایید کردن 
          </UncontrolledTooltip>
        )} 
        <UncontrolledTooltip placement="top" target="remove-comment">
          حذف کردن 
        </UncontrolledTooltip> 
      </div>
    );
  }
}

/*
<div class="chip-wrapper"><div class="chip mb-0"><div class="chip-body"><span class="chip-text"><span class="bullet bullet-primary bullet-xs"></span><span class="text-capitalize ml-25">frontend</span></span></div></div><div class="chip mb-0"><div class="chip-body"><span class="chip-text"><span class="bullet bullet-warning bullet-xs"></span><span class="text-capitalize ml-25">backend</span></span></div></div><div class="chip mb-0"><div class="chip-body"><span class="chip-text"><span class="bullet bullet-success bullet-xs"></span><span class="text-capitalize ml-25">doc</span></span></div></div></div>
*/
export default Comment;
