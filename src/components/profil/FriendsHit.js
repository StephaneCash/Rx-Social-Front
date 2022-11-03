import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { UidContext } from '../AppContext';
import FollowHandler from './FollowHandler';

function FriendsHit() {

    const userData = useContext(UidContext)
    const usersData = useSelector((state) => state.usersReducer);

    const [load, setLoad] = useState(true);
    const [playOne, setPlayOne] = useState(true);
    const [friendsHit, setFriendsHit] = useState([]);


    useEffect(() => {
        const notFriendsHit = () => {
            let array = [];
            usersData.map((user) => {
                console.log(user._id, ' ', userData)
                if (user._id !== userData && !user.followers.includes(userData)) {
                    return array.push((user._id))
                }
            })
            array.sort(() => 0.5 - Math.random());
            if (window.innerHeight > 780) {
                array.length = 5;
            } else if (window.innerHeight > 720) {
                array.length = 4;
            } else if (window.innerHeight > 615) {
                array.length = 3;
            } else if (window.innerHeight > 540) {
                array.length = 2;
            } else {
                array.length = 0;
            }
            setFriendsHit(array);
        }

        if (playOne && userData && usersData) {
            notFriendsHit();
            setLoad(false);
            setPlayOne(false);
        }
    }, [userData, usersData, playOne])

    return (
        <div className='get-friends-container'>
            <h4>Suggestions amis</h4>
            {load ? (
                <div className="icon">
                    <i className='fa fa-spinner fa-pulse'></i>
                </div>
            ) : (
                <ul>
                    {friendsHit && friendsHit.map((user) => {
                        for (let i = 0; i < usersData.length; i++) {
                            if (user === usersData[i]._id) {
                                return (
                                    <li className='user-hint' key={user._id}>
                                        <img src={usersData[i].picture} alt="user" />
                                        <p>{usersData[i].pseudo}</p>
                                        <FollowHandler idToFollow={usersData[i]._id} type={"suggestion"} />
                                    </li>
                                )
                            }
                        }
                    })}
                </ul>
            )}
        </div>
    )
}

export default FriendsHit