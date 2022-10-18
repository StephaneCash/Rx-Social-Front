import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getPosts } from '../../actions/PostActions';
import FollowHandler from '../profil/FollowHandler';
import { timestampParser } from '../Utils';
import EditDeleteComment from './EditDeleteComment';

function CardComments(props) {
    const post = props.post;

    const [text, setText] = useState('');
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispach = useDispatch();

    const handleComment = (e) => {
        e.preventDefault();

        if (text) {
            dispach(addComment(post._id, userData._id, text, userData.pseudo))
                .then(() => dispach(getPosts()))
                .then(() => setText(''));
        }
    }

    return (
        <div className='comments-container'>
            {
                post.comments.map((comment) => {
                    return (
                        <div className={comment.commenterId === userData._id ?
                            "comment-container client" : "comment-container other"} key={comment._id}>
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
                                        <h3 style={{color: "#fff"}}>{comment.commenterPseudo}</h3>
                                        {comment.commenterId !== userData._id && (
                                            <FollowHandler idToFollow={comment.commenterId} type={'card'} />
                                        )}
                                    </div>
                                    <span style={{color: "#fff"}}>{timestampParser(comment.timestamp)}</span>
                                </div>
                                <p style={{color: "#fff"}}>{comment.text}</p>
                                <EditDeleteComment comment={comment} postId={post._id} />
                            </div>
                        </div>
                    )
                })
            }
            {userData._id && (
                <form action='' onSubmit={handleComment} className="comment-form">
                    <input
                        type="text" name="text"
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Laisser un commentaire"
                    />
                    <br />
                    <input type="submit" value="Commenter" />
                </form>
            )}
        </div>
    )
}

export default CardComments