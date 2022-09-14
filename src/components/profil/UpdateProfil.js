import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateBio } from '../../actions/UserActions';
import LeftNav from '../LeftNav';
import { dateParserFunction } from '../Utils';
import UploadImageProfil from './UploadImageProfil';

function UpdateProfil() {
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);

    const userData = useSelector((state) => state.userReducer);
    const dispach = useDispatch();

    const handleUpdate = () => {
        dispach(updateBio(userData._id, bio));
        setUpdateForm(false);
    };

    return (
        <div className="profil-container">
            <LeftNav />
            <h1>Profil de {userData ? userData.pseudo : null}</h1>
            <div className='update-container'>
                <div className='left-part'>
                    <h3>Photo de profil</h3>
                    <img src={userData.picture ? userData.picture : './images/userConnected.png'} alt="Photo-user" />
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
                                <textarea type="text" defaultValue={userData.bio}
                                    onChange={(e) => setBio(e.target.value)}></textarea>
                                <button onClick={handleUpdate}>Valider modification</button>
                            </>
                        )}
                    </div>
                    <h4>Membre depuis le : {userData ? dateParserFunction(userData.createdAt) : ""}</h4>
                    <h5>Abonnements : {userData.following ? userData.following.length : ""}</h5>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfil