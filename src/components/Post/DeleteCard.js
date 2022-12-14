import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../actions/PostActions';

function DeleteCard(props) {

    const dispach = useDispatch();

    const deletePub = () => {
        dispach(deletePost(props.id));
    }

    return (
        <div
            onClick={() => {
                if (window.confirm('Voulez-vous supprimer cette publication ?')) {
                    deletePub()
                }
            }}
        >
            <img src='./img/icons/trash.svg' alt='Delete-card' />
        </div>
    )
}

export default DeleteCard