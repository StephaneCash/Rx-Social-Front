import React, { useState } from 'react'
import SignIn from './SignIn';
import SignUp from './SignUp';

function Log(props) {

    const [signIn, setSignIn] = useState(props.signin);
    const [signup, setSignUp] = useState(props.signup);

    const handleFormConnexionAndInscription = (e) => {
        if (e.target.id === "register") {
            setSignUp(true);
            setSignIn(false);
        } else if (e.target.id === "login") {
            setSignUp(false);
            setSignIn(true);
        }
    };

    return (
        <div className='connection-form'>
            <div className='form-container'>
                <ul>
                    <li onClick={handleFormConnexionAndInscription} id="register"
                        className={signup ? "active-btn" : null}>S'inscrire</li>
                    <li onClick={handleFormConnexionAndInscription} id="login"
                        className={signIn ? "active-btn" : null}>Se connecter</li>
                </ul>

                {signup && <SignUp />}
                {signIn && <SignIn />}
            </div>
        </div>
    )
}

export default Log