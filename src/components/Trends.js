import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { getTrends } from '../actions/PostActions';

function Trends() {
    const posts = useSelector((state) => state.allPostsReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const trendingList = useSelector((state) => state.tredingReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (posts) {
            const postArr = Object.keys(posts).map((i) => posts[i])
            let sortedArr = postArr.sort((a, b) => {
                return b.likers.length - a.likers.length
            });
            sortedArr.length = 3;
            console.log(sortedArr)
            dispatch(getTrends(sortedArr));
        }
    }, [posts, dispatch])

    return (
        <div className='trending-container'>
            <h4>Suggestions</h4>
            <NavLink to="/trending">
                <ul>
                    {trendingList.length &&
                        trendingList.map((post) => {
                            return (
                                <li key={post._id}>
                                    <div>
                                        {post.picture && <img src={post.picture} alt="post-pic" />}
                                        {post.video &&
                                            <iframe
                                                src={post.video}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write;
                                                encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreens
                                                title={post._id}
                                            ></iframe>}
                                        {!post.video && !post.picture && (
                                            <img src={usersData && usersData.map((user) => {
                                                if (user._id === post.posterId) {
                                                    return user.picture
                                                } else {
                                                    return null
                                                }
                                            }).join("")} alt="user_" />
                                        )}
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </NavLink>
        </div>
    )
}

export default Trends