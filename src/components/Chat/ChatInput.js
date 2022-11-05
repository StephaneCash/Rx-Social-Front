import React, { useState } from 'react'
import styled from 'styled-components'
import PickerEmojiPicker  from "emoji-picker-react";

function ChatInput() {

    const [showPicker, setShowPicker] = useState(false);
    const [msg, setMsg] = useState('');

    const handleShowEmoji = () => {
        setShowPicker(!showPicker);
    };

    const handleEmojiClick = (event, emoji) => {
        let message = msg;
        message += event.emoji;
        setMsg(message)
    }

    return (
        <Container>
            <div className='button-container'>
                <div className='emoji'>
                    <i className='fa fa-smile-o' onClick={handleShowEmoji}></i>
                    {showPicker && <PickerEmojiPicker onEmojiClick={handleEmojiClick} />}
                </div>
            </div>
            <form className='input-container'>
                <input type="text" placeholder='Ecrire votre message ici' value={msg} onChange={(e) => setMsg(e.target.value)} />
                <button className='submit'>
                    <i className='fa fa-send'></i>
                </button>
            </form>
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    height: 12%;
    grid-template-columns: 5% 95%;
    background-color: #080420;
    padding: 0 2rem;
    padding-bottom: 0.3rem;

    .button-container {
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji{
            position: relative;
            i {
                font-size: 1.5rem;
                color: #ffff00c8;
                cursor: pointer;
            }
            .EmojiPickerReact  {
                position: absolute;
                top: -470px;
            }
        }
    }
    .input-container {
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-content: center;
        gap: 2rem;
        background-color: #ffffff34;

        input {
            width: 90%;
            height: 60%;
            background-color: transparent;
            color: white;
            border: none;
            padding-left: 1rem;
            font-size: 1.2rem;
            &::selection{
                background-color: #9186f3;
            }
            &:focus {
                outline: none;
            }
        }

        button {
            padding: 0.3rem 2rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color:  #9186f3;
            border: none;
            i {
                font-size: 2rem;
                color: white;
            }
        }
    }
`;

export default ChatInput