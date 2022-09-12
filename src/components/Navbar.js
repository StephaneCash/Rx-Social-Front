import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from './Log/Logout';
import logopo from "../images/logopo.png";
import { useSelector } from 'react-redux';

function Navbar() {
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);

    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink to="/">
                        <div className="logo">
                            <img src="" alt="Logo" />
                            <h3>Police</h3>
                        </div>
                    </NavLink>
                </div>

                {uid ? (
                    <ul>
                        <li></li>
                        <li className="welcom">
                            <NavLink to='/profil'>
                                <h5>Bienvenu(e) {userData ? userData.pseudo : null}</h5>
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <li>
                            <NavLink to="/profil">
                                <img src='./img/icons/login.svg' alt='Login' />
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    )
}

export default Navbar