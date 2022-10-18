import React, { useContext, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { deleteComment, editComment } from '../../actions/PostActions';
import { UidContext } from "../AppContext";

function EditDeleteComment(props) {
    const comment = props.comment;
    const postId = props.postId;

    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState('');

    const uid = useContext(UidContext);
    const dispach = useDispatch();

    const handleEditComment = (e) => {
        e.preventDefault();

        if (text) {
            dispach(editComment(postId, comment._id, text));
            setText('');
            setEdit(false);
        }
    };

    const handleDeleteComment = () => {
        dispach(deleteComment(postId, comment._id));
    }

    useEffect(() => {
        const checkAuthor = () => {
            if (uid === comment.commenterId) {
                setIsAuthor(true);
            }
        }

        checkAuthor();
    }, [uid, comment.commenterId]);

    return (
        <div className='edit-comment'>
            {isAuthor && edit === false && (
                <span onClick={() => setEdit(!edit)}>
                    <img src="./img/icons/edit.svg" alt="Edit-comment" />
                </span>
            )}
            {isAuthor && edit && (
                <form action='' onSubmit={handleEditComment} className="edit-comment-form">
                    <label htmlFor='text' className='' onClick={() => setEdit(!edit)}>Editer</label>
                    <br />
                    <input
                        type="text" name="text"
                        id="text" defaultValue={comment.text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <br />
                    <div className='btn'>
                        <span onClick={() => {
                            if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                                handleDeleteComment();
                            }
                        }}>
                            <img src="./img/icons/trash.svg" alt="Delete-comment" />
                        </span>
                        <input type="submit" value="Valider la modification" style={{ border: "1px solid #fff" }} />
                    </div>
                </form>
            )}
        </div>
    )
}

export default EditDeleteComment