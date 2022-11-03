import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function FriendsHit() {
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);

    const [load, setLoad] = useState(true);
    const [playOne, setPlayOne] = useState(true);
    const [friendsHit, setFriendsHit] = useState([]);

    const notFriendsHit = () => {

    }

    useEffect(() => {
        if (playOne && !usersData && !userData._id) {
            notFriendsHit();
            setLoad(false);
            setPlayOne(false);
        }
    }, [userData, playOne, usersData])

    return (
        <div>FriendsHit</div>
    )
}

export default FriendsHit