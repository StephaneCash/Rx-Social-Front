import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function Card(props) {
    const post = props.post;

    const [isLoading, setIsLoading] = useState(true);

    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

    useEffect(() => {
        if (usersData.length > 0) {
            setIsLoading(false);
        }
    }, [usersData])

    return (
        <li className="card-container" key={post._id}>
            {isLoading ? (
                <i className='fa fa-spinner fa-spin'></i>
            ) : (
                <h2>Test</h2>
            )}
        </li>
    )
}

export default Card