import React, { useState } from 'react';
import axios from "axios";
import { baseUrl } from "../../base/BaseUrl"
import { useNavigate } from "react-router-dom";

function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');

    let navigate = useNavigate();

    const maxAge = 3 * 24 * 60 * 60 * 1000;

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post(`${baseUrl}users/login`, { email, password })
            .then(resp => {
                localStorage.setItem('token', resp.data.token);
                document.cookie = `jwt=${resp.data.token}; max-age=${maxAge}`;

                window.location = "/home";
            })
            .catch(err => {
                console.log(err.response.data.errors);
                setErr(err.response.data.errors ? err.response.data.errors : null);
            })
    }

    return (
        <form action='' onSubmit={handleLogin} id="sign-up-form">
            <label htmlFor='email'>Adresse email </label>
            <br />
            <input type="text" name='email' id='email'
                onChange={(e) => setEmail(e.target.value)} value={email} />
            <br />
            <br />

            <label htmlFor='password'>Mot de passe</label>
            <br />
            <input type="password" name='password' id='password'
                onChange={(e) => setPassword(e.target.value)} value={password} />
            <div className='password error'>{err ? err : ""}</div>
            <br />
            <input type="submit" value="Se connecter" style={{ border: "1px solid silver" }} />
        </form>
    )
}

export default SignIn;