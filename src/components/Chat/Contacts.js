import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

function Contacts(props) {

    const userData = props.currentUser;
    const usersData = props.contacts;
    const changeChat = props.changeChat;

    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentImage, setCurrentImage] = useState(undefined);
    const [currentUserSelected, setCurrentUserSelected] = useState(undefined);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (userData) {
            setCurrentImage(userData.picture);
            setCurrentUser(userData.pseudo);
        }
    }, [userData]);

    const changeCurrentChat = (index, contact) => {
        setCurrentUserSelected(index);
        changeChat(contact);
    }

    return (
        <>
            {
                currentImage && currentUser && (
                    <Container>
                        <div className='brand'>
                            <i className='fa fa-comments fa-2x' style={{ color: "white" }}></i>
                            <h3>Chat</h3>
                        </div>
                        <div className='contacts'>
                            {
                                usersData.length > 0 && usersData.map((user, index) => {
                                    if (user._id !== userData._id) {
                                        return (
                                            <div
                                                className={`contact ${index === currentUserSelected ? "selected" : ""}`}
                                                key={index}
                                                onClick={() => changeCurrentChat(index, user)}
                                            >
                                                <div className='avatar'>
                                                    <img src={user.picture} alt="picUser" />
                                                </div>
                                                <div className='username'>
                                                    <h3>{user.pseudo}</h3>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                        <div className='current-user'>
                            <div className='avatar'>
                                <img src={currentImage} alt="picUser" />
                            </div>
                            <div className='username'>
                                <h2>{currentUser}</h2>
                            </div>
                        </div>
                    </Container>
                )
            }
        </>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #080420;

    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;

        img {
            height: 2rem;
        }

        h3 {
            color: white;
            text-transform: uppercase;
        }
    }

    .contacts {
        display : flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar{
            width: 0.2rem
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }

        .contact {
            background-color: #ffffff39;
            min-height: 5rem;
            width: 90%;
            cursor: pointer;
            border-radius: 0.2rem;
            padding: 0.4rem;
            gap: 1rem;
            align-items: center;
            display: flex;
            transition: 0.5s ease-in-out;
            .avatar {
                img {
                    height: 3rem;
                }
            }

            .username {
                h3 {
                    color: white;
                }
            }
        }
        .selected {
            background-color: #9186f3;
        }
    }

    .current-user{
        background-color: #0d0d30;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;

        .avatar {
            img {
                height: 4rem;
                max-inline-size: 100%;
            }
        }

        .username {
            h2 {
                color: white;
            }
        }

        @media screen and (min-width: 720px) and (max-width: 1080px) {
            gap: 0.5rem;
            .username {
                h2 {
                    font-size: 1rem;
                }
            }
        }
    }
`;

export default Contacts