import React from 'react'
import axios from "axios";
import cookie from "js-cookie";
import { baseUrl } from "../../base/BaseUrl";

function Logout() {

  const removeCookie = (key) => {
    if (window !== undefined) {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logutFunction = async () => {
    await axios.get(`${baseUrl}users/logout`)
      .then(() => removeCookie('jwt'))
      .catch(err => {
        console.log(err.response)
      });
  };

  return (
    <li onClick={logutFunction}>
      <img src="./img/icons/logout.svg" alt="Logout" />
    </li>
  )
}

export default Logout