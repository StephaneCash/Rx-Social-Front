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
                </>
            )}
        </div>
    )
}

export default NewPostForm