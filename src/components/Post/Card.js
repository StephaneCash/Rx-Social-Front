import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { dateParserFunction } from '../Utils';
import FollowHandler from '../profil/FollowHandler';
import LikeButton from './LikeButton';
import { updatePost } from '../../actions/PostActions';
import DeleteCard from './DeleteCard';
import CardComments from './CardComments';

function Card(props) {
    const post = props.post;

    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

    const dispach = useDispatch();

    const updateItem = () => {
        if (textUpdate) {
            dispach(updatePost(post._id, textUpdate));
        }
        setIsUpdated(false);
    }

    useEffect(() => {
        if (usersData.length > 0) {
            setIsLoading(false);
        }
    }, [usersData]);

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
                                else return null
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
                                        usersData.map((user) => {
                                            if (user._id === post.posterId) {
                                                return user.pseudo
                                            } else return null
                                        }).join("")
                                    )}
                                </h3>
                                {
                                    post.posterId !== userData._id &&
                                    <FollowHandler idToFollow={post.posterId} type={"card"} />
                                }
                            </div>
                            <span>{dateParserFunction(post.createdAt)}</span>
                        </div>
                        {isUpdated === false && <p>{post.message}</p>}
                        {isUpdated === true && (
                            <div className='update-post'>
                                <textarea
                                    defaultValue={post.message}
                                    onChange={(e) => setTextUpdate(e.target.value)}
                                />
                                <div className='button-container'>
                                    <button className="btn" onClick={updateItem}>
                                        Valider la modification
                                    </button>
                                </div>
                            </div>
                        )}
                        {post.picture !== undefined && <img src={post.picture} className="card-pic" alt="Card" />}
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
                        {
                            userData._id === post.posterId && (
                                <div className="button-container">
                                    <div onClick={() => setIsUpdated(!isUpdated)}>
                                        <img src="./img/icons/edit.svg" alt="edit-comment" />
                                    </div>
                                    <DeleteCard id={post._id} />
                                </div>
                            )
                        }
                        <div className='card-footer'>
                            <div className='comment-icon'>
                                <img
                                    onClick={() => setShowComments(!showComments)}
                                    src='./img/icons/message1.svg'
                                    alt='comment'
                                />
                                <span>{post.comments.length}</span>
                            </div>
                            <LikeButton post={post} />
                            <img src="./img/icons/share.svg" alt="share" />
                        </div>
                        {showComments && <CardComments post={post} />}
                    </div>
                </>
            )}
        </li>
    )
}

export default Card