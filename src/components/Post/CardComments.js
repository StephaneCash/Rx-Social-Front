import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FollowHandler from '../profil/FollowHandler';

function CardComments(props) {
    const post = props.post;

    const [text, setText] = useState('');
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispach = useDispatch();

    const handleComment = () => {

    }

    return (
        <div className='comments-container'>
            {
                post.comments.map((comment) => {
                    return (
                        <div className={comment.commenterId === userData._id ?
                            "comment-container client" : "comment-container"} key={comment._id}>
                            <div className='left-part'>
                                <img src={usersData.length > 0 &&
                                    usersData.map((user) => {
                                        if (user._id === comment.commenterId) { return user.picture }
                                        else return null
                                    }).join('')
                                }
                                    alt='User_img'
                                />
                            </div>
                            <div className='right-part'>
                                <div className='comment-header'>
                                    <div className='pseudo'>
                                        <h3>{comment.commenterPseudo}</h3>
                                        {comment.commenterId !== userData._id && (
                                            <FollowHandler idToFollow={comment.commenterId} type={'card'} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CardComments