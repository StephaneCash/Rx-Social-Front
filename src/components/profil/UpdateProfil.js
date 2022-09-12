import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import LeftNav from '../LeftNav';
import UploadImageProfil from './UploadImageProfil';

function UpdateProfil() {
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);

    const userData = useSelector((state) => state.userReducer);

    return (
        <div className="profil-container">
            <LeftNav />
            <h1>Profil de {userData ? userData.pseudo : null}</h1>
            <div className='update-container'>
                <div className='left-part'>
                    <h3>Photo de profil</h3>
                    <img src={userData.picture} alt="Photo-user" />
                    <UploadImageProfil />
                </div>
                <div className='right-part'>
                    <div className='bio-update'>
                        <h3>Bio</h3>
                        {updateForm !== true && (
                            <>
                                <p onClick={() => setUpdateForm(!updateForm)}>{userData ? userData.bio : ""}</p>
                                <button onClick={() => setUpdateForm(!updateForm)}>Modifier Bio</button>
                            </>
                        )}
                        {updateForm && (
                            <>
                                <textarea type="text" defaultValue={userData.bio}></textarea>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfil