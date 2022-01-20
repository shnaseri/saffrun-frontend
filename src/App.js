import React from "react";
import Router from "./Router";
import "react-toastify/dist/ReactToastify.css";
import "./assets/scss/plugins/extensions/toastr.scss";
import "react-perfect-scrollbar/dist/css/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { ToastContainer } from "react-toastify";
import "../src/assets/scss/components/toast-style.css";
import "../src/assets/scss/components/tooltip-style.scss";
const App = (props) => {
  return (
    <div>
      <Router />
      <ToastContainer />
    </div>
  );
};

export default App;
