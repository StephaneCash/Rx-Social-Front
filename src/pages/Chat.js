import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import ChatContainer from '../components/Chat/ChatContainer';
import Contacts from '../components/Chat/Contacts';
import Welcome from '../components/Chat/Welcome';

function Chat() {

    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    }

    return (
        <div className=''>
            <Container>
                <div className='container'>
                    <Contacts currentUser={userData} contacts={usersData} changeChat={handleChatChange} />
                    {
                        currentChat === undefined ?
                        <Welcome currentUser={userData} /> : <ChatContainer currentUser={userData} />
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