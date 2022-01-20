import React, { Component } from "react";

class StatusCircle extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div
          className={`bg-${this.props.currentState}`}
          style={{
            height: "10px",
            width: "10px",
            borderRadius: "50%",
            display: "inline-block",
            marginLeft: "5px",
          }}
        />
      </React.Fragment>
    );
  }
}

export default StatusCircle;