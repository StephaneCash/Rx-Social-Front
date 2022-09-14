import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/PostActions';
import Card from './Post/Card';

function Thread() {
    const dispatch = useDispatch();
    const [load, setLoad] = useState(true);

    const posts = useSelector((state) => state.postReducer);

    useEffect(() => {
        if (load) {
            dispatch(getPosts());
            setLoad(false);
        }
    }, [load])
    return (
        <div className='thread-container'>
            <ul>
                {posts.length > 0 &&
                    posts.map((post) => {
                        return <Card post={post} key={post._id} />;
                    })
                }
            </ul>
        </div>
    )
}

export default Thread