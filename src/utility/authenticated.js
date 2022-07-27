import axios from "axios";
import {urlDomain} from "./urlDomain"
async function isAuthenticated() {
    let token = localStorage.getItem("access");
    let authenticatedStatus = false; 
    if (token) {
      try {
        await axios.post(`${urlDomain}/auth/verify/`, {
          token,
        });
        authenticatedStatus = true
      } catch (e) {
        console.log(e);
      }
    }
    return authenticatedStatus;
}

export default isAuthenticated
