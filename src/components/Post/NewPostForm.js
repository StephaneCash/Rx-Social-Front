import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function NewPostForm() {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [picture, setPicture] = useState(null);
    const [video, setVideo] = useState("");
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.userReducer);

    const handlePicture = (e) => {

    }

    const handlePost = () => {

    }

    useEffect(() => {
        if (userData) {
            setIsLoading(false);
        }
    }, [userData])

    return (
        <div className='post-container'>
            {isLoading ? <i className='fa fa-spinner fa-pulse'></i> : (
                <>
                    <div className="data">
                        <p>
                            <span>{userData && userData.following ? userData.following.length : 0}</span>
                            {" "}
                            Abonnements
                        </p>
                        <p>
                            <span>{userData && userData.followers ? userData.followers.length : 0}</span>
                            {" "}
                            Abonnés
                        </p>
                    </div>
                    <NavLink to="/profil">
                        <div className='user-info'>
                            <img src={userData.picture} alt="User-Pic" />
                        </div>
                    </NavLink>
                    <div className='post-form'>
                        <textarea
                            name='message'
                            id="message"
                            placeholder='Quoi de neuf ?'
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />

                        <div className='footer-form'>
                            <div className='icon'>
                                {!video && (
                                    <>
                                        <img src="./img/icons/picture.svg" alt="icon" />
                                        <input type="file" id="file-upload" name="file" onChange={(e) => handlePicture(e)} />
                                    </>
                                )}
                                {video && (
                                    <button onClick={() => setVideo("")}>Supprimer la vidéo</button>
                                )}
                            </div>
                            <div className='btn-send'>
                                <button className='send' style={{ border: "1px solid #fff" }} onClick={handlePost}>Publier</button>
                            </div>
                        </div>
                    </div>

                </>
            )}
        </div>
    )
}

export default NewPostForm