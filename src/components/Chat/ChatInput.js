import React, { useState } from 'react'
import styled from 'styled-components'
import Picker from "emoji-picker-react";

function ChatInput(props) {

    const handleSendMessage = props.handleSendMessage;

    const [showPicker, setShowPicker] = useState(false);
    const [msg, setMsg] = useState('');
    const [file, setFile] = useState("");
    const [picture, setPicture] = useState('');

    const handleShowEmoji = () => {
        setShowPicker(!showPicker);
    };

    const handleEmojiClick = (event, emoji) => {
        let message = msg;
        message += event.emoji;
        setMsg(message)
    }

    const handleFiles = (e) =>{
        setPicture(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
    }

    const sendChat = (e) => {
        e.preventDefault();
        setFile("");
        const dateNow = Date.now()
        if (msg.length > 0) {
            handleSendMessage(msg, file, dateNow, picture);
            setMsg("");
        }
        if (file.length > 0) {
            setFile('');
        }
    }

    return (
        <Container>
            <div className='button-container'>
                <div className='emoji'>
                    <i className='fa fa-smile-o' onClick={handleShowEmoji}></i>
                    {showPicker && <Picker onEmojiClick={handleEmojiClick} />}
                </div>
                <div className='fileUpload' style={{ cursor: "pointer" }}>

                    <input type="file" id="file-upload" onChange={handleFiles} name="file"
                        style={{ cursor: "pointer !important" }} />
                    <i style={{ color: "silver" }}>{file && file.name}</i>
                </div>
            </div>
            <form className='input-container' onSubmit={(e) => sendChat(e)}>
                <input type="text" placeholder='Ecrire votre message ici' value={msg} onChange={(e) => setMsg(e.target.value)} />
                <button className='submit'>
                    <i className='fa fa-send'></i>
                </button>
            </form>
        </Container >
    )
}

const Container = styled.div`
    display: grid;
    height: 8vh !important;
    grid-template-columns: 20% 80%;
    flex: 1;
    background-color: white;
    padding: 0 2rem;
    margin-top: 16px;
    padding-bottom: 0.8rem;

    .button-container {
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji{
            position: relative;
            i {
                font-size: 1.5rem;
                color: #444;
                cursor: pointer;

            }
            .EmojiPickerReact  {
                position: absolute;
                top: -400px;
                height: 370px !important;
                background-color: white;
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
        background-color: silver;

        input {
            width: 100%;
            background-color: transparent;
            color: #111;
            border: none;
            padding-left: 1rem;
            font-size: 1.1rem;
            &::selection{
                background-color: #efefef;
            }
            &:focus {
                outline: none;
            }
        }

        button {
            padding: 0.2rem 1rem;
            border-radius: 2rem;
            justify-content: center;
            align-items: center;
            background-color:  #6585ac;
            border: none;
            i {
                font-size: 1.5rem;
                color: white;
            }
        }
    }
`;

export default ChatInput