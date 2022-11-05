import React from 'react'
import styled from 'styled-components'
import BackToHome from './BackToHome';
import ChatInput from './ChatInput';
import Messages from './Messages';

function ChatContainer(props) {
    const currentUser = props.currentUser;

    const handleSendMessage = (msg) => {

    }

    return (
        <Container>
            <div className='chat-header'>
                <div className='user-details'>
                    <div className='avatar'>
                        <img src={currentUser && currentUser.picture} alt="user-current" />
                    </div>
                    <div className='username'>
                        <h3>{currentUser && currentUser.pseudo}</h3>
                    </div>
                </div>
                <BackToHome />
            </div>
            <Messages />
            <ChatInput handleSendMessage={handleSendMessage} />
        </Container>
    )
}

const Container = styled.div`
    padding-top: 1rem;
    .chat-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;

        .user-details{
            display: flex;
            align-items: center;
            gap: 1rem;

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
    }
`;

export default ChatContainer