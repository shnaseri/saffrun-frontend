import React from "react";
import {
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Media,
  Badge,
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import axios from "axios";
import "./pointer.css"
import * as Icon from "react-feather";

import { history } from "../../../history";

const handleNavigation = (e, path) => {
  e.preventDefault();
  history.push(path);
};

const UserDropdown = (props) => {
  return (
    <DropdownMenu right>
      <DropdownItem
        tag="a"
        href="#"
        onClick={(e) => handleNavigation(e, "/personal-info")}
      >
        <Icon.User size={14} className="mr-50" />
        <span className="align-middle">مشخصات فردی</span>
      </DropdownItem>
      <DropdownItem
        tag="a"
        href="#"
        onClick={(e) => handleNavigation(e, "/received-comments")}
      >
        <Icon.MessageSquare size={14} className="mr-50" />
        <span className="align-middle">مشاهده نظرات</span>
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem
        tag="a"
        onClick={(e) => {
          e.preventDefault();
          localStorage.clear();
          history.push("/login");
        }}
      >
        <Icon.Power size={14} className="mr-50" />
        <span className="align-middle">خروج</span>
      </DropdownItem>
    </DropdownMenu>
  );
};

class NavbarUser extends React.PureComponent {
  state = {
    navbarSearch: false,
    langDropdown: false,
    suggestions: [],
  };

  componentDidMount() {
    axios.get("/api/main-search/data").then(({ data }) => {
      this.setState({ suggestions: data.searchResult });
    });
  }

  handleNavbarSearch = () => {
    this.setState({
      navbarSearch: !this.state.navbarSearch,
    });
  };

  handleLangDropdown = () =>
    this.setState({ langDropdown: !this.state.langDropdown });

  render() {
 

    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle tag="a" className="nav-link dropdown-user-link">
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name text-bold-600">
                {this.props.userName}
              </span>
            </div>
            <span data-tour="user">
              <img
                src={this.props.userImg}
                className="round"
                height="40"
                width="40"
                alt="avatar"
              />
            </span>
          </DropdownToggle>
          {/* <UserDropdown {...this.props} /> */}
        </UncontrolledDropdown>
      </ul>
    );
  }
}
export default NavbarUser;