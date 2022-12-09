import React from 'react';
import styled from 'styled-components';

function Welcome(props) {

    const currentUser = props.currentUser;

    return (
        <Container>
            <img src='./robot.gif' alt="Robot" />
            <h1>Bienvenu(e), {currentUser && currentUser.pseudo} !</h1>
            <h3>Chosissez une personne à converser. </h3>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #444;

    img {
        height: 20rem;
        
    }
`;

export default Welcome