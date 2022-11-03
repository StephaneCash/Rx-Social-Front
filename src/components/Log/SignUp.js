import React, { useState } from 'react';
import axios from "axios";
import { baseUrl } from "../../base/BaseUrl";
import SignIn from './SignIn';

function SignUp() {

    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [err, setErr] = useState('');

    const [errPseudo, setErrPseudo] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passErr, setPassErr] = useState('');
    const [formSubmit, setFormSubmit] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();

        const confirmPassError = document.querySelector('.password-confirm.error');

        if (password !== confirmPassword) {
            confirmPassError.innerHTML = "Les deux mots de passe ne correspondent pas";
        } else {
            confirmPassError.innerHTML = '';

            axios.post(`${baseUrl}users/register`, { pseudo, email, password })
                .then(resp => {
                    console.log(resp.data.errors);
                    if (resp.data.errors) {
                        setErrPseudo(resp.data.errors.pseudo);
                        setEmailErr(resp.data.errors.email);
                        setPassErr(resp.data.errors.password);

                        if (resp.data.errors.pseudo === "" && resp.data.errors.email === ""
                            && resp.data.errors.password === "") {
                            setFormSubmit(true);
                        }
                    }
                })
                .catch(error => {
                    console.log(error.response);
                    setErr(error.response.data.errors ? error.response.data.errors : null)
                });
        }
    };

    return (
        <>
            {
                formSubmit ?
                    <>
                        <SignIn />
                        <span></span>
                        <h4 className='success'>Création de compte réussie, veuillez-vous connecter.</h4>
                    </>
                    :
                    <form action='' onSubmit={handleRegister} id="sign-up-form">
                        <label htmlFor="pseudo">Pseudo</label> <br />
                        <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)}
                            id="pseudo" name="pseudo" />
                        <div className='pseudo error'>{errPseudo ? errPseudo : ""}</div>

                        <br />
                        <label htmlFor="email">Email</label> <br />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            id="email" name="email" />
                        <div className='email error'>{emailErr ? emailErr : ""}</div>

                        <br />
                        <label htmlFor="password">Mot de passe</label> <br />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            id="password" name="password" />
                        <div className='password error'>{passErr ? passErr : ""}</div>

                        <br />
                        <label htmlFor="passconfirm">Confirmer le mot de passe</label> <br />
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                            id="passconfirm" name="passconfirm" />
                        <div className='password-confirm error'></div>

                        <div className='password error'></div>

                        <br />

                        <input type="submit" value="S'inscrire" style={{ border: "1px solid silver" }} />
                    </form>
            }
        </>
    )
}

export default SignUp