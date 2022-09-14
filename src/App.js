import React, { useState, useEffect } from 'react'
import './styles/index.scss';
import Routes from './components/routes';
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { baseUrl } from "./base/BaseUrl"
import "../node_modules/font-awesome/css/font-awesome.css";
import { useDispatch } from 'react-redux';
import { getUser } from './actions/UserActions';

function App() {

  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  const verifUserConnected = async () => {
    await axios.get(`${baseUrl}jwtid`, { withCredentials: true })
      .then(resp => {
        setUid(resp.data);
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  useEffect(() => {
    verifUserConnected();

    if (uid) {
      dispatch(getUser(uid));
    }
  }, [uid])

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  )
}

export default App