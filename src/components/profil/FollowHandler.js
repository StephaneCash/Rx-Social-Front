import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { followUser } from '../../actions/UserActions';
import { isEmpty } from '../Utils';

function FollowHandler(props) {
    const idToFollow = props.idToFollow;

    const userData = useSelector((state) => state.userReducer);
    const dispach = useDispatch();
    const [isFollowed, setIsFollowed] = useState(false);

    const handleFollow = () => {
        dispach(followUser(userData._id, idToFollow));
        setIsFollowed(true);
    };

    const handleUnFollow = () => {

    };

    useEffect(() => {
        if (userData.following.includes(idToFollow)) {
            setIsFollowed(true);
        } else {
            setIsFollowed(false);
        }
    }, [userData, idToFollow]);

    return (
        <>
            {isFollowed && !isEmpty(userData) && (
                <span onClick={handleUnFollow}>
                    <button style={{ color: 'red' }} className="unfollow-btn">Abonné</button>
                </span>
            )}

            {!isFollowed && !isEmpty(userData) && (
                <span onClick={handleFollow}>
                    <button style={{ color: 'red' }} className="follow-btn">Suivre</button>
                </span>
            )}
        </>
    )
}

export default FollowHandler