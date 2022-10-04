import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/PostActions';
import Card from './Post/Card';

function Thread() {
    const dispatch = useDispatch();
    const [load, setLoad] = useState(true);
    const [count, setCount] = useState(5);

    const posts = useSelector((state) => state.postReducer);

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
            setLoad(true);
        }
    };

    useEffect(() => {
        if (load) {
            dispatch(getPosts(count));
            setLoad(false);
            setCount(count + 5);
        }
        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [load, dispatch])
    return (
        <div className='thread-container'>
            <ul>
                {posts.length > 0 &&
                    posts.map((post) => {
                        return <Card post={post} key={post._id && post._id} />;
                    })
                }
            </ul>
        </div>
    )
}

export default Thread