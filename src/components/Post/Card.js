import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { dateParserFunction } from '../Utils';
import FollowHandler from '../profil/FollowHandler';
import LikeButton from './LikeButton';

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
                <>
                    <div className='card-left'>
                        <img src={usersData.length > 0 &&
                            usersData.map((user) => {
                                if (user._id === post.posterId) { return user.picture }
                            }).join('')
                        }
                            alt='User_img'
                        />
                    </div>
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                <h3>
                                    {usersData.length > 0 && (
                                        usersData.
                                            map((user) => {
                                                if (user._id === post.posterId) {
                                                    return user.pseudo
                                                }
                                            })
                                            .join("")
                                    )}
                                </h3>
                                {
                                    post.posterId !== userData._id &&
                                    <FollowHandler idToFollow={post.posterId} type={"card"} />
                                }
                            </div>
                            <span>{dateParserFunction(post.createdAt)}</span>
                        </div>
                        <p>{post.message}</p>
                        {post.picture !== undefined && <img src={post.picture} className="card-pic" alt="Card-photo" />}
                        {post.video &&
                            <iframe
                                width="500"
                                height="300"
                                src={post.video}
                                frameBorder="0"
                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
                                picture-in-picture'
                                allowFullScreens
                                title={post._id}
                            >
                            </iframe>
                        }


                        <div className='card-footer'>
                            <div className='comment-icon'>
                                <img src='./img/icons/message1.svg' alt='comment' />
                                <span>{post.comments.length}</span>
                            </div>
                            <LikeButton post={post} />
                            <img src="./img/icons/share.svg" alt="share" />
                        </div>
                    </div>
                </>
            )}
        </li>
    )
}

export default Card