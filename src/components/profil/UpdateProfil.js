import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateBio } from '../../actions/UserActions';
import LeftNav from '../LeftNav';
import { dateParserFunction } from '../Utils';
import FollowHandler from './FollowHandler';
import UploadImageProfil from './UploadImageProfil';

function UpdateProfil() {
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);
    const [followingPopup, setFollowingPopup] = useState(false);
    const [followersPopup, setFollowersPopup] = useState(false);

    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
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
                    <h5 onClick={() => setFollowingPopup(true)}>Abonnements : {userData.following ? userData.following.length : ""}</h5>
                    <h5 onClick={() => setFollowersPopup(true)}>Abonnés : {userData.followers ? userData.followers.length : ""}</h5>
                </div>
            </div>
            {followingPopup && (
                <div className='popup-profil-container'>
                    <div className="modal">
                        <h3>Abonnements</h3>
                        <span className='cross' onClick={() => setFollowingPopup(false)}>&#10005;</span>
                        <ul>
                            {usersData && usersData.map(user => {
                                for (let i = 0; i < userData.following.length; i++) {
                                    if (user._id === userData.following[i]) {
                                        return (
                                            <li key={user._id}>
                                                <img src={user.picture ? user.picture : './images/userConnected.png'} alt="Photo_user" />
                                                <h4>{user.pseudo}</h4>
                                                <div className='follow-handler'>
                                                    <FollowHandler idToFollow={user._id} />
                                                </div>
                                            </li>
                                        )
                                    }
                                }
                            })}
                        </ul>
                    </div>
                </div>
            )}

            {followersPopup && (
                <div className='popup-profil-container'>
                    <div className="modal">
                        <h3>Abonnés</h3>
                        <span className='cross' onClick={() => setFollowersPopup(false)}>&#10005;</span>
                        <ul>
                            {usersData && usersData.map(user => {
                                for (let i = 0; i < userData.followers.length; i++) {
                                    if (user._id === userData.followers[i]) {
                                        return (
                                            <li key={user._id}>
                                                <img src={user.picture ? user.picture : './images/userConnected.png'} alt="Photo_user" />
                                                <h4>{user.pseudo}</h4>
                                                <div className='follow-handler'>
                                                    <FollowHandler idToFollow={user._id} />
                                                </div>
                                            </li>
                                        )
                                    }
                                }
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UpdateProfil