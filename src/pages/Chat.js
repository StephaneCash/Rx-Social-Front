import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import ChatContainer from '../components/Chat/ChatContainer';
import Contacts from '../components/Chat/Contacts';
import Welcome from '../components/Chat/Welcome';
import { io } from "socket.io-client";

function Chat() {

    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const host = "http://localhost:5000"
    const socket = useRef();

    const [currentChat, setCurrentChat] = useState(undefined);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    }

    useEffect(() => {
        if (userData) {
            socket.current = io(host);
            socket.current.emit('add-user', userData._id)
        }
    }, [userData])

    return (
        <div className=''>
            <Container>
                <div className='container'>
                    <Contacts currentUser={userData} contacts={usersData} changeChat={handleChatChange} />
                    {
                        currentChat === undefined ?
                            <Welcome currentUser={userData} /> :
                            <ChatContainer currentUser={currentChat} userData={userData} socket={socket} />
                    }
                </div>
            </Container>
        </div>
    )
}

const Container = styled.div`
    height: 90vh;
    width: 100%;
    margin: 58px auto 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;

    .container {
        height: 85vh;
        width: 85%;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;

        @media screen and (min-width: 720px) and (max-width: 1080px) {
            grid-template-columns: 35% 65%;
        }
    }
`;

export default Chat