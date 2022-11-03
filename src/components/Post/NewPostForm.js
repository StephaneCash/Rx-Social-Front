import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addPost, getPosts } from '../../actions/PostActions';
import { timestampParser } from "../Utils";

function NewPostForm() {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [picture, setPicture] = useState(null);
    const [video, setVideo] = useState("");
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.userReducer);
    const dispach = useDispatch();

    const handlePicture = (e) => {
        setPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        setVideo("");
    }

    const handlePost = async () => {
        if (message || picture || video) {
            const data = new FormData();
            data.append("posterId", userData._id);
            data.append("message", message);
            if (file) {
                data.append('file', file);
            }
            data.append('video', video);

            await dispach(addPost(data));
            dispach(getPosts());
            cancelPost()
        } else {
            alert('Veuillez entrer un message à publier')
        }
    }

    const cancelPost = () => {
        setMessage('');
        setPicture('');
        setVideo('');
        setFile('');
    }

    const handleVideo = () => {
        let findLink = message.split(" ");

        for (let i = 0; i < findLink.length; i++) {
            if (findLink[i].includes('https://www.yout') || findLink[i].includes('https://yout')) {
                let embed = findLink[i].replace('watch?v=', "embed/");
                setVideo(embed.split('&')[0]);
                findLink.splice(i, 1);
                setMessage(findLink.join(" "));
                setPicture('');
            }
        }
    }

    useEffect(() => {
        if (userData) {
            setIsLoading(false);
        }
        handleVideo();
    }, [userData, message, video])

    return (
        <div className='post-container'>
            {isLoading ? <i className='fa fa-spinner fa-pulse'></i> : (
                <>
                    <div className="data">
                        <p>
                            <span>{userData && userData.following ? userData.following.length : 0}</span>
                            {" "}
                            Abonnements
                        </p>
                        <p>
                            <span>{userData && userData.followers ? userData.followers.length : 0}</span>
                            {" "}
                            Abonnés
                        </p>
                    </div>
                    <NavLink to="/profil">
                        <div className='user-info'>
                            <img src={userData.picture} alt="User-Pic" />
                        </div>
                    </NavLink>
                    <div className='post-form'>
                        <textarea
                            name='message'
                            id="message"
                            placeholder='Quoi de neuf ?'
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />

                        {message || picture || video.length > 20 ? (
                            <li className='card-container'>
                                <div className='card-left'>
                                    <img src={userData.picture} alt="user-pic" />
                                </div>
                                <div className='card-right'>
                                    <div className='card-header'>
                                        <div className='pseudo'>
                                            <h3>{userData.pseudo}</h3>
                                        </div>
                                        <span>{timestampParser(Date.now())}</span>
                                    </div>
                                    <div className='content'>
                                        <p>{message}</p>
                                        <img src={picture} alt='' />
                                        {video && (
                                            <iframe
                                                src={video}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write;
                                                encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title={video}
                                            ></iframe>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ) : null}

                        <div className='footer-form'>
                            <div className='icon'>
                                {!video && (
                                    <>
                                        <img src="./img/icons/picture.svg" alt="icon" />
                                        <input type="file" id="file-upload" name="file" onChange={(e) => handlePicture(e)} />
                                    </>
                                )}
                                {video && (
                                    <button onClick={() => setVideo("")} style={{ color: "gray" }}>Supprimer la vidéo</button>
                                )}
                            </div>
                            <div className='btn-send'>
                                {message || picture || video.length > 20 ? (
                                    <button style={{ color: 'gray' }} className='cancel' onClick={cancelPost} >Annuler</button>
                                ) : null}
                                <button className='send' style={{ border: "1px solid #fff" }} onClick={handlePost}>Publier</button>
                            </div>
                        </div>
                    </div>

                </>
            )}
        </div>
    )
}

export default NewPostForm