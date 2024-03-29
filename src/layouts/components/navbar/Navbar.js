import React from "react";
import { Navbar } from "reactstrap";
import classnames from "classnames";
import NavbarBookmarks from "./NavbarBookmarks";
import NavbarUser from "./NavbarUser";
import userImg from "../../../assets/img/portrait/small/avatar-s-11.jpg";
import axios from "axios";
import { urlDomain } from "../../../utility/urlDomain";
import imgUrlDomain from "../../../utility/imgUrlDomain";
import { history } from "../../../history";
import isAuthenticated from "../../../utility/authenticated";
import defaultImg from "../../../assets/img/profile/Generic-profile-picture.jpg.webp";

const UserName = (props) => {
  return props.userdata;
};

const colorsArr = ["primary", "danger", "success", "info", "warning", "dark"];
const navbarTypes = ["floating", "static", "sticky", "hidden"];
class ThemeNavbar extends React.Component {
  state = {
    username: "",
    image: "",
  };
  imgGenerator = (x) => {
    return x ? `${imgUrlDomain}${x.thumbnail}` : defaultImg;
  };
  async componentDidMount() {
    let authenticated = await isAuthenticated();
    if (!authenticated) history.push("/login");
    let token = localStorage.getItem("access");
    token = `Bearer ${token}`;
    try {
      let response = await axios.get(`${urlDomain}/profile/user/`, {
        headers: { Authorization: token },
      });
      this.setState({
        username: response.data.username,
        image: response.data.avatar["image"],
      });
    } catch (e) {
      // this.setState({ loadSpinner: false });
    }
  }
  render() {
    let { props } = this;
    return (
      <React.Fragment>
        <div className="content-overlay" />
        <div className="header-navbar-shadow" />
        <Navbar
          className={classnames(
            "header-navbar navbar-expand-lg navbar navbar-with-menu navbar-shadow",
            {
              "navbar-light":
                props.navbarColor === "default" ||
                !colorsArr.includes(props.navbarColor),
              "navbar-dark": colorsArr.includes(props.navbarColor),
              "bg-primary":
                props.navbarColor === "primary" &&
                props.navbarType !== "static",
              "bg-danger":
                props.navbarColor === "danger" && props.navbarType !== "static",
              "bg-success":
                props.navbarColor === "success" &&
                props.navbarType !== "static",
              "bg-info":
                props.navbarColor === "info" && props.navbarType !== "static",
              "bg-warning":
                props.navbarColor === "warning" &&
                props.navbarType !== "static",
              "bg-dark":
                props.navbarColor === "dark" && props.navbarType !== "static",
              "d-none": props.navbarType === "hidden" && !props.horizontal,
              "floating-nav":
                (props.navbarType === "floating" && !props.horizontal) ||
                (!navbarTypes.includes(props.navbarType) && !props.horizontal),
              "navbar-static-top":
                props.navbarType === "static" && !props.horizontal,
              "fixed-top": props.navbarType === "sticky" || props.horizontal,
              scrolling: props.horizontal && props.scrolling,
            }
          )}
        >
          <div className="navbar-wrapper">
            <div className="navbar-container content">
              <div
                className="navbar-collapse d-flex justify-content-between align-items-center"
                id="navbar-mobile"
              >
                <div className="bookmark-wrapper">
                  <NavbarBookmarks
                    sidebarVisibility={props.sidebarVisibility}
                    handleAppOverlay={props.handleAppOverlay}
                  />
                </div>
                {props.horizontal ? (
                  <div className="logo d-flex align-items-center">
                    <div className="brand-logo mr-50"></div>
                    <h2 className="text-primary brand-text mb-0">Vuexy</h2>
                  </div>
                ) : null}
                <NavbarUser
                  userName={<UserName userdata={this.state.username} />}
                  userImg={this.imgGenerator(this.state.image)}
                />
              </div>
            </div>
          </div>
        </Navbar>
      </React.Fragment>
    );
  }
}
export default ThemeNavbar;
