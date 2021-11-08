import React from "react";
import isAuthenticated from "../../../utility/authenticated";
import { history } from "../../../history";

class Home extends React.Component {
  async componentDidMount() {
    let authenticated = await isAuthenticated();
    if (!authenticated) history.push("/login");
  }
  render() {
    return (
      <React.Fragment>
        <h1>Home Page</h1>
      </React.Fragment>
    );
  }
}

export default Home;
