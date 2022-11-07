import React, { useState } from 'react'
import styled from 'styled-components'
import Picker from "emoji-picker-react";

function ChatInput(props) {

    const handleSendMessage = props.handleSendMessage;

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

    const sendChat = (e) => {
        e.preventDefault();
        if (msg.length > 0) {
            handleSendMessage(msg);
            setMsg("");
        }
    }

    return (
        <Container>
            <div className='button-container'>
                <div className='emoji'>
                    <i className='fa fa-smile-o' onClick={handleShowEmoji}></i>
                    {showPicker && <Picker onEmojiClick={handleEmojiClick} />}
                </div>
                <div className='post-container'>
                    <div className='post-form'>
                        <div className='footer-form'>
                            <div className='icon'>
                                <img src="./img/icons/picture.svg" alt="icon" />
                                <input type="file" id="file-upload" name="file" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <form className='input-container' onSubmit={(e) => sendChat(e)}>
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
    grid-template-columns: 20% 80%;
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
                top: -400px;
                height: 370px !important;
                background-color: #080420;
                border-color: #9186f3;

                .epr-emoji-category-content {
                    button {
                        filter: constrast(0);
                    }
                }
                .epr-search{
                    background-color: transparent;
                }
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
            background-color: transparent;
            color: white;
            border: none;
            padding-left: 1rem;
            font-size: 1.1rem;
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