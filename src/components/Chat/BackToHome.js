import React from 'react'
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

function BackToHome() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/home');
    }

    return (
        <Button onClick={handleClick}>
            <i className="fa fa-chevron-left"></i> Sortir
        </Button>
    )
}

const Button = styled.button`

`;

export default BackToHome