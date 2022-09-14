import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unFollowUser } from '../../actions/UserActions';
import { isEmpty } from '../Utils';

function FollowHandler(props) {
    const idToFollow = props.idToFollow;
    const type = props.type;

    const userData = useSelector((state) => state.userReducer);
    const dispach = useDispatch();
    const [isFollowed, setIsFollowed] = useState(false);

    const handleFollow = () => {
        dispach(followUser(userData._id, idToFollow));
        setIsFollowed(true);
    };

    const handleUnFollow = () => {
        dispach(unFollowUser(userData._id, idToFollow));
        setIsFollowed(false);
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
                    {type === "suggestion" && <button style={{ color: 'red' }} className="unfollow-btn">Abonné</button>}
                    {type === "card" && <img src="./img/icons/checked.svg" alt="checked" />}
                </span>
            )}

            {!isFollowed && !isEmpty(userData) && (
                <span onClick={handleFollow}>
                    {type === "suggestion" && <button style={{ color: 'red' }} className="follow-btn">Suivre</button>}
                    {type === "card" && <img src="./img/icons/check.svg" alt="check" />}
                </span>
            )}
        </>
    )
}

export default FollowHandler