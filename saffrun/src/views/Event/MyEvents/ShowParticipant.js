import React from "react"
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
  Spinner
} from "reactstrap"
import axios from "axios"
import { ContextLayout } from "../../../utility/context/Layout"
import { AgGridReact } from "ag-grid-react"
import {
  Trash2,
} from "react-feather"
import classnames from "classnames"
import { history } from "../../../history"
import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss"
import "../../../assets/scss/pages/users.scss"
import { Color } from "ag-grid-community"
class UsersList extends React.Component {
  state = {
    rowData: null,
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
      sortable: true
    },
    searchVal: "",
    columnDefs: [
      {
        headerName: "نام کاربری",
        field: "username",
        // filter: true,
        width: 250,
        cellRendererFramework: params => {
          return (
            <div
              className="d-flex align-items-center cursor-pointer"
              // onClick={() => history.push("/app/user/edit")}
            >
              <img
                className="rounded-circle mr-50"
                src={params.data.avatar}
                alt="user avatar"
                height="30"
                width="30"
              />
              <span>{params.data.name}</span>
            </div>
          )
        }
      },
      {
        headerName: "ایمیل",
        field: "email",
        // filter: true,
        width: 250
      },

      {
        headerName: "شهر",
        field: "city",
        // filter: true,
        
        width: 200
      },
      // {
      //   headerName: "حذف",
      //   field: "transactions",
      //   width: 150,
      //   cellRendererFramework: params => {
      //     return (
      //       <div className="actions cursor-pointer">
      //         <Trash2
      //           color="red"
      //           size={15}
      //           onClick={() => {
      //             let selectedData = this.gridApi.getSelectedRows()
      //             this.gridApi.updateRowData({ remove: selectedData })
      //           }}
      //         />
      //       </div>
      //     )
      //   }
      // }
    ]
  }

  async componentDidMount() {
    await axios.get("api/users/list").then(response => {
      let rowData = response.data
      this.setState({ rowData })
    })
  }

  onGridReady = params => {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
  }
  showPart()
  {
    let rows = []
    rows.push({name : "اکبر" , avatar:  require("../../../assets/img/portrait/small/avatar-s-18.jpg") , city : "تهران" , email: "asqar1890@gmail.com"})
    rows.push({name : "علی" , avatar: require("../../../assets/img/portrait/small/avatar-s-7.jpg") , city : "سمنان" , email: "alialam2000@gmail.com"})
    rows.push({name : "جواد" , avatar:require("../../../assets/img/portrait/small/avatar-s-14.jpg") , city : "بابل" , email: "javadmehdi@gmail.com"})
    return rows
    
  }

  filterData = (column, val) => {
    var filter = this.gridApi.getFilterInstance(column)
    var modelObj = null
    if (val !== "all") {
      modelObj = {
        type: "equals",
        filter: val
      }
    }
    filter.setModel(modelObj)
    this.gridApi.onFilterChanged()
  }

  filterSize = val => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val))
      this.setState({
        pageSize: val
      })
    }
  }
  updateSearchQuery = val => {
    this.gridApi.setQuickFilter(val)
    this.setState({
      searchVal: val
    })
  }

  refreshCard = () => {
    this.setState({ reload: true })
    setTimeout(() => {
      this.setState({
        reload: false,
        role: "All",
        selectStatus: "All",
        verified: "All",
        department: "All"
      })
    }, 500)
  }

  toggleCollapse = () => {
    this.setState(state => ({ collapse: !state.collapse }))
  }
  onEntered = () => {
    this.setState({ status: "Opened" })
  }
  onEntering = () => {
    this.setState({ status: "Opening..." })
  }

  onEntered = () => {
    this.setState({ status: "Opened" })
  }
  onExiting = () => {
    this.setState({ status: "Closing..." })
  }
  onExited = () => {
    this.setState({ status: "Closed" })
  }
  removeCard = () => {
    this.setState({ isVisible: false })
  }

// all even rows assigned 'my-shaded-effect'
  render() {
    const { rowData, columnDefs, defaultColDef, pageSize } = this.state
    return (
      <Row className="app-user-list">
        <Col sm="12">
          <Card>
            <CardBody>
              <div className="ag-theme-material ag-grid-table">
              {/* <div className="filter-actions d-flex"  style={{marginBottom : 25}}>
                    <Input
                      className="w-50 mr-1 mb-1 mb-sm-0"
                      type="text"
                      placeholder="جست و جو ..."
                      onChange={e => this.updateSearchQuery(e.target.value)}
                      value={this.state.searchVal}
                    />
                </div> */}
                {this.state.rowData !== null ? (
                  <ContextLayout.Consumer>
                    {context => (
                      <AgGridReact
                        gridOptions={{}}
                        rowSelection="multiple"
                        defaultColDef={defaultColDef}
                        columnDefs={columnDefs}
                        rowData={this.showPart()}
                        onGridReady={this.onGridReady}
                        colResizeDefault={"shift"}
                        animateRows={true}
                        // floatingFilter={true}
                        pagination={true}
                        pivotPanelShow="always"
                        paginationPageSize={pageSize}
                        resizable={true}
                        enableRtl={context.state.direction === "rtl"}
                        rowStyle={ {borderBlockColor: "#ff9f43"}}
                        headerStyle={{backgroundColor: "#ff9f43"}}
                      />
                    )}
                  </ContextLayout.Consumer>
                ) : null}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default UsersList