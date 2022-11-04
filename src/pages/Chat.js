import React from 'react'
import styled from 'styled-components'

function Chat() {
    return (
        <div className=''>
            <Container>
                <div className='container'>
                    Chat
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
        width: 85vh;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;

        @media screen and (min-width: 720px) and (max-width: 1080px) {
            grid-template-columns: 35% 65%;
        }
    }
`;

export default Chat