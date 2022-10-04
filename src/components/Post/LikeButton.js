import React, { useContext, useEffect, useState } from 'react'
import { UidContext } from '../AppContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useDispatch } from 'react-redux';
import { like_post } from '../../actions/PostActions';

function LikeButton(props) {
    let post = props.post;
    
    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (post.likers && post.likers.includes(uid)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [uid, post.likers, liked]);

    const like = () => {
        dispatch(like_post(post._id, uid));
        setLiked(true); 
    };

    const unlike = () => { }

    return (
        <div className='like-container'>
            {uid === null &&
                <Popup trigger={<img src="./img/icons/heart.svg" alt='like' />}
                    position={['bottom center', 'bottom right', 'bottom left']} closeOnDocumentClick
                >
                    <div>Connectez-vous pour aimer</div>
                </Popup>
            }

            {
                uid && liked === false &&
                <img src="./img/icons/heart.svg" alt='like' onClick={like} />
            }

            {
                uid && liked &&
                <img src="./img/icons/heart-filled.svg" alt='unlike' onClick={unlike} />
            }
        </div>
    )
}

export default LikeButton