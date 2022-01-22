import React from "react";
import "../../../assets/scss/components/app-loader.scss";
class ComponentSpinner extends React.Component {
  makeClass = () => {
    return this.props.customClass
      ? "loading component-loader mt-0"
      : "loading component-loader";
  };
  render() {
    return (
      <div className="fallback-spinner">
        <div className={this.makeClass()}>
          <div className="effect-1 effects"></div>
          <div className="effect-2 effects"></div>
          <div className="effect-3 effects"></div>
        </div>
      </div>
    );
  }
}

export default ComponentSpinner;
