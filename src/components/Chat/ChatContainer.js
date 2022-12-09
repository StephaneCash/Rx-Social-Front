import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import BackToHome from './BackToHome';
import ChatInput from './ChatInput';
import axios from "axios";
import "../../styles/Message.css"
import { v4 as uuidv4 } from "uuid";
import { timestampParser } from "../Utils"

function ChatContainer(props) {
    const currentUser = props.currentUser;
    const userData = props.userData;
    const socket = props.socket;

    //console.log(socket)

    const [messages, setMessages] = useState([]);
    const [arrivalMsg, setArrivalMsg] = useState(null);
    const scrollRef = useRef();

    const [pic, setPic] = useState('')

    const handleSendMessage = async (msg, file, dateNow,picture) => {
        const data = new FormData();
        data.append('from', userData._id)
        data.append('to', currentUser._id)
        data.append('message', msg)
        data.append('file', file)

        setPic(picture)

        await axios.post('http://localhost:5000/api/messages', data);

        socket.current.emit("send-msg", {
            from: userData._id,
            to: currentUser._id,
            message: msg,
            file: `${file.name}`
        });

        const msgs = [...messages];
        const fileName = file.name;
        console.log(fileName)
        msgs.push({ fromSelf: true, message: msg, fileName, dateNow });
        setMessages(msgs)
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-received", (msg, file, dateNow) => {
                setArrivalMsg({ fromSelf: false, message: msg, file: `${file.name}`, dateNow })
            })
        }
    }, [socket]);

    useEffect(() => {
        arrivalMsg && setMessages((prev) => [...prev, arrivalMsg])
    }, [arrivalMsg]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" })
    }, [messages]);

    useEffect(() => {
        async function getAllMessages() {
            try {
                const response = await axios.post("http://localhost:5000/api/messages/getAllMessages", {
                    from: userData._id,
                    to: currentUser._id
                });
                if (response) {
                    setMessages(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        getAllMessages();

    }, [currentUser, userData._id])

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
            <div className="chat-messages">
                {
                    messages ? messages.map((val, i) => {
                        return (
                            <div ref={scrollRef} key={uuidv4()}>
                                <div className={`message ${val.fromSelf ? "sended" : "received"}`}>
                                    <div className='content'>
                                        <p>
                                            {val.message}
                                        </p>
                                        <p>

                                            {
                                                val.file ?
                                                    val && val.file && val.file !== undefined &&
                                                    <>
                                                        <img src={val.file} width="200" alt={"./" + val.file} />
                                                        <br />
                                                        <a href={`./${val.file}`} download>Lire</a>
                                                    </>
                                                    : pic && <img src={pic} width="200" alt="" />
                                            }
                                        </p>

                                        <i style={{ color: "#efefef", fontSize: "12px" }}>{timestampParser(val.dateNow)}</i>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : "Aucun message"
                }
            </div>
            <ChatInput handleSendMessage={handleSendMessage} />
        </Container >
    )
}

const Container = styled.div`
    padding-top: 1rem;
    display: grid;
    grid-template-rows: 10% 78% 12%;  
    gap: 0.1rem;
    overflow: hidden;
    .chat-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        border-bottom: 1px solid silver;

        .user-details{
            display: flex;
            align-items: center;
            gap: 1rem;

           .avatar {
            img {
                height: 3rem;
                border-radius: 50%;
                width: 3rem;
            }
           }
           .username {
            h3 {
                color: #555;
            }
           }
        }
    };
    .chat-messages {
        padding: 1rem 2rem;
        display: flex;
        flex-direction : column;
        gap: 1rem;
        overflow: auto;

        .message {
            display: flex;
            align-items: center;
        }
    }
`;

export default ChatContainer