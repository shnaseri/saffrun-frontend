import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
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
} from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import userImg from "../../assets/img/profile/Generic-profile-picture.jpg.webp";
import axios from "axios";
import { ContextLayout } from "../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import { Trash2 } from "react-feather";
import classnames from "classnames";
import { history } from "../../history";
import "../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../assets/scss/pages/users.scss";
import { Color } from "ag-grid-community";
import urlDomain from "../../utility/urlDomain";
import isAuthenticated from "../../utility/authenticated";
import "./edit.css";

class UsersList extends React.Component {
  state = {
    rowData: null,
    defaultAlert: false,
    confirmAlert: false,
    data: [],
    pageSize: 20,
    isVisible: true,
    reload: false,
    collapse: true,
    status: "Opened",
    role: "All",
    selectStatus: "All",
    verified: "All",
    department: "All",
    defaultColDef: {
      sortable: true,
    },
    searchVal: "",
    columnDefs: [
      {
        headerName: "نام کاربری",
        field: "username",
        // filter: true,
        width: 250,
        cellRendererFramework: (params) => {
          return (
            <div
              className="d-flex align-items-center cursor-pointer"
              onClick={() => history.push("/app/user/edit")}
            >
              <img
                className="rounded-circle mr-50"
                src={this.SetImg(params)}
                alt={userImg}
                height="30"
                width="30"
              />
              <span>{params.data.username}</span>
            </div>
          );
        },
      },
      {
        headerName: "ایمیل",
        field: "email",
        // filter: true,
        width: 250,
      },
      // {
      //   headerName: "Name",
      //   field: "name",
      //   filter: true,
      //   width: 200
      // },
      {
        headerName: "شهر",
        field: "city",
        // filter: true,

        width: 200,
      },
      // {
      //   headerName: "Role",
      //   field: "role",
      //   filter: true,
      //   width: 150
      // },
      // {
      //   headerName: "Status",
      //   field: "status",
      //   filter: true,
      //   width: 150,
      //   cellRendererFramework: params => {
      //     return params.value === "active" ? (
      //       <div className="badge badge-pill badge-light-success">
      //         {params.value}
      //       </div>
      //     ) : params.value === "blocked" ? (
      //       <div className="badge badge-pill badge-light-danger">
      //         {params.value}
      //       </div>
      //     ) : params.value === "deactivated" ? (
      //       <div className="badge badge-pill badge-light-warning">
      //         {params.value}
      //       </div>
      //     ) : null
      //   }
      // },
      // {
      //   headerName: "Verified",
      //   field: "is_verified",
      //   filter: true,
      //   width: 125,
      //   cellRendererFramework: params => {
      //     return params.value === true ? (
      //       <div className="bullet bullet-sm bullet-primary"></div>
      //     ) : params.value === false ? (
      //       <div className="bullet bullet-sm bullet-secondary"></div>
      //     ) : null
      //   }
      // },
      // {
      //   headerName: "Department",
      //   field: "department",
      //   filter: true,
      //   width: 160
      // },
      {
        headerName: "حذف",
        field: "transactions",
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div className="actions cursor-pointer">
              <Trash2
                color="red"
                size={15}
                onClick={() => {
                  this.handleAlert("defaultAlert", true);

                  // console.log(selectedData[0]["id"])
                }}
              />
            </div>
          );
        },
      },
    ],
  };
  SetImg = (params) => {
    console.log(params.data.avatar)
    if (params.data.avatar["image"] !=null) {
      return "http://127.0.0.1:8000" + params.data.avatar["image"]["thumbnail"];
    } else {
      return userImg;
    }
  };
  handleAlert = (state, value) => {
    this.setState({
      [state]: value,
    });
  };
  deleteUser = async (id) => {
    console.log(id);
    let token = localStorage.getItem("access");
    token = `Bearer ${token}`;
    try {
      let res = await axios.delete(
        `${urlDomain}/profile/follow/remove-follower`,
        {
          headers: { Authorization: token },
          data: { user_id: id },
        }
      );
      let selectedData = this.gridApi.getSelectedRows();
      this.gridApi.updateRowData({ remove: selectedData });
      this.props.notifySuccess();
    } catch {
      this.props.notifyError();
    }
  };
  async componentDidMount() {
    // if (!authenticated) history.push("/login");
    let token = localStorage.getItem("access");
    token = `Bearer ${token}`;
    let data = await axios.get(`${urlDomain}/profile/follow/`, {
      headers: { Authorization: token },
    });
    this.setState({ data });
    console.log(data);
    await axios.get("api/users/list").then((response) => {
      let rowData = response.data;
      this.setState({ rowData });
    });
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  filterData = (column, val) => {
    var filter = this.gridApi.getFilterInstance(column);
    var modelObj = null;
    if (val !== "all") {
      modelObj = {
        type: "equals",
        filter: val,
      };
    }
    filter.setModel(modelObj);
    this.gridApi.onFilterChanged();
  };

  filterSize = (val) => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val));
      this.setState({
        pageSize: val,
      });
    }
  };
  updateSearchQuery = (val) => {
    this.gridApi.setQuickFilter(val);
    this.setState({
      searchVal: val,
    });
  };

  refreshCard = () => {
    this.setState({ reload: true });
    setTimeout(() => {
      this.setState({
        reload: false,
        role: "All",
        selectStatus: "All",
        verified: "All",
        department: "All",
      });
    }, 500);
  };

  toggleCollapse = () => {
    this.setState((state) => ({ collapse: !state.collapse }));
  };
  onEntered = () => {
    this.setState({ status: "Opened" });
  };
  onEntering = () => {
    this.setState({ status: "Opening..." });
  };

  onEntered = () => {
    this.setState({ status: "Opened" });
  };
  onExiting = () => {
    this.setState({ status: "Closing..." });
  };
  onExited = () => {
    this.setState({ status: "Closed" });
  };
  removeCard = () => {
    this.setState({ isVisible: false });
  };

  // all even rows assigned 'my-shaded-effect'
  render() {
    const { rowData, columnDefs, defaultColDef, pageSize } = this.state;
    return (
      <Row className="app-user-list">
        {/* <Col sm="12">
          <Card
          // style={{backgroundColor: "solid"}}
            className={classnames("card-action card-reload", {
              "d-none": this.state.isVisible === false,
              "card-collapsed": this.state.status === "Closed",
              closing: this.state.status === "Closing...",
              opening: this.state.status === "Opening...",
              refreshing: this.state.reload
            })}
          >
            <Collapse
              isOpen={this.state.collapse}
              onExited={this.onExited}
              onEntered={this.onEntered}
              onExiting={this.onExiting}
              onEntering={this.onEntering}
            >

            </Collapse>
          </Card>
        </Col> */}
        <Col sm="12">
          <Card>
            <CardBody>
              <div className="ag-theme-material ag-grid-table">
                <div
                  className="filter-actions d-flex"
                  style={{ marginBottom: 25 }}
                >
                  <Input
                    className="w-50 mr-1 mb-1 mb-sm-0"
                    type="text"
                    placeholder="جست و جو ..."
                    onChange={(e) => this.updateSearchQuery(e.target.value)}
                    value={this.state.searchVal}
                  />
                </div>
                {this.state.rowData !== null ? (
                  <ContextLayout.Consumer>
                    {(context) => (
                      <AgGridReact
                        gridOptions={{}}
                        rowSelection="multiple"
                        defaultColDef={defaultColDef}
                        columnDefs={columnDefs}
                        rowData={this.state.data["data"]}
                        onGridReady={this.onGridReady}
                        colResizeDefault={"shift"}
                        animateRows={true}
                        // floatingFilter={true}
                        pagination={true}
                        pivotPanelShow="always"
                        paginationPageSize={pageSize}
                        resizable={true}
                        enableRtl={context.state.direction === "rtl"}
                        rowStyle={{ borderBlockColor: "#ff9f43" }}
                        headerStyle={{ backgroundColor: "#ff9f43" }}
                      />
                    )}
                  </ContextLayout.Consumer>
                ) : null}
              </div>
            </CardBody>
          </Card>
        </Col>
        <SweetAlert
          title="آیا از حذف این مورد اطمینان دارید؟"
          warning
          show={this.state.defaultAlert}
          showCancel
          reverseButtons
          cancelBtnBsStyle="warning"
          confirmBtnBsStyle="danger"
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
          onConfirm={() => {
            let selectedData = this.gridApi.getSelectedRows();
            // this.gridApi.updateRowData({ remove: selectedData })
            this.deleteUser(selectedData[0]["id"]);
            this.handleAlert("defaultAlert", false);
          }}
          onCancel={() => {
            this.handleAlert("defaultAlert", false);
          }}
        >
          بعد از حذف نمیتوانید دوباره این مورد را بازگردانی کنید!
        </SweetAlert>
      </Row>
    );
  }
}

export default UsersList;
